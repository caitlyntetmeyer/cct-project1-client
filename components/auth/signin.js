// Signing in a User
(function(){
	angular
		.module('project1.auth.signin', ['ui.router'])
		.config(signinConfig);

		function signinConfig($stateProvider) {
			$stateProvider
				.state('signin', {
					url: '/signin',
					templateUrl: '/components/auth/signin.html',
					controller: SignInController,
					controllerAs: 'ctrl',
					bindToController: this
				});
		}

		signinConfig.$inject = ['$stateProvider'];

		// UsersService is used throughout this application to gather or create data regarding a user:
		function SignInController($state, UsersService) { // The signin component uses $state and UsersService as dependencies.
			var vm = this;
			vm.login = function() {
				UsersService.login(vm.email, vm.password).then(function(response){
					console.log(response);
					$state.go('create');
				});
			};
		}

		SignInController.$inject = ['$state', "UsersService"];
})(); 
