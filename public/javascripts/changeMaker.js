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
        $(this).off("click").empty().append("<input id='numUser' type='number' placeholder='Usernumber'>").css("padding","0px");
        $("#numUser").keyup(function(){
            if(event.code == "Enter" && this.value!=""){
                console.log("user #"+$("#numUser").val());
            }
        });
    });
}


var selected = [];

function Day() {
    this.meals = [];
    this.carbonFootprint = {};
    this.remove = function (name) {
        for(var i = 0; i < this.meals.length; i++) {
            if(name == this.meals[i].name) {
                this.meals.splice(i, 1);
            }
        }
    }
}

var monday = new Day();
var tuesday = new Day();
var wednesday = new Day();
var thursday = new Day();
var friday = new Day();
var saturday = new Day();
var sunday = new Day();