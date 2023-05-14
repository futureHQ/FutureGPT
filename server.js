const express = require('express');
const WebSocket = require('ws');
const BasicAgent = require('./agent');
const TerminalTask = require('./task');
const TaskQueue = require('./taskQueue');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    const taskQueue = new TaskQueue();
    taskQueue.addTask(new TerminalTask('ls', ws));
    taskQueue.addTask(new TerminalTask('pwd', ws));

    const agent = new BasicAgent();
    agent.run(taskQueue.queue).then(() => {
        console.log('All tasks have been executed');
    });
});
