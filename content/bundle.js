(function() {
	var app = angular.module('project1',
		['ui.router',
		'project1.auth.signup',
		'project1.auth.signin',
		'project1.products',
		'project1.create'
		]);
	function config($urlRouterProvider) {
		$urlRouterProvider.otherwise('/signin');
	}
	config.$inject = ['$urlRouterProvider'];
	app.config(config);
	app.constant('API_BASE', location.hostname === 'localhost' ? '//localhost:3000/api/':'https://cct-project1.herokuapp.com/api/');
})();

// For 2nd sprint, change this file to create a product.

(function() {
	angular.module('project1.create', [
		'ui.router'
		])
	.config(createConfig);

	function createConfig($stateProvider) {

		$stateProvider
			.state('create', {
				url: '/create',
				templateUrl: '/components/create/create.html',
				controller: createController,
				controllerAs: 'ctrl',
				bindToController: this,
				// Resolve is built in to Angular as a function that executes code prior to going to that route:
				resolve: [
					// Run functions to ensure that a user's actually logged in:
					'SessionToken', '$q', '$state',
					// Above line: 3 things are injected. $q is Angular's way to build custom promises.
					function(SessionToken, $q, $state){
						var deferred = $q.defer();
						console.log(SessionToken.get())
						if (SessionToken.get()){
							deferred.resolve();
						} else {
							deferred.reject();
							$state.go('signin');
						}
						return deferred.promise;
					}
				]
			})
			.state('create/update', {
				url: '/create/:id',
				templateUrl: '/components/create/update.html',
				controller: createController,
				controllerAs: 'ctrl',
				bindToController: this,
				resolve: {
					getSingleItem: function($stateParams, ProductsService){
						return ProductsService.fetchOne($stateParams.id);
					}
				}
			})
	}

	createConfig.$inject = [ '$stateProvider' ];

	function createController( $state, createService, ProductsService ) {
		var vm = this;
		vm.saved = false;
		vm.shirt = {};
		vm.updateShirt = ProductsService.getProduct();
		console.log(vm.updateShirt);
		vm.save = function() {
			console.log(vm.shirt);
			createService.save(vm.shirt)
				.then(function(){
					vm.saved = true;
					$state.go('products')
				});
		};
		vm.update = function() {
			shirtToUpdate = {
				title: vm.updateShirt.title,
				desc: vm.updateShirt.desc,
				image: vm.updateShirt.image,
				_id: vm.updateShirt._id
			}
			ProductsService.updateShirt(shirtToUpdate)
			.then(function(){
				$state.go('products')
			})
		}

	}
	createController.$inject = ['$state', 'CreateService', 'ProductsService'];
})();

(function(){
	angular.module('project1.products', [
'ui.router'
		])
	.config(productsConfig);
	
	productsConfig.$inject = ['$stateProvider'];
	function productsConfig($stateProvider) {

		$stateProvider
		.state('products', {
			url: '/products',
			templateUrl: '/components/products/products.html',
			controller: ProductsController,
			controllerAs: 'ctrl',
			bindToController: this,
			resolve: {
				getUserShirts: [
					'ProductsService',
					function(ProductsService) {
						console.log("in the resolve");
						return ProductsService.fetch();
					}
				]
			}
		});
	}

	ProductsController.$inject = ['$state', 'ProductsService', 'CurrentUser'];
	function ProductsController($state, ProductsService, CurrentUser) {
		var vm = this;
		vm.products = ProductsService.getProducts();
		console.log(vm.products);
		vm.deleteProduct = function(shirt) {
			ProductsService.deleteProducts(shirt);
		};
		// Inside vm.updateProduct, $state.go has the route as the first argument, but the second argument is an object with an id property. This is how products.js knows which product to get so it can be updated.
		vm.updateProduct = function(shirt) {
			$state.go('create/update', { 'id': shirt._id });
		};
		vm.goCreate = function(){
			$state.go('create');
		};
		vm.signOut = function(){
			CurrentUser.clear();
			$state.go('signin');
		};
	}
})();

// (function(){
// 	angular.module('project1.shirts', [
// 		'ui.router'
// 		])
// 	.config(shirtsConfig);

// 	shirtsConfig.$inject = ['$stateProvider'];
// 	function shirtsConfig($stateProvider) {

// 		$stateProvider
// 			.state('shirts', {
// 				url: '/shirts',
// 				templateUrl: '/components/shirts/shirts.html',
// 				controller: ShirtsController,
// 				controllerAs: 'ctrl',
// 				bindToController: this//,
// 				// resolve: {  
// 				// 	getUserDefinitions: [
// 				// 	'DefineService',
// 				// 	function(DefineService) {
// 				// 		return DefineService.fetch();
// 				// 	}
// 				// 	]
// 				// }
// 			})
// // $stateParams.id (line 36) allows the application to pass the url and use that as a way to identify an individual workout. Notice the '/:id' in the .state('products/update' (line 28). This is the variable that is passed to $stateParams.id.
// 			.state('shirts/update', {
// 				url: '/shirts/:id',
// 				templateUrl: '/components/shirts/product-update.html',
// 				controller: ShirtsController,
// 				controllerAs: 'ctrl',
// 				bindToController: this,
// // The two functions in the resolve (below) allow the route to have access to the data of the product being edited. The resolve is getting ALL user definitions of a shirt.
// 				resolve: {
// 					getSingleProduct: function($stateParams, ShirtsService) {
// // $stateParams.id (line 36) allows the application to pass the url and use that as a way to identify an individual workout. Notice the '/:id' in the .state('Products/update' (line 28). This is the variable that is passed to $stateParams.id.
// 						return ShirtsService.fetchOne($stateParams.id);
// 					}//,

