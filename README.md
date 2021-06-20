# Deployed at AWS:
Node app + thumbnail generator microservice: http://ec2-50-17-153-102.compute-1.amazonaws.com/

React app + nodepop-api: http://50.17.153.102/ (user: jcmpes@gmail.com pass: 123)

EXTRA: Django app + SQL DB: http://elearning.bodasjc.com/ (you may register a new user)

# keepads-avanzado

Keepads is a simple project for the Introduction to Backend module of Keepconding's X Web Bootcamp.
It is an API to store and read adverts of a hypothetical ads service.
It is written by Juan Carlos Marcos using node and mongoDB.


## Bonus track:
nmp module published: https://www.npmjs.com/package/nodejs-worldcup-simulator

## Microservice:
cote is used to communicate with a thumbnail generator service.
You can check the service logic in the directory "i-resize-u/"

## Run db:
`./bin/mongod --dbpath ./data/db`

## Initialize db:
Run this command in the terminal to remove the collections and insert new test data:
`npm run initdb`

## EJS view:
The ejs view is implemented via a html template file with ejs syntax.
You can list all the ads and also apply a price filter selecting a price range with a dual slider.
The slider has been created by https://refreshless.com/nouislider/ .
You can also apply a type-of-ad filter to show only buy or sell ads.


## API methods:

### POST /api/authenticate:
Send as x-www-form-urlencoded these credentials:
email: user@example.com
password: 1234
The api will return a JWToken that expires within 1 hour.

### GET /api/anuncios:
`GET /api/ads?skip=0&limit=10&type=Venta&tag=Electronica&price[$gte]=50&price[$lte]=125&sort=-price`
Get list of ads with opcional parameters:

#### filter by entries for pagination:
`GET /api/anuncios?skip=10&limit=10`
Will return documents 11 up until 21.

#### filter by type (compra or venta)
`GET /api/anuncios?type=Venta`
Will return only documents of type "Venta".

#### filter by tag:
`GET /api/anuncios?tag=Electronica`
Will return documents with tag "Electronica".

#### filter by price:
`GET /api/anuncios?price[$gte]=50&price[$lte]=150`
Will return documents with price between 50 and 150.

#### filter by name:
`GET /api/anuncios?title=iPhone`
Will return documents with title containing the string provided

#### sort:
`GET /api/anuncios?sort=-price`
Will return documents sorted by price, high to low


### GET /api/tags
`GET /api/tags`
Get list of all tags


### POST /api/ads
`POST /api/anuncios`
Create a new ad sending the details in the body as x-www-form-urlencoded

### DELETE /api/anuncios/:id
`DELETE /api/anuncios/6020688e2ba28a3b851b08bd`
Removes the document with _id 6020688e2ba28a3b851b08bd from the database
