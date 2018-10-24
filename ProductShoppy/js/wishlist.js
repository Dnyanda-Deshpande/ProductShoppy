var cartStoredData = [];


$(document).ready(function () {
    $.getJSON("../json/data.json", function (data) {
    
        var dataCart = localStorage.getItem('wishData').split(',');

        for (var dataItem of dataCart) {
            console.log(dataItem);
            $.each(data.products, function (key, cartAddedData) {
                // console.log(localStorage.getItem('category'))
                if (dataItem == "wish"+cartAddedData.productId) {
                    //console.log("hello");
                    cartStoredData.push(cartAddedData);
                }
            });
            console.log(cartStoredData);
        }


        var cartDisplayData = '';
        $.each(cartStoredData, function (key, value) {

            cartDisplayData += '<table  id=table' + value.productId + ' class="table-responsive">';
            cartDisplayData += '<tr><td class="imgtd" rowspan="11"><img  src=' + value.imageUrl + ' height="300" width="250"></td></tr>';
            cartDisplayData += '<tr><td><b> Product Id : </b></td> <td> ' + value.productId + '</td></tr>';
            cartDisplayData += '<tr><td> <b>Name :</b></td> <td> ' + value.name + '</td></tr>';
            cartDisplayData += '<tr><td> <b>Price :</b></td> <td> Rs. ' + value.price + '</td></tr>';
            cartDisplayData += '<tr ><td> <b>Brand : </b></td> <td>' + value.brand + '</td></tr>';
            cartDisplayData += '<tr ><td><b>Description :</b></td><td>' +value.description +'</td></tr>';
            cartDisplayData += '<tr><td> <b>Discount :</b></td> <td> ' + value.discount + '%</td></tr>';
            cartDisplayData += '<tr><td> <b>Rating : </b></td> <td>' + value.rating + ' </td></tr>';
            cartDisplayData += '<tr><td> <button  class="btn btn-success" id=buy' + value.productId + ' onclick="buyProduct('+value.productId+' )"><span class="glyphicon glyphicon-ok"></span> Buy</button>';
            cartDisplayData += '<td> <button  class="btn btn-danger" id=' + value.productId + ' onclick="removeProductFromCart(' + value.productId + ')"><span class="glyphicon glyphicon-trash"></span> Remove</button></tr>';
        });
        $("#displayCartItems").append(cartDisplayData);


    });


});

