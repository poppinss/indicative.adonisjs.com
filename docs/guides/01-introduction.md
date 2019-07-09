---
category: Guides
permalink: introduction
title: Introduction
summary: <p> So, you have a web server that accepts form requests. You want to validate and sanitize the data before your application can consume and store it in the database. </p> <p> Say 👋 to Indicative! </p>
---

## What is Indicative?

Indicative is a data validation library to validate complex data objects by defining a human readable schema. In a nutshell, you can

1. Validate nested objects and arrays.
2. Define custom validation error messages.
3. Use error formatters to define the shape of error messages. For example: JSON:API formatter to format error messages as per the [JSON:API](https://jsonapi.org/format/#error-objects) spec.
4. Option to remove unvalidated properties from the data object.
5. Support for async validations.
6. Extensible API for adding custom rules.
7. Data sanitizer.

## Installation
Install the package from the npm registry as follows:

```shell
# Using npm
npm i indicative

# Using yarn
yarn add indicative
```

## Basic example
Following is the simplest example of using Indicative to validate a new user signup data object.

```ts
import { validate } from 'indicative/validator'

const rules = {
  username: 'required|alpha',
  email: 'required|email',
  password: 'required|min:4',
}

const data = {} // data object to validate

validate(data, rules)
  .then(console.log)
  .catch(console.error)
```

The `rules` object (known as schema) is defined as an object of key-value pairs. 

- The `key` is the field path you want to validate.
- The `value` is an array of multiple validation rules. You can define them as a string separated by `pipe (|)` operator or an array of functions calls.

[Learn more about the Indicative validator](validator-101)

## Defining custom messages
Indicative has first class support for defining custom messages for validation failures. You can define generic messages for **validation rules** or define a custom message for **each field**.

```ts{11-16,18}
import { validate } from 'indicative/validator'

const rules = {
  username: 'required|alpha',
  email: 'required|email',
  password: 'required|min:4',
}

const data = {} // data object to validate

const messages = {
  required: (field) => `${field} is required`,
  'username.alpha': 'Username contains unallowed characters',
  'email.email': 'Please enter a valid email address',
  'password.min': 'Password is too short',
}

validate(data, rules, messages)
  .then(console.log)
  .catch(console.error)
```

The messages object has the same syntax as the rules objects.

1. You can define messages just for the **rules**, ie: `required`, `min`, `email` and so on.
2. Or define them in combination of **field + rule**, ie `username.required`. The latter one gets priority over the former.

[Learn more about custom messages](custom-messages)

## Data sanitization
Validating data is one step to ensure data integrity. Data sanitization is equally important since you don't want to save malicious input to the database.

Similar to the **validator schema definition**, Indicative also allows you to define rules for cleaning up the user input.

```ts
import { sanitize } from 'indicative/sanitizer'

const rules = {
  username: 'trim',
  email: 'normalize_email',
}

const data = {
  username: '  foo',
  email: 'john+doe@gmail.com'
}

// mutates the original data object
sanitize(data, rules)
```

[Learn more about data sanitizer](sanitizer)
