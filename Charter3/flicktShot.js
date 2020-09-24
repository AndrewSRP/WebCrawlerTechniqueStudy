const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1400,
        height: 800,
    });
    await page.goto(`https://www.flickr.com/search/?text=${encodeURIComponent('고양이')}`);
    await page.screenshot({path: 'flickr-cat.png'});

    await browser.close();
})();