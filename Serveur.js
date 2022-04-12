const fs = require('fs');

const http = require('http');
const hostname = '127.0.0.1';
const port = 8080;
const express = require("express");
const server = express();

const pg = require('pg');
const pool = new pg.Pool({
user: 'cheikou',
host: 'localhost',
database: 'projet2',
password: ' ', // accès à une information externe
port: 5432
});

async function op(){
  const client = await pool.connect();
  let res = await client.query('SELECT * FROM pizza');
  return res;
}
server.get('/', function (req, res) {
  res.sendFile("accueil.html", {root: 'public'});
});

server.listen(port, () => {
  console.log('Server running at http://localhost:${port} ');
});

server.get("/pizza", (req, res) => {
    let a = op().then(resultat=>{res.json(resultat.rows)})
    .catch(err => console.err-(err.stack));

});

server.get("/images/:photo", (req, res) =>{
  console.log(req);
  res.sendFile(req.params.photo, {root: 'public/images'});
});

server.use(express.static('public'));
