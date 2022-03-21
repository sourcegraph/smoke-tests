import { execa } from 'execa'

const { SOURCEGRAPH_URL } = process.env

if (!SOURCEGRAPH_URL) {
    throw new Error('SOURCEGRAPH_URL was not set. Please provide a valid URL to run the smoke tests against.')
}

const handler = async () => {
    /**
     * Note: There is no officially supported way to run Jest programmatically.
     * We avoid using the unstable `jest.run()` API.
     * https://github.com/facebook/jest/issues/5048
     */
    const start = async () => {
        await execa('yarn jest', null, {
            cwd: __dirname,
            shell: true,
            stdio: 'inherit',
            env: { SOURCEGRAPH_URL },
        })
    }

    try {
        await start()
    } catch (e) {
        console.error(e)
        process.exit(e?.exitCode || 1)
    }
}
