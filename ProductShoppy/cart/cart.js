$(document).ready(function () {
    $.getJSON("../json/data.json", function (data) {
        var perticularData = [];
        var dataCart = localStorage.getItem('cartData').split(',');
  
        for (var d of dataCart) {
            console.log(d);
             $.each(data.products, function(key,value){
                 // console.log(localStorage.getItem('category'))
                 
                
                  if( d == value.productId)
                  {
                     console.log("hello");
                     perticularData.push(value);
                  }
              });
            //console.log(perticularData);
        }

        var productData = '';
        $.each(perticularData, function (key, value) {
            // var id=value.productId;
            //console.log(id);
            productData += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">';
            productData += '<img class="card-img-top" src= ' + value.imageUrl + ' height="300px" width="200px">';
            productData += '<div class="card">';
            productData += '<h4 >' + value.name + '</h4>' + value.price + value.productId;
            productData += '</div>';
            productData += '<button  class="btn btn-info btn-sm" id=' + value.productId + ' onclick="addToCart(' + value.productId + ')"><span class="glyphicon glyphicon-shopping-cart"></span> Add</button>' + "  " + '<button  class="btn btn-warning btn-sm"><span class="glyphicon glyphicon-heart"></span> WishList</button><br/><br/>';
            productData += '</div>';
        });
        $("#productDataTable").empty();
        $("#productDataTable").append(productData);

    });


});