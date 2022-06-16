## Deployment options

[What are the different deployment options for the CARTO platform?](#what-are-the-different-deployment-options-for-the-CARTO-platform)

[Where can I find information about the requirements for deploying CARTO as Self-hosted?](#where-can-i-find-information-about-the-requirements-for-deploying-CARTO-as-self-hosted)

[How are updates and product releases managed in a Self-hosted deployment?](#how-are-updates-and-product-releases-managed-in-a-self-hosted-deployment)

---
<!-- Using level 5 headers to avoid the title being listed in the tree -->

##### What are the different deployment options for the CARTO platform?
There are two different deployment options for the CARTO platform: 
* **Cloud**: A fully managed deployment that CARTO hosts on our own cloud. When you use CARTO in our cloud, we manage configuration, updates, and versioning. This option is available in different regions that you can select when [creating your organization](https://docs.carto.com/carto-user-manual/overview/getting-started/#create-a-new-organization).
* **Self-hosted**: With this option, you host your own CARTO tenant. That means it can be deployed in your virtual private cloud (VPC) or behind your virtual private network (VPN). 

##### Where can I find information about the requirements for deploying CARTO as Self-hosted?
Find links to the documentation and technical requirements [here](https://docs.carto.com/deployment-options/self-hosted/installation/)

##### How are updates and product releases managed in a Self-Hosted deployment? 
While in CARTO Cloud updates and product releases are continously added to the platform, if you're self-hosting your own CARTO tenant, it will need to be updated periodically to enjoy the latest version of the platform. 

The CARTO team publishes versioned releases on the public Self-hosted repositories that can be used to upgrade your deployment. Find the latest releases for [Docker](https://github.com/CartoDB/carto-selfhosted/releases/latest) and [Kubernetes](https://github.com/CartoDB/carto-selfhosted-helm/releases/latest)

