#!/usr/bin/env node
import execa from 'execa'

const { SOURCEGRAPH_URL, JEST_JUNIT_OUTPUT_NAME, JEST_JUNIT_OUTPUT_DIR } = process.env

if (!SOURCEGRAPH_URL) {
    throw new Error('SOURCEGRAPH_URL was not set. Please provide a valid URL to run the smoke tests against.')
}

const handler = async (): Promise<void> => {
    try {
        /**
         * Note: There is no officially supported way to run Jest programmatically.
         * We avoid using the unstable `jest.run()` API.
         * https://github.com/facebook/jest/issues/5048
         */
        await execa('jest', ['--runInBand'], {
            cwd: __dirname,
            shell: true,
            stdio: 'inherit',
            env: { SOURCEGRAPH_URL, JEST_JUNIT_OUTPUT_NAME, JEST_JUNIT_OUTPUT_DIR },
        })
    } catch (error) {
        console.error(error)
        process.exit(error?.exitCode || 1)
    }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
handler()
