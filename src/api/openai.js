// src/api/openai.js

import * as openai from 'openai';

const configuration = new openai.Configuration({
  apiKey: 'YOUR_OPENAI_API_KEY', // Replace with your API key
});

const openaiInstance = new openai.OpenAIApi(configuration);

export default openaiInstance;
