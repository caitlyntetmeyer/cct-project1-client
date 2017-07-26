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
