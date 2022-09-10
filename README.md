## Using Monorepo

To install setup repo, from root run:

`yarn install`

The included workspaces include:

-   onchain - This is where we'll have our contracts
-   backend - Server
-   frontend - web app

To run a command in a workspace, you can do:
`yarn <workspace name> <command>`
For example:
`yarn frontend add -D some-dependency-to-add` or `yarn frontend dev`
