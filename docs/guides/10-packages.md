---
permalink: packages
category: API
---

# packages

Indicative is a combination of several packages listed below. When using Indicative directly, you need have to install these packages directly.

#### `indicative-parser`
The [indicative-parser](https://github.com/poppinss/indicative-parser) parses the `schema` object to a tree of nodes. This provides the in-depth information about the schema object, that helps indicative optimize the validator runtime.

#### `indicative-compiler`
The [indicative-compiler](https://github.com/poppinss/indicative-compiler) uses the parsed tree of `indicative-parser` and creates an highly optimized function for each node in the tree.

#### `indicative-rules`
The [indicative-rules](https://github.com/poppinss/indicative-rules) package is the collection of validation and sanitization rules.

#### `indicative-utils`
The [indicative-utils](https://github.com/poppinss/indicative-utils) exports handful of re-usable functions used by the Indicative core. You may also need this package when writing custom rules.

#### `indicative-formatters`
The [indicative-formatters](https://github.com/poppinss/indicative-formatters) package has the [error formatters](error-formatters) to format error messages.
