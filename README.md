# smoke-tests [DRAFT]
Smoke tests for Sourcegraph - basic functionality


## 1. Install
```
yarn install
```

## 2. Run tests
```
SHOW_BROWSER=true SG_URL=https://sourcegraph.com npx codeceptjs run --steps
```