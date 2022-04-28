const fs = require('fs');

const http = require('http');
const hostname = '127.0.0.1';
const port = 8080;
const express = require("express");
const server = express();

const pg = require('pg');
const pool = new pg.Pool({
user: 'useradmin',
host: 'localhost',
database: 'projet2',
password: 'mypass', // accès à une information externe
port: 5432
});

async function selectAll(s){
  const client = await pool.connect();
  let res = await client.query('SELECT * FROM ' + s);
  client.release();
  return res;
}

server.get('/', function (req, res) {
  res.sendFile("accueil.html", {root: 'public'});
});

server.listen(port, () => {
  console.log('Server running at http://localhost:'+port);
});

server.get("/pizza", (req, res) => {
    let a = selectAll('pizza').then(resultat=>{res.json(resultat.rows)})
    .catch(err => console.err-(err.stack));

});
server.get("/entree", (req, res) => {
  let a = selectAll('entree').then(resultat=>{res.json(resultat.rows)})
  .catch(err => console.err-(err.stack));

});
server.get("/boisson", (req, res) => {
  let a = selectAll('boisson').then(resultat=>{res.json(resultat.rows)})
  .catch(err => console.err-(err.stack));

});
server.get("/menu", (req, res) => {
  let a = selectAll('menu').then(resultat=>{res.json(resultat.rows)})
  .catch(err => console.err-(err.stack));

});


server.get("/images/:photo", (req, res) =>{
  res.sendFile(req.params.photo, {root: 'public/images'});
});

server.use(express.static('public'));