// 					// getUserDefinitions: function(DefineService) {
// 					// 	return DefineService.fetch();
// 					// }
// 				}
// 			});
// 	}

// 	ShirtsController.$inject = ['$state'/*, 'DefineService'*/, 'ShirtsService'];
// 	function ShirtsController($state/*, DefineService*/, ShirtsService) {
// 		var vm = this;
// 		vm.saved = false;
// 		vm.product = {};
// 		// vm.userDefinitions = DefineService.getDefinitions();
// 		vm.updateProduct = ShirtsService.getProduct();
// 		vm.save = function() {
// 			ShirtsService.save(vm.product)
// 			.then(function(){
// 				vm.saved = true;
// 				$state.go('history');
// 			});
// 		};

// 		// Create an update function here
// 		vm.updateSingleShirt = function() {
// 			var shirtToUpdate = {
// 				id: vm.updateShirt.id,
// 				desc: vm.updateShirt.description,
// 				result: vm.updateShirt.result,
// 				def: vm.updateShirt.def 
// 			}
// 			ShirtsService.updateShirt(shirtToUpdate)
// 			.then(function() {
// 				$state.go('history');
// 			});
// 		};
// 	}
// })();

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

// This configuration (config) file is found in a single file to keep the components together.
// The config and controller for each feature will use the .$inject directive from Angular to inject dependencies.
(function(){
	angular
		.module('project1.auth.signup', ['ui.router'])
		.config(signupConfig);

		function signupConfig($stateProvider) { 
		// $stateProvider is from ui-router and is the method through which url routing is handled.
			$stateProvider
				.state('signup', {
					url: '/signup',
					// defines this component as the state of signup and provides the url route
					templateUrl: '/components/auth/signup.html',
					// templateUrl is the html the component will use
					controller: SignUpController,
					// controller indicates which controller will dictate the behavior of this view
					controllerAs: 'ctrl',
					// controllerAs creates an alias so a developer doesn’t have to type SignUpController.<function or object>
					bindToController: this
					// bindToController binds the scope of the view to the scope of this controller and eliminates the need to use $scope
				});
		}

		signupConfig.$inject = ['$stateProvider'];

		function SignUpController($state, UsersService) {
			var vm = this;
			// "var vm = this" is how the binding of the controller to the view is completed.
			vm.user = {};
			// "vm.user = {}" establishes an object to build the username and password inside.
			vm.message = "Sign up for an account!"
			// example of expressions and how vm and this scope work together
			vm.submit = function() {
				UsersService.create(vm.user)
					.then(function(response){
				// "ng-model" and "ng-submit" (not in this file) create the vm.user object that "UserService.create" uses to sign a new user up.
				// The .then is how the SignUpController handles the resolved promise and then routes the app to the "define" feature of project1.
					console.log(response); // displays response data in console
					$state.go('create');
					// $state.go(‘define’) is how ui-route changes from state (url) to other states.
				});
			};
		}

		SignUpController.$inject = ['$state', 'UsersService'];
		// SignUpController has $state and UsersService injected into it.
})();

// This file will "power" the custom directive.
(function() {
	angular.module('project1')
	.directive('userlinks',
		function() {
			UserLinksController.$inject = [ '$state', 'CurrentUser', 'SessionToken' ];
			function UserLinksController($state, CurrentUser, SessionToken) {
				var vm = this;
				vm.user = function() {
					return CurrentUser.get();
				};

				vm.signedIn = function() {
					return !!(vm.user().id);
				};

				vm.logout = function() {
					CurrentUser.clear();
					SessionToken.clear();
					$state.go('signin');
				};
			}

			// Configure the directive:
			return {
				// Create an isolated scope to isolate the data to a portion of the application:
				scope: {},
				controller: UserLinksController,
				controllerAs: 'ctrl',
				bindToController: true,
				templateUrl: '/components/auth/userlinks.html'
			};
		});
})();

(function(){
	angular.module('project1')
		.factory('AuthInterceptor', ['SessionToken', 'API_BASE',
			function(SessionToken, API_BASE) {
				return {
					request: function(config) {
						var token = SessionToken.get();
						if (token && config.url.indexOf(API_BASE) > -1) {
							config.headers['Authorization'] = token;
						}
						return config;
					}
				};
			}]);

		angular.module('project1')
			.config(['$httpProvider', function($httpProvider) {
				return $httpProvider.interceptors.push('AuthInterceptor');
			}]);
})();



























