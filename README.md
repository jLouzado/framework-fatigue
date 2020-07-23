# Typescript-Monorepo Boilerplate

Template for typescript-based mono-repos

## Monorepo

- Monorepos powered by [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)

```
$ yarn
$ yarn test
```

The first package package is setup with the following:

## Testing

- jest
- chai

## Linting

- prettier
- tslint
  - I like the options quite strict but please customize to your comfort
- spellcheck

## CI

- ci via Github Actions

## Setup

- Just make a new repo with this as a template
- rename the packages, (and the name in package.json) and you're good to go

## Automation Wishlist

- pre-commit hooks
- graphql
- publish package with [xyz](https://github.com/davidchambers/xyz)
- assert aspects of architecture with: [dependency-cruiser](https://www.npmjs.com/package/dependency-cruiser)
- remove the `quiet` of eslint once I figure out how to filter out files in eslintignore so it [doesn't cry](https://stackoverflow.com/a/59549917/3121906)
