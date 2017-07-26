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
