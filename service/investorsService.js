/*
 angular.module("investorApp")
    .factory("investorService", ["baseSvc","$http", function(baseService,$http) { 
        var listEndPoint = '/_api/';  
        var baseUrl = ""; 

        var getUserProfile_URL = baseUrl + "UserProfile/GetResourceDetails?UserId="; 
        var EndorseSkill_URL = baseUrl + "Endorsement/SaveEndorsementDetails";



        //GET API List Start ----------------------------------------------------- 


        var getUserProfile = function(employeecode) {  
            var url =getUserProfile_URL + employeecode + "&OffSet=0";
            var query = url;

            return baseService.getRequest(query);
        };

        var EndorseSkill = function(param) {
            var data =  param;
            var url = EndorseSkill_URL; 

            return baseService.postRequest(data, url);
        };   

        return { 
            getUserProfile : getUserProfile ,
            EndorseSkill: EndorseSkill  
        };
            
}]); 
*/



angular.module("investorApp").service("investorService", ["baseSvc","$http", function(baseService,$http){ 
    
    var caseStudyDtlUrl = "Hawkeye/DocDetails?docId=";
    var raterCaseStudyUrl ="Hawkeye/RateDoc/?docId=";
    
    this.caseStudyDetails = function (docId) {   
        return $http({
            method: 'GET',
            withCredentials: true,				
            data:  'json',
            url: BASE_HAWKEYE_URL + caseStudyDtlUrl + docId + "&isNotRefresh=true" + USERNAME + "&v=" + new Date().getTime()
        });
    }

     this.rateCaseStudy = function (param) {
        return $http({
            method: 'POST',
            withCredentials: true,
            data:  'json',
            url: BASE_HAWKEYE_URL + raterCaseStudyUrl + param.docId + "&rating="+param.rating  + USERNAME  + "&v="+new Date().getTime()
             
        });
     }
     
}]); 