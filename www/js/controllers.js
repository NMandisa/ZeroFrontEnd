angular.module('app.controllers', [])    
   
.controller('loginCtrl', function($scope,$http,$ionicPopup,$state,$ionicHistory) {
		$scope.user = {};
		var baseUrl="http://localhost:8080";
		$scope.login = function() {
			console.log('in login method');
        	var dataObjUser;
        	dataObjUser= {
            "password": $scope.user.password,
            "emailAddress": $scope.user.email
        	};
        	var parameter = JSON.stringify(dataObjUser);
        	$http({
            method: 'post',
            url: baseUrl + "/users/login",
            data: parameter
        	})
			.success(function (response){
				
        		var dataLogin= {
        		"userId": response.userId,
            	"password": response.password,
    			"emailAddress": response.emailAddress,
    			"firstName": response.firstName,
    			"surname": response.surname,
    			"username": response.username,
   				"gender": response.gender,
     			"activate":response.activate
        		};
				// Store Loggined in user as an Object unused object
				sessionStorage.setItem('loggeduser', JSON.stringify(dataLogin));

				//Store Logged in user an specific key and assign value
				sessionStorage.setItem('loggedin_id', response.userId);
				sessionStorage.setItem('loggedin_firstname', response.firstName);
				sessionStorage.setItem('loggedin_surname', response.surname );
				sessionStorage.setItem('loggedin_password', response.password);
				sessionStorage.setItem('loggedin_username', response.username);
				sessionStorage.setItem('loggedin_emailAddress', response.emailAddress);
				sessionStorage.setItem('loggedin_gender', response.gender);
				
				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});
				$state.go('profile', {}, {location: "replace", reload: true});
				
			}).error(function() {
					var alertPopup = $ionicPopup.alert({
						title: 'Login failed!',
						template: 'Please check your credentials!'
					});
			});
		};
		
})
   
.controller('signupCtrl', function($scope,$http,$ionicPopup,$state,$ionicHistory) {

			$scope.signup=function(data){
			var baseUrl="http://localhost:8080";
			console.log('in signup method');
        	var dataRegister;
        	dataRegister= {
             	"password": data.rpassword,
    			"emailAddress": data.remail,
    			"firstName": data.firstName,
    			"surname": data.rsurname,
    			"username": data.rusername,
   				"gender": data.rgender,
     			"activate":"false"
        	};
        	var parameter = JSON.stringify(dataRegister);
        	$http({
            method: 'post',
            url: baseUrl + "/users/create",
            data: parameter
        	})
			.then(function (response){	
				if(response.status=="201"){
					$scope.title="Account Created!";
					$scope.template="Your account has been successfully created!";
					
					//no back option
					$ionicHistory.nextViewOptions({
						disableAnimate: true,
						disableBack: true
					});
					$state.go('login', {}, {location: "replace", reload: true});
				}
				else if(response.status=="204"){
					$scope.title="Not Content";
					$scope.template="Well this is embarassing";
				
				}
				else if(response == null){
					$scope.title="unauthorized";
					$scope.template="Please click forgot password if necessary";
				
				}
				else if(response=="501")
				{
					$scope.title="Failed";
					$scope.template="Contact Our Our Technicain <a href=mailto:noxolomandisamkhungo@gmail.com'>NMandisa</a>";
				}
				else{
					$scope.title="Failed";
					$scope.template="Contact Our Our Technicain<a href=mailto:noxolomandisamkhungo@gmail.com'>NMandisa</a>";
				}
				
				var alertPopup = $ionicPopup.alert({
						title: $scope.title,
						template: $scope.template
				});
				
				
			});
			
	}
})


.controller('verifyProfileCtrl', function($scope,$http,$ionicPopup,$state,$ionicHistory) {
		$scope.user = {};
		var baseUrl="http://localhost:8080";
		$scope.verifyProfile = function() {
			console.log('in verifyProfile function');
        	var userProfileOtp;
        	userProfileOtp= {
            "otp": $scope.user.password,
            "emailAddress": $scope.user.email
        	};
        	var parameter = JSON.stringify(userProfileOtp);
        	$http({
            method: 'post',
            url: baseUrl + "/users/verify",
            data: parameter
        	})
			.success(function (response){
				console.log(response);			
				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});
				console.log("Verify Response"+response);
			
				

				var alertPopup = $ionicPopup.alert({
						title: "Verification FeedBack",
						template: $scope.feedback
				});


				$state.go('profile', {}, {location: "replace", reload: true});
				
			}).error(function() {
					var alertPopup = $ionicPopup.alert({
						title: 'Verification failed!',
						template: "Contact Our Technicain <a href=mailto:noxolomandisamkhungo@gmail.com'>NMandisa Mkhungo</a>"
					});
			});
		};
		
})

