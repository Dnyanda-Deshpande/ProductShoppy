function loginAdmin() {
	var username = document.forms["adminLoginForm"]["userName"].value;
	var password = document.forms["adminLoginForm"]["AdminPassword"].value;
	if (username == "dnyanda" && password=="123") {
		console.log("Hello");
		window.location="main.html";
	}
	else
	{
		alert("Please Enter Valid Credentials");
	}
}