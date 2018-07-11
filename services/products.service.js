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
