---
aliases:
    - /carto-python/authentication-methods/
---

## Authentication methods


The **carto-auth** library provides two types of authentication methods with your CARTO account: using the OAuth protocol or using a credentials file including the necessary authentication tokens corresponding to your CARTO account.

We recommend using the OAuth authentication method for your everyday analysis, data exploration and data science workflows. The authentication via M2M tokens is recommended only in the case of building automated ETL processes.


### Authentication with OAuth

Use the same authentication as to login to your CARTO account but from a Jupyter notebook (in local or remote) or from a Python script using the CartoAuth class. This option is available for any CARTO user.

```python
from carto_auth import CartoAuth
carto_auth = CartoAuth.from_oauth()
```

"CartoAuth. from_oauth()" call will open a tab in your browser (or give you a link to access a URL) to login to your CARTO account.

![png](/img/carto-python/login.png)

After that, it shows you a page that notify that you already have the access (in case of local python environment) or it provides you an Access code to copy and paste in your notebook to authenticate with CARTO (e.g. in case of online notebooks tools like Google Collab or Databricks).

![png](/img/carto-python/copy_clipboard.png)

You can find more technical information about this method and the supported parameters in the [reference section](https://docs.carto.com/carto-python/reference/#cartoauthfrom_oauth).


### Credentials M2M

You can also use a file with M2M credentials to automatically login to your CARTO account. This option is recommended only in the case of automating ETL processes. This authentication option is available for CARTO users with a specific tier of our Enterprise plans (i.e. starting from the Enterprise L plan and above).

```python
from carto_auth import CartoAuth
carto_auth = CartoAuth.from_m2m("./carto-credentials.json")
```

You can find more technical information about this method and the supported parameters in the [reference section](https://docs.carto.com/carto-python/reference/#cartoauthfrom_m2m).

</br>

**CARTO credentials file**

To generate CARTO Auth tokens in carto-auth you need to create a carto_credentials.json file with the following content:
```python
{
    "api_base_url": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "client_id": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "client_secret": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

To obtain the file’s content, go to the Developers section in the CARTO Workspace. You can find more information [here](https://docs.carto.com/carto-user-manual/developers/carto-for-developers/#carto-for-developers).

</br>

**API Base URL**

The API Base URL will be different depending on the region where your account is located.

</br>

**Built applications**

Create a new “Machine to Machine” application to generate the Client ID and Client Secret following these steps:
1) Click on “+ Create new”.
/ Fill in the name and description. The URL is irrelevant in this case, so feel free to use something like https://example.domain.com.
2) Open the “Advanced Settings” menu.
3) In “Application Type” select “Machine to Machine”.
4) Click “Save” and check that your application is listed.

From the list, copy the new Client ID and Client Secret and add them into your credentials file.


### Example

```python
# load packages and import functions
!pip install carto-auth
from carto_auth import CartoAuth

# authenticate to CARTO from a Python notebook
carto_auth = CartoAuth.from_oauth()

# get access token
access_token = carto_auth.get_access_token()
```

In case you want to use the CARTO Data Warehouse connection of your account, we have a specific extension of the carto-auth package to use the Python client for this data warehouse connection. In this case, you can authenticate to CARTO following the commands detailed as follows:

```python
# load packages and import functions
!pip install carto-auth[carto-dw]
from carto_auth import CartoAuth

# authenticate yourself in Carto from python
carto_auth = CartoAuth.from_oauth()

# get carto dw client
carto_dw_client = carto_auth.get_carto_dw_client()
```
