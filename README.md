# snowflea

## **HEAVY ALPHA - PRE-ALPHA EVEN**

CRUD operations based on Iceworm schemata.


## Quickstart

```javascript
'use strict'

const snowflea = require('snowflea')

// settings
snowflea.set('mongo.uri', 'mongodb://localhost:27017/test')

// schema
let cat_schema = snowflea.Schema.create(
  {
    name: '*string',
    age: 'int>0',
    secret: '-string'
  },
  {
    collection: 'cats'
  }
)

// let insert a cat
snowflea.create({ name: 'Tom', age: 3, secret: 'hates fish' }, cat_schema)
  .then((result) => {
    console.log('created a cat:', result[0])
  })
  .catch((err) => {
    console.error(err.message)
  })

```


## Crud Operations
 
Snowflea knows four methods to do CRUD (I hope you are sitting):

- `create()`
- `read()`
- `update()`
- `delete()`

All four return a Promise.

### Create

The `create()` method can be used to insert one or many items:

- one: `create(<obj_to_insert>, <schema>)`
- many: `create(<[obj1, obj2, ... objn]>, <schema>)`

The method returns a Promise which returns an array of created objects (if successful) or an error object.

```javascript
snowflea.create(cat, cat_schema)
    .then((docs) => {
        console.log(docs)
    })
    .catch((err) => {
        console.log(err)
    })
```

Passed objects are evaluated against the schema provided:
 
- if validation fails, the create operation fails and returns an error (see section on Errors)
- projection will ruthlessly remove any fields of the passed objects that are not part of the schema before saving them


### Errors

Create and update operations use the schema to validate objects passed. Any validation errors will cause the Promise to decline and return an object containing the errors.

