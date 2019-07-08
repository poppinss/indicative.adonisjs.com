---
permalink: error-formatters
category: Guides
---

# Error formatters

Error formatters are helpful when you are writing an API server following a pre-defined spec like [JSON:API](https://jsonapi.org)

Without error formatters, you have to loop over the error messages and re-shape them as per the spec followed by your API team. However, the error formatters exposes an API to collect and shape error messages within the validation lifecycle (no extra overhead).

## Using formatters

By default, Indicative will use [VanillaFormatter](https://github.com/poppinss/indicative-formatters/blob/develop/src/VanillaFormatter.ts) to format the validation error messages. However, you can also define a custom formatter using one of the following ways.

### Global error formatter

Using the `configure` method, you can define a formatter to be used for all validation calls.

```ts
import { configure, validate } from 'indicative/validator'
import { JsonApiFormatter } from 'indicative-formatters'

configure({
  formatter: JsonApiFormatter
})

validate(data, schema)
```

### Per validation call

If you want to define a custom formatter for just a single validation call, then you can pass it as the 4th argument to the `validate` and `validateAll` methods.

```ts
import { validate } from 'indicative/validator'
import { JsonApiFormatter } from 'indicative-formatters'

validate(data, schema, {}, {
  formatter: JsonApiFormatter
})
```

## Existing formatters

The `indicative-formatters` package ships with following formatters.

### VanillaFormatter
Used by default and returns an array of error messages, as shown below.

```ts
[
  {
    field: 'username',
    message: 'required validation failed on username',
    validation: 'required',
  }
]
```


### JsonApiFormatter
The `JsonApiFormatter` returns messages as per the JSON:API spec.

```ts
{
  errors: {
    [
      {
        source: {
          pointer: 'username'
        },
        title: 'required',
        detail: 'required validation failed on username'
      }
    ]
  }
}
```


## Creating custom formatters
You can also create custom formatters by implementing the `addError` and `toJSON` methods on a class.

```ts
class MyCustomFormatter {
  constructor () {
    this.errors = []
  }

  addError (error, field, rule, args) {
    this.errors.push({ error, field, validation: rule.name })
  }
  
  toJSON () {
    return this.errors.length ? this.errors : null
  }
}
```

And then make use of it as follows.

```ts
configure({
  formatter: MyCustomFormatter
})
```

