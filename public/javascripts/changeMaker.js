var PAGES = [["Homepage","index"],["Plan a Meal","mealplan"],["Environmental Impact","impact"],["Get Recipes","recipes"]];
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
var thisPage = 0;
var isLoggedIn=false;
var user = null;

$(document).ready(function(){
    user = getParameterByName("user");
    if(user != null){
        login(user);
    }
    var test = reload("users");
    if(test == null){
        download([],"users");
    }
});

function setupNav(n){
    thisPage = n;
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
        newUser();
    });
    $("#login td:nth-child(2)").click(function(){
        $(this).off("click").empty().append("<input id='numUser' type='number' placeholder='Usernumber' min='0' max='"+(reload("users").length-1)+"'>").css("padding","0px");
        $("#numUser").keyup(function(){
            if(event.code == "Enter" && this.value!=""){
                login($("#numUser").val());
            }
        });
    });
}

function login(n,isNew){
    isLoggedIn = true;
    for(var i=0; i<$("a").length; i++){
        var prev = $("a").eq(i).attr("href");
        $("a").eq(i).attr("href",prev+"?user="+n);
    }
    $("nav>img").css("filter","brightness(0)");
    $("#user").off("click");
    $("#login").fadeOut(200);
    if(thisPage==1 && !isNew){
        usr = reload("users");
        monday = usr[n][0];
        tuesday = usr[n][1];
        wednesday = usr[n][2];
        thursday = usr[n][3];
        friday = usr[n][4];
        saturday = usr[n][5];
        sunday = usr[n][6];
        displayMealsInDays();
    }
}

function newUser(){
    var usr = reload("users");
    if(thisPage==1){
        usr.push([monday,tuesday,wednesday,thursday,friday,saturday,sunday]);
    }else{
        usr.push([new Day(),new Day(),new Day(),new Day(),new Day(),new Day(),new Day()]);
    }
    download(usr,"users");
    login(usr.length-1,true);
}

function saveMeal(){
    if(isLoggedIn){
        var slate = [monday,tuesday,wednesday,thursday,friday,saturday,sunday];
        var usr = reload("users");
        usr[user]=slate;
        download(usr,"users");
    }
}

//this will save an array of objects to a local storage
function download(array, name) {
    var json = JSON.stringify(array);
    localStorage.setItem(name, json);
}

//this retrieves data from local storage
function reload(name) {
    var text = localStorage.getItem(name);
    var obj = JSON.parse(text);
    return obj;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

