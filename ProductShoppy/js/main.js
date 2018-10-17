	
	$(document).ready(function(){
    $("button").click(function(){
        $.getJSON("../json/mobileData.json", function(result){
            $.each(result, function(i, field){
                $("div").append(field + " ");
				console.log(result);
            });
        });
    });
});