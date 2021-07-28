## CARTO for developers

Carto 3 Workspace intends to make the development of web-based spatial applications as easy as possible. To achieve this, the *Developers* menu provides a complete set of app development tools that includes APIs, SDKs, development frameworks and database connectors to simplify the analysis of massive spatial datasets and the development of powerful Location Intelligence applications.

The developer toolkit includes industry-leading visualization, mapping and application design components, giving developers unparalleled flexibility to create truly beautiful geospatial user experiences on the web and mobile.

### API Base URL

The API with the base URL is displayed. You can copy and use it by clicking on the icon on the right.

![Developers api base url](/img/cloud-native-workspace/developers/developers_api_base_url.png)

(*EXPLICAR MÁS ESTE APARTADO*)

### Managing built applications

The Carto 3 Workspace includes options for managing your built applications. From the *Account Settings* menu, you can built, edit or delete applications.

#### Creating applications

You can create new applications by using the tools and libraries provided by Carto 3. First time you built an application, you will see the following page:

![Developers create new application](/img/cloud-native-workspace/developers/developers_creating_application.png)

For builting a new application, click on *Create new* button. Then you will see the new application setup options. You can create a new application with basic information, or a new application that includes advanced settings.

##### Builting applications with basic information

Enter the basic information:

- Name
- Description (Optional)
- App URL
- Thumbnail URL (Optional)
- Click *Save*

![Developers application type](/img/cloud-native-workspace/developers/developers_basic_information.png)

##### Creating application with advanced settings

Enter the advanced information:

- Application type

![Developers application type](/img/cloud-native-workspace/developers/developers_application_type.png)

You can access the drop-down menu for selecting your application type by clicking the arrow in the right corner. There are 3 options available: Single Page Application, Machine to Machine and Regular Web Application

![Developers application type](/img/cloud-native-workspace/developers/developers_drop_down.png)

- Token Endpoint Authentication Method

![Developers token endpoint](/img/cloud-native-workspace/developers/developers_token_endpoint.png)

*Expand more info* button: defines the requested authentication method for the token endpoint. Possible values are 'None' (public application without a client secret), 'Post' (application uses HTTP POST parameters) or 'Basic' (application uses HTTP Basic). This option is only available for 'Machine to Machine' and 'Regular Web Application'.

You can access the drop-down menu for selecting your token endpoint authentication method by clicking the arrow in the right corner:

![Developers token endpoint dropdown](/img/cloud-native-workspace/developers/developers_token_endpoint_dropdown.png)

- Application Login URL

*Expand more info* button: in some scenarios, CARTO will need to redirect to your application’s login page. This URI needs to point to a route in your application that should redirect to your tenant’s /authorize endpoint. Learn more.

![Developers application type](/img/cloud-native-workspace/developers/developers_application_login_url.png)

- Allowed Callback URLS (Optional)

