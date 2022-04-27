## Overview

The CARTO platform can be installed on-premises. Our installer for custom deployments is based on Docker, and all services are containerized. 

A custom installation of CARTO consist on the following components, running on the same host: 

* Nginx as a reverse proxy and web server
* Varnish as a cache layer
* CARTO SQL API
* CARTO Maps API
* Builder back-end stack and front-end application
* PostgreSQL for application's metadata and user's data database

All these components are included in the installer with the necessary configuration and required extensions and customizations. They are all managed by the `docker-compose.yml` file, and configuration is handled with a single, global configuration file.

## Requirements

CARTO can run on any Linux system with [Docker](https://docs.docker.com/engine/) and [Docker Compose](https://docs.docker.com/compose/).

In terms of hardware requirements, we don't have fixed requirements, as CARTO is a versatile platform that can support a range of different use cases. However, here are some high-level requirements that will work well for most cases: 
* 8 CPU cores
* 8 GB RAM
* SSD persistent storage (with a minimum of 20GB for the installation)

{{% bannerNote title="note"%}}
As a rule of thumb, a CARTO installation will need around twice the storage quota for your organization. This is due to the creation of geometry columns, indexes and other database elements that take up space but don't count against your storage quota.
{{%/ bannerNote %}}

Please [check with our team](mailto:support@carto.com) what's the recommended size for your use case, we'll be happy to help dimensioning your deployment.

### Outbound connectivity

The CARTO on-premises installer will need to connect to the internet to receive licensing and provisioning details from our Central metadata database. 

For this, we use Google's [Cloud Pub/Sub](https://cloud.google.com/pubsub/docs/reference/rest) service. The connection is stablished securely using exclusive credentials (a GCP service account key) per customer, shipped with the installer package. Please make sure that your server has outbound connectivity with `https://pubsub.googleapis.com` for the installation.

Having outbound connectivity after the installation is not required, but it's recommended for sending telemetry information about the usage of the platform, syncing licensing details and getting help from our Support team more easily. 

Other features, such as Street Level Geocoding, Isochrones or Route generation also require connectivity with an external service. [Reach out to our team](mailto:support@carto.com) to get more information about this.
