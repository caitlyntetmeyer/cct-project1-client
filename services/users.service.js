// This file handles the http request to create and/or sign in a user.
// Implements the design pattern Dependency Injection (DI)
(function(){
	angular.module('project1')
		.service('UsersService', [
			'$http', 'API_BASE', 'SessionToken',
			function($http, API_BASE, SessionToken) {
				function UsersService(){

				}

				UsersService.prototype.create = function(user) {
					console.log(user);
					var userPromise = $http.post(API_BASE + 'signup', {
						user: user
					});

					userPromise.then(function(response){
						SessionToken.set(response.data.token);
						// CurrentUser.set(response.data.user);
					});
					return userPromise;
				};

				UsersService.prototype.login = function(email, password) {
					var loginPromise = $http.post(API_BASE + 'signin',{
						email: email,
						password: password
					});

					loginPromise.then(function(response){
						console.log(response.data);
						SessionToken.set(response.data.token);
						// CurrentUser.set(response.data.user);
					});
					return loginPromise;
				};
				return new UsersService();
			}]);
})();
