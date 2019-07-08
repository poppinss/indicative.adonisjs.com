---
permalink: validate
category: API
---

# validate

The `validate` method performs the data validation using the schema object.

[note]

The API for `validateAll` method is also identical.

[/note]

```ts
import { validate } from 'indicative/validator'

validate(data, rules, messages, options)
```

#### `data`

The `data` object to validate.

#### `rules`

An object of rules schema.

#### `messages`

An object of messages schema

#### `options`

The optional `options` receives the same [configure](configure)   options, along with the `cacheKey`.

The optional `cacheKey` can be defined to cache the compiled schema, which results in huge performance gains. 

If you are using Indicative with a Web server, then we recommend using the current request url as the cache key and Indicative will parse the schema only once for that request url.

```ts
async routeHandler (req) {
  const schema = {}
  
  await validate(req.body, schema, {}, {
    cacheKey: req.url
  })
}
```

