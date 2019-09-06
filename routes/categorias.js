const express = require('express');
const _ = require('underscore');
const { verifyToken, verifyRole } = require('../middlewares/tknservices');
const Categoria = require('../models/categorias');

const app = express();

app.get('/categorias', [verifyToken], (req, res) => {
     Categoria.find({}).exec((err, categoriasDB) => {
          if (err) {
               return res.status(500).json({
                    ok: false,
                    err
               })
          }

          res.json({
               ok: true,
               categorias: categoriasDB
          })
     });
})

 app.get('/categorias/:id', [verifyToken], (req, res) => {
      let id = req.params.id;

      Categoria.findById(id, (err, categoriaDB) => {
          if (err) {
               return res.status(500).json({
                    ok: false,
                    err
               })
          }
          if(!categoriaDB) {
               return res.status(400).json({
                    ok: false,
                    err: 'Id no existe'
               })
          }

          res.json({
               ok: true,
               categoriaDB
          })
      })
 })

app.post('/categorias', [verifyToken, verifyRole], (req, res) => {
     let body = req.body;

     let categoria = new Categoria({
          titulo: body.title,
          descripcion: body.description,
          usuario: req.usuario._id
     })

     categoria.save((err, categoriaDB) => {
          if (err) {
               return res.status(500).json({
                    ok: false,
                    err
               })
          }

          if (!categoriaDB) {
               return res.status(400).json({
                    ok: false,
                    err
               })
          }

          res.json({
               ok: true,
               categoriaDB
          })
     })
});


app.put('/categorias/:id', [verifyToken, verifyRole], (req, res) => {
     let id = req.params.id;
     const body = _.pick(req.body, ['title', 'descripcion']);

     Categoria.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'}, (err, categoriaDB) => {
          if (err) {
               return res.status(500).json({
                    ok: false,
                    err
               })
          }

          if (!categoriaDB) {
               return res.status(400).json({
                    ok: false,
                    err
               })
          }

          res.json({
               ok: true,
               categoriaDB
          })
     })
})

app.delete('/categorias/:id', [verifyToken, verifyRole], (req, res) => {
     let id = req.params.id;
     Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
          if (err) {
               return res.status(500).json({
                    ok: false,
                    err
               })
          }

          res.json({
               ok: true,
               categoriaDB
          })
     })
})

module.exports = app;