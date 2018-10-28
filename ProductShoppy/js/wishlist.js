var wishListStoredData = [];


$(document).ready(function () {
    $.getJSON("../json/data.json", function (data) {
    
        var dataWish = localStorage.getItem('wishData').split(',');

        for (var dataItem of dataWish) {
            console.log(dataItem);
            $.each(data.products, function (key, wishListAddedData) {
                // console.log(localStorage.getItem('category'))
                if (dataItem == "wish"+wishListAddedData.productId) {
                    //console.log("hello");
                    wishListStoredData.push(wishListAddedData);
                }
            });
            console.log(wishListStoredData);
        }


        var wishListDisplayData = '';
        $.each(wishListStoredData, function (key, value) {

            wishListDisplayData += '<table  id=table' + value.productId + '>';
            wishListDisplayData += '<tr><td class="imgtd" rowspan="11"><img  src=' + value.imageUrl + ' height="300" width="250"></td></tr>';
            wishListDisplayData += '<tr><td><b> Product Id : </b></td> <td> ' + value.productId + '</td></tr>';
            wishListDisplayData += '<tr><td> <b>Name :</b></td> <td> ' + value.name + '</td></tr>';
            wishListDisplayData += '<tr><td> <b>Price :</b></td> <td> Rs. ' + value.price + '</td></tr>';
            wishListDisplayData += '<tr ><td> <b>Brand : </b></td> <td>' + value.brand + '</td></tr>';
            wishListDisplayData += '<tr ><td><b>Description :</b></td><td>' +value.description +'</td></tr>';
            wishListDisplayData += '<tr><td> <b>Discount :</b></td> <td> ' + value.discount + '%</td></tr>';
            wishListDisplayData += '<tr><td> <b>Rating : </b></td> <td>' + value.rating + ' </td></tr>';
            wishListDisplayData += '<tr><td> <button  class="btn btn-success" id=buy' + value.productId + ' onclick="buyProduct('+value.productId+' )"><span class="glyphicon glyphicon-ok"></span> Buy</button>';
            wishListDisplayData += '<td> <button  class="btn btn-danger" id=' + value.productId + ' onclick="removeFromWishList(' + value.productId + ')"><span class="glyphicon glyphicon-trash"></span> Remove</button></tr>';
        });
        $("#displayWishListItems").append(wishListDisplayData);


    });


});



/*****removes data from wishlist*************/
function removeFromWishList(e) {
    console.log(e.id);
    //console.log(cartStoredData);
   
    wishListStoredData.splice(e.id,1);
    //cartStoredData = JSON.stringify(cartStoredData);
    var element = document.getElementById("table"+e.id);
    element.parentNode.removeChild(element);
    //localStorage.setItem('cartData',cartStoredData);
    console.log(wishListStoredData);
    alert("Removed Item");
    
}


function buyProduct(e)
{
    console.log("buy"+e.id);
    alert("Thank You")
}
