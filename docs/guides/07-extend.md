---
permalink: extend
category: API
---

# extend

The `extend` method of `validator` and `sanitizer` let you add your own custom rules.


## validator.extend

```ts
import { extend } from 'indicative/validator'

extend('unique', {
  async: true,
  
  compile (args) {
    return args 
  },
  
  async validate (data, field, args, config) {
  }
})
```

The validator `extend` method accepts a total of two arguments. First is the **rule name** and second is the validation definition.

#### `async: (boolean)`

Whether or not the `validate` method is asynchronous. This helps indicative optimize the runtime behavior of the validation cycle.

#### `compile`

The optional `compile` method receives the arguments passed to the rule and it can transform those args in any way and return them back. For example:

```ts
const schema = {
  email: validations.unique([
    'users',
    'email'
  ])
}
```

And the `compile` method can validate the passed arguments as follows:

```ts
extend('unique', {
  compile (args) {
    if (args.length !== 2) {
      throw new Error('Unique rule needs the table and column name') 
    }
    
    return args
  },
})
```

#### `validate`

The `validate` method performs the actual validation on a given field.

```ts
import { getValue, skippable } from 'indicative-utils'

extend('unique', {
  async validate (data, field, args, config) {
    const fieldValue = getValue(data, field)

    if (skippable(fieldValue, field, config)) {
      return true
    }
    
    const user = await Database
      .table(table)
      .where(field, fieldValue)
      .first()
        
    if (user) {
      return false
    }
    
    return true
  }
})
```

Let's understand the `validate` method line by line.

1. The `getValue` method from `indicative-utils` returns the value of a `field` from the `data` object. We recommend using this method, since it will handle the use cases for nested values, unknown array indexes and so on.
2. The `skippable` method tells whether we should skip validation for this field or not. The validation must be skipped when it's non-existing. Only the `required` rule is meant for validating `undefined` value.
3. Finally, we write some dummy code to make a database query.
4. The `validate` must return `true` to mark the validation as passed and `false` to mark it as failed.


## sanitizer.extend

The `extend` method from the sanitizer will extend the sanitization rules.

```ts
import { extend } from 'indicative/sanitizer'

extend('escape', {
  compile (args) {
    return args 
  },
  
  sanitize (data, field, args, config) {
  }
})
```

#### `compile`

The `compile` method follows the same principles from the `validator.extend` method.

#### `sanitize`

The `sanitize` method must mutate the fieldValue with the sanitized value. 

```ts
import { extend } from 'indicative/sanitizer'
import { getValue, patchValue } from 'indicative-utils'
import * as he from 'he'

extend('escape', {
  sanitize (data, field, args, config) {
    let fieldValue = getValue(data, field)
    if (typeof (fieldValue) !== 'string') {
      return
    }
    
    patchValue(data, field, he.escape(fieldValue))    
  }
})
```


The `sanitize` method also receives the same arguments as the `validate.extend` method.

After sanitizing the field value, you must use the `patchValue` method to set the new value.

## Extending interfaces

When using Indicative in a typescript project, you will also have to extend the interface that contains the list of validations and sanitizations.

```ts
import { validations, extend } from 'indicative/validator'

extend('unique', ...)

const schema = {
  email: [
      validations.unique() // Typescript compiler will complain
  ]
}
```

In order for the `unique` rule to show up in the list of `validations`, you will have to extend the interface.

Create a separate file `types.ts` in your project directory and write the following code inside it.

[tip]

Typescript [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) will merge the two interfaces with same name

[/tip]

```js
import { ParsedRule } from 'indicative-parser'

declare module 'indicative-rules' {
  interface ValidationRulesContract {
    unique ([ table, field ]: [ string, string ]): ParsedRule
  }
}
```

In order to extend the sanitizations list, you need to write the following code

```ts
import { ParsedRule } from 'indicative-parser'

declare module 'indicative-rules' {
  interface SanitizationRulesContract {
    escape (): ParsedRule
  }
}
```
