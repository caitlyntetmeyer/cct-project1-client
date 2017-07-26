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
