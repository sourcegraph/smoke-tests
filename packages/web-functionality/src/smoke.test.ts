const searchUrl = process.env.SOURCEGRAPH_URL || ''
const resultCountSelector = '[data-testid="streaming-progress-skipped"]'
const searchQuery = 'repo:^github.com/sourcegraph/smoke-tests-test-repository$'
const expectedResultString = '1 result'

describe('Smoke tests', () => {
    it('successfully loads the application', async () => {
        await page.goto(searchUrl)
        await expect(page).toMatch('Sourcegraph')
    })

    it('successful runs a search', async () => {
        // Perform a search by navigating to a search results page with the q parameter
        await page.goto(searchUrl + `?q=${encodeURIComponent(searchQuery)}`)

        // Expect results count is shown correctly
        await page.waitForSelector(resultCountSelector)
        await expect(page).toMatchElement(resultCountSelector, {
            text: expectedResultString,
        })
    })
})
