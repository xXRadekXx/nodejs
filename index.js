const express = require('express')//import express fw
const app = express()//spusteni expresu
const port = 80//definovani portu
const path = require('path');//pro manipulaci s cestami, ať už se jedná o absolutní cesty, relativní cesty
const bodyParser = require('body-parser');//imort bodyParseru

app.use(bodyParser.urlencoded({ extended: false })); //dekoduje data poslana pres POST


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

var mysql = require('mysql2');

const con = mysql.createConnection({
    host: '192.168.1.161', // Název nebo IP adresa serveru databáze
    user: 'radek.dvorak', // Uživatelské jméno
    password: 'Dvo240512Rak6057', // Heslo
    database: 'radek.dvorak', // Název databáze
    port: 3001
  });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/newuser2', (req, res) => {//home routa

  
  res.render('newuser');

})

app.post('/newuser', function (request, response, next) {
  console.log(request.body)
    // SQL dotaz pro vložení dat do databáze
    var sql = `INSERT INTO rawr (First_Name, Last_Name, Age) VALUES ('${request.body.fname}','${request.body.lname}',${request.body.age})`;
   
    con.query(sql, (error, results, fields) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(results);
    })
    response.send(`Uživatele byli vloženi do DB`)
   
  })
app.get('/', (req, res) => {//home routa
    


    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM rawr", function (err, results, fields) {
          if (err) throw err;
          //console.log(results);
          res.render('index', { results });
        });
      });

})
app.listen(port, () => {//spustni serveru
  console.log(`Example app listening on port ${port}`)
})

