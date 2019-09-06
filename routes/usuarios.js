const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuarios');
const { verifyToken } = require("../middlewares/tknservices");
const app = express();


app.get('/usuarios', (req, res) => {
     Usuario.find({})
     .exec((err, usersDB) => {
          if(err) {
               return res.status(400).json({
                    ok: false,
                    err
               })
          }

          res.json({
               ok: true,
               usuarios: usersDB
          })
     })
})

app.post('/usuarios', (req, res) => {
     let body = req.body;

     usuario = new Usuario({
          nombre: body.nombre,
          password: bcrypt.hashSync(body.password, 10),
          email: body.email
     });

     usuario.save((err, usuarioDB) => {
          if(err) {
               return res.status(400).json({
                    ok: false,
                    err
               })
          }

          res.json({
               ok: true,
               usuarioDB
          })
     })
})

app.put('/usuarios/:id', verifyToken, (req, res) => {
     let id = req.params.id;
     let body = _.pick(req.body, ['nombre', 'email']);

          Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'}, (err, usuarioDB) => {
               if(err) {
                    return res.status(400).json({
                         ok: false,
                         err
                    })
               }

               res.json({
                    ok: true,
                    usuario: usuarioDB
               })
          })
 
})

app.delete('/usuarios/:id', verifyToken, (req, res) => {
     let id = req.params.id;

     Usuario.findByIdAndUpdate(id, {estado: false}, (err, usuarioDB) => {
          if(err) {
               res.status(400).json({
                    ok: false,
                    err
               })
          }

          res.json({
               ok: true,
               usuario: usuarioDB
          })


     })
})

module.exports = app;