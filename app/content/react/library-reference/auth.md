## Auth
**npm package: @carto/react-auth**

OAuth functions

### OAuthCallback

React component to attend OAuth callbacks on `/oauthCallback`. Ensure you include that specific route in your application.

- **Example**:

    ```js
    import { OAuthCallback } from '@carto/react-auth';

    // inside the proper routing config...
    const routes = [
        /* ...some other routes and */
        { path: '/oauthCallback', element: <OAuthCallback /> }  
    ];
    ```

### useOAuthLogin ⇒ <code>function</code>

Hook to perform login against CARTO, with OAuth implicit flow and using a popup.

- **Input**:

    | Param                      | Type                              | Description                                |
    | -------------------------- | --------------------------------- | ------------------------------------------ |
    | oauthApp                   | <code>Object</code>               | OAuth parameters                           |
    | oauthApp.clientId          | <code>string</code>               | Application client ID                      |
    | oauthApp.scopes            | <code>Array.&lt;string&gt;</code> | Scopes to request                          |
    | oauthApp.authorizeEndPoint | <code>string</code>               | Authorization endpoint                     |
    | onParamsRefreshed          | <code>function</code>             | Function to call when params are refreshed |

- **Returns**: <code>function</code> - A function to trigger oauth with a popup

- **Example**:

    ```js
    import { useOAuthLogin } from '@carto/react-auth';
    
    const oauthApp = {
        clientId: 'YOUR_OAUTH_CLIENT_ID',
        scopes: ['user:profile'],
        authorizeEndPoint: 'https://carto.com/oauth2/authorize'
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

    Note: Check login components at https://github.com/CartoDB/carto-react-template/ for a full example using this hook, where oauthApp data lives in Redux store.
