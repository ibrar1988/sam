// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  envName: 'qa',
  siteUrlPrefix: 'http://localhost/',
  //'http://172.16.10.27:8080/myklovr-webapi/rest/'
  // apiUrlPrefix: 'http://172.16.10.27:8080/myklovr-webapi/rest/',
  apiUrlPrefix: 'http://api.myklovr.com/myklovr-webapi/rest/',
  //apiUrlPrefix: 'http://35.192.34.244:8080/myklovr-webapi/rest/',
  stripeKey: 'pk_test_QLDCasFeDuGFstb7FJD0XjRt',
  annual_code: 'myklovr_annual_premium',
  montly_code: 'myklovr_monthly_premium',
  appInsights: {
    instrumentationKey: '1bd35471-2877-4ea5-8016-fa339f87ba72'
  }
};
