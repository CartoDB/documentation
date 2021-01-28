# How to add documentation

## Adding single page documentation

This methods adds a single page for the documentation. It will be for example as the /get-started page. This kind of pages are supposed to have only one page, with no extra information on it. The sidebar table of content is generated automatically taking into account the h2, h3 and h4 elements present in the page.

The markdown file (for example, `get-started.md`) has to be placed in the root of the `/app/content/` folder.

Some important setup in the header is required in order to make it work properly:

* `title`: Will indicate the title of the page. It can be seen in the header of the documentation. It will be used as the SEO title as well.
* `description`: It contains the description that appears in the header. It's also used as SEO description
* `tocName`: The title that will apear on top of the Table of Content
* `type`: This should always be `single-page`. It indicates which type it is and, so it knows which template it has to use. In this case, as we always have to indicate `single-page`, it will use the template located in `/app/layouts/single-page/single.html`
* `url`: This parameter is optional and I don't recommend to add it. It will put a custom url to the page. By default, if the file is, for example, `/app/content/name-of-the-file.md`, the generated page will be placed in `https://docs.carto.com/name-of-the-file/index.html`. With this parameter, if you put for example `url: "/test/"`, the generated page will be placed in `https://docs.carto.com/test/index.html`.

## Adding new product documentation

When we want to add a new product to the documentation, the structure will be slightly different to the single page. To start, whenever we want a new product, we should create a new folder with the product name inside the content folder. Let's put for example that we want to create a product page for `CARTOframes`. In this case, we should create a folder called `cartoframes` inside the content structure, giving us as a result `/app/content/cartoframes/`.

Inside the cartoframes's folder, we need to add the first mandatory element. It's `_index.md`. It's used to keep the metadata for the product itself. On it, we can find the following headers:

* `cascade`: This will be the parent of all the variables. It's used to propagate the information to other .md files.
* `title`: The product title. It will be shown as the title in the header of the page.
* `description`: The product description. It will be shown as the description in the header of the page.
* `repoUrl` (optional): It indicates the repository url so it can be linked in the header of the page.
* `icon`: The icon url of the product.
* `changelog` (optional): The changelog url where so it can be linked in the header of the page
* `extra_sections` (optional): An array of extra sections to be shown on the left sidebar. Keep in mind, that the name you put there should correspond, after "slugification", to the file name. So if we put for example "Tiler" as name, there should be in the same folder a file called `tiler.md`. Or if we put the section name "Sample Test" there should be a file called `sample-test.md`
* `guides` (optional): An array of guides. All the guides need to be inside the /guides folder. In here, we should put the name of the guide itself. The file that contain the guides should have the same name as if we convert to slug that guide. So for example, if we add a guide called "Getting started" for cartoframes, we should create a file under /app/content/cartoframes/guides/getting-started.md

Once we have the `_index.md` file properly set up, it's time to create the files. By default, it can accept the files `overview.md`, `reference.md`, and `example.md`. If you wish to add any extra file and that it appears in the sidebar table of contents, you should add it in the `_index.md` file, under the `extra_sections` variable.

For how to set up the guides, refer to the point about the `guides` option in the _index.md

Each of the `.md` files don't have any special configuration. You don't need to overwrite or set up anything as all the configuration should have been done under `_index.md`. Just write the content in markdown format and it will be ready to publish

### Adding versions for one product

This hasn't been done yet and needs to be tested, but the idea under the versioning is very similar to the product pages (this is only theory. Once we implement it we might need to do some changes).

Lets imagine we currently have the version 1.2 of cartoframes and we want to publish the documentation for the version 1.3. This are the steps we will follow:

1. As the current version was 1.2, the 1.2 files are on the root of the cartoframes folder (`/app/content/cartoframes`). We should create a new folder inside with the version name, for example `v1.2`, so it will have a folder `/app/content/cartoframes/v1.2/`,
2. We should copy the files in the root cartoframes folder to the `v1.2` folder. That way we will have the same file structure and configuration under the `v1.2` folder, keeping the files and documentation the way it was.
3. We might need to do some changes in the `v1.2/_index.md` folder to reflect the changes properly. For example, in the link to the Github repository you might want to change to the tag corresponding to that version, or some other small changes. I will also recommend to add a property called `version` to make sure we can show the version in some parts of the template
4. Finally, we can start editing the base files (the ones located directly in `/app/content/cartoframes/`) with the information of the new version.
