---
aliases:
    - /carto-python/installation/
---

## Installation
 

Both CARTO’s Python packages, pydeck-carto and carto-auth are available for installation from pip and conda. It is recommended to always use a [virtual environment](https://docs.python.org/3/library/venv.html#creating-virtual-environments) to prevent collisions with other libraries installed on the system. 

Pydeck-carto is a wrapper of [pydeck](https://deckgl.readthedocs.io/en/latest/#) to use the [CartoLayer](https://deck.gl/docs/api-reference/carto/carto-layer) to visualize data from one of your active data warehouse connections setup on the CARTO platform. Therefore, pydeck is a requirement that it will also have to be installed and it will be installed automatically as a dependency when installing pydeck-carto. 

The [carto-auth](https://github.com/cartodb/carto-auth) package provides two types of authentication methods with your CARTO account. Pydeck-carto installs the carto-auth package automatically, but you can also install it independently of pydeck-carto, in case you are not interested in creating visualizations.

### Via pip

In order to install the packages via pip, you can follow the next Python code:

```python
#install both packages
pip install pydeck-carto
```
```python
#install only carto-auth
pip install carto-auth
```

### Via conda

To install the packages via conda, you can follow the next Python code:

```python
#install both packages
conda install -c conda-forge pydeck-carto
```
```python
#install only carto-auth
conda install -c conda-forge carto-auth
```

### Using pydeck-carto on a Jupyter notebook

In order to use our pydeck-carto package in a Jupyter notebook (or Jupyter lab), it requires that the pydeck package is also properly enabled.

Please follow the latest instructions to enable pydeck for Jupyter [here](https://pydeck.gl/installation.html#enabling-pydeck-for-jupyter)

```python
jupyter nbextension install --sys-prefix --symlink --overwrite --py pydeck
jupyter nbextension enable --sys-prefix --py pydeck
```

To enable pydeck for JupyterLab (on Mac/Unix-like systems):

```python
jupyter labextension install @jupyter-widgets/jupyterlab-manager
DECKGL_SEMVER=`python -c "import pydeck; print(pydeck.frontend_semver.DECKGL_SEMVER)"`
jupyter labextension install @deck.gl/jupyter-widget@$DECKGL_SEMVER
```