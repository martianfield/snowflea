# snowflea

## **HEAVY ALPHA - PRE-ALPHA EVEN**

CRUD operations based on Iceworm schemata.


## Quickstart

```javascript
'use strict'

const snowflea = require('snowflea')
const Schema = require('iceworm').Schema

// settings
snowflea.set('mongo.uri', 'mongodb://localhost:27017/test')

// schema
let cat_schema = new Schema(
  {
    name: '*string',
    age: 'int>0',
    secret: '-string'
  }
)

// use the schema
snowflea.use(cat_schema, 'cats')


// insert a cat
cat_schema.create({ name: 'Tom', age: 3, secret: 'hates fish' })
  .then((result) => {
    console.log('created a cat:', result[0])
  })
  .catch((err) => {
    console.error(err.message)
  })

```

## Schema Creation

Snowflea extends Iceworm's `Schema` with mongo CRUD operations. To use an Iceworm schema with Snowflea, use the `use` function. It takes a schema and the name of the mongo collection the schema belongs to:

```javascript
let schema = new iceworm.Schema({'name': '*string'})
snowflea.use(schema, 'companions')`
```


## Crud Operations
 
Snowflea knows four methods to do CRUD (I hope you are sitting):

- `create()`
- `read()`
- `update()`
- `delete()`

They 

- are implemented as extensions to Iceworm's Schema class
- return a Promise.

### Create

The `create()` method can be used to insert one or many items:

- one: `create(<obj_to_insert>)`
- many: `create(<[obj1, obj2, ... objn]>)`

The method returns a Promise which returns an array of created objects (if successful) or an error object.

```javascript
my_schema.create(cat)
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

### Read

The `read()` method returns object(s) matching a mongo query document. Any projection defined in your schema will be used (i.e. hidden fields will not be delivered).

```javascript
let query = { "name":"Amy" }
my_schema.read({query})
    .then((result) => {
        console.log(result)
    })
    .catch((err) => {
        console.error(err)
    })
```

### Update

The `update()` method can be used to update one or many items:

```javascript
my_schema.update(<filter>, <data>[, <options>])
    .then((result) => {
        console.log(result)
    })
    .then((err) => {
        console.error(err)
    })
```

The optional `options` object lets you specify:

- `upsert` (boolean) - if you want to allow upserts (default: `false`)
- `many` (boolean) - if only one or many matching documents should be affected (default: `false`)

The `update()` method returns a promise which

- resolves to an object containing an array of affected documents (`documents`)
- or rejects with an `Error`


### Delete

The `delete()` method removes object(s) matching a mongo query document.

```javascript
let query = { "name":"Amy" }
my_schema.remove({query})
    .then((result) => {
        console.log(result)
    })
    .catch((err) => {
        console.error(err)
    })
```


### Errors

Create and update operations use the schema to validate objects passed. Any validation errors will cause the Promise to decline and return an object containing the errors.

