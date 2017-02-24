// =================== //
// Module dependencies //
// =================== //
const mongoose    = require('mongoose');
const express     = require('express');
const helmet      = require('helmet');  
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const jwt         = require('jsonwebtoken');  // used to create, sign, and verify tokens
const app         = express();                // define our app using express
const cors        = require('cors');
const dotenv      = require('dotenv');
const path        = require('path');
const chalk       = require('chalk');

// ============================================ //
// Load environment variables from .env file,   //
// where API keys and passwords are configured. //
// ============================================ //

app.set('env', process.env.NODE_ENV || 'development');
if (app.get('env') === 'development')
  dotenv.load({ path: '.env.development' });
else
  dotenv.load({ path: '.env.production' });

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: true })); // configure app to use bodyParser()
app.use(bodyParser.json()); // this will let us get the data from a POST
app.use(morgan('dev'));

// ================== //
// Connect to MongoDB //
// ================== //
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('connected', () => {
  console.log('%s MongoDB connection established!', chalk.green('✓'));
});
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});
//app.set('superSecret', config.secret);

app.use(helmet());

//Enabling CORS
app.use(cors());
app.use('/api', require('./server/routes/api'));

app.get('/', function(req, res) {
  if (app.get('env') === 'development')
    res.send('A API está em http://localhost:' + app.get('port') + '/api');
  else
    res.send('A API está em http://express--api.herokuapp.com:' + app.get('port') + '/api');    
});

// ================ //
// START THE SERVER //
// ================ //

//console.log(app._router.stack)
app.listen(app.get('port'), () => {
  console.log('%s Express server listening on port %d in %s mode.', chalk.green('✓'), app.get('port'), app.get('env'));
});
