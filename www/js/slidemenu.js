//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
//init slide menu
var slideMenu = {
    
    initSlideMenu: function(){
        $("#slidemenu").append("<li onclick='signout_onclick();'><div class='itemlabel'>Sign Out</div></li>");
        
    },    
}


//$('#target_div').html('<img src="'+ imgPaht +'" width=100 height=100 alt="Hello Image" />');

//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
//add slide menu event to control
var menuStatus;
$(function(){
	
	$("button.MenuBtn").click(function(){
        
		if(menuStatus != true){	
        
			$(".menubg").animate({
                marginRight: "0px",}, 300, function() {
                    menuStatus = true; 
            });
            
		  	return false;
		  } 
        else {
    
			$(".menubg").animate({
			marginRight: "-50%",
		  }, 300, function(){menuStatus = false;});
              
			return false;
        }
});
});



function clickmenubutton(){
    if(menuStatus != true){				
        $(".menubg").animate({
        marginRight: "0px",}, 300, function() {
        menuStatus = true; 
        });
            
        return false;
    } 
    else {
        $(".menubg").animate({
            marginRight: "-50%",
		  }, 300, function(){menuStatus = false;
        });
              
        return false;
    }
}




function signout_onclick(){
    navigator.notification.confirm("Do you want to sign out?", onConfirm, "Confirmation", "Yes,Cancel"); 
    
}
function onConfirm(button) {
    if(button==2){//If User selected No, then we just do nothing
        return; 
    }else if(button==1){
       window.location="index.html";
        
    }
}

