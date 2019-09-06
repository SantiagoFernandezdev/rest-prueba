const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarios');
const jwt = require("jsonwebtoken");
const app = express();

app.post('/login', (req, res) => {
     let body = req.body;

     Usuario.findOne({email: body.email}, (err, UsuarioDB) => {
          if(err) {
               return res.status(500).json({
                    ok: false,
                    err
               })
          }

          if(!UsuarioDB) {
               return res.status(400).json({
                    ok: false,
                    message: "{Usuario} o password Incorrecto"
               })
          }

          if(!bcrypt.compareSync(body.password, UsuarioDB.password)) {
               return res.status(400).json({
                    ok: false,
                    message: "Usuario o {password} Incorrecto"
               })
          }

          let token = jwt.sign({usuario: UsuarioDB},
                               process.env.SEED, {expiresIn: 60 * 60 * 24 * 30});

          res.json({
               ok: true,
               usuario: UsuarioDB,
               token
          })
     })
})


module.exports = app;
