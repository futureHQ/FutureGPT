const BasicAgent = require('./agent');
const TerminalTask = require('./task');
const BrowseTask = require('./browseTask');
const TaskQueue = require('./taskQueue');

const taskQueue = new TaskQueue();
taskQueue.addTask(new TerminalTask('ls'));
taskQueue.addTask(new BrowseTask('https://example.com'));

// const agent = new BasicAgent();
// agent.run([new TerminalTask('ls')]);
// agent.run([new TerminalTask('pwd')]);
// const agent = new BasicAgent();
// agent.run([new BrowseTask('https://example.com')]);

const agent = new BasicAgent();
agent.run(taskQueue.queue).then(() => {
    console.log('All tasks have been executed');
});
