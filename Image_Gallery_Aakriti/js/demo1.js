angular.module('demoApp', ['angularGrid'])
    .service('imageService',['$q','$http',function($q,$http){
       ;
        this.loadImages = function(){
            return $http.get("http://jsonplaceholder.typicode.com/photos")
    .then(function(response) {
      
        return response.data;
    });

        };
    }])
    .controller('demo', ['$scope','imageService', '$window','angularGridInstance','$http', 
    function ($scope,imageService,$window,angularGridInstance,$http) {

$scope.reload=function(){$window.location.reload();};


$scope.open = function(image) {
    $scope.currentImage = image;
 // use $.param jQuery function to serialize data from JSON 
            var val = {
                 new:"newVal"
            };
        
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }


     $http.put('https://jsonplaceholder.typicode.com/posts/'+image.id,val, config)
            .then(function (response) {

// This function handles success
console.log("imag id"+image.id+"Success");


image.clicked=1;
}, function (response) {

// this function handles error
console.log("imag id"+image.id+"failure");

image.clicked=2;
});
    
  };

       imageService.loadImages().then(function(data){

            $scope.showLoader=imageService.showLoader;
             $scope.showLoader = true;
            data.forEach(function(obj){
             
                
                obj.actualHeight  = 100;
                obj.actualWidth = 100;

                obj.clicked=0;

           
        


            });

         
const shuffled = data.slice(0,200).sort(() => .5 - Math.random());// shuffle  
 $scope.pics =shuffled.slice(0,100) ;
           
     


           
        });
    }]);