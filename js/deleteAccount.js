const button = document.getElementById("deleteaccountbtn");

button.addEventListener("mouseenter", function(event) {

    button.classList.remove('text-danger');
    button.classList.add('text-white');

}, false);

button.addEventListener("mouseout", function(event) {

    button.classList.remove('text-white');
    button.classList.add('text-danger');

}, false);