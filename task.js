const util = require('util');
const exec = util.promisify(require('child_process').exec);

class TerminalTask {
    constructor(command, ws = null) {
      this.command = command;
      this.ws = ws;
    }
  
    async perform() {
        const { stdout, stderr } = await exec(this.command);
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);
    
        // If WebSocket connection is available, send the logs to the client
        if (this.ws && this.ws.readyState === this.ws.OPEN) {
          this.ws.send(`stdout: ${stdout}`);
          this.ws.send(`stderr: ${stderr}`);
        }
    }
  }
module.exports = TerminalTask;
