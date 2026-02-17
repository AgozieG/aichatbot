const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve built frontend from dist folder (for production), fallback to public (for dev)
const path = require('path');
const publicDir = process.env.NODE_ENV === 'production' ? path.join(__dirname, 'dist') : path.join(__dirname, 'public');
app.use(express.static(publicDir));

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System prompt for robotics programming assistant
const SYSTEM_PROMPT = `You are RoboCode AI Assistant, a friendly and knowledgeable expert in block-based robotics programming. Your expertise includes:
- VEX VRC & VEX IQ block programming
- LEGO Mindstorms (EV3 & SPIKE Prime)
- Arduino blocks and visual programming
- Scratch-based robotics projects
- Sensor integration and usage
- Motor control and movement algorithms
- Competition strategies and optimization

Guidelines for your responses:
1. Be clear, concise, and encouraging - especially for beginners
2. Use simple language and explain technical terms
3. Provide practical examples and step-by-step instructions
4. When explaining code blocks, describe them visually (e.g., "Use a Move Forward block set to 100% speed")
5. Suggest best practices and common pitfalls to avoid
6. Be enthusiastic about robotics and programming
7. If a question is beyond robotics programming, politely redirect to robotics topics
8. Format responses in clean, easy-to-read paragraphs and simple numbered or lettered lists
9. Avoid excessive markdown formatting - NO multiple asterisks, hashtags, or dashes
10. Use simple text formatting only: use plain text, numbered lists (1. 2. 3.), or simple line breaks
11. Keep explanations conversational and friendly without clutter
12. NO *, #, or -

Remember: Your goal is to make robotics programming accessible and fun for learners of all ages!`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ 
                error: 'Invalid request', 
                details: 'Message is required and must be a string' 
            });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ 
                error: 'Server configuration error', 
                details: 'Gemini API key not configured. Please add GEMINI_API_KEY to your .env file' 
            });
        }

        // Get Gemini model (using gemini-2.5-flash for chat)
        const model = genAI.getGenerativeModel({ 
            model: 'gemini-2.5-flash',
            systemInstruction: SYSTEM_PROMPT
        });

        // Build chat history for context
        const chatHistory = conversationHistory.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        // Start chat with history
        const chat = model.startChat({
            history: chatHistory,
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.7,
                topP: 0.8,
                topK: 40
            }
        });

        // Send message and get response
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.json({ 
            message: text,
            model: 'gemini-2.5-flash'
        });

    } catch (error) {
        console.error('Error in /api/chat:', error);
        
        let errorMessage = 'Failed to get response from AI';
        let statusCode = 500;

        if (error.message?.includes('API key')) {
            errorMessage = 'Invalid or missing API key';
            statusCode = 401;
        } else if (error.message?.includes('quota')) {
            errorMessage = 'API quota exceeded. Please try again later';
            statusCode = 429;
        } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
            errorMessage = 'Network error connecting to Gemini API';
            statusCode = 503;
        }

        res.status(statusCode).json({ 
            error: errorMessage,
            details: error.message 
        });
    }
});

// Status endpoint
app.get('/api/status', (req, res) => {
    const hasApiKey = !!process.env.GEMINI_API_KEY;
    res.json({ 
        status: hasApiKey ? 'connected' : 'disconnected',
        model: 'gemini-2.5-flash',
        service: 'Gemini API'
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// Catch-all route to serve index.html for client-side routing
app.get('*', (req, res) => {
    const indexPath = path.join(publicDir, 'index.html');
    res.sendFile(indexPath);
});

// Start server





// For Vercel serverless functions
// if (process.env.NODE_ENV !== 'production') {
//     const PORT = process.env.PORT || 3001;
//     app.listen(PORT, () => {
//         console.log(`\n🤖 RoboCode AI Server is running!`);
//         console.log(`📡 Server: http://localhost:${PORT}`);
//         console.log(`🔑 API Key configured: ${process.env.GEMINI_API_KEY ? '✓ Yes' : '✗ No'}`);
//         console.log(`\nReady to help with robotics programming! 🚀\n`);
//     });
// } else {
//     // In production (Vercel), just export the app
//     console.log('Running in serverless mode (Vercel)');
// }

// module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`\n🤖 RoboCode AI Server is running!`);
        console.log(`📡 Server: http://localhost:${PORT}`);
        console.log(`🔑 API Key configured: ${process.env.GEMINI_API_KEY ? '✓ Yes' : '✗ No'}`);
        console.log(`\nReady to help with robotics programming! 🚀\n`);
    });
}

module.exports = app;