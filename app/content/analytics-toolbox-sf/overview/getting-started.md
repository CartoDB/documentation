## Getting started

The CARTO Spatial Extension for Snowflake is composed of a set of user-defined functions and procedures organized in a set of modules based on the functionality they offer. There are two types of modules: _core_ modules, which are [open source](https://github.com/CartoDB/carto-spatial-extension) and _advanced_. Both types of modules are currently freely available while the Spatial Extension is in Beta, but the _advanced_ ones will only be available for CARTO customers when the product becomes generally available.

<div style="text-align:center" >
<img src="/img/sf-spatial-extension/sf-se-modules-diagram.png" alt="CARTO Spatial Extension for Snowflake modules" style="width:75%">
</div>

Visit the [SQL Reference](../../sql-reference/) to see the full list of available modules and functions. Check out the [Examples section](../../examples/) to find sample code that solves real-world spatial problems.

Keep reading to learn how to access CARTO's Spatial Extension via Snowflake's Data Marketplace.

{{% bannerNote title="STAY IN THE LOOP" type="tip" %}}
Join our [Google Group](https://groups.google.com/a/cartodb.com/g/snowflake-spatial-extension) to stay informed of any new feature launches and relevant changes to the Spatial Extension. Start a conversation with us in our [Discord channel](https://discord.gg/4U5XVrGyqW).
{{%/ bannerNote %}}


### Accessing the Spatial Extension

You can get access to the Spatial Extension for Snowflake through the [Snowflake's Data Marketplace](https://www.snowflake.com/datasets/carto-spatial-extension/). If you are unsure of how to access the Data Marketplace, you can find detailed instructions in [this article](https://docs.snowflake.com/en/user-guide/data-marketplace-intro.html#how-do-i-access-the-snowflake-data-marketplace-to-browse-listings) of Snowflake's documentation center.

Once in the Data Marketplace, search for _carto spatial extension_ to find the listing:

![Spatial Extension for Snowflake listing](/img/sf-spatial-extension/sf-datamarketplace-step1.png)

Once you are in the details page of the listing, you may find you can _GET_ the Spatial Extension directly, or _REQUEST_ it, depending on whether or not it has been already deployed in your region.


#### Requesting access

1. Click on the REQUEST button on the top right corner of the Data Marketplace listing. 

![Spatial Extension for Snowflake request](/img/sf-spatial-extension/sf-datamarketplace-step2-request.png)

2. Fill in and send the request form.

![Spatial Extension for Snowflake request form](/img/sf-spatial-extension/sf-datamarketplace-step2-request.png)

Once your request has been fulfilled by CARTO, you can get access to the Spatial Extension following the steps in the [following section](#getting-access). You can always keep track of the status of your request in _My Requests_.

![Snowflake Data Marketplace My Requests](/img/sf-spatial-extension/sf-datamarketplace-myrequests.png)


#### Getting access

1. Click on the GET DATA button on the top right corner of the Data Marketplace listing.

![Spatial Extension for Snowflake get data](/img/sf-spatial-extension/sf-datamarketplace-step2-get.png)

2. Rename the database to `SFCARTO`, choose all the roles to which you wish to give access to this database, accept the Terms of Use and finally click on "Create Database".

![Spatial Extension for Snowflake get data form](/img/sf-spatial-extension/sf-datamarketplace-step3-get.png)

By cicking on "View Database" you will be redirected to the database you just created, where you will be able to browse all the modules (schemas) and functions and procedures available within the Spatial Extension. 

![Spatial Extension for Snowflake get data form](/img/sf-spatial-extension/sf-datamarketplace-step5-get.png)
