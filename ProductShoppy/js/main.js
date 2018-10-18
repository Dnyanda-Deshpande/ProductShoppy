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

$(document).ready(function(){
   
    $.getJSON("../json/data.json", function(result){
        $.each(result, function(i, field){
            $("#navCategories").append("<li>"+field.category + "</li> ");
            console.log(field.category);
        });
    });

});