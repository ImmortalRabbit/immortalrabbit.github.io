
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

var btn2 = document.getElementById("myBtn2");

var btn3 = document.getElementById("myBtn3");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

btn2.onclick = function() {
    modal.style.display = "block";
}

btn3.onclick = function() {
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


$(document).on("click", ".flip-container", function () {
    $(this).toggleClass('hover');
    var a = $(this).getElementsByClassName("front")[0].attr('class').split(' ')[0];
    var b = $(this).getElementsByClassName("back")[0].attr('class').split(' ')[0];
    $(this).getElementsByClassName("front")[0].attr('class', 'temp');
    $(this).getElementsByClassName("back")[0].attr('class', b +' front');
    $(this).getElementsByClassName("temp")[0].attr('class', a + ' back');
});


// .front {
//   z-index: 2;
//   /* for firefox 31 */
//   transform: rotateY(0deg);
// }

// /* back, initially hidden pane */
// .back {
//   transform: rotateY(180deg);
// }

window.onload = function () {
  document.getElementById("esil").onclick = function() {
    fillArea("esil")
    clearArea("baik","alm","sary")
    changeValue("Есиль")

  }
  document.getElementById("alm").onclick = function() {
    fillArea("alm")
    clearArea("esil","baik","sary")
    changeValue("Алматы")
  }
  document.getElementById("sary").onclick = function() {
    fillArea("sary")
    clearArea("esil","alm","baik")
    changeValue("Сарыарка")
  }
  document.getElementById("baik").onclick = function() {
    fillArea("baik")
    clearArea("esil","alm","sary")
    changeValue("Байконыр")
  }

  function fillArea(x){
    document.getElementsByClassName(x)[0].style.stroke = "white";
    document.getElementById(x).style.fill = "#27C984";
  }
  function clearArea(x,y,z){
    back(x)
    back(y)
    back(z)
  }
  function back(x){
    document.getElementsByClassName(x)[0].style.stroke = "0D1F31";
    document.getElementById(x).style.fill = "#fff";
  }

  function changeValue(x){
    document.getElementById("text_changer").innerHTML = "Район: " + x;
  }
}


// window.onload=function() {
//     // Get the Object by ID
//     var a = document.getElementById("svgObject");
//     alert(a);
//     // Get the SVG document inside the Object tag
//     var svgDoc = a.contentDocument;

//     alert(svgDoc);
//     // Get one of the SVG items by ID;
//     var svgItem = svgDoc.getElementById("alm");
//     // Set the colour to something else
//     svgItem.onclick = function() {
//         changeValue("Алматы")
//     }

//     function changeValue(x){
//         document.getElementById("text_changer").innerHTML = "Район: " + x
//     }
// };
