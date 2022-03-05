# smoke-tests [DRAFT]

A proposal for basic smoke tests, which could be plugged in [Cloud deploy pipeline](https://buildkite.com/sourcegraph/deploy-sourcegraph-cloud) to ensure basic happy paths are working (or used on schedule).

[CodeceptJS](https://codecept.io/) with [Puppeteer helper](https://codecept.io/helpers/Puppeteer/) was used, just b/c it is quite easy to replace helper to support more browsers at any point.
