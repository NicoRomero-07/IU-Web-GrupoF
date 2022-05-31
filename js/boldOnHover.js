const button = document.getElementById("categorias");

button.addEventListener("mouseenter", function(event) {

    button.style.fontWeight("bold");

}, false);

button.addEventListener("mouseout", function(event) {

    button.style.fontWeight("normal");
    
}, false);