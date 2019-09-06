process.env.PORT = process.env.PORT || 3200;

process.env.SEED = process.env.SEED || 'secret-dev' ;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
let urlDB;
if (process.env.NODE_ENV === 'dev') {
     urlDB = 'mongodb://localhost:27017/almacen';
} else {
     urlDB = "mongodb+srv://santiago:9544nmSa2Z1qhkkl@cluster0-vzhhn.mongodb.net/almacen"
}

process.env.URLDB  = urlDB;