 
angular.module("investorApp") 
.controller("investorsCtrl", ["$scope", "investorService",'$location', function ($scope, investorService, $location) {   
   
    //SignIn 
    $scope.isSignInError = false;
    $scope.errorSignInMessage = "";
    $scope.frmSignIn={}; 
    $scope.frmSignIn.signInEmail ="";
    $scope.frmSignIn.signInPassword = "";
    
    //SignUp
     $scope.isSignUpErrorMessage = false;
    $scope.errorSignUpMessage = "";
    $scope.frmSignUp={}; 
    $scope.frmSignUp.signUpEmail ="";
    $scope.frmSignUp.signUpPassword = "";
    
    $scope.login = function(frmSignIn){ 
        if($scope.frmSignIn.signInEmail.trim() == "" || $scope.frmSignIn.signInPassword.trim() == ""){
            $scope.errorSignInMessage = "Please enter email and password!";  
            $scope.isSignInError = true;
        }else if(!(validateEmail($scope.frmSignIn.signInEmail))){
            $scope.errorSignInMessage = "Please enter valid email!";  
            $scope.isSignInError = true;
        }
        else{
            clearAll();
            $location.path('/dashboard', true);
        }        
   };
    
    $scope.signUp = function(frmSignUp){ 
        if($scope.frmSignUp.signUpEmail.trim() == "" || $scope.frmSignUp.signUpPassword.trim() == ""){
            $scope.errorSignUpMessage = "Please enter email and password!";  
            $scope.isSignUpErrorMessage = true;
        }else if(!(validateEmail($scope.frmSignUp.signUpEmail))){
             $scope.errorSignUpMessage = "Please enter valid email!";  
            $scope.isSignUpErrorMessage = true;
        }
        else{
            clearAll();
            $location.path('/dashboard', true);
        }        
   };

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
     function clearAll(){
        $scope.isSignInError = false;
        $scope.errorSignInMessage = "";
        $scope.frmSignIn={}; 
        $scope.frmSignIn.signInEmail ="";
        $scope.frmSignIn.signInPassword = "";

        //SignUp
         $scope.isSignUpErrorMessage = false;
        $scope.errorSignUpMessage = "";
        $scope.frmSignUp={};  
        $scope.frmSignUp.signUpEmail ="";
        $scope.frmSignUp.signUpPassword = "";
    }
    
    angular.element(document).ready(function(){     
        
    })

}]); 
 