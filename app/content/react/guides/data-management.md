## Data Management

This guide shows how you can use private datasets in your application.

In some applications you might use some public datasets but most of the applications are going to use private datasets. When working with the CARTO platform, there are two main ways of providing access to private datasets stored in your account:

- Generate an API key with access (read) to those datasets. 

- Use OAuth for authentication.

### Using API keys

This is the traditional (legacy) way of working with private datasets in the CARTO platform. You need to generate an API key in the CARTO dashboard with access (read/select) to your datasets. After you have generated the API key, you introduce this API in the initial state slice as explained in the [Getting Started](../getting-started#connecting-your-carto-account) guide.

If you are using API keys, you need to implement your own authentication mechanism if you want to restrict access. Anyone can read your API key from the JavaScript source and you are potentially exposing more information than you want to.

### Using OAuth

CARTO supports [OAuth](https://en.wikipedia.org/wiki/OAuth) to communicate with our [APIs](https://carto.com/developers/). OAuth is the preferred way to manage credentials, so we recommend you use this protocol for implementing **authentication & authorization** in your applications.

OAuth `scopes` are used to specify what permissions will users have to give to the application. For example, `datasets:r:table_name` will grant `read` access to the table `table_name`.

The workflow is:

1. You login with the desired scopes.

2. You get an API_KEY (token) to call CARTO APIs but restricted to the requested scopes.

The first thing you need to do is go to your CARTO dashboard and create a new OAuth app as described in the [documentation](/authorization/#oauth-apps), in order to get the clientID for your application.

Then, you need to edit the `src/store/initialStateSlice.js` file and modify the clientId property in the `oauthInitialState` object. You can also modify the `scopes` property to specify what permissions you want to give the application.

If you want to force authentication in your application so no unauthenticated users can access, you need to set the `forceOAuthLogin` to `true` in the initialState object within the `src/store/appSlice.js` file. When you activate this flag, the first screen for your application will be the following:

![oauth-login](/img/react/oauth-login.png 'OAuth Login')

When your users click on the `Login with CARTO` button, the OAuth protocol flow will start and your users will be asked to allow access to their CARTO account.

If you just want to restrict access to some application features, you can use the [`OAuthLogin`](../../library-reference/oauth#oauthlogin) component. This will display a popup with the implicit OAuth flow.

Once the OAuth flow has been completed and the user has given consent to your application to access their CARTO account, you can get the user credentials like this:

```javascript
import { selectOAuthCredentials } from '@carto/react/redux';
const credentials = useSelector(selectOAuthCredentials);
```

This credentials can be used, for instance, when adding a new data source:

```javascript
dispatch(
  addSource({
    id: '<your_dataset_id>',
    data: '<your_sql_query>',
    credentials,
  })
);
```

You can also use these credentials to call directly to our APIs from your models. You have an example of this in the [IsochroneModel](https://github.com/CartoDB/carto-react-template/blob/master/template-sample-app/template/src/data/models/isochroneModel.js) provided with the sample app template.

The credentials object contains the username and the API key, so you can use them to call any of the CARTO REST APIs endpoints.
