# CARTO Documentation

URL: https://docs.carto.com

This repo is created to host CARTO's products documentation. It has the objective to unite both the Dev center and the Help center into one unique and homogeneus place for all our products.

## How to run

We have created a docker-compose to make it simpler to run. In the terminal, just go to the documentation folder and run the following command

```
docker-compose up server
```

This will start the server locally and you can see the page in http://localhost:1313/

You can also build the page and generate the static files running

```
docker-compose up build
```

## How to fetch

Some projects have external files to be included in the documentation. Those files, generally the reference files, live in the main source code repository.

To checkout the latest changes run:

```
./scripts/checkout.sh
```

To update the reference files run:

```
./scripts/update.sh
```

## How to deploy

### Staging / Preview

To deploy into a preview channel you just need to create a Pull Request. Once the Github Action finishes, it will add a comment with the result and the preview url (the url will be valid for 7 days). Each new commit into the PR, will regenerate the staging page.

> :warning: If you need to access any link in the doc, you need to add your preview URL in the [preview file](.github/workflows/preview.yml#L23) and commit this change.

:point_right: e.g. `run: hugo --baseURL 'https://cartodb-fb-documentation--pr459-testing-preview-m5jwtz81.web.app/'`

### Production

Once you're happy with the result, simply merge your branch into master and it will do the deploy to production automatically

> :warning: Remember to revert the commit if you have added your preview URL in the [preview file](.github/workflows/preview.yml#L23) before merging.

:point_right: `run: hugo --baseURL .`


## How to create new documentation

The process for creating new documentation is documented in [this document](ADDING-DOCUMENTATION.md)

## Extra information

This is hosted in firebase, under the project named `cartodb-fb-documentation`
