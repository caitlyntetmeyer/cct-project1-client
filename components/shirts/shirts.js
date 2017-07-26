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
