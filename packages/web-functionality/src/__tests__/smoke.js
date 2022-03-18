const { SOURCEGRAPH_URL } = process.env

if (!SOURCEGRAPH_URL) {
  throw new Error('SOURCEGRAPH_URL was not set. Please provide a valid URL to run the smoke tests against.')
}

describe('Smoke tests', () => {
  beforeEach(async () => {
    await page.goto(SOURCEGRAPH_URL)
  })

  it('successfully loads the application', async () => {
    await expect(page).toMatch('Sourcegraph')
  })

  it('successful runs a search', async () => {
    // Update search input
    await expect(page).toFill('.inputarea', 'repo:^github.com/sourcegraph/lighthouse-ci-test-repository$')

    // Click search button
    await expect(page).toClick('.test-search-button')

    // Expect results count is shown correctly
    await expect(page).toMatchElement('[data-testid="streaming-progress-count"]', { text: '1 result' })
  })
})
