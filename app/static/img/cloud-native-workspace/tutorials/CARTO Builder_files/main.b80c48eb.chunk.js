(this["webpackJsonpworkspace-www"]=this["webpackJsonpworkspace-www"]||[]).push([[11],{40:function(t,e,a){"use strict";a.r(e);var r=a(1),o=a.n(r),n=a(4);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c=a(9),i=function(){var t=Object(n.a)(o.a.mark((function _callee(){return o.a.wrap((function _callee$(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(c.b)();case 2:return t.next=4,Promise.all([a.e(13),a.e(16)]).then(a.bind(null,2603));case 4:case"end":return t.stop()}}),_callee)})));return function boostrapApp(){return t.apply(this,arguments)}}();i(),function unregister(){"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}()},9:function(t,e,a){"use strict";a.d(e,"b",(function(){return loadConfig}));var r=a(1),o=a.n(r),n=a(4),c=a(12),i=a.n(c),s={domain:"",audience:"",clientId:"",accountsApiUrl:"",workspaceApiUrl:"",apiBaseUrl:"",accountsUrl:"",publicUrl:"",publicCatalogUrl:"",mapsApiUrl:"",mapsPublicUrl:"",hubspotId:"",hubspotLimitFormId:"",hubspotSubscriptionFormId:"",doCatalogApiUrl:"",googleMapsApiKey:"",allScopes:"read:current_user update:current_user read:connections write:connections read:maps write:maps read:account admin:account",importApiUrl:"",importDataset:"",bigqueryOAuthEnabled:!1,enableFeaturedApplications:!1};function loadConfig(){return _loadConfig.apply(this,arguments)}function _loadConfig(){return(_loadConfig=Object(n.a)(o.a.mark((function _callee(){var t,e,a,r,n;return o.a.wrap((function _callee$(o){for(;;)switch(o.prev=o.next){case 0:return t=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_WORKSPACE_API_URL:"https://workspace-gcp-.app.carto.com",REACT_APP_BASE_PATH:"",REACT_APP_HUBSPOT_REQUEST_SUBSCRIPTION_FORM_ID:"49d53632-80f9-4720-b4be-bf623a527af4",REACT_APP_CLIENT_ID:"jCWnHK6E2K2aOy9jLy3O7ZMphqGO9BPL",REACT_APP_HUBSPOT_LIMIT_FORM_ID:"cd9486fa-5766-4bac-81b9-d8c6cd029b3b",REACT_APP_AUTH0_DOMAIN:"auth.carto.com",REACT_APP_IMPORT_DATASET:"carto_dw.carto-dw-{account-id}.shared",REACT_APP_API_BASE_URL:"https://gcp-.api.carto.com",REACT_APP_GOOGLE_MAPS_API_KEY:"",REACT_APP_BIGQUERY_OAUTH:"true",REACT_APP_HUBSPOT_ID:"474999",REACT_APP_ACCOUNTS_URL:"https://app.carto.com",REACT_APP_PUBLIC_MAP_URL:"https://gcp-.api.carto.com/v3/maps/public",REACT_APP_ACCOUNTS_API_URL:"https://accounts.app.carto.com"}).REACT_APP_CONFIG_URL||"/config.yaml",o.next=3,fetchConfigYaml(t);case 3:e=o.sent,a=e.auth0,r=e.apis,n=e.hubspot,s.domain=a.domain,s.audience=a.audience,s.clientId=a.clientId,s.apiBaseUrl=r.baseUrl,s.accountsApiUrl=r.accountsUrl,s.workspaceApiUrl=r.workspaceUrl,s.mapsApiUrl="".concat(r.baseUrl,"/v3/maps"),s.doCatalogApiUrl=r.doUrl,s.importApiUrl="".concat(r.importUrl||r.baseUrl,"/v3/imports"),s.importDataset=e.importDataset,s.hubspotId=n.id,s.hubspotLimitFormId=n.limitFormId,s.hubspotSubscriptionFormId=n.requestSubscriptionFormId,s.accountsUrl=e.accountsUrl,s.mapsPublicUrl=e.publicMapUrl,s.googleMapsApiKey=e.googleMapsApiKey,s.publicCatalogUrl=e.publicCatalogUrl,s.bigqueryOAuthEnabled=e.bigqueryOAuthEnabled,s.enableFeaturedApplications=e.enableFeaturedApplications;case 24:case"end":return o.stop()}}),_callee)})))).apply(this,arguments)}function fetchConfigYaml(t){return _fetchConfigYaml.apply(this,arguments)}function _fetchConfigYaml(){return(_fetchConfigYaml=Object(n.a)(o.a.mark((function _callee2(t){var e,a,r,n,c;return o.a.wrap((function _callee2$(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,fetch(t);case 3:if((a=o.sent).ok){o.next=6;break}throw new Error("File status code ".concat(a.status,"."));case 6:return o.next=8,a.text();case 8:if(e=o.sent){o.next=11;break}throw new Error("Empty config file detected.");case 11:o.next=17;break;case 13:throw o.prev=13,o.t0=o.catch(0),r=o.t0 instanceof Error?o.t0.message:"",new Error("Cannot download file ".concat(t,". ").concat(r));case 17:o.prev=17,n=i.a.load(e),o.next=25;break;case 21:throw o.prev=21,o.t1=o.catch(17),c=o.t1 instanceof Error?o.t1.message:"",new Error("Error parsing config file. ".concat(c));case 25:return o.abrupt("return",n);case 26:case"end":return o.stop()}}),_callee2,null,[[0,13],[17,21]])})))).apply(this,arguments)}e.a=s}},[[40,12,20]]]);
//# sourceMappingURL=main.b80c48eb.chunk.js.map