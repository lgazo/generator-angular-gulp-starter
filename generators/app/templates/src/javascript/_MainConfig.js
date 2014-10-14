angular.module('<%= app_name %>')

.config(
		function($locationProvider, $routeProvider, $httpProvider,
				$sceDelegateProvider) {

			$locationProvider.hashPrefix('!');

			// routes
			$routeProvider.when("/dashboard", {
				templateUrl : "./partials/dashboard/index.html",
				controller : "DashboardController"
			}).otherwise({
				redirectTo : '/'
			});

		})
;
