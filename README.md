# snowflea

## **HEAVY ALPHA - PRE-ALPHA EVEN**

CRUD operations based on Iceworm schemata.



## Quickstart

```javascript
const snowflea = require('snowflea')

// setup snowflea
snowflea.set('mongo.uri', 'mongodb://localhost:27017/test')

// create an iceworm schema - we pass the db collection name as part of the options argument
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

// create crud object 
let cat_crud = snowflea.create(cat_schema)

// insert one
cat_crud.insert({ 'name': 'Tom', 'age': 4, 'secret': 'Eats flies' })
    .then((doc) => {
        console.log(doc, "created")
    })
    .catch((err) => {
        console.error(err.message)
    }
```




