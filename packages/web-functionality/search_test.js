const assert = require("assert");
Feature("search");
const baseURL = process.env.SG_URL;

Before(({ I }) => {
  I.amOnPage(baseURL);
  I.see("Search your code and 2M+ open source repositories");
});

Scenario("basic search", async ({ I }) => {
  I.fillField("textarea", "test");
  I.click('//button[@data-search-button="true"]');
  I.wait(2);
  I.see("Save search");
  const searchResults = await I.grabTextFrom(
    '//small[@data-testid="streaming-progress-count"]'
  );
  console.log(searchResults);
  assert.equal(searchResults.substring(0, 4), "500+");
});

Scenario("code monitors", async ({ I }) => {
  I.click("Monitoring");
  I.see("Sign up to create a code monitor");
});

Scenario("batch changes", async ({ I }) => {
  I.click("Batch Changes");
  I.seeInCurrentUrl("/batch-changes");
  I.see(
    "Run custom code over hundreds of repositories and manage the resulting changesets."
  );
});

Scenario("extensions", async ({ I }) => {
  I.click("Extensions");
  I.seeInCurrentUrl("/extensions");
  I.see("Create extension");
});
