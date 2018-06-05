var PAGES = [["Homepage","index"],["Plan a Meal","mealplan"],["Environmental Impact","impact"],["Get Recipes","recipes"]];

function setupNav(n){
    $("body").prepend("<nav><a id='logo' href='index.html'><img src='public/images/globe-with-leaf.png'></a></nav>");
    for(var i=0; i<4; i++){
        $("nav").append("<a href='"+PAGES[i][1]+".html'>"+PAGES[i][0]+"</a>");
        if(n==i){
            $("nav a:last-child").addClass("current");
        }
    }
    $("nav").append("<img src='public/images/user.png' id='user'>").append("<div id='login'><table><tr><td>New User</td><td>Existing User</td></tr></table></div>");
    $("#login").hide();
    $("#user").click(function(){
        $("#login").fadeToggle(200);
    });
    $("#login td:first-child").click(function(){
        console.log("new user");
    });
    $("#login td:nth-child(2)").click(function(){
        $(this).empty().append("<input id='numUser' type='number'>");
        $("#numUser").keyup(function(){
            if(event.code == "Enter" && this.value!=""){
                console.log("user #"+$("#numUser").val());
            }
        });
    });
}
