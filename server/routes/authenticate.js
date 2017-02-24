const express = require('express');
const router  = express.Router();
const Usuario    = require('../models/Usuario');
const jwt     = require('jsonwebtoken');
const crypto  = require('crypto');

router.route('/authenticate')
  .post(function(req, res) {
    Usuario.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;
      if (!user) {                
        res.status(401).send([{ success: false, msg: 'Autenticação falhou. Usuário não encontrado.' }]);
      } else if (user) {
        // check if password matches
        var hash = crypto.createHmac('sha256', process.env.SECRET)
          .update(req.body.password)
          .digest('hex');
        if (user.password != hash) {                    
          res.status(401).send([{ success: false, msg: 'Autenticação falhou. Senha Incorreta.' }]);
        } else {
          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, process.env.SECRET, {
            expiresIn: '1d' // 1s 2sec 1m 1h 1.5hrs 1d 2
          });
          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Aproveite seu token!',
            token: token
          });
        }   
      }
    });
  });

module.exports = router;
