---
permalink: validator-101
category: Guides
summary: <p>In this guide, we will explore the capibilities of Indicative to validate nested <strong>objects</strong> and <strong>arrays</strong>, along with the option to remove invalidated properties from the data object.</p>
---

# Validator 101

## Validating data
Let's start with the simplest validation example and later we will dig into validating [arrays](#validating-arrays), [nested objects](#validating-nested-objects) and explore [different ways](#string-based-rules) to define validation rules.

```ts
import { validate } from 'indicative/validator'

const schema = {
  username: 'required|alpha',
  password: 'required|min:4|max:40',
}

const data = {
  username: 'virk',
  password: 'supersecret',
}

validate(data, schema)
  .then(console.log)
  .catch(console.error)
```

- The terms like `required`, `alpha` are the pre-defined validation rules. You can also define your own rules for custom needs.
- A field can be validated against multiple rules and Indicative will execute them in sequence from left to right.
- If validation for a field fails, then Indicative will stop validations chain. However, the `validateAll` method can be used to prevent this behavior.

## Validating nested objects
The aim of Indicative is to keep the schema object **simple** and **readable** even when you are validating nested properties. We achieve this using `dot notation` to target nested properties inside an object.

```ts
const schema = {
  'user.username': 'required',
  'user.email': 'required|email',
}

const data = {
  user: {
    username: 'virk',
    email: 'virk@adonisjs.com',
  }
}

validate(data, schema)
  .then(console.log)
  .catch(console.error)
```

[note]
The validator will skip nested validations, when top level value is `undefined` or not an `object`. This is done, so that you can make root level objects optional and only validate their children when they themselves exist.

However, you can enforce the `user` object to exist and must be an object using the following rules.

```ts
const schema = {
  'user': 'required|object',
  'user.username': 'required',
  'user.email': 'required|email',
}
```
[/note]

## Validating arrays

You can validate arrays by defining a specfic index or using the `wildcard (*)` to validate all items inside an array.

[codegroup]
```ts{}{Specific index}
const schema = {
  'users.0.username': 'required',
  'users.0.email': 'required|email',
}
```

```ts{}{Wildcard}
const schema = {
  'users.*.username': 'required',
  'users.*.email': 'required|email',
}
```
[/codegroup]

If you want the `users` array to always exists and have a specific length, then make sure to add the following rules.

```ts
const schema = {
  'users': 'required|array|min:1',
  'users.*.username': 'required',
  'users.*.email': 'required|email',
}
```

## Removing invalidated fields
Indicative can optionally remove invalidated fields from the data object. Consider the following example:

```ts{16, 19}
import { validate } from 'indicative/validator'

const schema = {
  username: 'required',
}

const data = {
  username: 'virk',
  email: 'virk@adonisjs.com',
}

const validatedData = await validate(
  data,
  schema,
  {},
  { removeAdditional: true }
)

validatedData // { username: 'virk' }
```

## String based rules
Indicative supports couple of ways to define the validation rules. Let's start with the string based rules and then move to [array of function calls](#array-of-function-calls).

### Specification

| Keyword | Purpose |
|---------|----------|
| `pipe(|)` | Used to separate two or more rules. Example: `required|email`. |
| `colon (:)` | Used to define arguments for a given rule. Example: `min:4` |
| `comma (,)` | Used to define more than one argument for a rule. Example: `range:4,20`. |

### Example
```ts
const schema = {
  username: 'required|alpha',
  password: 'required|range:4,40',
}
```

### Downsides
The string based rules are more readable and concise. However, they have handful of downsides too.

- There is no way to know if you have mis-typed a rule, until you run your code and receive a Runtime exception.
- The reserved keywords can conflict with the rules arguments. For example: `dateFormat:HH:mm:ss`. The `colon` is a reserved keyword and hence using it as the date format separator will fail.

## Array of function calls
The alternative to the string based approach is define rules as an array of function calls.

### Specification
There is no specific syntax to learn. It's just a plain Javascript array with function calls.

### Example
The `validations` object holds pre-defined validation rules. When using the [extend](extend) API, Indicative will also add your custom rules to this object.

```ts
import { validations, validate } from 'indicative/validator'

const schema = {
  username: [
    validations.required(),
  ],
  email: [
    validations.required(),
    validations.email(),  
  ]
}

const data = {}
validate(data, schema)
```

### Downsides

- Not really. The syntax is more verbose and may span over multiple lines.
