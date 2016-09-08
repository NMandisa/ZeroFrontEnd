angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
       
    .state('login', {
      url: '/page1',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl',

		 resolve:{
			"check":function($location){  
			 if(sessionStorage.getItem('loggedin_id')){ $location.path('/page9');   }
				else									 {  $location.path('/page1');   }
			 }
		  }
    }) 
    .state('signup', {
      url: '/page2',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })   
    .state('profile', {
      url: '/page3',
      templateUrl: 'templates/profile.html',
      controller: 'profileCtrl'  
    })
    .state('forgot-Password', {
      url: '/page4',
      templateUrl: 'templates/forgotPassword.html',
      controller: 'forgotPasswordCtrl'  
    })              
    .state('editProfile', {
      url: '/page5',
      templateUrl: 'templates/editProfile.html',
      controller: 'editProfileCtrl'
    })
    .state('verify-account', {
      url: '/page6',
      templateUrl: 'templates/verifyProfile.html',
      controller: 'verifyProfileCtrl'  
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise(function($injector, $location){
      var $state = $injector.get("$state");
      $state.go('login');
  });

});