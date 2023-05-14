class TaskQueue {
    constructor() {
      this.queue = [];
      this.logs = [];
    }
  
    addTask(task) {
      this.queue.push(task);
    }
  
    async execute() {
      while (this.queue.length > 0) {
        const task = this.queue.shift();
        try {
          await task.perform();
          this.logs.push(`Task ${task.constructor.name} executed successfully`);
        } catch (error) {
          this.logs.push(`Task ${task.constructor.name} failed with error: ${error.message}`);
        }
      }
    }
  }
  
  module.exports = TaskQueue;
  