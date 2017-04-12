angular.module('starter.services', [])

.factory('Weather', function ($http) {
     var APIKEY = '2f8316a3abafbc01b4d472440b93f112';
     var baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';


      return {
           forCity : function(City){
             var url = baseUrl + City + '&APPID=' + APIKEY + '&units=metric';
             return $http.get(url);
           }

      }
})

.factory('CurrentCity', function(){
     var city = {};

     return {
         getCity : function () {
             return city;
         },

         init : function (data) {
              if (data) {
                   city = {
                     name : data.data.name,
                     temp : data.data.main.temp,
                     hum : data.data.main.humidity,
                     coord : {lat : data.data.coord.lat , lon: data.data.coord.lon},
                     desc : data.data.weather[0].description,
                     iconUrl : 'http://openweathermap.org/img/w/' + data.data.weather[0].icon + '.png'
                   }
              }
         },
         changeCity : function (newCity) {
               if (newCity){
                 city = newCity;
               }
         }

     }
})

.factory('Favorites', function () {
      var cities = [];

      return {
        getAll : function () {
             return cities;
        },
        remove : function (city){
           cities.splice(cities.indexOf(city), 1);
        },
        add : function (city) {

            cities.push(city);
            console.log('City was added!!!');
            console.log(cities);


        }
      }
});

