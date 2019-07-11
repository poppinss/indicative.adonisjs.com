---
permalink: upgrade-guide
category: Upgrade Guide
---

# Upgrading from 5.x
Following this guide, if you are using `indicative@5.x.x` and wants to upgrade to the latest version.

## Big wins
The package is re-written from scratch with focus on better UX for Typescript users and performance.

- Indicative now uses a dedicated [parser](https://github.com/poppinss/indicative-parser) and [compiler](https://github.com/poppinss/indicative-compiler) to parse the schema objects and cache them for performance. This roughly makes Indicative **4x faster** from it's predecessor.
- Instead of defining validation rules as a string, one can use the `validations` object, which works great with Typescript intellisense.

## Removing browser support
The newer version of Indicative doesn't have first class support for browsers. Most of my work is targeted towards the Node.js audience, and it is really hard for me to build and maintain **Isomorphic packages**.

I am not a fulltime frontend engineer and things like **finding right babel plugins**, **keeping bundle size in control**, **integrating tests with tools [browserstack](https://www.browserstack.com/)** adds a lot to the development time.

However, I am open for the community to standup and work towards making Indicative compatible with browsers.

## Changes to import paths
We have scoped the `validator` and `sanitizer` API to subpaths and that introduces minor changes to the imports API.

[codegroup]
```ts{}{Earlier}
const { validate, configure, sanitize, validateAll } = require('indicative')
```

```ts{}{Now}
const { validate, configure, validateAll } = require('indicative/validator')
const { sanitize } = require('indicative/sanitizer')
```
[/codegroup]

## Removing the `rule` method
We have removed the `rule` method in favor of `validations` and `sanitizations` objects. The newer API works great with Typescript intellisense, and you won't have to remember the rules name anymore.

[codegroup]
```ts{}{Earlier}
const { rule } = require('indicative')

const schema = {
  standupHours: [
    rule('required'),
    rule('hours', 'hh:mm:ss')
  ]
}
```

```ts{}{Now}
import { validations } from 'indicative/validator'

const schema = {
  standupHours: [
    validations.required(),
    validations.hours(['hh:mm:ss'])
  ]
}
```
[/codegroup]

## Validator API
The validator API stays intact for the most part, except the options argument signature has been changed as described below.

#### Changes to options argument
Earlier `fourth argument` used to receive an optional `formatter`. Now it receives an object with following properties.

[note]
  The `options` argument and all of it's internal keys are optional.
[/note]

[codegroup]

```ts{}{Earlier}
validate(data, schema, messages, JsonApiFormatter)
```

```ts{}{Now}
validate(data, schema, messages, {
  removeAdditional: false,
  formatter: JsonApiFormatter,
  existyStrict: false,
  cacheKey: req.url
})
```

[/codegroup]

## Validator rules
All of the validator rules behaves the same, except some of the rules now have inbuilt data casting. The inbuilt data casting solves lot of edge cases. For example:

1. You want a certain value to be a valid `date`.
2. Since the data transfered over HTTP is always string, you make use of `toDate` sanitization rule.
3. The date was invalid and hence the sanitization rule converted it to `null`.
4. Now, the validator will see the `null` value and returns the **required** validation error message vs **invalid date** error message to the user.

Following rules will perform implicit data casting.

- [boolean](/validations/master/boolean)
- [date](/validations/master/date)
- [float](/validations/master/float)
- [integer](/validations/master/integer)
- [number](/validations/master/number)

## Sanitizer rules
Since the data casting is now inbuilt within the validator, we have removed type conversion sanitization rules.

1. Removed `sanitizer.toDate` in favor of [validator.date](/validations/master/date)
2. Removed `sanitizer.toInt` in favor of [validator.integer](/validations/master/integer)
3. Removed `sanitizer.toBoolean` in favor of [validator.date](/validations/master/boolean)

## Extend API
We have introduced a dedicated `extend` method for `validator` and `sanitizer` both. It will add your new rules to the runtime engine as well as to the list of `validations` and `sanitizations`.

Along with that, the API for the custom validation and sanitization rules have been changed.

#### Validator

[codegroup]

```ts{}{Earlier}
const { validations } = require('indicative')

const timeRegex = /([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?/

validations.time = async function timeValidator (data, field, message, args, get) {
  const fieldValue = get(data, field)
  if (fieldValue && !timeRegex.test(fieldValue)) {
    throw message
  }

  return true
}
```

```ts{}{Now}
import { extend } from 'indicative/validator'
import { getValue, skippable } from 'indicative-utils'

const timeRegex = /([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?/

extend('time', {
  async: false,

  validate (data, field, args, config) {
    const fieldValue = getValue(data, field)
    if (skippable(fieldValue)) {
      return true
    }

    return timeRegex.test(fieldValue)
  }
})
```
[/codegroup]

1. The `extend` method expect you to define whether the `validate` method is async or not, this helps in optimizing the runtime. [Learn more](/guides/master/extend)
2. The `validate` method doesn't receive the `message` anymore, since returning correct message is not the responsibility of the rule.
3. The `validate` doesn't receive the `get` method anymore and instead you are required to import `getValue` method from `indicative-utils` package.
4. The return value from the `validate` method has to be a boolean. Earlier you were supposed to throw an exception, which has severe impact on runtime performance.
5. Finally, the validator config is passed to all the rules, so that they can use the config to tweak the behavior.
