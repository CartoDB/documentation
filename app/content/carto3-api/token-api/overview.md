## Introduction
The CARTO 3 Tokens API allows to create public tokens that grant access to specific tables, tilests and arbitraty queries using a specific connection in your CARTO 3 account. Learn more about connections [here](https://docs.carto.com/carto3-workspace/connections/introduction/).
A public token allows to create map layers and fetch data from tables, tilesets or arbitrary SQL queries in public applications.

## Authorization
CARTO Token API v3 uses an access token as authorization method. Learn more about obtaining and using access tokens in the general [Authorization section](https://docs.carto.com/carto3-api/overview/getting-started/#authorization)

## Endpoints

### `/tokens`

* A `POST` request to `/tokens` will create a new token, defined by the following content in the request payload:
```text
{
    "grants": [
        {
            "connection_name": "bigquery_connection",
            "source": "project_id.dataset.table"
        }
    ],
    "referers": []
}
```
  * `connection_name`: the connection name that will be used to access the data using this token.
  * `source`: the fully qualified name of the table or tileset; or a specific SQL query that will be authorized.
  * `referers`: an array of strings containing the referers authorized to send requests using this token.
* A `PATCH` request to `/tokens/:token` will update a specific existing token. It expects a payload similar to the above.
* A `DELETE` request to `/tokens/:token` will delete an existing token.
* A `GET` request to `/tokens` will return a list of existing tokens in your account.