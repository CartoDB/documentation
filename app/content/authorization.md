---
title: Authorization
description: "Understand how to authorize access to CARTO resources"
type: single-page

menu:
  - title: "Authorization"
---

## Overview

Every call to CARTO's APIs must be authorized, the only exception to that rule being some API calls that retrieve public user data. Once an API call has proven to be legitimate, by confirming the API key is valid, it still needs to be authorized to actually perform the requested operations on the selected resources.

**Tip:** The Authorization system works in a uniform way for any library, API, service, or tool of the CARTO platform in any of its versions.

### API keys

API keys are long strings of randomly generated characters. They are attached to API requests that require authorization, like most of the requests accepted by CARTO's APIs.

API keys can be managed from your user profile in CARTO or from the [Auth API](https://carto.com/developers/auth-api/). A variety of API keys can be created, each of them defining a different set of permissions around APIs and resources. You can see below an example of a real API key as it is displayed in a CARTO account.

![Example of a regular API key](/img/authorization/capture-auth-apikey-fundamentals.png)

There is also a master API key that governs API key management and provides unrestricted access to all the APIs and resources. Below you have an example of a master API key.

![Example of a master API key](/img/authorization/capture-auth-apikey-master-fundamentals.png)

API keys are sensitive. Please make sure you always transmit API keys over encrypted channels and never expose them to a different audience than the one they were designed for. Depending on the type of access grant an API key is authorized for, misuse can be dangerous and result in unauthorized access, modification, or deletion of data by a malicious user.

**Warning:** In particular, your master API key should be kept as secure and safe as possible. Do not use it unless absolutely necessary, and _never_ in a client-side (JavaScript) context.

### Managing your API keys

If you are already a CARTO user, you can manage your API keys through the user interface after [logging in to your CARTO account](https://carto.com/login). If you are not, you can either [sign up for a free account](https://carto.com/signup/) or [contact our sales team](https://carto.com/contact/) to get full access to our development platform.

API keys are managed from your user profile.

![How to get your API keys dashboard](/img/authorization/api-keys.png)

This is an example of how the authorization dashboard looks like in Builder.

![Example of the authorization dashboard](/img/authorization/capture-dashboard-auth-fundamentals.png)

Creating a new API key is straightforward. Each API key has a name and defines permissions on a set of datasets for a given API.

![How to create a new API key](/img/authorization/capture-auth-new-apikey-fundamentals.png)

It is also possible to manage your API keys directly using the [Auth API](https://carto.com/developers/auth-api/) itself. You can read about the [basics](https://carto.com/developers/auth-api/guides/) of the Auth API, or browse the [Auth API Reference](https://carto.com/developers/auth-api/reference/) in order to know its endpoints.

**Warning:** Once an API key is generated, the set of permissions it defines cannot be changed.

### Authentication

API endpoints include the name of the user account where the resource to be accessed lives. API endpoints are similar to

```python
https://{user_name}.carto.com/api/...
```
or
```python
https://{organization_name}.carto.com/user/{user_name}/api/...
```

So API keys refer to the CARTO account that holds the resource to be used. API keys will not identify or authenticate the user who is actually requesting access to the resource.

Currently, end user authentication and authorization needs to be performed outside CARTO, typically from the backend of the end user application. That backend will then communicate with CARTO using the appropriate API key or keys.

### OAuth apps

CARTO allows you to register external applications on your CARTO account, no matter if you have an individual or organizational plan.

The users of your application will be able to authenticate against their CARTO accounts by using the [OAuth 2.0 protocol](https://oauth.net/2). You will not need to develop a custom authentication/authorization system unless you want to have more advanced features in your flow such as roles.

You will be able to ask for specific permissions to access your users data such as:
- Basic information (name, email)
- Datasets
- CRUD operations to tables

Below you will find information about how to create an application and allow your users to sign up and use it.

#### Application management

If you are already a CARTO user, you can manage your OAuth apps through the user interface after [logging in to your CARTO account](https://carto.com/login). If you are not, you can either [sign up for a free account](https://carto.com/signup/) or [contact our sales team](https://carto.com/contact/) to get full access to our development platform.

OAuth apps are managed from developer settings, under your profile settings, as well as your API Keys and Mobile apps.

![OAuth apps tab in Developer settings](/img/authorization/developer-settings.png)

##### Create an app

You can create a new OAuth app by clicking on the `NEW OAUTH APP` button. You will have to provide a name, website URL and at least one callback URL. Optionally, you can also add a description and a logo, which will be shown to your users when requesting access.

After that, you will see the client ID and client secret of your application, required for the authorization flow.

![App creation form](/img/authorization/create-app.png)

##### Edit an app

By clicking on the `EDIT` button from any of the listed apps, you will be able to edit the information provided at creation.

Also, you could check the client ID and client secret of the application, required to request authorization and token. The client ID is not editable, but you can reset your client secret, which will inmediately revoke the access for all the related api keys, and generate a new one.

![App edition](/img/authorization/edit-app.png)

##### Remove an app

At the bottom of the edition view, there is a button to `Delete my app`. This operation cannot be undone and will revoke the access from all the users, showing them a notification on their CARTO accounts. The datasets created by the app will not be deleted.

##### Manage connected apps

You can manage apps you have granted permission at any time from the `Connected apps` section in your profile settings.

![Connected apps](/img/authorization/connected-apps.png)

It will show a list, including name, description and icon, and access the website of each one by clicking on the name.

Also, you will be able to revoke the access of any of them to your account by clicking on the `Revoke access` button. That way, the existing API keys will stop working inmediately, but the datasets created by the app will remain on your account.

#### OAuth flow

##### 1. Redirect your users to the OAuth Flow

Redirect your users to this URL:

```txt
https://carto.com/oauth2/authorize?client_id=...
```

Here's the list of parameters that you should / can provide to that GET endpoint:

| Parameter       | Required | Description                                                                                                                                                                 |
|-----------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `client_id`     | Yes      | The unique ID of the application.                                                                                                                                           |
| `response_type` | Yes      | Must be (see [section 2](#2-retrieve-the-api-key)): <br>- `code` for the standard authorization code grant type (2.1) <br>- `token` for the OAuth 2.0 implicit flow (2.2). |
| `state`         | Yes      | A string of your choice that will be returned to your app by the authentication server, so that you can ensure the response belongs to your request.                        |
| `redirect_uri`  | No       | The URL where users will be redirected to after they have authorised the app. If not present, the first `redirect_uri` from the OAuth application will be used.             |
| `scope`         | No       | Space-separated list of requested permissions (see next section).                                                                                                           |

If all required parameters are correct, users will see something like this:

![Example of a permission request](/img/authorization/oauth-request.png)

In case there is an error, the authentication server will redirect the browser back to the provided redirect URL with additional parameters in the query string. There will always be an `error` parameter, and the redirect may also include `error_description` and `error_uri` (more info [here](https://www.oauth.com/oauth2-servers/server-side-apps/possible-errors/)).

**Scopes**

The scope parameter will allow developers to specify what permissions will users have to give to the application.

| Scope                                                                                                       | Description                                                                                                                                    |
|-------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| (default)                                                                                                   | Without requesting any scope, you have access to `/api/v4/me` in order to retrieve the username, organization name and URLs for APIs endpoint. |
| `offline`                                                                                                   | Be able to use CARTO APIs without the user present, i.e: generate a refresh token (see [section 4](#4-refresh-the-token)).                    |
| `dataservices:geocoding`<br>`dataservices:isolines`<br>`dataservices:routing`<br>`dataservices:observatory` | Access to the named data service via SQL API.                                                                                                  |
| `datasets:r:table_name`<br>`datasets:rw:schema.table`                                                       | Access (read or read+write) to a dataset or view. Specify the schema for datasets shared by other users within the organization.               |
| `schemas:c`                                                                                                 | Allows to create tables (views, sequences, etc.) on the user’s schema.                                                                         |
| `datasets:metadata`                                                                                         | Allows to read metadata (like name or privacy) from user tables, views and materialized views on the user’s schema.                            |


##### 2. Retrieve the API key

There are two different flows to get the API key (depending on the `response_type` from the previous request):
- [Authorization Code Grant](https://oauth.net/2/grant-types/authorization-code/): used by confidential and public clients to exchange an authorization code for an access token.
- [Implicit Grant](https://oauth.net/2/grant-types/implicit/): a simplified flow that can be used by public clients, where the access token is returned immediately without an extra authorization code exchange step.

**2.1 Authorization Code Grant**

After users login and authorise an app, CARTO redirects them to the URI specified in the `redirect_uri` param, attaching a code that can be used to get a temporary API Key for that user. For example:
```
https://example.com/callback?code=fd17b6af-fde8-401e-9891-a6d430f9e456
```

Together with the `client_id` and `client_secret`, the given code can be used to retrieve the API key for the authenticated user. This code expires after 60 seconds.

App must submit a POST request to the following URL:

```txt
https://carto.com/oauth2/token
```

The following is the list of parameters that must be included (all of them are required):

| Parameter       | Description                                                                                                                                          |
|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `code`          | The code generated by the OAuth server. It expires after 60 seconds.                                                                                         |
| `client_id`     | The unique ID of the application.                                                                                                                    |
| `client_secret` | The secret key of the application.                                                                                                                   |
| `state`         | A string of your choice that will be returned to your app by the authentication server, so that you can ensure the response belongs to your request. |
| `grant_type`    | Must be `authorization_code`.                                                                                                                        |

Here’s an example using curl:

```javascript
curl -d "code=VY_Qlm4Rd3WunvHZ&state=foo&client_id=3wmcayz5Dgmy&grant_type=authorization_code&client_secret=GM7IwH-srhPvM3KtUv9eztMo" -X POST https://carto.com/oauth2/token
```

The response should look like:

```json
{
  "access_token": "GkWAiR5UpKTUUj6m_1D1eQ",
  "token_type": "bearer",
  "user_info_url": "https://something/api/v4/me"
}
```

**2.2 Implicit Grant**

If you are developing a single-page application (SPA), you can use this grant type so that your app can get an access token directly, without having to make the `client_secret` public. Instead of receiving a code that should then be exchanged for an access token, the browser will be redirected to the specified `redirect_uri`, and include the access_token in the URL:

```txt
https://example.com/callback#access_token=Lhpe_LBm7GsEuDqnRNdMEw&token_type=Bearer&expires_in=3599.926442147
```

In order to renew the token, a SPA has to go through the OAuth flow again. Redirecting the user to the flow can be disrupting for a SPA since it can lose context when redirecting back. There are two basic strategies to do this:

*A) Use state parameter or local storage*

You can put any state information in the `state` parameter so you keep the context when you get back to the application. Remember to always include some random token in the state for security. You can also use any normal technique (like putting the state in local storage).

*B) Reauthenticate silently*

There is a way to re-authenticate without redirecting the user. The trick is to use an invisible iframe in order to redirect the browser to the OAuth flow. In order to better support this, CARTO supports the `prompt=none`. With this parameter, the application will get an error in case the user is not logged in or authorized, so you can handle the error and redirect the user to the flow with a redirection (so the user can interact with the consent screen). The flow would be like:

1. Create an invisible iframe with a location like: `https://carto.com/oauth2/authorize?client_id=...?response_code=token&prompt=none`.
2. Poll the location of the iframe after a while (`iframe.contentWindow.location`). If you get a browser error it’s because the iframe URL is not under your domain (i.e: CARTO has not yet redirected back).
3. Once you can read the iframe URL, parse it. It can either include the new token or an error. In the first case, you can start using it. In the second, you should redirect the user to the full OAuth flow (without the prompt parameter).


##### 3. Use the given API Key to communicate with CARTO

Your app should be able to use the provided API Key to communicate with CARTO’s APIs :)

To do it, you just have to include an `api_key` parameter to the available endpoints. For example:

```txt
 {BASE_URL}/api/v4/me?api_key=bdda6efbfd71ae4f619018efb8883a85cdbe30fe
```

The access token will be valid during 60 minutes. After that, you will have to resfresh it or request a new one.

***Tip:*** The response from the token endpoint includes the full URL for the `me` endpoint, so you do not have to hard-code the URLs.


##### 4. Refresh the token

Specifying the `offline` scope will return a `refresh_token` that can be used to request a new `access_token`. Here is a sample response when using the Code Authorization Grant type with the `offline` scope:

```json
{
  "access_token": "EcUa5bebggy2QZzjf1j_yA",
  "token_type": "bearer",
  "expires_in": 3599.933042715,
  "user_info_url": "http://carto.com/api/v4/me",
  "refresh_token": "886k3JZOcZENljK6fGeJ"
}
```

Notice that the response now includes a `refresh_token` that can be used to request another (just one) token:

```txt
curl -d "refresh_token=886k3JZOcZENljK6fGeJ&client_id=3wmcayz5Dgmy&grant_type=refresh_token&client_secret=GM7IwH-srhPvM3KtUv9eztMo" -X POST http://carto.com/oauth2/token
```
{{% bannerNote type="warning" title="warning"%}}
The Implicit Grant doesn’t support the offline scope, hence refresh tokens are also unsupported. Redirect your users to the authorization flow again to get a new access token in this case.
{{%/ bannerNote %}}