.controller('forgotPasswordCtrl', function($scope,$http,$ionicPopup,$state,$ionicHistory) {

	var baseUrl="http://localhost:8080";
		$scope.forgotPassword = function(user) {
			console.log('in forgotPassword function');
        	var userProfileOtp;
        	userForgotPassword= {
            "emailAddress": user.email
        	};
        	var parameter = JSON.stringify(userForgotPassword);
        	$http({
            method: 'post',
            url: baseUrl + "/users/recover",
            data: parameter
        	})
			.success(function (response){
				console.log(response);			
				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});
				console.log("Verify Response"+response);
			
				$scope.feedback=response;

				var alertPopup = $ionicPopup.alert({
						title: "Forgot Password",
						template: $scope.feedback
				});


				$state.go('login', {}, {location: "replace", reload: true});
				
			}).error(function() {
					var alertPopup = $ionicPopup.alert({
						title: 'Verification failed!',
						template: "Internal Problem,Contact Our Technicain <a href=mailto:noxolomandisamkhungo@gmail.com'>NMandisa Mkhungo</a> "
					});
			});
		};

})
   
   
.controller('profileCtrl', function($scope,$ionicHistory,$state) {


	
        	$scope.loggedUser= localStorage.getItem('loggeduser');
			$scope.loggedin_id=sessionStorage.getItem('loggedin_id');
			$scope.loggedin_name= sessionStorage.getItem('loggedin_firstname');
			$scope.loggedin_surname= sessionStorage.getItem('loggedin_surname');
			$scope.loggedin_password= sessionStorage.getItem('loggedin_password');
			$scope.loggedin_username= sessionStorage.getItem('loggedin_username');
			$scope.loggedin_emailAddress= sessionStorage.getItem('loggedin_emailAddress');
			$scope.loggedin_gender= sessionStorage.getItem('loggedin_gender');
		
		
		$scope.logout=function(){
				delete sessionStorage.loggedin_firstname;
				delete sessionStorage.loggedin_id;
				delete sessionStorage.loggedin_surname;
				delete sessionStorage.loggedin_password;
				delete sessionStorage.loggedin_username;
				delete sessionStorage.loggedin_emailAddress;
				delete sessionStorage.loggedin_gender;
				
				console.log('Logoutctrl',sessionStorage.getItem('loggedin_id'));
				
				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});
				$state.go('login', {}, {location: "replace", reload: true});
		};
})

   
.controller('editProfileCtrl', function($scope,$http,$ionicPopup,$state,$ionicHistory) {

			$scope.loggedin_id=sessionStorage.getItem('loggedin_id');
			$scope.loggedin_name= sessionStorage.getItem('loggedin_firstname');
			$scope.loggedin_surname= sessionStorage.getItem('loggedin_surname');
			$scope.loggedin_password= sessionStorage.getItem('loggedin_password');
			$scope.loggedin_username= sessionStorage.getItem('loggedin_username');
			$scope.loggedin_emailAddress= sessionStorage.getItem('loggedin_emailAddress');
			$scope.loggedin_gender= sessionStorage.getItem('loggedin_gender');

			$scope.updateProfile=function(data){
			var baseUrl="http://localhost:8080";
			console.log('in updateProfile method');
        	var dataEditProfile;
        	dataEditProfile= {
    			"emailAddress": data.email,
    			"firstName": data.firstName,
    			"surname":data.surname
        	};
        	var parameter = JSON.stringify(dataEditProfile);
        	$http({
            method: 'post',
            url: baseUrl + "/users/update/"+$scope.loggedin_id,
            data: parameter
        	}).success(function (response){
				$ionicHistory.nextViewOptions({
					disableAnimate: false,
					disableBack: false
				});

				console.log("Update profile Response"+response);
				var alertPopup = $ionicPopup.alert({
						title: "Update profile FeedBack",
						template: $scope.feedback
				});

				$state.go('profile', {}, {location: "replace", reload: true});
				
			}).error(function() {
					var alertPopup = $ionicPopup.alert({
						title: 'Update failed!',
						template: 'Well This is embarassing!'
					});
			});
		};
	




})
  