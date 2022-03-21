describe('Smoke tests', () => {
    beforeEach(async () => {
        await page.goto(process.env.SOURCEGRAPH_URL || '')
    })

    it('successfully loads the application', async () => {
        await expect(page).toMatch('Sourcegraph')
    })

    it('successful runs a search', async () => {
        // Update search input
        await expect(page).toFill(
            '.test-query-input textarea',
            'repo:^github.com/sourcegraph/smoke-tests-test-repository$'
        )

        // Click search button
        await expect(page).toClick('.test-search-button')

        // Expect results count is shown correctly
        await expect(page).toMatchElement('[data-testid="streaming-progress-count"]', { text: '1 result' })
    })
})
