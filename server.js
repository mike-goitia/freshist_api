var express = require('express'),
  port = process.env.PORT || 5000,
  mongoose = require('mongoose'),
  Dish = require('./api/models/dishModel.js'), //created model loading here
  bodyParser = require('body-parser'),
  aws = require('aws-sdk'),
  multer = require('multer'),
  multerS3 = require('multer-s3'),
  randomstring = require('randomstring'),
  mime = require('mime'),
  mongodb = require('mongodb'),
  ObjectID = mongodb.ObjectID;

var app = express(),
  s3 = new aws.S3();

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/freshist", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // // Initialize the app.
  // var server = app.listen(process.env.PORT || 8080, function () {
  //   var port = server.address().port;
  //   console.log("App now running on port", port);
  // });
});

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'freshist-food',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, randomstring.generate(25) + '.' + mime.getExtension(file.mimetype));
        }
    })
});

//open in browser to see upload form
app.get('/upload', function (req, res) {
    res.sendFile(__dirname + '/upload_form.html');
});

//used by upload form
app.post('/upload', upload.array('upl',1), function (req, res, next) {
    res.send("Uploaded!");
});

// // mongoose instance connection url connection
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/freshist');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/freshistRoutes'); //importing routes
routes(app); //register the route

app.listen(port);

console.log('Freshist Engaged!' + port);
