angular.module('starter.controllers', [])

.controller('WeatherCtrl', function($scope, Weather, Favorites, CurrentCity, $state) {

     $scope.locationChanged = function(location){
       var cityName = location.split(',')[0];
       Weather.forCity(cityName).then(success);

       function success(data){
         console.log(data);
         CurrentCity.init(data);
         refreshCurrentCity();
         $scope.isCityChoosen = true;
       }
     };

     $scope.addToFavorites = function () {
            Favorites.add($scope.currentCity);
     };

     $scope.$on('$stateChangeSuccess', function () {
         refreshCurrentCity();

     });

     function refreshCurrentCity(){
       $scope.currentCity = CurrentCity.getCity();
     }



})

.controller('FavoritesCtrl', function($scope, Favorites, CurrentCity, $state) {

     $scope.cities = Favorites.getAll();

     $scope.remove = function (city) {
            Favorites.remove(city);
     };

     $scope.showInfo = function (city) {
          CurrentCity.changeCity(city);
          $state.go('tab.weather');
     };


});
