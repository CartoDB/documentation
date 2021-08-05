## Authentication and Authorization

This guide shows how you can control access to the datasets in your application.

We can classify the datasets in two sets:

- Public datasets. The user does not need to log into the application to access these datasets. Access is provided through a public token.
  
- Private datasets. These datasets require the user to log into the application using her CARTO credentials in the OAuth protocol flow, and also require access to the connection in the CARTO 3 Workspace.

### Public applications

To create a public application where all the datasets are public, you first need to create a public token with access to those datasets. In order to create the public token, you need to make a POST request to the tokens API specifying the connection name in the CARTO 3 workspace and the exact data sources you are going to access in your application (if you are going to use a SQL query, you need to specify the SQL query).

By default, the CARTO 3 skeleton template is configured to use OAuth. If you want to make a public application where all the datasets are public, you need to edit the `src/store/initialStateSlice.js` file and remove the `oauth` object. 

Then you need to add the public access token just created in the `accessToken` property in the `credentials` object. If you add a new dataset, you need to update your token with a new grant.

### Private applications

If you are building a private application, you need to start by creating a connection in the CARTO 3 workspace to your cloud data warehouse / database. Then you need to create an application in the `Developers` section. For development purposes, you can set the URL to `127.0.0.1:3000`. When the application is created, the clientID OAuth property will be displayed in the `Application ID` column within the `Built applications` table.

Then, you need to edit the `src/store/initialStateSlice.js` file and modify the clientId property in the `oauth` object with the one from the application just created. You can also modify the `scopes` property to specify what permissions you want to request to the user.

When you have everything configured, the first screen for your application will be the following:

![oauth-login](/img/react/oauth-login.png 'OAuth Login')

When your users click on the `Login with CARTO` button, the OAuth protocol flow will start and your users will be asked to allow access to the application. When the protocol finishes, a new access token with the required scopes will be sent. This access token will be used to access the data sources in the application, unless specific credentials are provided.

### CARTO 2 platform

If you are using the CARTO 2 platform, the process is slightly different.

If you want to work with public datasets, you can make the datasets public in the CARTO 2 Dashboard and then you can use the `default_public` API key when providing the credentials for accessing the dataset.

If you need to manage private datasets, you have two options:

- Generate an API key with access (read) to those datasets. 

- Use OAuth for authentication.

#### Using API keys

This is the traditional (legacy) way of working with private datasets in the CARTO 2 platform. You need to generate an API key in the CARTO 2 Dashboard with access (read/select) to your datasets. After you have generated the API key, you introduce this API in the initial state slice as explained in the [Getting Started](../getting-started#connecting-your-carto-account) guide.

If you are using API keys, you need to implement your own authentication mechanism if you want to restrict access. Anyone can read your API key from the JavaScript source and you are potentially exposing more information than you want to.

#### Using OAuth

CARTO 2 supports [OAuth](https://en.wikipedia.org/wiki/OAuth) to communicate with our [APIs](https://carto.com/developers/). OAuth is the preferred way to manage credentials, so we recommend you use this protocol for implementing **authentication & authorization** in your applications.

OAuth `scopes` are used to specify what permissions will users have to give to the application. For example, `datasets:r:table_name` will grant `read` access to the table `table_name`.

The workflow is:

1. You login with the desired scopes.

2. You get an API_KEY (token) to call CARTO APIs but restricted to the requested scopes.

The first thing you need to do is go to your CARTO 2 Dashboard and create a new OAuth app as described in the [documentation](/authorization/#oauth-apps), in order to get the clientID for your application.

Then, you need to edit the `src/store/initialStateSlice.js` file and modify the clientId property in the `oauthInitialState` object. You can also modify the `scopes` property to specify what permissions you want to give the application.

If you want to force authentication in your application so no unauthenticated users can access, you need to set the `forceOAuthLogin` property to `true` in the initialState object within the `src/store/appSlice.js` file. When you activate this flag, the first screen for your application will be the following:

![oauth-login](/img/react/oauth-login.png 'OAuth Login')

{{% bannerNote title="note" %}}
If your dataset is private and you want other users in your organization to be able to access it, you need to share it with them using the [`Share with colleagues`](https://carto.com/help/your-account/users/#sharing-private-maps-and-datasets-within-your-organization) option in the dashboard.
{{%/ bannerNote %}}

When your users click on the `Login with CARTO` button, the OAuth protocol flow will start and your users will be asked to allow access to their CARTO account.

If you just want to restrict access to some application features, you can use the [`OAuthLogin`](../../library-reference/oauth#oauthlogin) component. This will display a popup with the implicit OAuth flow.

Once the OAuth flow has been completed and the user has given consent to your application to access their CARTO account, you can get the user credentials like this:

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