(function(){
	angular.module('project1')
		.service('CreateService', CreateService);
		CreateService.$inject = ['$http', 'API_BASE'];
		function CreateService($http, API_BASE) {
			var createService = this;
			createService.userShirts = [];

			createService.save = function(shirt) {
				return $http.post(API_BASE + 'shirt', {
					shirt: shirt

				}).then(function(response){
					createService.userShirts.unshift(response.data);
				});
			};

			createService.fetch = function(shirt) {
				return $http.get(API_BASE + 'shirt')
					.then(function(response){
						createService.userShirts = response.data;
					});
			};

			createService.getShirts = function() {
				return createService.userShirts;
			};

			createService.update = function(shirt) {
				return $http.put(API_BASE + 'shirt', {
					shirt: shirt
				});
			};
		}
})();

(function() {
	angular.module('project1')
		.service('CurrentUser', [ '$window', function($window) {
			function CurrentUser() { // declaring the CurrentUser
				var currUser = $window.localStorage.getItem('currentUser');
				// Check if there's a currUser. If so, and if the currUser is undefined, set the currentUser:
				if (currUser && currUser !== "undefined") { 
					this.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));
				}
			}
			CurrentUser.prototype.set = function(user) { // attaching further functionality onto the prototype chain
				this.currentUser = user;
				$window.localStorage.setItem('currentUser', JSON.stringify(user));
			};
			CurrentUser.prototype.get = function() { // attaching further functionality onto the prototype chain
				return this.currentUser || {};
			};
			CurrentUser.prototype.clear = function() { // attaching further functionality onto the prototype chain
				this.currentUser = undefined;
				$window.localStorage.removeItem('currentUser');
			};
			CurrentUser.prototype.isSignedIn = function() { // attaching further functionality onto the prototype chain
				return !!this.get().id; // The !! ensures that isSignedIn flips the boolean correctly.
			};
			return new CurrentUser();
		}]);
})();

// 1. Create the service
// 2. Inject the service into the controller
// 3. Create the views needed for the controller
// 4. Update app.js (or the configuration file)

(function(){
	angular.module('project1')
		// 1. Create the service
		.service('ProductsService', ProductsService);

		// 2. Inject the service into the controller
		ProductsService.$inject = ['$http', 'API_BASE','$sce'];
		function ProductsService($http, API_BASE,$sce) {
			var productsService = this;
			// Next 2 lines are used to expose data to the rest of the application:
			productsService.shirts = [];
			productsService.individualProduct = {};
			// Save the product:
			productsService.save = function(product) {
				return $http.post(API_BASE + 'product', {
					product: product
				}).then(function(response){
					productsService.shirts.push(response);
				});
			};

			productsService.fetch = function(product) {
				console.log('DUH');
				return $http.get(API_BASE + 'shirts')
					.then(function(response){
						console.log(response);
						productsService.shirts = response.data;
						productsService.shirts.forEach((shirt,i)=>{
							productsService.shirts[i].image=$sce.trustAsResourceUrl(shirt.image);
						});

					});
			};
			// .getProducts returns data types so they can be used in multiple controllers:
			productsService.getProducts = function() {
				console.log("test");
				return productsService.shirts;
			};

			productsService.deleteProducts = function(product) {
				var productIndex = productsService.shirts.indexOf(product);
				productsService.shirts.splice(productIndex, 1);
				var deleteData = {product: product};
				return $http({
					method: 'DELETE',
					url: API_BASE + "product",
					data: JSON.stringify(deleteData),
					headers: {"Content-Type": "application/json"}
				});
			};

			productsService.fetchOne = function(shirt) {
				console.log(shirt);
				return $http.get(API_BASE + 'shirts/' + shirt)
					.then(function(response) {
						console.log(response);
					productsService.individualProduct = response.data;
				});
			};
			// .getProduct returns data types so they can be used in multiple controllers:
			productsService.getProduct = function() {
				return productsService.individualProduct;
			};

			productsService.updateShirt = function(shirtToUpdate) {
				console.log(shirtToUpdate);
				return $http.put(API_BASE + 'shirt', { shirt: shirtToUpdate });
			}
		}
})();

(function(){
	angular.module('project1')
		.service('SessionToken', ['$window', function($window) {
			function SessionToken(){
			// declares and defines SessionToken
				this.sessionToken = $window.localStorage.getItem('sessionToken');
			}

			SessionToken.prototype.set = function(token){
			// uses the .prototype to attach the function .set to the prototype chain; this has memory enhancements and follows conventional design patterns
				this.sessionToken = token;
				$window.localStorage.setItem('sessionToken', token);
			};

			SessionToken.prototype.get = function(){
			// uses the .prototype to attach the function .get to the prototype chain; this has memory enhancements and follows conventional design patterns
				return this.sessionToken;
			};

			SessionToken.prototype.clear = function() {
			// uses the .prototype to attach the function .clear to the prototype chain; this has memory enhancements and follows conventional design patterns
				this.sessionToken = undefined;
				$window.localStorage.removeItem('sessionToken');
			};
			return new SessionToken;
		}]);
})();

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

//# sourceMappingURL=bundle.js.map
