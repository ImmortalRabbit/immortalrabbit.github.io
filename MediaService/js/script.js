function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight= "0";
    document.body.style.backgroundColor = "white";
}



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

$(document).on("click", ".flip-container", function () {
    $(this).toggleClass('hover');
});

$('.navigation_div ul li a').on('click', function() {

    var scrollAnchor = $(this).attr('data-scroll'),
        scrollPoint = $('div[data-anchor="' + scrollAnchor + '"]').offset().top - 75;

    $('body,html').animate({
        scrollTop: scrollPoint
    }, 500);

    return false;

})



$('.sidenav a').on('click', function() {

    var scrollAnchor = $(this).attr('data-scroll'),
        scrollPoint = $('div[data-anchor="' + scrollAnchor + '"]').offset().top - 75;
    closeNav()
    $('body,html').animate({
        scrollTop: scrollPoint
    }, 500);

    return false;

})


$(document).on("click", ".flip-container", function () {
    $(this).toggleClass('hover');
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