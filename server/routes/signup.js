const express = require('express');
const router  = express.Router();
const Usuario    = require('../models/Usuario');
const crypto  = require('crypto');
const validator   = require('express-validator');

router.use(validator({
  customValidators: {
    isEmailAvailable: function(value) {
      return new Promise(function(resolve, reject) {
        Usuario.findOne({ email: value })
          .then(function(user) {
            if (!user) {
              resolve();
            }
            else {
              reject(user);
            }
          })
          .catch(function(error){
            if (error) {
              reject(error);
            }
          });
      });
    }
  }
}));

router.route('/signup')
  .post(function(req, res) {
    req.checkBody('nome', 'Nome é obrigatório').notEmpty();
    req.checkBody('email', 'Email já está sendo utilizado').isEmailAvailable();
    req.checkBody('email', 'Email não é válido').isEmail();
    req.checkBody('password', 'A senha deve ter de 5 a 35 digitos').len(5, 35);

    //var errors = req.validationErrors();
    //if (errors) { res.json({success: false, errors: errors}); return; }

    req.asyncValidationErrors()
    .then(function() {
      var user = new Usuario();
      user.email = req.body.email;
      user.nome = req.body.nome;
      user.password = crypto.createHmac('sha256', process.env.SECRET).update(req.body.password).digest('hex');

      user.save(function(err) {
        if (err) res.send(err);
        res.json({success: true, message: 'Usuário cadastrado!' });
      });
    })
    .catch(function(errors) {
      //res.status(422).json({success: false, errors: errors});
      res.status(422).send(errors);
    });
  });

module.exports = router;