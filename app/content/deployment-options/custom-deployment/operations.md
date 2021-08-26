## Operations

### Configuring proxy

When the instance is going to be installed behind a proxy it is necessary to:

* Configure the `noProxy` policy for Docker:
	```bash
	# /root/.docker/config.json
	{
		"auths": {},
		"credHelpers":
		{
      			"asia.gcr.io": "gcr",
       			"eu.gcr.io": "gcr",
       			"gcr.io": "gcr",
       			"marketplace.gcr.io": "gcr",
       			"us.gcr.io": "gcr"
		},
		"proxies": {
      			"default":
       			{
       				"httpProxy": "http://192.168.3.4:1234",
       				"httpsProxy": "http://192.168.3.4:1234",
       				"noProxy": "127.0.0.1,localhost,carto.lan"
      			}
		}
	}
	```

* Configure `http-proxy` for Docker:
	```bash
	# /etc/systemd/system/docker.service.d/http-proxy.conf
	[Service]
	Environment="HTTP_PROXY=https://192.168.3.4:1234"
	Environment="HTTPS_PROXY=https://192.168.3.4:1234"
	Environment="NO_PROXY=127.0.0.1,localhost"
	``` 

* Redirect host to the proper domain:
	```bash
	# /etc/hosts
	127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4 carto.lan
	::1         localhost localhost.localdomain localhost6 localhost6.localdomain6 carto.lan
	```

{{% bannerNote title="WARNING"%}}

`http://192.168.3.4:1234` and `carto.lan` should be substituted for the actual **Proxy Address** and **CARTO domain** of each server.
{{%/ bannerNote %}}



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

### Configuring for server resources

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


