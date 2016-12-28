var app=angular.module('main', ['ngRoute'])
  
app.filter('start',function(){
  return function(items,name,param){
    //alert(items.length+" "+name+" "+param);
    var ret=[];
    if(param=="")return items;
    for(i=0;i<items.length;i++){
      if(items[i][param].startsWith(name))ret.push(items[i]);
    }
    return ret;
  }
});  

app.controller('init',function($scope,$rootScope){

});

app.config(function($routeProvider){
  $routeProvider.when("/users",{
    templateUrl:"table1.html",
    controller:"users"
  }).when("/mail",{
    templateUrl:"table2.html",
    controller:"mail"
  }).otherwise({
    redirectTo:"/users"
  });
});