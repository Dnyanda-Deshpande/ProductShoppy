var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
var parser = require('body-parser');
var dataInFile = require("../json/data.json");

let products = []
/****************getting all products********************/
app.get('/productShoppy/getProducts', (req, res)=>{
    fs.readFile("../json/data.json", (err, data)=> {
        products = JSON.parse(data.toString())
       //console.log(products)
        res.send(products)
    });
});


app.use(parser.json())
/*****************adding data in file************************/
app.post('/productShoppy/addProductData', (req, res)=>{
    dataInFile.push(req.body);
    res.send(dataInFile);
    fs.writeFileSync("../json/data.json", JSON.stringify(dataInFile));
    console.log("Added a new product");
});


/*************************** deleting product*************/
app.get('/productShoppy/deleteProduct/:id',(req,res)=>
{
    var id = req.params.id;
    for (var i = 0; i < dataInFile.length; i++) {
        if (dataInFile[i].productId == id)
        {
          dataInFile.splice(i, 1);
          res.send(dataInFile);
        }
      }
      fs.writeFileSync("../json/data.json", JSON.stringify(dataInFile));
      console.log("Deleted product with id: "+ id);
});


app.listen(8080, ()=> console.log("Listening on port 8080"));
