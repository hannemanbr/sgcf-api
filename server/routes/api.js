const express = require('express');
const router  = express.Router();
const jwt     = require('jsonwebtoken');

// TODO http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/

router.use(require('./authenticate')); // Before middleware 
router.use(require('./signup'));

// middleware to use for all requests
router.use(function(req, res, next) {
  // req.body.token || req.query.token || req.headers['x-access-token'] ||
  let token;
  if (req.headers['authorization'] !== undefined) 
    token = req.headers['authorization'].split(' ')[1];  
  if (token) {        
    jwt.verify(token, process.env.SECRET, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Falha ao autenticar o token.' });    
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {    
    return res.status(403).send({ 
      success: false, 
      message: 'Sem token? You Shall Not Pass!' 
    });    
  }
  //next();
});

router.use(require('./usuarios'));

router.get('/', function(req, res) {    
    res.json({ message: 'rota para api: /api'});
});

module.exports = router;