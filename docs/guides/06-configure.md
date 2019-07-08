---
permalink: configure
category: API
---

# configure

The `configure` method exposes the API to define global settings applicable to all `validator` methods.

[note]

You can define all these values inline with `validate` and `validateAll` methods as well.

[/note]

```ts
import { configure } from 'indicative/validator'
import { JsonApiFormatter } from 'indicative-formatters'

configure({
  existyStrict: false,
  removeAdditional: false,
  formatter: JsonApiFormatter,
})
```


#### `existyStrict (false)`

The `existyStrict` property tells validator, which properties must be considered non-existing. When it's set to `true`, then only `undefined` values are considered non-existing, otherwise `null`, `empty string`, `undefined` all are considered non-existing.

#### `removeAdditional (false)`

Setting it `true` will make validator remove all non validated key/value pairs from the main data object.

#### `formatter (JsonApiFormatter)`

The formatter to be used for all validations.
