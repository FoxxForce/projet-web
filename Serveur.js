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
  let requestSQL = "insert into commande ( nom, prenom, adresse, code_postale, ville, supp, tel, email , heure) values(\'"+data.body.form.lastname+"\', \'"+data.body.form.firstname+
  "\', \'"+data.body.form.adress+"\', "+data.body.form.postal+", \'"+data.body.form.city+"\', \'"+data.body.form.supp+
  "\', \'"+data.body.form.phone+"\', \'"+data.body.form.email+"\', \'"+data.body.form.time+"\');";
  await client.query(requestSQL);
  let res = await client.query('SELECT MAX(id) FROM commande');
  client.release();
  return res;
}


server.post("/formulaire-client", (req, res) =>{
  
  let regexAdress = /^[0-9]+ {1}.+$/;
  let regexPostal = /^[0-9]{5}$/;
  let regexPhone = /^[0-9]{10}$/;
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if(req.body.form.lastname === '' || req.body.form.firstname === '' ||
    req.body.form.firstname === '' || regexAdress.test(req.body.form.adress) == false ||
    regexPostal.test(req.body.form.postal) == false || req.body.form.city === '' ||
    regexPhone.test(req.body.form.phone) == false || regexEmail.test(req.body.form.email) == false ||
    req.body.form.time<'11:00' || req.body.form.time>'23:00'){
      var now = new Date();
      var hourPlusOne = now.getHours() + 1;
      let data = {
        time: ("0"+hourPlusOne).slice(-2)+':'+("0"+now.getMinutes()).slice(-2),
        error: "un champs n'a pas été respecté",
      };
      res.render('formulaire.ejs', data);
  }else{
    let panier = JSON.stringify(req.body.panier);
    addOrder(req).then(resultat=>{console.log('commande' + resultat.rows[0]['max']);
    fs.writeFileSync('commande' + resultat.rows[0]['max'], panier);})
    .catch(err => console.err-(err.stack));
    res.send("Merci, demande prise en compte");
  }
});

