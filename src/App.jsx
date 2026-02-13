import React from 'react'


const App = () => {
    const sendMessage = async (userMessage) => {
  try {
    const response = await fetch('/chat', {  // Changed from '/api/chat' to '/chat'
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage })
    });
    
    const data = await response.json();
    const aiResponse = data.candidates[0].content.parts[0].text;
    
    return aiResponse;
    
  } catch (error) {
    console.error('Error:', error);
    return 'Sorry, something went wrong!';
  }
};
  return (
    <div></div>
  )
}

export default App