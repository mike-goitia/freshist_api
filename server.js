var express = require('express'),
  port = process.env.PORT || 8081,
  mongoose = require('mongoose'),
  Dish = require('./api/models/dishModel.js'), //created model loading here
  bodyParser = require('body-parser'),
  aws = require('aws-sdk'),
  multer = require('multer'),
  multerS3 = require('multer-s3'),
  randomstring = require('randomstring'),
  mime = require('mime');

var app = express(),
  s3 = new aws.S3();


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
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/freshist');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/freshistRoutes'); //importing routes
routes(app); //register the route

app.listen(port);

console.log('Freshist Engaged!' + port);