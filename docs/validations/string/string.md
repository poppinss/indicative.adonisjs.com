---
permalink: string
title: string
category: string
gh_url: https://github.com/poppinss/indicative-rules/tree/develop/src/validations/string/string.ts
---

Enforces the field value to be a valid string.
 
[note]
  The values transferred over HTTP are always string, which means this
  validation will always pass.
 
  However, this validation rule is helpful for raw JSON requests, since
  after parsing the JSON strings, the server will get the actual content
  types and not a string.
 
  In short, the rule has no impact for `application/x-www-form-urlencoded`, but
  helpful for `application/json` content type.
[/note]
 
```ts
import { validations } from 'indicative/validator'
 
const rules = {
  bio: 'string'
}
 
// or
const rules = {
  bio: [
    validations.string()
  ]
}
```
