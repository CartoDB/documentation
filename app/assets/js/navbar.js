require('./hangar2/navbar');

var searchElements = document.getElementsByClassName("js-search");
for (var i = 0; i < searchElements.length; i++){
    searchElements[i].addEventListener("focus", hideElements);
    searchElements[i].addEventListener("focusout", showElements);
}

function hideElements(){
    var elements = document.getElementsByClassName("js-hide-on-focus");
    for(var i = 0; i < elements.length; i++){
        elements[i].classList.add("hidden");
    }
}

function showElements(){
    var elements = document.getElementsByClassName("js-hide-on-focus");
    for(var i = 0; i < elements.length; i++){
        elements[i].classList.remove("hidden");
    }
}