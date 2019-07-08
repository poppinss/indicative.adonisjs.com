<div align="center">
  <img src="https://res.cloudinary.com/adonisjs/image/upload/q_100/v1562577951/Group_2_2x_ohgvej.png" width="600px">
</div>

# Indicative Website

This repo holds the source code for [indicative.adonisjs.com](https://indicative.adonisjs.com). The frontend is written in [nuxtjs](https://nuxtjs.org/) and docs are compiled using [dimer-cli](https://github.com/dimerapp/cli)

## Project structure

```sh
.
├── components
├── css
├── docs
│   └── guides
├── extensions
│   └── casts.js
├── indicative-rules
├── js
├── pages
├── plugins
├── store
├── dimer.json
├── nuxt.config.js
└── router.js
```

- The `components` directory contains all the vue components.
- The `css` folder has certain global css files.
- The `docs/guides` has the documentation. Feel free to send PR's for same.
- The `extensions` contains `dimer-cli` extensions.
- The `indicative-rules` directory is a submodule to pull auto-generated rules documentation from `indicative-rules` repository.
- The `dimer.json` has config file for Dimer.
- Everything else follows standard Nuxtjs folder structure.

## Working locally

> In case of changes to the rules documentation. You must go to [indicative-rules](https://github.com/poppinss/indicative-rules) repository and update the docblock inside code. The markdown files are auto generated and must not be touched.

1. Fork and clone the project Github.
2. Create a new branch for your work.
3. Run `npm install` in the project root.
4. Run `npm run dev` to start the development server.
