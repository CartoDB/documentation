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

### Credentials file

You can also use a file with M2M credentials to automatically login into your CARTO account. This option is recommended only in the case of automating ETL processes. This authentication option is available for CARTO users with a specific tier of our Enterprise plans (i.e. starting from the Enterprise L plan and above).

```python
from carto_auth import CartoAuth
carto_auth = CartoAuth.from_file("./carto-credentials.json")
```

The carto_auth object will be used to obtain the CartoLayer credentials.


### Example

```python
#load packages and import functions
!pip install carto-auth
from carto_auth import CartoAuth

#authenticate to CARTO from a Python notebook:
carto_auth = CartoAuth.from_oauth()

#get access token:
access_token = carto_auth.get_access_token()
```

If you have Carto DW, we have a specific extension of the carto-auth package to use the Python client for this data warehouse connection . In this case, you can authenticate to CARTO following the commands detailed as follows:

```python
#load packages and import functions
!pip install carto-auth[carto-dw]
from carto_auth import CartoAuth

#authenticate yourself in Carto from python:
carto_auth = CartoAuth.from_oauth()

#get access token (for developers):
access_token = carto_auth.get_access_token()
```