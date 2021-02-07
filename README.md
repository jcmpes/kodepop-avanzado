# keepads API

Keepads is a simple project for the Introduction to Backend module of Keepconding's X Web Bootcamp.
It is an API to store and read adverts of a hypothetical ads service.
It is written by Juan Carlos Marcos using node and mongoDB.

## Run db:
`./bin/mongod --dbpath ./data/db`

## Initialize db:
Run this command in the terminal to remove the collections and insert new test data:
`node initialize_db.js`

## EJS view:
The ejs view is implemented via a html template file with ejs syntax.
You can list all the ads and also apply a price filter selecting a price range with a dual slider.
The slider has been created by https://refreshless.com/nouislider/ .
You can also apply a type-of-ad filter to show only buy or sell ads.


## API methods:

### GET /api/ads:
`GET /api/ads?skip=0&limit=10&type=Venta&tag=Electronica&price[$gte]=50&price[$lte]=125&sort=-price`
Get list of ads with opcional parameters:

#### filter by entries for pagination:
`GET /api/ads?skip=10&limit=10`
Will return documents 11 up until 21.

#### filter by type (compra or venta)
`GET /api/ads?type=Venta`
Will return only documents of type "Venta".

#### filter by tag:
`GET /api/ads?tag=Electronica`
Will return documents with tag "Electronica".

#### filter by price:
`GET /api/ads?price[$gte]=50&price[$lte]=150`
Will return documents with price between 50 and 150.

#### filter by name:
`GET /api/ads?title=iPhone`
Will return documents with title containing the string provided

#### sort:
`GET /api/ads?sort=-price`
Will return documents sorted by price, high to low.


### GET /api/tags
`GET /api/tags`
Get list of all tags
