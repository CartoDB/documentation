## Operations

### Installing a new license

```bash
source .env && docker run --rm \
    --name install-license \
    --network "${COMPOSE_PROJECT_NAME}_default" \
    -v "$(pwd)/license/${CARTO_CLOUD}.lic:/root/.carto/carto.lic" \
    gcr.io/cartodb-onprem-artifacts/cartoctl:latest \
    license install
```