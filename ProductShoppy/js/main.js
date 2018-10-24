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
                subMenuData += "<li style='list-style-type: none; text-transform: capitalize;'><a onClick='displayProductData($(this).text());'>" + sub_categories.name + "</a></li>";

            });
            var mainMenuData = "<li id=" + category.category + "><a>" + category.category +
                "</a><ul class='sub-menu'>" + subMenuData + "</ul></li>";
            $(mainMenuData).appendTo("#navCategories");
        });

        /*********  menu toggle ***********/
        $(".sub-menu").hide();
        $("#navCategories li").not($('#navCategories li sub-menu li a')).click(function () {
            $('ul.sub-menu').not($(this).children()).slideUp();
            $(this).children("ul.sub-menu").slideToggle();
            console.log();
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


/*********display perticular data*************/
function displayProductData(subCategory) {


    // alert(mainCat);
    $(".slideDiv").hide();
    console.log(subCategory);
    $.getJSON("../json/data.json", function (data) {
        var perticularData = [];
        $.each(data.products, function (key, value) {
            // console.log(localStorage.getItem('category'))
            if (value.subCategory == subCategory) {
                // window.location = "login.html";
                perticularData.push(value);
            }
        });
        //console.log(perticularData);

        var productData = '';
        $.each(perticularData, function (key, value) {
            // var id=value.productId;
            //console.log(id);
            productData += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">';
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





/***this function adds data to cartElements************/
function addToCart(e) {
    if (localStorage.getItem('cartData') != null) {
        var cartElements = [];
        cartElements.push(localStorage.getItem('cartData'));
        cartElements.push(e.id);
        localStorage.setItem('cartData', cartElements);
    }
    else {
        var cartElements = [];
        cartElements.push(e.id);
        localStorage.setItem('cartData', cartElements);
    }
}


/*************add to wishlist*****************/
function addToWishList(wishId)
{
    console.log("wish"+wishId.id);
    if (localStorage.getItem('wishData') != null) {
        var wishListElements = [];
        wishListElements.push(localStorage.getItem('wishData'));
        wishListElements.push("wish"+wishId.id);
        localStorage.setItem('wishData', wishListElements);
    }
    else {
        var wishListElements = [];
        wishListElements.push("wish"+wishId.id);
        localStorage.setItem('wishData', wishListElements);
    }
}
