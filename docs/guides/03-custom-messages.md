---
permalink: custom-messages
category: Guides
---

# Custom messages
Data validation is mainly performed on user input received as form requests and you don't want to display generic messages to the user filling the form. Thus, indicative has first class support for defining custom messages.

## Defining custom messages
The `validate` and `validateAll` method accepts an object of custom messages as the 3rd argument.

```ts
import { validate } from 'indicative/validator'

const rules = {
  username: 'required|alpha',
  email: 'required|email',
  password: 'required|min:4',
}

const messages = {
  required: 'Make sure to enter the field value',
  email: 'Enter valid email address',
  min: 'The value is too small',
}

const data = {
  username: '123',
  email: 'bad-email',
}

validate(data, rules, messages)
  .then(console.log)
  .catch(console.error)
```

Above, we have defined custom messages for the rule names ie `required`, `email` and so on. For fine-grained control, we can also define custom messages for individual fields.

```ts
const messages = {
  'username.required': 'Username is required to create an account',
  'password.min': 'Password is too short',
}
```

- Indicative will first look for `field.rule` messages.
- Next, it will look for just `rule` messages.
- Finally, it will fallback to a generic message.

## Messages API
To make sure that you are applications are not getting bombared with ton of custom messages. Indicative has support for dynamic messages with the help of [closures](#closures) and [micro templating](#micro-templating).

### Closures
A closure *(aka function)* can used to compose messages at runtime. Indicative will pass the `field`, `validation name` and the `validation arguments` to the function.

```ts
const messages = {
  required: (field, validation, args) {
    return `${field} is required to create a new account` 
  }
}
```

### Micro templating
The message string can also define placeholders for runtime values as shown below.

```ts
const messages = {
  required: '{{ field }} is required to create a new account'
}
```

The placeholders are wrapped inside `mustache braces` and will be replaced with runtime values. The micro templates are helpful, when you have defined messages inside a JSON file, since you cannot use closures in a `.json` file.

The following placeholders are allowed:

- `{{ field }}`: The pointer to the field under validation.
- `{{ validation }}`: The name of the validation that has failed.
- `{{ args }}`: The arguments passed to the validation rule inside schema.
