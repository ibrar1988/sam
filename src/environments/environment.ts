// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  envName: 'dev',
  // siteUrlPrefix: 'http://35.196.29.117/',
  // apiUrlPrefix: 'http://35.196.227.5:8080/myklovr-webapi/rest/',
  //  siteUrlPrefix: 'http://localhost/',
  // //  apiUrlPrefix: 'http://api.myklovr.com/myklovr-webapi/rest/',
  //  apiUrlPrefix: 'http://192.168.1.72:8080/myklovr-webapi/rest/',
  siteUrlPrefix: 'http://35.230.95.62/',
  apiUrlPrefix: 'http://35.230.66.99/myklovr-webapi/rest/',

  stripeKey: 'pk_test_QLDCasFeDuGFstb7FJD0XjRt',
  annual_code: 'myklovr_annual_premium',
  montly_code: 'myklovr_monthly_premium',
  appInsights: {
    instrumentationKey: '1bd35471-2877-4ea5-8016-fa339f87ba72'
  }
};
