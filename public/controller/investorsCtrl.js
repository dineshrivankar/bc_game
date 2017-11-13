 
angular.module("investorApp") 
.controller("investorsCtrl", ["$scope","$rootScope", "investorService",'$location','$window',"moment","$route", function ($scope,$rootScope, investorService, $location,$window,moment,$route) {   
   
    //Header
    $scope.loggedInUser= "";
    $rootScope.isHeaderShow = false;
    $rootScope.isFooterShow = false;
    
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
    
    //Send Coins
    $scope.isSendCoinError = false;
    $scope.errorSendCoinMsg = "";
    $scope.frmSendCoin={}; 
    $scope.frmSendCoin.toUserName ="";
    $scope.frmSendCoin.coin = 0;
    $scope.availableCoins = 0;
    
    $scope.signUp = function(frmSignUp){   
         if($scope.frmSignIn.signInEmail.trim() == ""){
            $scope.errorSignInMessage = "Please enter username!";  
            $scope.isSignInError = true;
        }else if($scope.frmSignIn.signInEmail.length < 5){
            $scope.errorSignInMessage = "Username must be greater than 5 characters";  
            $scope.isSignInError = true;
        }else if(!ValidateSpace($scope.frmSignIn.signInEmail)){
            $scope.errorSignUpMessage = "Space is not allowed in Username";  
            $scope.isSignUpErrorMessage = true;
        }
        
        else{
            $scope.isSignUpLoaded = true;
           var param = {
                          "username": $scope.frmSignIn.signInEmail
                        }
            var myData = $scope.methodSerialize(param); 
            
           investorService.registerUser(myData)
                 .success(function(response){  
                    $location.path('/dashboard', true);
                    $scope.isSignUpLoaded = false; 
                    $window.sessionStorage.setItem("loggedInUserName",$scope.frmSignUp.signUpEmail)
                    $rootScope.isHeaderShow = true;
                    $rootScope.isFooterShow = true;
                    $scope.loggedInUser = $scope.frmSignUp.signUpEmail;
                    $scope.getDashBoardDetails();
                    $('body').css({"padding":"70px 0 40px 0"});
                    clearAll();
                }).error(function(error){ 
                  $scope.errorSignUpMessage = error;  
                  $scope.isSignUpErrorMessage = true;
                  $scope.isSignUpLoaded = false;
             }); 
        }        
   }; 
    
    $scope.login = function(frmSignIn){ 
        if($scope.frmSignIn.signInEmail.trim() == ""){
            $scope.errorSignInMessage = "Please enter username!";  
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
                    $location.path('/dashboard', true);
                    $scope.isSignInLoaded = false; 
                    $window.sessionStorage.setItem("loggedInUserName",$scope.frmSignIn.signInEmail)
                    $rootScope.isHeaderShow = true;
                    $rootScope.isFooterShow = true;
                    $scope.loggedInUser = $scope.frmSignIn.signInEmail;
                    $scope.getDashBoardDetails();
                    $('body').css({"padding":"70px 0 40px 0"});
                    clearAll();
                }).error(function(error){ 
                    $scope.errorSignInMessage = error;  
                    $scope.isSignInError = true;
                    $scope.isSignInLoaded = false;
             }); 
        }        
   };

    $scope.logOut = function(){
        $window.sessionStorage.setItem("loggedInUserName","");
        clearAll()
         $location.path('/', true);
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
        $scope.latestTransDtl = [];
    }
    
    //Login Screen code ends here-----------------
    
    //DashBoard Screen code starts here-----------------
    
      $scope.getDashBoardDetails = function(){  
         $scope.loggedInUser = window.sessionStorage.getItem("loggedInUserName");
           investorService.getUserDetail($scope.loggedInUser)
                 .success(function(response){ 
                    $scope.dashBoardDtl = response; 
                    $scope.availableCoins = response.balance;
                }).error(function(error){ 
                  console.log("Error in loading dashboard!")
             }); 
             $scope.getLatestTransactions();
    }; 
    
     $scope.latestTransDtl = [];
     $scope.getLatestTransactions = function(){  
           investorService.getLatestTransaction()
                 .success(function(response){ 
                   if(response){
                     $scope.latestTransDtl.push(response); 
                   }                   
                }).error(function(error){ 
                  console.log("Error in loading dashboard!")
             }); 
             
   }; 
    
    $scope.gotoDashBoard = function(){
         $location.path('/dashboard', true);
         //$window.location.reload();
    }
     
    $scope.gotoAllTransactions = function(){
         $location.path('/transaction', true);
    }
    
     $scope.gotoBlocks = function(){
         $location.path('/block', true);
    }
     
    $scope.gotoSendCoin = function(){
         $location.path('/sendCoin', true);
    }
    
    //DashBoard Screen code starts here-----------------
    
    //Send Coins Screen Code starts here -----------------
    
     $scope.sendCoin = function(frmSendCoin){  
         var frmUser = $window.sessionStorage.getItem("loggedInUserName");
          
           var param = {
                          "fromUser": frmUser,
                          "toUser": $scope.frmSendCoin.toUserName,
                          "amount": $scope.frmSendCoin.coin
                        }
            var myData = $scope.methodSerialize(param); 
            
           investorService.sendCoin(myData)
                 .success(function(response){   
                     $scope.isSendCoinError = true;
                     $scope.errorSendCoinMsg = "Transfer Successful!";
                     $scope.availableCoins  = $scope.availableCoins - $scope.frmSendCoin.coin;
                     $rootScope.$broadcast("availableCoins", $scope.availableCoins);
                     scope.getDashBoardDetails();
                }).error(function(error){ 
                   $scope.isSendCoinError = true;
                   $scope.errorSendCoinMsg = error;
             }); 
        }     
    
    //Send Coins Screen Code ends here -----------------
    
     $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        console.log(event)
        console.log(next)
        console.log(current)
     });
    
    angular.element(document).ready(function(){     
        var homeUrl =$location.path()// window.location.href.split()
        if(homeUrl.indexOf('dashboard') <= -1 && homeUrl.indexOf('block') <= -1 && homeUrl.indexOf('transaction') <= -1 && homeUrl.indexOf('sendCoin') <= -1 ){
            $rootScope.isHeaderShow = false;
            $rootScope.isFooterShow = false;
            $('body').css({ "padding":"0" }); 
        }else {
            $rootScope.isHeaderShow = true;
            $rootScope.isFooterShow = true;
            if(homeUrl.indexOf('dashboard') > -1){
                $scope.getDashBoardDetails();
            }else if(homeUrl.indexOf('block') > -1){
                // $scope.getBlocksDetails();
            }else if(homeUrl.indexOf('transaction') > -1){
                // $scope.getTransactionDetails();
            }else if(homeUrl.indexOf('sendCoin') > -1){
                $scope.getDashBoardDetails();
            }  
            
        }
    })

}]); 
 