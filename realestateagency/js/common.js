function call() {
  var msg   = $('#send').serialize();
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
    $('#name').val('');
    $('#tele').val('');
    $('#email').val('');
  }


  function call7() {
                          var msg   = $('#form7').serialize();
                              $.ajax({
                                type: 'POST',
                                url: 'mail1.php',
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
                                                          url: 'mail1.php',
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
                                                    function call9() {
                                                                            var msg   = $('#form9').serialize();
                                                                                $.ajax({
                                                                                  type: 'POST',
                                                                                  url: 'mail1.php',
                                                                                  data: msg,
                                                                                  success: function(data) {
                                                                                    $('#results9').html(data);
                                                                                  },
                                                                                  error:  function(xhr, str){
                                                                              alert('Возникла ошибка: ' + xhr.responseCode);
                                                                                  }
                                                                                });
                                                                              $('#first_name9').val('');
                                                                              $('#contact9').val('');
                                                                            }
