## Installation

### Requirements

CARTO On-premises can be installed on any Linux SO that supports [Docker](https://docs.docker.com/engine/) and [Docker Compose](https://docs.docker.com/compose/).

Find the official installation guides [here](https://docs.docker.com/engine/install/).

All the images are stored in [Google Container Registry](https://cloud.google.com/container-registry), and the installer package contains all that is needed to pull the images. 

If the `gcloud` CLI tool is already installed, it will be configured with the credentials needed to access the registry; otherwise the installer will automatically install and configure [`docker-credential-gcr`](https://github.com/GoogleCloudPlatform/docker-credential-gcr) for the same task.

### Step by step installation guide

CARTO will provide a single package that contains specific configuration, credentials and license files required to run the installation. Once you have received the package, follow the instructions below to get your CARTO installation up and running.

- Unzip your customer package in the location where you want to store all files and configurations.
- Navigate to your installation folder and run 

	```text
	sh install.sh
	```
The installation script will take care of configuring access credentials, pulling the images, initializing the database and license and everything else that's necessary before spinning up the rest of services.

Once it's finished, there are a couple of things that need to be configured to have CARTO running securely on your own domain.

- add your SSL certificates (certificate and private key in `PEM` format) to the `certs` folder. Use `carto.crt` and `carto.key` names for the files. Alternatively, you can use any other name, but remember to update them afterwards in `.env` file.
- edit `.env` file to setup the domain name where your CARTO instance will be accessible:
    ```text
    CARTO_DOMAIN=carto.yourdomain.com
    ```

  and if needed (depending on the names used in the previous step):

	```text
	CARTO_NGINX_SSL_CERT_PATH=/etc/nginx/ssl/your-cert-name.crt
	CARTO_NGINX_SSL_KEY_PATH=/etc/nginx/ssl/your-key-name.key
	```
- Run the following to spin up all the services
    
    ```text
    docker-compose up -d
    ```
- The first time it runs, it will need to create the user account, validate the credentials with our servers and other operations that might take up to 5-10 minutes. 

{{% bannerNote title="note" %}}
For this communication with our servers we use Google's [Cloud Pub/Sub](https://cloud.google.com/pubsub/docs/reference/rest) service. Please make sure that your server has outbound connectivity with `https://pubsub.googleapis.com`
{{%/ bannerNote %}}

- Optionally, you can check the progress of the provisioning tasks running `docker-compose logs -f builder-subscriber`. 

Once the provisioning has finished, you can open `https://carto.yourdomain.com/login` and use the username and password provided by our team. 

