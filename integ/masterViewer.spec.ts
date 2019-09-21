
describe('local', () => {
    it('should be a page', async () => {
        const page = await browser.newPage();
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', err => expect(err).toEqual('No failure from page') );
        await page.goto('http://localhost:3000/examples');
        await expect(page).toMatch('KVS');
    });
});