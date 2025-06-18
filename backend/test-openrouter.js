// Test script for OpenRouter Deepseek AI integration
const axios = require('axios');
require('dotenv').config();

// Test the OpenRouter API with the Deepseek model
async function testOpenRouter() {
  console.log('Testing OpenRouter Deepseek API...');
  
  try {
    // Simple test message
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [
          {
            role: 'system',
            content: 'You are an AI banking assistant for Modern Bank India.'
          },
          {
            role: 'user',
            content: 'What are the benefits of having a savings account?'
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY || process.env.CHAT_API_KEY}`
        }
      }
    );

    console.log('API Response:');
    console.log(response.data.choices[0].message.content);
    console.log('\nAPI Test Successful!');
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
  }
}

// Run the test
testOpenRouter();
