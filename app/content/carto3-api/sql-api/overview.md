## Introduction 
CARTO SQL API v3 allows to interact with external data warehouses using an existing connection in your CARTO 3 account. Learn more about connections [here](https://docs.carto.com/carto3-workspace/connections/introduction/)

## Authorization
CARTO SQL API v3 uses an access token as authorization method. Learn more about obtaining and using access tokens in the general [Authorization section](https://docs.carto.com/carto3-api/overview/getting-started/#authorization)

## Endpoints

### `/query`

This endpoint admits `GET` and `POST` requests. In case your query is so long that it exceeds the URL length limit, use `POST` to send the query in the request payload.

* The `GET` requests should include a `?q` parameter with the query that will run in the data warehouse. For example:
  * For BigQuery connections: `?q=SELECT * FROM project_id.dataset.table`
  * For Snowflake, Redshift and PostgreSQL connections: `?q=SELECT * FROM database.schema.table`
* The `POST` requests should be like:
```text
{
    "q": "select * from project_id.dataset.table"
}
```

### `/job`

This endpoint allows to execute long-running queries in your data warehouse, get the job status and cancel a running job.

* A `POST` request with the following content will create a job:
```text
{
    "query": "CALL your_long_running_procedure(...)",
    "metadata": {
        "foo": "bar"
    }
}
```
and will return something like this:
```text
{
  "jobId": "<jobId>",
  “connection”: “bigquery”,
  "user": "userid",
  "query": "CALL your_long_running_procedure(...)",
  "status": "pending",
  "createdAt": "2015-12-15T07:36:25Z",
  "updatedAt": "2015-12-15T07:36:25Z"
}
```

* A `GET` request to `/job/:jobId` will return the status of a specicif running job. For example:
```text
{
  "jobId": "<jobId>",
  “connection”: “bigquery”,
  "user": "cartofante",
  "query": "CALL bqcarto.tiler.CREATE_TILESET(...)",
  “status”: “pending|running|success|failure”
  “error”: {
          “code”: …
          “msg”: “...”
    }
  "createdAt": "2015-12-15T07:36:25Z",
  "updatedAt": "2015-12-15T07:36:25Z"
  “provider”: “<specific information from the data warehouse>”
}

```
* A `DELETE` request to `/job/:jobId` will cancel the execution of a specific running job.

### `/jobs`
A `GET` request to this endpoint returns a list of running jobs in your account.

## API Reference
Find the complete API reference and a Postman collection at [api-docs.carto.com](https://api-docs.carto.com)