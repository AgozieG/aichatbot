# 🤖 RoboCode AI Assistant

An AI-powered chatbot for teaching block-based robotics programming, powered by Google's Gemini API.

## ✨ Features

- **AI-Powered Chat**: Intelligent responses using Google Gemini API
- **Robotics Expertise**: Specialized in VEX, LEGO Mindstorms, Arduino, and Scratch robotics
- **Conversation Memory**: Maintains context across multiple messages
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time Status**: Shows connection status to API
- **Example Questions**: Quick start with pre-built questions

## 📋 Prerequisites

Before you begin, make sure you have:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A **Google Account** (to get Gemini API key)

## 🚀 Setup Instructions

### Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"** or **"Get API Key"**
4. Copy the generated API key (it will look like: `AIzaSyC...`)
5. Keep this key safe - you'll need it in Step 3!

**Important**: The Gemini API has a free tier with generous limits. No credit card required!

### Step 2: Install Dependencies

Open your terminal/command prompt in the project folder and run:

```bash
npm install
```

This will install all required packages:
- `express` - Web server framework
- `@google/generative-ai` - Gemini API SDK
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management

### Step 3: Configure Your API Key

1. Copy the `.env.example` file and rename it to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file in a text editor

3. Replace `your_gemini_api_key_here` with your actual API key:
   ```
   GEMINI_API_KEY=AIzaSyC...your_actual_key_here
   PORT=3001
   ```

4. Save the file

### Step 4: Organize Your Files

Make sure your project structure looks like this:

```
your-project-folder/
├── server.js           # Backend server (created)
├── package.json        # Dependencies (created)
├── .env               # Your API key (you create this)
├── .env.example       # Template (created)
├── .gitignore         # Git ignore file (created)
├── README.md          # This file (created)
└── public/            # Create this folder
    └── index.html     # Your frontend HTML file (move here)
```

**Important**: Create a `public` folder and move your HTML file into it:

```bash
mkdir public
mv index.html public/
```

Or on Windows:
```cmd
mkdir public
move index.html public\
```

### Step 5: Update Your HTML File

Open `public/index.html` and update the API endpoints. Find these lines:

```javascript
const response = await fetch('/api/status');
```

and

```javascript
const response = await fetch('/api/chat', {
```

They should already be correct! If you see `http://localhost:11434`, change them to `/api/chat` and `/api/status`.

Also, remove or comment out any Ollama-specific code. The server will now use Gemini API instead.

### Step 6: Run the Server

Start the server with:

```bash
npm start
```

You should see:

```
🤖 RoboCode AI Server is running!
📡 Server: http://localhost:3001
🔑 API Key configured: ✓ Yes

Ready to help with robotics programming! 🚀
```

### Step 7: Open Your Website

1. Open your web browser
2. Go to: `http://localhost:3001`
3. You should see your RoboCode AI interface!
4. Try asking a question about robotics programming

## 🎯 Testing the Setup

Try these example questions to test the AI:

1. "How do I make my robot turn 90 degrees using VEX blocks?"
2. "Explain the difference between wait and wait until blocks"
3. "How can I use sensors to follow a line?"
4. "What are variables in block programming?"

## 🛠️ Development Tips

### Running in Development Mode

For automatic server restart when you make changes:

```bash
npm run dev
```

This uses `nodemon` to watch for file changes.

### Checking API Status

Visit `http://localhost:3001/api/status` to check if your API key is configured correctly.

### Viewing Logs

The server logs all requests and errors to the console. Keep the terminal open to see what's happening.

## 📱 Mobile Responsiveness

The website is already fully responsive! It will automatically adapt to:
- 📱 Mobile phones (portrait and landscape)
- 📱 Tablets
- 💻 Desktop computers
- 🖥️ Large screens

## 🔧 Troubleshooting

### "API Key not configured" Error

- Make sure your `.env` file exists (not `.env.example`)
- Check that `GEMINI_API_KEY` is set correctly in `.env`
- Restart the server after changing `.env`

### "Cannot find module" Error

Run `npm install` again to install all dependencies.

### "Port 3001 already in use" Error

Either:
1. Stop the other program using port 3001, or
2. Change `PORT=3001` to `PORT=3002` in your `.env` file

### API Quota Exceeded

The free tier has limits. If you hit them:
- Wait a few minutes and try again
- Check your usage at [Google AI Studio](https://makersuite.google.com/app/apikey)
- Consider upgrading if you need more capacity

### CORS Errors

Make sure your HTML file is being served from the `public` folder, not opened directly as a file.

## 🌟 Features Explained

### Conversation History

The chatbot remembers your last 6 messages for context, making conversations feel natural.

### System Prompt

The AI is specially tuned for robotics programming education with a custom system prompt that:
- Focuses on block-based programming
- Uses beginner-friendly language
- Provides practical examples
- Encourages learning

### Error Handling

The server gracefully handles:
- Invalid API keys
- Network errors
- Rate limiting
- Invalid requests

## 🔐 Security Notes

- **Never** commit your `.env` file to Git
- **Never** share your API key publicly
- The `.gitignore` file protects your `.env` automatically
- Keep your API key secret like a password

## 📚 API Information

**Gemini API Free Tier Limits** (as of 2024):
- 60 requests per minute
- 1,500 requests per day
- No credit card required

**Model Used**: `gemini-1.5-flash`
- Fast responses
- Good for conversational AI
- Optimized for chat interactions

## 🎓 Learning Resources

- [Google AI Studio](https://makersuite.google.com/) - Test Gemini API
- [Gemini API Documentation](https://ai.google.dev/docs) - Official docs
- [VEX Robotics](https://www.vexrobotics.com/) - VEX resources
- [LEGO Education](https://education.lego.com/) - LEGO robotics

## 📝 Project Structure

```
Backend (Node.js/Express):
├── server.js          # Main server file
├── package.json       # Dependencies
├── .env              # Your configuration
└── .gitignore        # Protected files

Frontend (React):
└── public/
    └── index.html    # Your beautiful UI
```

## 🤝 Need Help?

If you run into issues:

1. Check the troubleshooting section above
2. Make sure all setup steps are completed
3. Check the server console for error messages
4. Verify your `.env` file is configured correctly

## 📄 License

MIT License - Feel free to use this for learning and teaching!

## 🚀 Next Steps

Once everything is working:

1. Customize the system prompt in `server.js` to match your teaching style
2. Add more example questions in the frontend
3. Adjust the AI's temperature and parameters for different response styles
4. Add features like saving chat history
5. Deploy to a hosting service to make it accessible online

Happy coding! 🤖✨
