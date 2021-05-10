## Operations

### Stopping CARTO services

Stopping

Warning about `docker-compose down -v`


### Upgrading

Upgrading the installation requires a new installer package provided by the CARTO team. Follow these steps to have your instance updated




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

### Installing and configuring SSL certificates

### Configuring a new domain 

