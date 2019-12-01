var express = require('express'),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  Dish = require('./api/models/dishModel.js'),
  User = require('./api/models/userModel.js'),
  bodyParser = require('body-parser'),
  aws = require('aws-sdk'),
  multer = require('multer'),
  multerS3 = require('multer-s3'),
  randomstring = require('randomstring'),
  mime = require('mime'),
  jwt = require("express-jwt"),
  jwksRsa = require("jwks-rsa"),
  cors = require('cors'),
  graphqlHTTP = require('express-graphql'),
  { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = {
  hello: () => {
    return 'Hello world!';
  },
};

require('dotenv').config()

var app = express(),
  s3 = new aws.S3();

app.use(cors())

// // mongoose instance connection url connection
mongoose.Promise = global.Promise;

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

var routes = require('./api/routes/freshistRoutes'); //importing routes
routes(app); //register the routes

app.listen(port);

console.log('Freshist Engaged!' + port);
