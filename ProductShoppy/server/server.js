var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
var parser = require('body-parser');
var cors = require('cors');

var dataInFile = require("../json/data.json");
var category = require("../json/category.json");




let products = []




/****************getting all products********************/
app.get('/getProducts', (req, res)=>{
    fs.readFile("../json/data.json", (err, data)=> {
        products = JSON.parse(data.toString())
       //console.log(products)
        res.send(products)
    });
});




app.use(parser.urlencoded({ extended: false }));
app.use(parser.json())
/********************deleting product with id**************************/
app.route('/deleteProduct/:id',cors()).delete((req,res)=>{
    console.log(req.params.id)
    
   fs.readFile('../json/data.json',function(err,data){
       // res.writeHead(200,{'Content-Type':'text/plain'});
       dataInFile = JSON.parse(data.toLocaleString());
            for(i=0;i<dataInFile.products.length;i++)
            {
                if(dataInFile.products[i].productId==req.params.id)
                {
                    console.log("hello")
                    dataInFile.products[i].splice(i,1);
                }
            }
          // res.send(dataInFile);
       
    });
    fs.writeFileSync('../json/data.json',JSON.stringify(dataInFile))
    res.send(dataInFile)
});


app.listen(8080, ()=> console.log("Listening on port 8080"));
