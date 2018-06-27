// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    https: false,
    fileServerUrl: "http://localhost:44404",
    iotUrl: "https://iot.cellarstone.hub",
    officeApiUrl: "http://localhost:44513",
    workflowUrl: "http://localhost:44405",
    callbackUrl: "http://localhost:44402/callback"
};
