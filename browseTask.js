const puppeteer = require('puppeteer');

class BrowseTask {
  constructor(url, headless = "new", ws = null) {
    this.url = url;
    this.headless = headless;
    this.ws = ws;
  }

  async perform() {
    const browser = await puppeteer.launch({ headless: this.headless });
    const page = await browser.newPage();
    await page.goto(this.url, { waitUntil: 'networkidle2' }); // waits until all network requests are finished
    const content = await page.content();
    
    await browser.close();
    
    console.log('Content:', content);

    // If WebSocket connection is available, send the content to the client
    if (this.ws && this.ws.readyState === this.ws.OPEN) {
      this.ws.send(`Content: ${content}`);
    }

    return content;
  }
}

module.exports = BrowseTask;
