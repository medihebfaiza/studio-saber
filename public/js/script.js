/* Theme JQuery */
$(function() {

    $('#login-form-link').click(function(e) {
    	$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

  "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){
            $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

});

/* AngularJS */
;(function(){
function authInterceptor(API, auth) {
  return {
    // automatically attach Authorization header
    request: function(config) {
      return config;
    },

    // If a token was sent back, save it
    response: function(res) {
      return res;
    },
  }
}

function authService($window) {
  var self = this;

  self.parseJwt = function(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse($window.atob(base64));
  }

  self.saveToken = function(token) {
    $window.localStorage['jwtToken'] = token;
  }

  self.getToken = function() {
    return $window.localStorage['jwtToken'];
  }
}

function userService($http, API, auth) {
  var self = this;

  self.login = function(email, password) {
    return $http.post(API + '/client/login', {
      email: email,
      password: password
    })
  };

  self.register = function(firstName,lastName,telNumber,email,password){
    return $http.post(API + '/client/register', {
      firstName: firstName,
      lastName: lastName,
      telNumber: telNumber,
      email: email,
      password: password
    });
  }
}

function NavbarCtrl(user, auth) {
  var self = this ;

  self.logout = function() {
    auth.saveToken(null) ;
  }
}

function RegisterCtrl(user, auth) {
  var self = this;

  function handleRequest(res) {
    var message = res.data ? res.data.message : null;
    if(message) {
      self.alertType = 'success' ;
      self.message = message; // HIDE LOGIN AND REGISTER FORM AND RENDER LOGOUT BUTTON
    }
  }

  self.register = function() {
    if (self.firstName == null){
      self.alertType = null ;
      self.message = "Enter First Name Please" ;
    }
    else if (self.gender == null){
      self.alertType = null ;
      self.message = "Enter Gender Please" ;
    }
    else if (self.telNumber == null){
      self.alertType = null ;
      self.message = "Enter Telephone Number Please" ;
    }
    else if (self.email == null){
      self.alertType = null ;
      self.message = "Enter E-mail Please" ;
    }
    else if (self.password == null){
      self.alertType = null ;
      self.message = "Enter Password Please" ;
    }
    else if (self.password != self.confirmPassword){
      self.message = "The two passwords does not Match" ;
    }
    else {
      user.register(self.firstName, self.lastName, self.telNumber, self.email, self.password)
        .then(handleRequest, handleRequest)
    }
  }

}

function LoginCtrl(user, auth) {
  var self = this;

  function handleRequest(res) {
    var token = res.data ? res.data.token : null;
    if(token) {
      console.log('JWT:', token);
      auth.saveToken(res.data.token);//save the token here
      self.alertType = 'success' ;
      self.message = "Successfully Logged in"; // HIDE LOGIN AND REGISTER FORM AND RENDER LOGOUT BUTTON
    }
    else {
      self.alertType = 'danger' ;
      self.message = "Wrong Password/E-mail"
    }
  }

  self.login = function() {
    user.login(self.email, self.password)
      .then(handleRequest, handleRequest)
  }
  self.logout = function() {
    auth.logout && auth.logout()
  }
  self.isAuthed = function() {
    return auth.isAuthed ? auth.isAuthed() : false
  }
}

angular.module('app', [])
.factory('authInterceptor', authInterceptor)
.service('user', userService)
.service('auth', authService)
.constant('API', 'http://localhost:5000') //USE THIS LOCALLY
/*.constant('API', 'https://studio-saber.herokuapp.com')*/ //USE THIS FOR DEPLOYMENT
.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
})
.controller('Login', LoginCtrl)
.controller('Register', RegisterCtrl)
.controller('Navbar', NavbarCtrl)
})();
