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
        $.each(result, function(i,category){
            var subMenuData='';
            $.each(category.sub_categories, function(i,sub_categories){
                subMenuData += "<li><a>"+sub_categories.name+"</a></li>";

            });
                var mainMenuData ="<li><a>"+category.categoryName+
                "</a><ul>"+subMenuData+"</ul></li>";
            $(mainMenuData).appendTo("#navCategories");
        });
    });



    /*****getting all data*****************/
    $.getJSON("../json/data.json",function(data){
        var productData = '';
        $.each(data,function(key,value){
         
            productData += '<tr><td  style="padding-right: 250px" rowspan="5"><img src= '+value.imageUrl+ ' width="200px" height="350px"></td></tr>';
            productData += '<tr><td>' + value.name+ '</td></tr>';
            productData += '<tr><td>' + value.price+ '</td></tr>';
            productData += '<tr><td> <button  class="btn btn-success"><span class="glyphicon glyphicon-ok"></span> Add to Cart</button></tr>';
            productData += '<tr><td> <button  class="btn btn-danger"><span class="glyphicon glyphicon-heart"></span> Add To wishList</button></tr>';
        
        });
        $("#productDataTable").append(productData);
    })

});