## Smoke tests: Web functionality

These smoke tests run some basic checks against a deployed Sourcegraph instance.

### How to run

`SOURCEGRAPH_URL="https://sourcegraph.com" npx @sourcegraph/web-smoke-tests@latest start`

### Environment reference

| Variable                 |                                               Meaning                                                |
| ------------------------ | :--------------------------------------------------------------------------------------------------: |
| `SOURCEGRAPH_URL`        |                        The URL of the deployed instance to run checks against                        |
| `JEST_JUNIT_OUTPUT_NAME` |      The name of a generated JUnit report summary for failure analysis. Default is "junit.xml".      |
| `JEST_JUNIT_OUTPUT_DIR`  | The directory in which the generated JUnit report should be stored. Default is the current directory |

## Releases

Releases are done automatically in CI when commits are merged into master by analyzing [Conventional Commit Messages](https://conventionalcommits.org/).
After running `yarn`, commit messages will be linted automatically when committing though a git hook.
The git hook can be circumvented for fixup commits with [git's `fixup!` autosquash feature](https://fle.github.io/git-tip-keep-your-branch-clean-with-fixup-and-autosquash.html), or by passing `--no-verify` to `git commit`.
You may have to rebase a branch before merging to ensure it has a proper commit history, or squash merge with a manually edited commit message that conforms to the convention.
