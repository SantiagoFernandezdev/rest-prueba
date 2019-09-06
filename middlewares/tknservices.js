const jwt = require('jsonwebtoken');

let verifyToken = (req, res, next) => {
     let token = req.get('token');
     jwt.verify(token, process.env.SEED, (err, payload) => {
          if(err) {
               return res.status(401).json({
                    ok: false,
                    message: "Acceso denegado"
               })
          }

          req.usuario = payload.usuario;

          next();

     })
}

let verifyRole = (req, res, next) => {
     let role = req.usuario.role;

     if (role === 'USER_ROLE') {
          return res.status(401).json({
               ok: false,
               message: 'No tiene permisos para acceder a esta pagina'
          })
     }

     next();
}


module.exports = {
     verifyToken,
     verifyRole
}