*Expand more info* button: after the user authenticates we will only call back to any of these URLs. You can specify multiple valid URLs by comma-separating them (typically to handle different environments like QA or testing). Make sure to specify the protocol (https://) otherwise the callback may fail in some cases. With the exception of custom URI schemes for native clients, all callbacks should use protocol https://. You can use Organization URL parameters in these URLs.

![Developers application type](/img/cloud-native-workspace/developers/developers_allowed_callback_urls.png)

- Allowed Logout URLS (Optional)

*Expand more info* button: a set of URLs that are valid to redirect to after logout from CARTO. After a user logs out from CARTO you can redirect them with the returnTo query parameter. The URL that you use in returnTo must be listed here. You can specify multiple valid URLs by comma-separating them. You can use the star symbol as a wildcard for subdomains (*.google.com). Query strings and hash information are not taken into account when validating these URLs. Read more about this at https://auth0.com/docs/logout.

![Developers application type](/img/cloud-native-workspace/developers/developers_allowed_logout_urls(optional).png)

- Allowed Web Origins (Optional): 

*Expand more info* button: comma-separated list of allowed origins for use with Cross-Origin Authentication, Device Flow, and web message response mode, in the form of <scheme> “://“ <host> [ “:” <port>], such as https://login.mydomain.com or http://localhost:3000. You can use wildcards at the subdomain level (e.g.: https://*.contoso-com). Query strings and hash information are not taken into account when validating these URLs.

![Developers application type](/img/cloud-native-workspace/developers/developers_allowed_web_origins(optional).png)

- Allowed Origins (CORS) (Optional): 

*Expand more info* button: allowed Origins are URLs that will be allowed to make requests from JavaScript to Auth0 API (typically used with CORS). By default, all your callback URLs will be allowed. This field allows you to enter other origins if you need to. You can specify multiple valid URLs by comma-separating the or one by line, and also use wildcards at the subdomain level (e.g.: https://*contoso.com). Query strings and hash information are not taken into account when validating these URLs. You can use Organization URL placeholders in these URLs.

![Developers application type](/img/cloud-native-workspace/developers/developers_allowed_origins_cors(optional).png)

Click *Save* for saving your changes. 

#### Editing applications

In the *Built applications* section of the Workspace, you will see the list of your current built applications:

![Developers list applications](/img/cloud-native-workspace/developers/developers_list_applications.png)

You can access the quick actions menu for managing your built applications by clicking on the three point icon in the top right corner. There are 2 options available: Edit and Delete. You can also copy the application ID by hovering your mouse over and clicking on it.

![Developers application actions](/img/cloud-native-workspace/developers/developers_built_applications_actions.png)

If you click the *Edit* quick action, you will be redirected to a dialog for editing application parameters. This dialog contains the same form that you filled out when creating the application, showing the current values.

![Developers edit application](/img/cloud-native-workspace/developers/developers_editing_applications.png)

After editing the built application parameters, click the *Save changes* button. A popup will appear informing you that the app has been successfully created. Otherwise, click *Cancel* if you don’t want the changes to be applied.

(IMAGEN) 

#### Deleting applications

In the *Built applications* section of the Workspace, you will see the list of your current built applications:

![Developers list applications](/img/cloud-native-workspace/developers/developers_list_applications.png)

You can access the quick actions menu for managing your built applications by clicking on the three point icon in the top right corner. There are 2 options available: Edit and Delete.

![Developers application actions](/img/cloud-native-workspace/developers/developers_built_applications_actions.png)

If you click the *Delete* quick action, a dialog will appear so you can confirm that you want to delete the selected applicationn. Click the *Yes, delete* button to confirm the changes or click *Cancel* if you don't want the changes to be applied.

![Developers delete application](/img/cloud-native-workspace/developers/developers_deleting_applications.png)

#### Copying URL

In the *Built applications* section of the Workspace, you will see the list of your current built applications:

![Developers list applications](/img/cloud-native-workspace/developers/developers_list_applications.png)

You can access the quick actions menu for managing your built applications by clicking on the three point icon in the top right corner. There are 2 options available: Edit and Delete.

![Developers application actions](/img/cloud-native-workspace/developers/developers_built_applications_actions.png)

If you hover your mouse over the id, a popup 'Copy ID' will appear, and you can copy the id by clicking on it. Once you have copied the id, a different popup will appear indicating that the url has been copied. (rehacer...)

![Developers copy url](/img/cloud-native-workspace/developers/developers_copying_url.png)

### Guide

You can start creating applications from scratch by using our documentation. By clicking on this banner, you will be redirected to <a href="https://docs.carto.com/react/guides/getting-started//" target="_blank">CARTO for React documentation</a> to learn how to create a new application from scratch.

![Developers guide](/img/cloud-native-workspace/developers/developers_guide.png)

### Featured documentation

In this section, you have quick access to different developer toolkit to get started with the build of the most innovative spatial analytics apps.

![Developers featured documentation](/img/cloud-native-workspace/developers/developers_featured_documentation.png)

You can click on *View all* button to have access to all <a href="https://docs.carto.com/" target="_blank">CARTO documentation</a>. In this link, you will find all the resources you need to get the most out of your developments.

