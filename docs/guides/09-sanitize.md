---
permalink: sanitize
category: API
---

# sanitize

The `sanitize` method performs sanitization rules on a given data object.

```ts
import { sanitize } from 'indicative/sanitizer'

sanitize(data, rules, options)
```

#### `data`

The `data` object to validate.

#### `rules`

An object of rules schema.

#### `options`

The `options` currently receives only one argument called `cacheKey`.

The `cacheKey` can be defined to cache the compiled schema, which results in huge performance gains. 

If you are using Indicative with a Web server, then we recommend using the current request url as the cache key and Indicative will parse the schema only once for that request url.

```ts
async routeHandler (req) {
  const schema = {}
  
  await sanitize(req.body, schema, {
    cacheKey: req.url
  })
}
```
