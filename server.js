var express = require('express'),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  graphqlHTTP = require('express-graphql')
  schema = require('./api/schema.js');

require('dotenv').config()

var app = express();
// Allow CORS
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//DB Connection
mongoose.Promise = global.Promise;
const db = require("./config/keys").mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// GraphQL
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

// REST Routes
var routes = require('./api/routes/freshistRoutes'); //importing routes
routes(app); //register the routes

app.listen(port);
console.log('Freshist Engaged!' + port);
