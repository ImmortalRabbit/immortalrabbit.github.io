$(window).bind('scroll', function () {
    if ($(window).scrollTop() > 100) {
        $('.menu').addClass('fixed');
    } else {
        $('.menu').removeClass('fixed');
    }
});




$(document).ready(function(){

    $("#menu").on("click","a", function (event) {

        //отменяем стандартную обработку нажатия по ссылке

        event.preventDefault();



        //забираем идентификатор бока с атрибута href

        var id  = $(this).attr('href'),



        //узнаем высоту от начала страницы до блока на который ссылается якорь

            top = $(id).offset().top;



        //анимируем переход на расстояние - top за 1500 мс

        $('body,html').animate({scrollTop: top}, 1500);

    });

});


function call() {
  var msg   = $('#form1').serialize();
      $.ajax({
        type: 'POST',
        url: 'mail.php',
        data: msg,
        success: function(data) {
          $('#results').html(data);
        },
        error:  function(xhr, str){
    alert('Возникла ошибка: ' + xhr.responseCode);
        }
      });
    $('#first_name').val('');
    $('#contact').val('');
  }




  function call2() {
    var msg   = $('#form2').serialize();
        $.ajax({
          type: 'POST',
          url: 'mail.php',
          data: msg,
          success: function(data) {
            $('#results2').html(data);
          },
          error:  function(xhr, str){
      alert('Возникла ошибка: ' + xhr.responseCode);
          }
        });
      $('#first_name2').val('');
      $('#contact2').val('');
    }


    function call3() {
      var msg   = $('#form3').serialize();
          $.ajax({
            type: 'POST',
            url: 'mail.php',
            data: msg,
            success: function(data) {
              $('#results3').html(data);
            },
            error:  function(xhr, str){
        alert('Возникла ошибка: ' + xhr.responseCode);
            }
          });
        $('#first_name3').val('');
        $('#contact3').val('');
      }


          function call4() {
            var msg   = $('#form4').serialize();
                $.ajax({
                  type: 'POST',
                  url: 'mail.php',
                  data: msg,
                  success: function(data) {
                    $('#results4').html(data);
                  },
                  error:  function(xhr, str){
              alert('Возникла ошибка: ' + xhr.responseCode);
                  }
                });
              $('#first_name4').val('');
              $('#contact4').val('');
            }


                function call5() {
                  var msg   = $('#form5').serialize();
                      $.ajax({
                        type: 'POST',
                        url: 'mail.php',
                        data: msg,
                        success: function(data) {
                          $('#results5').html(data);
                        },
                        error:  function(xhr, str){
                    alert('Возникла ошибка: ' + xhr.responseCode);
                        }
                      });
                    $('#first_name5').val('');
                    $('#contact5').val('');
                  }


                      function call6() {
                        var msg   = $('#form6').serialize();
                            $.ajax({
                              type: 'POST',
                              url: 'mail.php',
                              data: msg,
                              success: function(data) {
                                $('#results6').html(data);
                              },
                              error:  function(xhr, str){
                          alert('Возникла ошибка: ' + xhr.responseCode);
                              }
                            });
                          $('#first_name6').val('');
                          $('#contact6').val('');
                        }
                        function call7() {
                          var msg   = $('#form7').serialize();
                              $.ajax({
                                type: 'POST',
                                url: 'mail.php',
                                data: msg,
                                success: function(data) {
                                  $('#results7').html(data);
                                },
                                error:  function(xhr, str){
                            alert('Возникла ошибка: ' + xhr.responseCode);
                                }
                              });
                            $('#first_name7').val('');
                            $('#contact7').val('');
                          }
                          function call8() {
                            var msg   = $('#form8').serialize();
                                $.ajax({
                                  type: 'POST',
                                  url: 'mail.php',
                                  data: msg,
                                  success: function(data) {
                                    $('#results8').html(data);
                                  },
                                  error:  function(xhr, str){
                              alert('Возникла ошибка: ' + xhr.responseCode);
                                  }
                                });
                              $('#first_name8').val('');
                              $('#contact8').val('');
                            }
                              
                function open1() {
                  $(".p33").slideToggle(500);
                    $(".p44").hide("blind",500);
                      $(".p55").hide("blind",500);
                        $(".p66").hide("blind",500);
                          $(".p77").hide("blind",500);
                            $(".p88").hide("blind",500);
                }
                function open2() {
                  $(".p33").hide("blind",500);
                    $(".p44").slideToggle(500);
                      $(".p55").hide("blind",500);
                        $(".p66").hide("blind",500);
                          $(".p77").hide("blind",500);
                            $(".p88").hide("blind",500);

                }
                function open3() {
                  $(".p33").hide("blind",500);
                    $(".p44").hide("blind",500);
                      $(".p55").slideToggle(500);
                        $(".p66").hide("blind",500);
                          $(".p77").hide("blind",500);
                            $(".p88").hide("blind",500);
                }
                function open4() {
                  $(".p33").hide("blind",500);
                    $(".p44").hide("blind",500);
                      $(".p55").hide("blind",500);
                        $(".p66").slideToggle(500);
                          $(".p77").hide("blind",500);
                            $(".p88").hide("blind",500);
                }
                function open5() {
                  $(".p33").hide("blind",500);
                    $(".p44").hide("blind",500);
                      $(".p55").hide("blind",500);
                        $(".p66").hide("blind",500);
                          $(".p77").slideToggle(500);
                            $(".p88").hide("blind",500);
                }
                function open6() {
                  $(".p33").hide("blind",500);
                    $(".p44").hide("blind",500);
                      $(".p55").hide("blind",500);
                        $(".p66").hide("blind",500);
                          $(".p77").hide("blind",500);
                            $(".p88").slideToggle(500);
                }
                function politics() {

                }
