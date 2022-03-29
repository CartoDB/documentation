## Managing your subscriptions

Through the section *My Subscriptions* within the *Data* panel of your user dashboard you can check all relevant details to manage and access the different Data Observatory datasets you subscribed to. From this central page you can check the status of each subscription (e.g. requested, active, expired, etc.), access each dataset's metadata, and start working with the dataset you are subscribed to.

![Your Data Observatory subscriptions](/img/data-observatory/carto2/do-your-subscriptions.png)

For those datasets supported by Builder, users can use this interface to directly access the data or create a new map through the dashboard options *View dataset* and *Create map*, respectively.

{{% bannerNote type="tip" title="tip" %}}
Not all datasets are available for use within CARTO Builder due to size and format reasons. In those cases, we recommend that users access those datasets through [CARTOframes](https://www.carto.com/developers/cartoframes) and applying a query in order to reduce their coverage and/or scope (i.e. by filtering an area by a bounding box, selecting specific columns or filter by column values), and then loading the resulting geo-dataframe as a table in their CARTO account. To do that, please check our [CARTOframes Data Access](https://carto.com/developers/cartoframes/guides/Data-Observatory/#data-access) guide.
{{%/ bannerNote %}}

If you are a Python user you can download a pre-built Python notebook illustrating how to access and explore the data with CARTOframes by clicking on *Explore with CARTOframes*. 

![Access Data Observatory dataset from a Python notebook](/img/data-observatory/carto2/do-python-example.png)

Or you can simply retrieve the ID needed to [access the dataset](https://carto.com/developers/cartoframes/guides/Data-Observatory/#data-access) from your own notebook using CARTOframes.

![Access Data Observatory dataset with CARTOframes](/img/data-observatory/carto2/do-slug-id-cartoframes.png)

{{% bannerNote type="note" title="note" %}}
Additionally, CARTOframes offers Data Enrichment methods for augmenting both point-based and polygon-based data with variables from datasets licensed via the Data Observatory. The results of the enrichment process can then be uploaded back into a user’s CARTO account as a table if users want to work with that enriched data in Builder. Learn more in the [Data Enrichment guide](https://carto.com/developers/cartoframes/guides/Data-Observatory/#data-enrichment).
{{%/ bannerNote %}}

### Unsubscribing

You can unsubscribe from a public dataset by accessing its detail page and clicking on the *Unsubscribe* button and confirming your decision. Premium data subscriptions expire as per the terms defined in the acquired premium license.

![Unsubscribe from a Data Observatory dataset](/img/data-observatory/carto2/do-dataset-unsubscribe.png)

![Confirm unsubscription from a Data Observatory dataset](/img/data-observatory/carto2/do-dataset-unsubscribe-confirm.png)


