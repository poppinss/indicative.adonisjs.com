---
permalink: sanitizer
category: Guides
---

# Sanitizer

Validation is just one step to ensure data integrity. However, a validated field can also contain malicious data and hence it is recommended to sanitize the user input before storing it to a database.

The `sanitize` method from Indicative uses the same schema specification as the validations schema.

```ts
import { sanitize } from 'indicative/sanitizer'

const schema = {
  email: 'normalize_email',
  bio: 'strip_tags'
}

const data = {
  email: 'foo+bar@googlemail.com',
  bio: '<p> I am the <strong>best</strong> </p>'
}

sanitize(data, schema)

/**
------------
 Sanitized
------------
  {
    email: 'foobar@gmail.com',
    bio: 'I am the best',
  }
*/
```

The `sanitize` will mutate the original `data` object after performing the sanitization.

## What to sanitize?

A common mistake committed by many developers is that they sanitize every form field against every rule. *Please don't do it*, as it many impact the application performance severly.

You must guard your application against common web attacks like **XSS attack** and **SQL injection**.

### SQL injection
You must rely on your ORM or SQL query builder to protect against SQL injection. AdonisJs Lucid ORM, TypeORM, KnexJs and many other Node.js libraries have built-in protection for SQL injection and hence no sanitization for that is required.

### XSS protection
XSS attacks happens, when someone is able to execute a Javascript snippet on your website. It can be done by as follows:

1. Someone enters a Javascript snippet inside a form input.
2. You validate the input and save the value inside your database.
3. Later the same value is displayed on a webpage as HTML snippet.

```ts
const data = {
  bio: '<script>alert("hello world")</script>'
}

await db.insert(data)
```

In order to prevent HTML snippets getting into the Database, we recommend you to use `stripTags` or `escape` sanitization rules.

```ts
// Disallow HTML
const schema = {
  bio: 'stripTags'
}

// Allow HTML but escape it
const schema = {
  bio: 'escape'
}
```

Following are some guidelines on when or when not to use `stripTags` or `escape`  sanitization rules.

1. Do not use `stripTags` on data validated against pre-defined formats. For example: An email address will always fail the `email` validation rule if it contains HTML inside it.     
  
  Same is the case with `username`, `phone number` and so on.

2. Only use `stripTags` on free text input like `user bio` or `article body` and so on.
