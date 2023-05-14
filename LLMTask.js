const openai = require('openai');

openai.apiKey = 'YOUR_OPENAI_API_KEY';

class LLMTask {
  constructor(prompt, ws = null) {
    this.prompt = prompt;
    this.ws = ws;
  }

  async perform() {
    const response = await openai.Completion.create({
      engine: 'text-davinci-002',
      prompt: this.prompt,
      max_tokens: 60
    });

    const instruction = JSON.parse(response.choices[0].text);

    console.log('Instruction:', instruction);

    // If WebSocket connection is available, send the instruction to the client
    if (this.ws && this.ws.readyState === this.ws.OPEN) {
      this.ws.send(`Instruction: ${JSON.stringify(instruction)}`);
    }

    return instruction;
  }
}

module.exports = LLMTask;
