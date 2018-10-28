function loginAdmin() {
    var username = document.forms["adminLoginForm"]["userName"].value;
    var password = document.forms["adminLoginForm"]["AdminPassword"].value;
    if (username == "dnyanda" && password == "123") {
        console.log("Hello");
        window.location = "adminPage.html";
    }
    else {
        alert("Please Enter Valid Credentials");
    }
}



/**********displaying catergories with sub categories****************/
$(document).ready(function () {
    $.getJSON("../json/category.json", function (result) {
        $.each(result.productCategories, function (i, category) {
            var subMenuData = '';
            $.each(category.subCategory, function (i, sub_categories) {
                subMenuData += '<li style="list-style-type: none; text-transform: capitalize;"><a onClick="displayProductData($(this).text());">' + sub_categories.name + "</a></li>";

            });
            var mainMenuData = "<li class='hello' id=" + category.category + "><a>" + category.category +
                "</a><ul class='sub-menu'>" + subMenuData + "</ul></li>";
            $(mainMenuData).appendTo("#navCategories");
        });

        /*********  menu toggle ***********/
        $(".sub-menu").hide();
        $("#navCategories li").not($('#navCategories li sub-menu li a')).click(function () {
            // $('ul.sub-menu').not($(this).children()).slideUp();
            $(this).children("ul.sub-menu").slideToggle();
        });
    });




    /*****getting all data*****************/
    $.getJSON("../json/data.json", function (data) {
        var productData = '';
        $.each(data.products, function (key, value) {
            productData += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">';
            productData += '<img class="card-img-top" src= ' + value.imageUrl + ' height="300px" width="200px">';
            productData += '<div class="card">';
            productData += '<h4 >' + value.name + '</h4>' + 'Rs.' + value.price;
            productData += '</div>';
            //productData += '<button  class="btn btn-info btn-sm"><span class="glyphicon glyphicon-shopping-cart"></span> Add</button>' + "  " + '<button  class="btn btn-warning btn-sm"><span class="glyphicon glyphicon-heart"></span> WishList</button><br/><br/>';
            productData += '</div>';
        });
        $("#productDataTable").empty();
        $("#productDataTable").append(productData);
    });

});


/*********display perticular data based on category******************/

function displayProductData(subCategory) {
    $(".slideDiv").hide();
    console.log(subCategory);
    $.getJSON("../json/data.json", function (data) {
        var perticularData = [];
        var brandsData = [];
        $.each(data.products, function (key, value) {
            // console.log(localStorage.getItem('category'))
            if (value.subCategory == subCategory) {
                // window.location = "login.html";
                perticularData.push(value);
            }
            if (value.subCategory == subCategory && !brandsData.includes(value.brand)) {
                brandsData.push(value.brand);
            }
        });
        console.log(brandsData);
        console.log(subCategory);
       var brandDisplayData='';
       $.each(brandsData,function(key,value){
           brandDisplayData += '<table><tr>'+value+'</tr><tr><input type="checkbox" name="brand" id='+value+' onclick="applyFilterOnBrand('+value+')"/></tr></table>';
       });
       $("#displayBrands").empty();
       $("#displayBrands").append(brandDisplayData);
      

        //console.log(perticularData);
        var productData = '';
       
        $.each(perticularData, function (key, value) {
            productData += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 main">';
            productData += '<img class="card-img-top" src= ' + value.imageUrl + ' height="300px" width="200px">';
            productData += '<div class="card">';
            productData += '<h4 >' + value.name + '</h4>' + value.price;
            productData += '</div>';
            productData += '<button  class="btn btn-info btn-sm" id=' + value.productId + ' onclick="addToCart(' + value.productId + ')"><span class="glyphicon glyphicon-shopping-cart"></span> Add</button>' + "  " + '<button  class="btn btn-warning btn-sm" id=wish' + value.productId + ' onclick="addToWishList(' + value.productId + ')"><span class="glyphicon glyphicon-heart"></span> WishList</button><br/><br/>';
            productData += '</div>';
        });
        $("#productDataTable").empty();
        $("#productDataTable").append(productData);

    });

}


/*********************cart***************************/
/********adds data to cart************/
var cartData = [];
function addToCart(e) {
    $.getJSON("../json/data.json", function (data) {
        $.each(data.products, function (key, value) {
            // console.log(localStorage.getItem('category'))
            if (value.productId == e.id) {
                // window.location = "login.html";
                cartData.push(value);
            }
        });
        //console.log(perticularData);
    });
    alert("Product Added To Cart");
}


/*******display cart data******* */
function goTocart() {
    console.log("in cart")
    $("#displayBrands").hide();
    var productData = '';
    $.each(cartData, function (key, value) {

        productData += '<table  id=table' + value.productId + ' class="table-responsive">';
        productData += '<tr><td class="imgtd" rowspan="11"><img  src=' + value.imageUrl + ' height="300" width="250"></td></tr>';
        productData += '<tr><td><b> Product Id : </b></td> <td> ' + value.productId + '</td></tr>';
        productData += '<tr><td> <b>Name :</b></td> <td> ' + value.name + '</td></tr>';
        productData += '<tr><td> <b>Price :</b></td> <td> Rs. ' + value.price + '</td></tr>';
        productData += '<tr ><td> <b>Brand : </b></td> <td>' + value.brand + '</td></tr>';
        productData += '<tr ><td><b>Description :</b></td><td>' + value.description + '</td></tr>';
        productData += '<tr><td> <b>Discount :</b></td> <td> ' + value.discount + '%</td></tr>';
        productData += '<tr><td> <b>Rating : </b></td> <td>' + value.rating + ' </td></tr>';
        productData += '<tr><td> <button  class="btn btn-success" id=buy' + value.productId + ' onclick="buyProduct(' + value.productId + ' )"><span class="glyphicon glyphicon-ok"></span> Buy</button>';
        productData += '<td> <button  class="btn btn-danger" id=' + value.productId + ' onclick="removeProductFromCart(' + value.productId + ')"><span class="glyphicon glyphicon-trash"></span> Remove</button></tr>';
    });
    $("#productDataTable").empty();
    $("#productDataTable").append(productData);
}


