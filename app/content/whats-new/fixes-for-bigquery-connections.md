---
title: "Improvements for Google BigQuery connections: re-connect and billing project"
type: whats-new
date: "2022-12-05"
quarter: Q4 2022
components:
  - workspace
tags:
  - improvement
---

We've improved some scenarios for users who created a [Google BigQuery connection](carto-user-manual/connections/creating-a-connection/#connection-to-bigquery): 

- Now CARTO should behave smoothly when your credentials _(Service Account or OAuth)_ have access to **more than 2000 projects**. You should be able to select any of them as your billing project, and the Data Explorer will also let you explore all of them in a quick search.

- Now it's possible to **repair Google OAuth connections**. Before, if you connected using "Sign in with Google" (often referred as OAuth), this connection could break after this authorization is revoked. This could happen automatically after changing your password, for example. Using the new re-connect flow will authorize CARTO again in the same connection, so all your maps will continue working as usual.