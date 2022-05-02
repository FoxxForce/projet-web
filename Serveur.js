const fs = require('fs');

const http = require('http');
const hostname = '127.0.0.1';
const port = 8080;
const express = require("express");
const server = express();

server.use(express.urlencoded({extended: true}));
server.use(express.static('public'));
server.set('view engine', 'ejs');

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

server.get('/formulaire', function (req, res) {
  var now = new Date();
  var hourPlusOne = now.getHours() + 1;
  let data = {
    time: ("0"+hourPlusOne).slice(-2)+':'+("0"+now.getMinutes()).slice(-2),
    error: "",
  };
  res.render('formulaire.ejs', data);
});

async function addOrder(data){
  const client = await pool.connect();
  let requestSQL = "insert into commande values(\'"+data.body.lastname+"\', \'"+data.body.firstname+
  "\', \'"+data.body.adress+"\', "+data.body.postal+", \'"+data.body.city+"\', \'"+data.body.supp+
  "\', \'"+data.body.phone+"\', \'"+data.body.email+"\', \'"+data.body.time+"\');";
  console.log(requestSQL);
  await client.query(requestSQL);
  client.release();
}

server.post("/formulaire-client", (req, res) =>{
  let regexAdress = /^[0-9]+ {1}.+$/;
  let regexPostal = /^[0-9]{5}$/;
  let regexPhone = /^[0-9]{10}$/;
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if(req.body.lastname === '' || req.body.firstname === '' ||
    req.body.firstname === '' || regexAdress.test(req.body.adress) == false ||
    regexPostal.test(req.body.postal) == false || req.body.city === '' ||
    regexPhone.test(req.body.phone) == false || regexEmail.test(req.body.email) == false ||
    req.body.time<'11:00' || req.body.time>'23:00'){
      var now = new Date();
      var hourPlusOne = now.getHours() + 1;
      let data = {
        time: ("0"+hourPlusOne).slice(-2)+':'+("0"+now.getMinutes()).slice(-2),
        error: "un champs n'a pas été respecté",
      };
      res.render('formulaire.ejs', data);
  }else{
    addOrder(req);
    res.send("Merci, demande prise en compte");
  }
});
