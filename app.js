var mongoose = require('mongoose')

var createError = require('http-errors');
var path = require('path');
const dotenv = require('dotenv')
var bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var typeproRouter = require('./routes/typepro');
var ImpoType = require('./routes/ImportType')
var Login = require('./routes/Login')
var SellType = require('./routes/SellType.rotes')

var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const morgan = require('morgan')
const cors = require('cors')
var fileupload = require('express-fileupload')

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

var app = express();


//import 
app.use(bodyParser.json({limit: '50mb'}))
app.use(cors())
app.use(morgan('common'))
app.use(fileupload())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes Import
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/v1', typeproRouter)
app.use('/v2', ImpoType)
app.use('/v4', SellType)
app.use('/profile', express.static('./upload/IMG'))

app.use('/Login', Login)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

//connectDB
dotenv.config()
mongoose.connect((process.env.MONGODB_URL), () => {
  try {
    console.log(`Connect to MongoDB PORT http://localhost:3022`)
  } catch (error) {
    console.log(error)
  }
})

//Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Apple Shop API",
      description: "API ໃນການຈັດການຂໍ້ມູນຂອງລະບົບຮ້ານຄ້າ",
    },
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        jwt: [],
      },
    ],
    swagger: "3.0",
    servers: [
      { url: `http://localhost:3022` },
      { url: `http://192.168.100.148/:3022` },
      { url: `http://192.168.100.84/:3022` },
      { url: `http://172.20.10.4:3022` },
    ],
  },
  // ['.routes/*.js']
  apis: ["./routes/*.js"],
};

//Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/Swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs)
);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
