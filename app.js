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
