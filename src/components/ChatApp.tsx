import React, { useState } from 'react';
import { Input, Button, List } from 'antd';
import openaiInstance from '../api/openai'; // Adjust the path according to your project structure

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = async () => {
    const userMessage = { role: 'user', content: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');

    try {
      const response = await openaiInstance.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [...messages, userMessage],
      });

      const aiMessage = { role: 'assistant', content: response.data.choices[0].message.content };
      setMessages((prevMessages) => [...prevMessages, userMessage, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      // Handle the error appropriately in your application
    }
  };

  return (
    <div>
      {/* Your chat interface JSX */}
    </div>
  );
};

export default ChatApp;