/******remove from cart**********/
function removeProductFromCart(e) {
    console.log(e.id);
    //console.log(cartStoredData);
    console.log(cartData);
    for (i = 0; i < cartData.length; i++) {
        if (cartData[i].productId == e.id) {

            cartData.splice(i, 1);
        }
    }
    console.log(cartData);
    goTocart();
    alert("Removed Item");
}

/*******buy from cart********/
function buyProduct(e) {
    console.log(e.id);
}




/*******************************wishList********************************/
/*************add to wishlist*****************/
var wishListData = [];
function addToWishList(wishId) {
    console.log(wishId.id)
    console.log("wish" + wishId.id);
    $.getJSON("../json/data.json", function (data) {

        $.each(data.products, function (key, value) {
            // console.log(localStorage.getItem('category'))
            if (value.productId == wishId.id) {
                // window.location = "login.html";
                wishListData.push(value);
            }
        });
        console.log(wishListData);


    });
    alert("Product Added To Cart");
}


/********function for ddisplaying wishlist***********/
function goToWishList() {
    console.log("in wishList")
    $("#displayBrands").hide();
    var productData = '';
    $.each(wishListData, function (key, value) {

        productData += '<table  id=table' + value.productId + ' class="table-responsive">';
        productData += '<tr><td class="imgtd" rowspan="11"><img  src=' + value.imageUrl + ' height="300" width="250"></td></tr>';
        productData += '<tr><td><b> Product Id : </b></td> <td> ' + value.productId + '</td></tr>';
        productData += '<tr><td> <b>Name :</b></td> <td> ' + value.name + '</td></tr>';
        productData += '<tr><td> <b>Price :</b></td> <td> Rs. ' + value.price + '</td></tr>';
        productData += '<tr ><td> <b>Brand : </b></td> <td>' + value.brand + '</td></tr>';
        productData += '<tr ><td><b>Description :</b></td><td>' + value.description + '</td></tr>';
        productData += '<tr><td> <b>Discount :</b></td> <td> ' + value.discount + '%</td></tr>';
        productData += '<tr><td> <b>Rating : </b></td> <td>' + value.rating + ' </td></tr>';
        productData += '<tr><td> <button  class="btn btn-success" id=buy' + value.productId + ' onclick="buyProduct(' + value.productId + ' )"><span class="glyphicon glyphicon-ok"></span> Buy</button>';
        productData += '<td> <button  class="btn btn-danger" id=' + value.productId + ' onclick="removeProductFromWishList(' + value.productId + ')"><span class="glyphicon glyphicon-trash"></span> Remove</button></tr>';
    });
    $("#productDataTable").empty();
    $("#productDataTable").append(productData);
}


/**********remove Data from wishlist***********/
function removeProductFromWishList(e) {
    console.log(e.id);
    //console.log(cartStoredData);
    console.log(wishListData);
    for (i = 0; i < wishListData.length; i++) {
        if (wishListData[i].productId == e.id) {

            wishListData.splice(i, 1);
        }
    }
    console.log(wishListData);
    goToWishList();
    alert("Removed Item");
}




/*****************************************************************************************************/
/****************fliter according to brand****************/

function applyFilterOnBrand(subCategory)
{
    //console.log(subCategory)
    //console.log(subCategory.id);
    var brands = document.getElementsByName("brand");
    var checkedBrands = [];
    var dispalyFliterData = [];
    for (b of brands) {
        if (b.checked) {
            checkedBrands.push(b.id);
        }
    }
    $.getJSON("../json/data.json", function (data) {
        $.each(data.products, function (key, value) {
            if(checkedBrands.includes(value.brand))
            {
                dispalyFliterData.push(value);
            }
        });
        //console.log(dispalyFliterData);
        var productData = '';
        $.each(dispalyFliterData, function (key, value) {
            productData += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 main">';
            productData += '<img class="card-img-top" src= ' + value.imageUrl + ' height="300px" width="200px">';
            productData += '<div class="card">';
            productData += '<h4 >' + value.name + '</h4>' + value.price;
            productData += '</div>';
            productData += '<button  class="btn btn-info btn-sm" id=' + value.productId + ' onclick="addToCart(' + value.productId + ')"><span class="glyphicon glyphicon-shopping-cart"></span> Add</button>' + "  " + '<button  class="btn btn-warning btn-sm" id=wish' + value.productId + ' onclick="addToWishList(' + value.productId + ')"><span class="glyphicon glyphicon-heart"></span> WishList</button><br/><br/>';
            productData += '</div>';
        });
        $("#productDataTable").empty();
        $("#productDataTable").append(productData);
    });
}