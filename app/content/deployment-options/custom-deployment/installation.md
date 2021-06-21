## Installation

### Pre-requisites

CARTO On-premises can be installed on any Linux SO that supports [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/).

Be careful to run the [Post-installation steps for Linux for Docker](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user).

As an example installation, these are the required steps in Ubuntu:

```bash
sudo apt-get update
sudo apt-get -y install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get -y install docker-ce docker-ce-cli containerd.io
sudo usermod -aG docker $USER
```

Then you will need to Log out and log back, and continue:

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

### Installation of the CARTO package

CARTO will provide a single package that contains specific configuration, credentials and license files required to run the installation. Once you have received the package, follow the instructions below to get your CARTO installation up and running.

- Unzip your customer package in the location where you want to store all files and configurations.
- Navigate to your installation folder and run 

	```bash
	./install.sh
	```
The installation script will take care of configuring access credentials, pulling the images, initializing the database and license and everything else that's necessary before spinning up the rest of services.

Before running the service you are going to need to configure the location of the server.

- edit the `.env` file and modify the line that says `CARTO_DOMAIN` and add for the time being your public IP:

    ```bash
    CARTO_DOMAIN=192.168.1.1
    ```

- Once you have done that you can go ahead and spin the service doing:

    ```bash
    docker-compose up -d
    ```
The first time it runs, it will need to create the user account, validate the credentials with our servers and other operations that might take up to 5-10 minutes. 
Do wait for 5 minutes before going to next step.

{{% bannerNote title="note" %}}
For this communication with our servers we use Google's [Cloud Pub/Sub](https://cloud.google.com/pubsub/docs/reference/rest) service. Please make sure that your server has outbound connectivity with `https://pubsub.googleapis.com`
{{%/ bannerNote %}}

- Finally navigate to your `PUBLIC_IP` like http://192.168.1.1/login . You should be able to login with the credentials we have given you.

- Congratulations, you have CARTO up and running.

### Securing your installation

There are a couple of things that need to be configured to have CARTO running securely on your own domain.

- add your SSL certificates (certificate and private key in `PEM` format) to the `certs` folder. Use `carto.crt` and `carto.key` names for the files. Alternatively, you can use any other name, but remember to update them afterwards in `.env` file.
- edit `.env` file to setup the domain name where your CARTO instance will be accessible:
    ```bash
    CARTO_DOMAIN=carto.yourdomain.com
    ```

  and if needed (depending on the names used in the previous step):

	```bash
	CARTO_NGINX_SSL_CERT_PATH=/etc/nginx/ssl/your-cert-name.crt
	CARTO_NGINX_SSL_KEY_PATH=/etc/nginx/ssl/your-key-name.key
	```
- Run the following to spin up all the services one more time
    
    ```bash
    docker-compose up -d
    ```
