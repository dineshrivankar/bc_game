
angular.module("investorApp").controller('puzzleController', ['$scope','$modalInstance','$interval','$http','investorService',function ($scope, $modalInstance, $interval, $http,investorService) {
	
	//Solve Puzzle
    $scope.isSolvePuzzleError = false;
    $scope.errorSolvePuzzleMsg = "";
	
	$scope.currentSeconds = 15;
	$interval(function () {
		$scope.currentSeconds = 30 - ( new Date().getSeconds());
		if($scope.currentSeconds == 0){
			$modalInstance.dismiss('cancel');
		}
	}, 1000);	
	 
	$scope.submitPuzzle = function () {
		var param = {"id": $scope.questionID,"answer": $scope.answer,"userName":$scope.loggedInUser};
            var myData = $scope.methodSerialize(param); 
            investorService.solvePuzzle(myData)
                 .success(function(response){  
					$modalInstance.dismiss('cancel');
                }).error(function(error){ 
                   $scope.isSolvePuzzleError = true;
                   $scope.errorSolvePuzzleMsg = error;
        });	
		 
	};
	
	$scope.closePuzzle = function () {
		$modalInstance.dismiss('cancel');
	};
}]);






