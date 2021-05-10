## Operations

### Stopping CARTO services

Executing this command from the CARTO installer folder would stop all CARTO services while keeping all persisted data:

```bash
docker-compose down
```

{{% bannerNote title="WARNING"%}}

Running `docker-compose down -v` would stop the services and **remove all volumes**. That includes all CARTO databases: configuration, metadata, and most importantly **user's data**. It will also interrupt the connection with our central metadata database permanently. 

Please, don't use the `-v` flag unless you want to completely and permanently remove your CARTO installation.
{{%/ bannerNote %}}


<!-- 
### Upgrading

Upgrading the installation requires a new installer package provided by the CARTO team. Follow these steps to have your instance updated


### Persisting configuration across upgrades

Using `.env.customer` file to persist configuration
-->

### Installing and configuring SSL certificates

In order to use your own SSL certificates in your CARTO installation, follow the steps below: 

* Have your certificate and private key ready in PEM format (plain text).
* Copy them into the `certs` folder within your CARTO intaller. If you use the names `carto.crt` and `carto.key` respectively, you can skip the next step. 
* If you used different names for your certificate and private key files, edit your `.env` file and update the following lines with your actual values. Edit only the file name, not the path.

	```bash
	CARTO_NGINX_SSL_CERT_PATH=/etc/nginx/ssl/your-cert-name.crt
	CARTO_NGINX_SSL_KEY_PATH=/etc/nginx/ssl/your-key-name.key
	```
* Set `CARTO_BUILDER_SSL_REQUIRED=true` in `.env` file.
* Apply changes with `docker-compose up -d --build --force-recreate`.

### Configuring a domain 

CARTO Builder will use this configuration parameter to send API requests to the backend. For this reason, the configuration needs to match the actuall address where you access your CARTO installation. This configuration can be set following the steps below:

* Edit `.env` and find `CARTO_DOMAIN`.
* Set your actual address, including the CARTO subdomain. For example: `carto.your-company.com`.
* Run `docker-compose up -d` to recreate the containers affected by this change.

### Escalation of services

In cases of high concurrency, increasing the server's number of CPUs and/or memory, and raising the number of instances of a specific service can help to improve performance. Follow the next steps for configuring the number of instances for a specific service:

* Edit `.env` and find this block:
	```bash
	CARTO_SQL_API_INSTANCES=1
	CARTO_MAPS_API_INSTANCES=1
	CARTO_UI_BUILDER_INSTANCES=1
	CARTO_CLOUD_API_INSTANCES=1
	```
* Set the number of instances for each service and rebuild the containers with `docker-compose up -d --force-recreate`

{{% bannerNote title="WARNING"%}}
Editing this configuration parameter might cause degraded performance depending on the use-case and the server's specifics. Please [check with our Support team](mailto:enterprise-support@carto.com) before changing this configuration.
{{%/ bannerNote %}}

### Installing a new license

Installing a new license will be necessary after a renewal of the contract, or after a trial period has ended.
Make sure that your new license file (provided by our team) is in `license/acme-onprem.lic` and run:

```bash
source .env && docker run --rm \
    --name install-license \
    --network "${COMPOSE_PROJECT_NAME}_default" \
    -v "$(pwd)/license/${CARTO_CLOUD}.lic:/root/.carto/carto.lic" \
    gcr.io/cartodb-onprem-artifacts/cartoctl:latest \
    license install
```


