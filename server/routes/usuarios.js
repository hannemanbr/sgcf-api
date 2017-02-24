const express = require('express');
const router  = express.Router();
const Usuario    = require('../models/Usuario');
const crypto  = require('crypto');

// http://localhost:3000/api/UsuariosPorPagina?page=1&sort=nome&limit=10
router.route('/UsuariosPorPagina')
  .get(function(req, res) {
    var options = {
      lean: true,
      select: '-senha',
      sort: req.query.sort,
      limit: parseInt(req.query.limit),
      page: parseInt(req.query.page)
    };
    Usuario.paginate({}, options).then(function(result) {                
      res.status(200).json(result);
    });
  });
router.route('/Usuarios')
  // (accessed at GET http://localhost:3000/api/usuarios)
  .get(function(req, res) {
    Usuario.find(function(err, users) { 
      if (err) res.send(err); 
      res.json(users); 
    });
  });

router.route('/Usuarios/Enderecos/:usuario_id')
  .put(function(req, res) {        
    Usuario.findOneAndUpdate({_id: req.params.usuario_id }, {$set: {enderecos: req.body }}, {new: true}, function(err, user) {
      if (err) res.send(err);
      res.json({ success: true, message: 'Endereços atualizados!' });      
    });
  });

router.route('/Usuarios/ContasBancarias/:usuario_id')
  .put(function(req, res) {
    Usuario.findOneAndUpdate({_id: req.params.usuario_id }, {$set: {contasBancarias: req.body }}, {new: false}, function(err, user) {
      if (err) res.send(err);
      res.json({ success: true, message: 'Contas Bancarias atualizadas!' });      
    });
  });

router.route('/Usuarios/Representatividade/:usuario_id')
  .put(function(req, res) {        
    Usuario.findOneAndUpdate({_id: req.params.usuario_id }, {$set: {representatividade: req.body }}, {new: true}, function(err, user) {
      if (err) res.send(err);
      res.json({ success: true, message: 'Representatividade atualizada!' });      
    });
  });

module.exports = router;