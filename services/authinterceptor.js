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


























