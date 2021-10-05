## Getting Started

### Introduction
The CARTO API lets you interact with your data in an external data warehouse using a existing connection in your CARTO organization. Learn more about connections [here](https://docs.carto.com/carto3-workspace/connections/introduction/). 

The CARTO API complete reference is available at [api-docs.carto.com](https://api-docs.carto.com) as a Postman collection that you can explore interactively by clicking on the _Run in Postman_ button.

#### Using the Postman collection

In order to obtain the access token required to run the collection, you need to follow these steps:
- Create a Machine to Machine application in your CARTO 3 account as described above.
- Go to [api-docs.carto.com](https://api-docs.carto.com) and click on _Run in Postman_
- Import the Collection in one of your Postman Workspaces
- Configure your Environment: 
  - Click on Environments
  - Select _Documentation_
  - Set the variables `apiBaseURL`, `clientId`, and `clientSecret` with the values that you will find in the Developers section of your CARTO account.
- You are all set! Select a folder in the collection and run the example requests.

<!-- 

### Authorization
CARTO API uses an access token as authorization method. In order to obtain an access token you need to call the `https://auth.carto.com/oauth/token` endpoint, using the `client_id` and `client_secret` from an application previously created in your account.

There are different types of applications: 

- **Single Page Applications** that can be used to login with CARTO for React, Deck.gl and other libraries and simple web applications.
- **Regular Web application** that can be used with regular web applications.
- **Machine to Machine** that can be used in backend applications or Postman API collections.

#### Creating an application
- Login to your CARTO organization and open the _Developers_ section.
- Click on _+ Create new_
- Fill in the name and description. The URL is not relevant in this example, so feel free to use something like `https://example.domain.com` 
- Open the _Advanced Settings_ menu
- In _Application Type_ select _Machine to Machine_.
- Make sure that _Token Endpoint Authentication Method_ is set to _Post_
- Click _Save_ and check that your application is listed.

After an application is created, you can copy the `Client ID` and `Client Secret` from the list and use them as required in different scenarios. You can configure your "Documentation" environment in Postman with these values to run the full collection using preexisting sample data.

This is an example of how to get an access token with `cURL`:
```bash
curl --request POST \
  --url 'https://auth.carto.com/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=client_credentials' \
  --data 'client_id=xyxhWf4tthisisjustanexampleZxwc4NP9jpTRIch8P' \
  --data 'client_secret=k4s0LOPzlVnehythisisjustanexampleHCc9BtbtdS1Sq7NcRS3AFVD5I3H6s0a0aKz3aZyxK0' \
  --data 'audience=carto-cloud-native-api' 
```

### API Base URL

This collection uses an environmental variable to define the API Base URL. 
Go to the "Documentation" environment configuration and set the `apiBaseURL` variable according with the information that you will find in the Developers section of your CARTO account's Workspace. For example:
`https://gcp-us-east1.api.carto.com`

### Using the Postman collection
The CARTO API complete reference is available at [api-docs.carto.com](https://api-docs.carto.com) as a Postman collection that you can explore interactively by clicking on the _Run in Postman_ button.

In order to obtain the access token required to run the collection, you need to follow these steps:
- Create a Machine to Machine application in your CARTO 3 account as described above.
- Go to [api-docs.carto.com](https://api-docs.carto.com) and click on _Run in Postman_
- Import the Collection in one of your Postman Workspaces
- Configure your Environment: 
  - Click on Environments
  - Select _Documentation_
  - Set the variables `apiBaseURL`, `clientId`, and `clientSecret` with the values that you will find in the Developers section of your CARTO account.
- You are all set! Select a folder in the collection and run the example requests. -->