
$('#btn_register').click(function () {
  location.href = 'register';
});

const createAlert = function (error) {
  if ($('#div_alert').find('strong')) {
    $('#div_alert').find('strong').remove();
  }

  $('#div_alert')
    .addClass('alert alert-info')
    .append('<strong> ' + error + ', try again</string>');
  return true;
};

function showGreetingMessage(message) {
  if ($('#div_alert').find('strong')) {
    $('#div_alert').find('strong').remove();
  }

  $('#div_alert')
    .addClass('alert alert-success')
    .append('<strong> ' + message + '</string>');
  return true;
}

// Check fields before submit
$('form').submit(function (event) {
  let username = $.trim($('#username').val());
  let password = $.trim($('#password').val());

  if (username === '' || password === '') {
    $('#div_alert')
      .addClass('alert alert-info')
      .append('<strong>Username or password is incorrect, try again</string>');
    return false;
  }

  event.preventDefault();
  $.ajax({
    url: '/',
    method: 'POST',
    data: JSON.stringify({
      username: username,
      password: password,
    }),
    contentType: 'application/json',

    success: function (res) {
      // const name = res.name;
      
      if (res.response !== '') {
        // error accured
        createAlert(res.response);
      } else {
        showGreetingMessage('Registration successful!');
        setTimeout(() => {
          sessionStorage.setItem('name',res.name);
          location.href = '/mainpage';
        }, 2 * 1000);
      }
    },
  });
});