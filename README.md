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

## References

-   https://github.com/Ubeswap/ubeswap-interface/blob/main/src/pages/Pool/index.tsx
-   https://dacade.org/communities/celo/courses/celo-201/learning-modules/c7fd1557-091c-4662-a9fa-61f617f9d92a
-   https://github.com/dacadeorg/celo-react-boilerplate/blob/master/src/hooks/useBalance.js
