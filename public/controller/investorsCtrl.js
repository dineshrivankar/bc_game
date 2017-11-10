 
angular.module("investorApp") 
.controller("investorsCtrl", ["$scope", "investorService",'$location','$window', function ($scope, investorService, $location,$window) {   
   
    $scope.isHeaderShow = false;
    $scope.isFooterShow = false;
    
    //Login Screen code starts here-----------------
    
    //SignIn 
    $scope.isSignInError = false;
    $scope.errorSignInMessage = "";
    $scope.frmSignIn={}; 
    $scope.frmSignIn.signInEmail ="";
    $scope.frmSignIn.signInPassword = "";
    $scope.isSignInLoaded = false;
    
    //SignUp
    $scope.isSignUpErrorMessage = false;
    $scope.errorSignUpMessage = "";
    $scope.frmSignUp={}; 
    $scope.frmSignUp.signUpEmail ="";
    $scope.frmSignUp.signUpPassword = "";
    $scope.isSignUpLoaded = false; 
    
    $scope.signUp = function(frmSignUp){ 
        if($scope.frmSignUp.signUpEmail.trim() == "" ){
            $scope.errorSignUpMessage = "Please enter email and password!";  
            $scope.isSignUpErrorMessage = true;
        }else if(!ValidateSpace($scope.frmSignUp.signUpEmail)){
            $scope.errorSignUpMessage = "Space is not allowed in Username";  
            $scope.isSignUpErrorMessage = true;
        }else if($scope.frmSignUp.signUpEmail.length < 5){
            $scope.errorSignUpMessage = "Username must be greater than 5 characters";  
            $scope.isSignUpErrorMessage = true;
        }
        else{
            $scope.isSignUpLoaded = true;
           var param = {
                          "username": $scope.frmSignUp.signUpEmail
                        }
            var myData = $scope.methodSerialize(param); 
            
           investorService.registerUser(myData)
                 .success(function(response){ 
                    clearAll();
                    $location.path('/dashboard', true);
                    $scope.isSignUpLoaded = false; 
                    $window.sessionStorage.setItem("loggedInUserName",$scope.frmSignUp.signUpEmail)
                    $scope.isHeaderShow = true;
                    $scope.isFooterShow = true;
                    $('body').css({"padding":"70px 0 40px 0"});
                }).error(function(error){ 
                  $scope.errorSignUpMessage = error;  
                  $scope.isSignUpErrorMessage = true;
                  $scope.isSignUpLoaded = false;
             }); 
        }        
   }; cx
    
    $scope.login = function(frmSignIn){ 
        if($scope.frmSignIn.signInEmail.trim() == ""){
            $scope.errorSignInMessage = "Please enter email and password!";  
            $scope.isSignInError = true;
        }else if($scope.frmSignIn.signInEmail.length < 5){
            $scope.errorSignInMessage = "Username must be greater than 5 characters";  
            $scope.isSignInError = true;
        }
        else{ 
            $scope.isSignInLoaded = true;
            var param = {
                          "username": $scope.frmSignIn.signInEmail
                        }
            var myData = $scope.methodSerialize(param); 
            
           investorService.loginUser(myData)
                 .success(function(response){ 
                    clearAll();
                    $location.path('/dashboard', true);
                    $scope.isSignInLoaded = false; 
                    $window.sessionStorage.setItem("loggedInUserName",$scope.frmSignIn.signInEmail)
                    $scope.isHeaderShow = true;
                    $scope.isFooterShow = true;
                    $('body').css({"padding":"70px 0 40px 0"});
                }).error(function(error){ 
                    $scope.errorSignInMessage = error;  
                    $scope.isSignInError = true;
                    $scope.isSignInLoaded = false;
             }); 
        }        
   };

    $scope.methodSerialize = function (obj) {
                 var str = [];
                 for (var p in obj)
                     if (obj.hasOwnProperty(p)) {
                         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                     }
                 return str.join("&");
             }
     
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }    
    
    function ValidateSpace(email) {
         var re = /^\S+$/;
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
    
    //Login Screen code ends here-----------------
    
    //DashBoard Screen code starts here-----------------
    
    
    //DashBoard Screen code starts here-----------------
    
    angular.element(document).ready(function(){     
        var homeUrl = window.location.href.split()
        if(homeUrl.indexOf('Index.html')){
            $scope.isHeaderShow = false;
            $scope.isFooterShow = false;
            $('body').css({ "padding":"0" });
        } else if(homeUrl.indexOf('dashboard')){
            $scope.isHeaderShow = true;
            $scope.isFooterShow = true;
        } else {
            $scope.isHeaderShow = true;
            $scope.isFooterShow = true;
        }
    })

}]); 
 