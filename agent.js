class BasicAgent {
    async run(tasks) {
        // execute tasks sequentially
        for (const task of tasks) {
        await task.perform();
        }
    }
}

module.exports = BasicAgent;
