function loginAdmin() {
	var username = document.forms["adminLoginForm"]["userName"].value;
	var password = document.forms["adminLoginForm"]["AdminPassword"].value;
	if (username == "dnyanda" && password=="123") {
		console.log("Hello");
		window.location="adminPage.html";
	}
	else
	{
		alert("Please Enter Valid Credentials");
	}
}

/**********displaying catergories with sub categories****************/
$(document).ready(function(){
    $.getJSON("../json/category.json",function(result){
        $.each(result.productCategories, function(i,category){
            var subMenuData='';
            $.each(category.subCategory, function(i,sub_categories){
                subMenuData += "<li style='list-style-type: none'><a onClick='displayProductData($(this).closest('li').text(),$(this).text());'>"+sub_categories.name+"</a></li>";

            });
                var mainMenuData ="<li id="+ category.category+" onclick='saveLi("+category.category+")'><a>"+category.category+
                "</a><ul class='sub-menu'>"+subMenuData+"</ul></li>";
            $(mainMenuData).appendTo("#navCategories");
        });

        /*********  menu toggle ***********/
        $(".sub-menu").hide();
        $("#navCategories li").not($('#navCategories li sub-menu li a')).click(function () {
            $('ul.sub-menu').not( $(this).children() ).slideUp();
            $(this).children("ul.sub-menu").slideToggle();
            console.log();
        });
    });

    


    /*****getting all data*****************/
    $.getJSON("../json/data.json",function(data){
        var productData = '';
        $.each(data.products,function(key,value){
            productData += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">';
            productData += '<img class="card-img-top" src= '+value.imageUrl+ ' height="300px" width="200px">';
            productData += '<div class="card">';
            productData += '<h4 >' + value.name+ '</h4>' +value.price ;
         //  productData += '<p>'+value.price+'</p>';
            productData += '</div>';
            productData += '<button  class="btn btn-info btn-sm"><span class="glyphicon glyphicon-shopping-cart"></span> Add</button>'+"  "+'<button  class="btn btn-warning btn-sm"><span class="glyphicon glyphicon-heart"></span> WishList</button><br/><br/>';
            //productData += ;      
            productData +='</div>';
        });
        $("#productDataTable").append(productData);
    })





    /******* searching products *******/
   /* $("#searchProductId").keydown(function(){
        //$("#result").html('');
       
        $.getJSON('../json/data.json',function(data){
            var searchField = $("#searchProductId").val();
            var expression = new RegExp(searchField,'i');
            var output;
            $.each(data,function(key,value){
                if(value.name.search(expression) != -1)
                {
                   output += "<p>" +value.name+"</p>";
                }
            });
            $("#result").html(output);
        });

    });*/
});



function displayProductData(mainCat,subCategory){

  
    alert(mainCat);
    alert(subCategory);
    /*  $.getJSON("../json/data.json",function(data){
        var perticularData = [];
        $.each(data.products, function(key,value){
            console.log(localStorage.getItem('category'))
            if(value.category == (localStorage.getItem('category')))
            {
              // window.location = "login.html";
              console.log(1)
               perticularData.push(value);
               console.log(perticularData);
            }
        })
        
    });*/
  
}

var saveLi = function(e){
    localStorage.setItem('category',e.id);
    console.log(e.id)
}


