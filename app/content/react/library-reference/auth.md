## Auth

{{% tableWrapper %}}
| Package | Version | Downloads |
| ------- | ------- | --------- |
| @carto/react-auth  | <a href="https://npmjs.org/package/@carto/react-auth">  <img src="https://img.shields.io/npm/v/@carto/react-auth.svg?style=flat-square" alt="version" style="margin-bottom: 0px; vertical-align: middle;" /></a> | <a href="https://npmjs.org/package/@carto/react-auth">  <img src="https://img.shields.io/npm/dt/@carto/react-auth.svg?style=flat-square" alt="downloads" style="margin-bottom: 0px; vertical-align: middle;" /></a>
{{%/ tableWrapper %}}

This package contains some OAuth utilities for implementing authentication and authorization against the CARTO 2 platform. If you are building an application with CARTO 3, you should use [Auth0 React SDK](https://auth0.com/docs/quickstart/spa/react) instead of this package.

### Components

#### OAuthCallback

React component to attend OAuth callbacks on `/oauthCallback`. Ensure you include that specific route in your application.

- **Example**:

  ```js
  import { OAuthCallback } from "@carto/react-auth";

  // inside the proper routing config...
  const routes = [
    /* ...some other routes and */
    { path: "/oauthCallback", element: <OAuthCallback /> },
  ];
  ```

### Functions

#### useOAuthLogin

Hook to perform login against CARTO, with OAuth implicit flow and using a popup.

- **Input**:

{{% tableWrapper tab="true" %}}
| Param                      | Type                              | Description                                |
| -------------------------- | --------------------------------- | ------------------------------------------ |
| oauthApp                   | <code>Object</code>               | OAuth parameters                           |
| oauthApp.clientId          | <code>string</code>               | Application client ID                      |
| oauthApp.scopes            | <code>Array.&lt;string&gt;</code> | Scopes to request                          |
| oauthApp.authorizeEndPoint | <code>string</code>               | Authorization endpoint                     |
| onParamsRefreshed          | <code>function</code>             | Function to call when params are refreshed |
{{%/ tableWrapper %}}

- **Returns**: <code>function</code> - A function to trigger oauth with a popup

- **Example**:

  ```js
  import { useOAuthLogin } from "@carto/react-auth";

  const oauthApp = {
    clientId: "YOUR_OAUTH_CLIENT_ID",
    scopes: ["user:profile"],
    authorizeEndPoint: "https://carto.com/oauth2/authorize",
  };

  const onParamsRefreshed = (oauthParams) => {
    if (oauthParams.error) {
      console.error(`OAuth error: ${oauthParams.error}`);
    } else {
      console.log(oauthParams);
    }
  };

  const [handleLogin] = useOAuthLogin(oauthApp, onParamsRefreshed);
  // handleLogin function should be later handled from UI to trigger the flow
  ```

  **Tip:** Check CARTO for React templates for examples using this hook, where oauthApp data is managed within Redux store. For example, this is the [Login page](https://github.com/CartoDB/carto-react-template/blob/master/template-skeleton/template/src/components/views/login/Login.js).
