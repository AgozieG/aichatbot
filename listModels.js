const https = require('https');
require('dotenv').config();

async function listAvailableModels() {
    return new Promise((resolve, reject) => {
        const apiKey = process.env.GEMINI_API_KEY;
        
        if (!apiKey) {
            console.error('❌ Error: GEMINI_API_KEY not found in .env file');
            process.exit(1);
        }
        
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        
        console.log('\n📋 Fetching available Gemini models...\n');
        
        https.get(url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    
                    if (response.models && response.models.length > 0) {
                        console.log('✅ Available Models:\n');
                        console.log('=' .repeat(100));
                        
                        response.models.forEach((model, index) => {
                            const modelId = model.name.split('/').pop();
                            console.log(`\n${index + 1}. Model ID: ${modelId}`);
                            console.log(`   Display Name: ${model.displayName}`);
                            console.log(`   Description: ${model.description}`);
                            console.log(`   Input Token Limit: ${model.inputTokenLimit}`);
                            console.log(`   Output Token Limit: ${model.outputTokenLimit}`);
                            console.log(`   Supported Methods:`);
                            if (model.supportedGenerationMethods && model.supportedGenerationMethods.length > 0) {
                                model.supportedGenerationMethods.forEach(method => {
                                    console.log(`     ✓ ${method}`);
                                });
                            }
                        });
                        
                        console.log('\n' + '='.repeat(100));
                        console.log(`\nTotal Models Available: ${response.models.length}\n`);
                    } else {
                        console.log('No models found in response.');
                    }
                    resolve();
                } catch (error) {
                    reject(new Error(`Failed to parse response: ${error.message}`));
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

listAvailableModels().catch((error) => {
    console.error('❌ Error fetching models:');
    console.error(error.message);
    process.exit(1);
});
