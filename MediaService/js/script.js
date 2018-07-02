
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

var btn2 = document.getElementById("myBtn2");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

btn2.onclick = function() {
    modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

$('.navigation_div ul li a').on('click', function() {

    var scrollAnchor = $(this).attr('data-scroll'),
        scrollPoint = $('div[data-anchor="' + scrollAnchor + '"]').offset().top - 75;

    $('body,html').animate({
        scrollTop: scrollPoint
    }, 500);

    return false;

})



$('.navigation_hamburger ul li a').on('click', function() {

    var scrollAnchor = $(this).attr('data-scroll'),
        scrollPoint = $('div[data-anchor="' + scrollAnchor + '"]').offset().top - 75;

    $('body,html').animate({
        scrollTop: scrollPoint
    }, 500);

    return false;

})