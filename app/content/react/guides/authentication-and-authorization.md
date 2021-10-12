## Authentication and Authorization

This guide shows how you can create private and public applications. We can classify the applications in two:

- Private applications. Requires a login against the CARTO platform.

- Public applications. The user does not need to log into the application. Access to data is provided through a token.
  

### Public applications

To create a public application, you need to create a token with access to all of the datasets required by the application and introduce the token in the application config (`src/store/initialStateSlice.js`).

{{% bannerNote title="note" %}}
Because of security reasons the SQL cannot be modified by the user in a private application
{{%/ bannerNote %}}

With the following changes we're going to make the private application public.

1. Create a token. There are two different ways for creating a token: 
   
   - You can create a map in Builder with the data sources you want to use in your application and then you make it public by clicking the "Share" button. You can then select the "Developers" tab and copy the map token.
  
   ![map-token](/img/react/map-token.png 'Map Token')

   - You can make a request to the `Create Token` endpoint from the [CARTO 3 API](https://api-docs.carto.com)

2. Add the token to the config and remove oauth section. 

The file `src/store/initialStateSlice.js` will look like this:

```javascript
import { VOYAGER } from '@carto/react-basemaps';
import { API_VERSIONS } from '@deck.gl/carto';

export const initialState = {
  viewState: {
    latitude: 31.802892,
    longitude: -103.007813,
    zoom: 2,
    pitch: 0,
    bearing: 0,
    dragRotate: false,
  },
  basemap: VOYAGER,
  credentials: {
    apiVersion: API_VERSIONS.V3,
    apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
    accessToken: 'TYPE HERE THE TOKEN'
  },
  googleApiKey: '', // only required when using a Google Basemap,
  // oauth: 
};

```


### Private applications

If you are building a private application, you need to create an Application and get a `Client ID`:

1. Go to the Developers section in the Workspace

2. Create a new APP with the URL `https://127.0.0.1:3000`

3. Copy the `Client ID` and introduce it at `src/store/initialStateSlice.js`.

Then, you need to edit the `src/store/initialStateSlice.js` file and modify the clientId property in the `oauth` object with the one from the application just created. 

When you have everything configured, the first screen for your application will be the following:

![oauth-login](/img/react/oauth-login.png 'OAuth Login')

When your users click on the `Login with CARTO` button, the authentication protocol will start and your users to login and to allow access to the application. When the protocol finishes, a new access token with the required scopes will be sent. This access token will be used to access the data sources in the application, unless specific credentials are provided.

### CARTO 2 platform

If you are using the CARTO 2 platform, the process is slightly different.

If you want to create a public application, you can make the datasets public in the CARTO 2 Dashboard and then you can use the `default_public` API key when providing the credentials for accessing the dataset.

If you need to create a private application, you have two options:

- Generate an API key with access (read) to the datasets. 

- Use OAuth for authentication.

#### Using API keys

This is the traditional (legacy) way of working with private applications in the CARTO 2 platform. You need to generate an API key in the CARTO 2 Dashboard with access (read/select) to your datasets. After you have generated the API key, you introduce this API key in the initial state slice.

If you are using API keys, you need to implement your own authentication mechanism if you want to restrict access. Anyone can read your API key from the JavaScript source and you are potentially exposing more information than you want to.

#### Using OAuth

CARTO 2 supports [OAuth](https://en.wikipedia.org/wiki/OAuth) to communicate with CARTO 2 REST APIs. OAuth is the preferred method to manage credentials, so we recommend you use this protocol for implementing **authentication & authorization** in your applications.

OAuth `scopes` are used to specify what permissions will users have to give to the application. For example, `datasets:r:table_name` will grant `read` access to the table `table_name`.

The workflow is:

1. You login with the desired scopes.

2. You get an API_KEY (token) to call CARTO APIs but restricted to the requested scopes.

The first step you need to perform is to go to your CARTO 2 Dashboard and create a new OAuth app as described in the [documentation](/authorization/#oauth-apps), in order to get the clientID for your application.

Then, you need to edit the `src/store/initialStateSlice.js` file and modify the clientId property in the `oauthInitialState` object. You can also modify the `scopes` property to specify what permissions you want to give the application.

If you want to force authentication in your application, so no unauthenticated users can access, you need to set the `forceOAuthLogin` property to `true` in the initialState object within the `src/store/appSlice.js` file. When you activate this flag, the first screen for your application will be the following:

![oauth-login](/img/react/oauth-login.png 'OAuth Login')

{{% bannerNote title="note" %}}
If your dataset is private and you want other users in your organization to be able to access it, you need to share it with them using the [`Share with colleagues`](https://carto.com/help/your-account/users/#sharing-private-maps-and-datasets-within-your-organization) option in the dashboard.
{{%/ bannerNote %}}

When your users click on the `Login with CARTO` button, the OAuth protocol flow will start and your users will be asked to allow access to their CARTO account.

If you just want to restrict access to some application features, you can use the [`OAuthLogin`](../../library-reference/oauth#oauthlogin) component. This will display a popup with the implicit OAuth flow.

Once the OAuth flow has been completed and the user has given consent to your application to access their CARTO account, you can obtain user credentials like this:

```javascript
import { selectOAuthCredentials } from '@carto/react-redux';
const credentials = useSelector(selectOAuthCredentials);
```

This credentials object can be used, for instance, when using a data source from a view:

```javascript
import aSource from 'data/sources/aSource';

dispatch(
  addSource({ ...aSource, credentials })
);
```

You can also use these credentials to call directly to our APIs from your models. You have an example of this in the [IsochroneModel](https://github.com/CartoDB/carto-react-template/blob/master/template-sample-app/template/src/data/models/isochroneModel.js) provided with the sample app template.

The credentials object contains the username and the API key, so you can use them to call any of the CARTO REST APIs endpoints.
