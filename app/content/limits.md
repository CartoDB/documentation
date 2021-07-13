---
title: Limits
description: "Understand API limits"

menu:
  - title: "Limits"
---

## Overview

Developers interact with CARTO platform through our APIs. Either directly or via any of our libraries and SDKs, APIs give access to data, maps and everything that is required to build geospatial applications with CARTO. Therefore, APIs play a fundamental role in our platform.

We encourage developers to follow the documented best practices for each API when they use them. However, our APIs provide such degrees of flexibility that we cannot enforce correct use of our APIs at every moment. Therefore, in order to guarantee the performance of those APIs for every user of the CARTO platform and prevent abuse, we have set up some general limitations and restrictions on how they work.

**Tip:** While these limitations where designed to protect our cloud infrastructure, on-premises users can also benefit from them, preventing their users to abuse or misuse their own infrastructure.

### Timeouts

Our APIs work following a request <-> response model. Whenever you send a request to any of our APIs, you can expect the CARTO platform to deliver back a response. Typically, requests are sent whenever you want something to be done (e.g., update a database or run a data analysis) or if you want some information to be retrieved (e.g., a map tile or the data to populate a web widget). In general, you would expect CARTO to wait until the action is performed or the information is retrieved to send back the response, confirming the action was performed alright or delivering the information that was requested.

While CARTO is busy getting that action done or retrieving that information, part of our infrastructure is devoted to that process and is therefore unavailable for any other user. Typically this is not a problem, as most requests get serviced quickly enough. However, certain requests can take a long time to process, either by design (e.g., updating a huge table) or by mistake. To prevent this long-running queries from effectively blocking the usage of our platform resources, CARTO will discard requests that cannot be fulfilled in less than a certain amount of time.

**Tip:** The obvious question is "what if I really need long-running queries?". CARTO provides asyncronous APIs for that.

Timeout limits are applied on a per-user basis or, more accurately described, per user access. Every request has a statement timeout. When the time it is taking to process a certain request reaches that value, the request is aborted and the API returns an HTTP `429 Too Many Requests` error.

**Tip:** Many times, long queries can be optimized to run in a shorter time. One simple way to achieve this is making sure you always have indexes on columns you are going to use for filtering, sorting, joining, or the like.

You can know current timeout limits by looking into the [timeout limits chart of SQL API](https://carto.com/developers/sql-api/support/timeout-limiting/) and [Maps API](https://carto.com/developers/maps-api/support/timeout-limiting/). 

### Rate limits

Timeouts work on individual requests, preventing each of them from blocking the access to platform resources for too long. Rate limits complement them by ensuring the platform is not flooded with so many requests it does not have the time and resources to service them all.

Of course, there is nothing we can do to prevent people from actually sending as many requests to our platform as they want, but requests over a user's rate limit will be acknowledged with an error so that the sender understands they need to lower the rate at which requests are sent before they are serviced again.

Resources accessed by caches do not count against the limits. That is, any request that is handled by any cache layer is out of limits. You can always know which resources are served through cache looking at the `X-Cache` HTTP Header.

Rate limit is on a per-user basis (or more accurately described, per user access) and by endpoint. For example, suppose you have 2 different apps (with 2 different maps) and both call to the same endpoint that allows 100 requests per second. Both apps/maps "share" 100 requests per second regardless the map calling to this endpoint.

#### How rate limiting works

We are using the [generic cell rate algorithm](https://en.wikipedia.org/wiki/Generic_cell_rate_algorithm), a [leaky bucket](https://en.wikipedia.org/wiki/Leaky_bucket) algorithm type.

The main keys to keep in mind about this algorithm and our implementation are:

* We allow a request every a certain time period. _If an endpoint has a limit of 5 requests per second, you will have a request available every 200ms and when you spend all the available requests, you will need to wait 200ms to have another available request, instead of 1 second._
* Most of the endpoints are limited per second. _If an endpoint has a limit of 5 requests per second, after a second without requests, you will have at least 5 available requests._
* Most of the endpoints allow an initial burst equal to the number of requests per second. _If an endpoint has a limit of 5 requests per second, initially you will have 5 available requests._

#### HTTP headers and response codes

When an application exceeds the rate limit for a given API endpoint, the API will return an HTTP `429 Too Many Requests` error.

Use the HTTP headers in order to understand where the application is at for a given rate limit, on the method that was just utilized. Note that the HTTP headers are contextual. That is, they indicate the rate limit for the user context. If you have multiple apps (maps) accessing to their resources with the same user, HTTP headers are related to that user.

* **Carto-Rate-Limit-Limit**: total allowed requests
* **Carto-Rate-Limit-Remaining**: remaining requests
* **Retry-After**: seconds until next available request (returns `-1` if the current request is allowed)
* **Carto-Rate-Limit-Reset**: seconds until the limit will reset to its maximum capacity

**Tip:** If you receive a rate limit error, you must wait for the number of seconds indicated by the `Retry-After` HTTP header (normally 1 second) before retrying.

You can know current rate limits by looking into the [rate limits chart of SQL API](https://carto.com/developers/sql-api/support/rate-limiting/) and [Maps API](https://carto.com/developers/maps-api/support/rate-limiting/). 

### Quota limits

There are also limitations on how much data you can store at CARTO, for every user account and organization. There are also quotas on how you access certain services, such as geocoding, routing or our Data Observatory.

### Enforcement

Some of the limits are always in place and will trigger a reaction, e.g. cancelling a request, if and when you go over them. Other limits are monitored more loosely and will only trigger a reaction if constant abuse is detected, but not necessarily if a one-off violation happens.

### Perception of limits

Limits are in place for every CARTO user. However, the actual threshold values for those limits vary for every type of user. As you would expect, free users get lower thresholds than personal users, and personal users get lower thresholds than enterprise users.

On-Premises administrators are in control of how these limits are set up, so that they can fine tune their values to their specific needs.
