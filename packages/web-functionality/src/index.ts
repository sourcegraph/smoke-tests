#!/usr/bin/env node
import execa, { ExecaReturnValue } from 'execa'

const { SOURCEGRAPH_URL, JEST_JUNIT_OUTPUT_NAME, JEST_JUNIT_OUTPUT_DIR } = process.env

if (!SOURCEGRAPH_URL) {
    throw new Error('SOURCEGRAPH_URL was not set. Please provide a valid URL to run the smoke tests against.')
}

const runTests = async (): Promise<ExecaReturnValue> =>
    /**
     * Note: There is no officially supported way to run Jest programmatically.
     * We avoid using the unstable `jest.run()` API.
     * https://github.com/facebook/jest/issues/5048
     */
    execa('jest', ['--runInBand'], {
        cwd: __dirname,
        shell: true,
        stdio: 'inherit',
        env: { SOURCEGRAPH_URL, JEST_JUNIT_OUTPUT_NAME, JEST_JUNIT_OUTPUT_DIR },
    })

const handler = async (): Promise<void> => {
    for (let index = 0; index < 3; index++) {
        try {
            await runTests()
            break
        } catch (error) {
            console.error(`Failed attempt ${index + 1}:`, error)
            if (index === 2) {
                process.exit(error?.exitCode || 1)
            }
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
handler()
