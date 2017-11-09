angular.module("investorApp").config(['$routeProvider', '$compileProvider', '$httpProvider', function($routeProvider, $compileProvider, $httpProvider){
   //$httpProvider.defaults.cache = true;
   $routeProvider
        .when("/", {
	   		templateUrl:"Templates/signupLanding.html"
        })
        .when("/signUp", {
            templateUrl:"Templates/signupLanding.html"
        })
        .when("/signIn", {
            templateUrl:"Templates/signupLanding.html"
        }) 
        .when("/dashboard", {
            templateUrl:"Templates/dashBoard.html"
        }) 
        .when("/block", {
            templateUrl:"Templates/blocks.html"
        }) 
        .when("/puzzle", {
            templateUrl:"Templates/puzzle.html"
        }) 
        .when("/sendCoin", {
            templateUrl:"Templates/sendCoins.html"
        }) 
        .when("/transaction", {
            templateUrl:"Templates/transactions.html"
        })  
    //Override the default regular expression that is used for whitelisting of safe urls during a[href] sanitization.
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|sip|file):/);
 
}]);