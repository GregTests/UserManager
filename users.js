app.controller('users', function($scope, $rootScope) {
  $scope.id=0;
  $scope.fil="";
  $rootScope.Type="Users";
  $scope.type="Name";
  $scope.sel='Name';
  function find(){
    for(i=0;i<$scope.items.length;i++)
    if($scope.items[i].Id==$scope.id)return $scope.items[i];
    return null;
  }
  $scope.mode=1;
  $scope.Roles=["Admin","User","VIP"];
  $scope.items = [
    {Id:1,Name:"Greg", Mail:"123", Role:"Admin"},
    {Id:2,Name:"Max", Mail:"223", Role:"User"},
    {Id:1,Name:"Nick", Mail:"567", Role:"User"},
    {Id:2,Name:"Elena", Mail:"345", Role:"User"},
    {Id:3,Name:"Alex", Mail:"456", Role:"VIP"}
  ];
  $scope.cr={
    Id:0,Name:"", Mail:"", Role:"User",
    setVal:function(i,a,b,c){
      this.Id=i;
      this.Name=a;
      this.Mail=b;
      this.Role=c;
    },
    check:function(){
      return (this.Name!="" && this.Mail!="" && this.Role!="");
    },
    New:function(){
      return {Id:this.Id, Name:this.Name, Mail:this.Mail, Role:this.Role};
    }
  }
  $scope.create=function(){
    $scope.items.push({
      Name:$scope.cr.Name,
      Mail:$scope.cr.Mail,
      Role:$scope.cr.Role
    });
    $scope.cr.setVal(0,"","","User");
  };
  $scope.set=function(int){
    var v;
    $scope.mode=int;
    if(int!=1 && this.id===0)return;
    switch(int){
      case 1:
        $scope.cr.setVal(0,"","","User");
        break;
        case 3:
          v=find();
          if(v===null)return;
          $scope.del={
            Name:v.Name,
            Role:v.Role,
            Id:v.Id
          };
        break;
        case 2:
        case 4:
          v=find();
          if(v===null)return;
          $scope.cr.setVal(v.Id, v.Name, v.Mail, v.Role);
        break;
        default:
        break;
    }
  };
  $scope.al=function(ind){
    var items=angular.element(document.querySelector("table")).find("tbody tr");
    var item;
    for(i=0;i<items.length;i++){
      if(ind==items.eq(i).data("idn")){
        item=items.eq(i);
        item.toggleClass("active");
      }
      else items.eq(i).removeClass("active");
    }
    if(item.hasClass("active")){
      $scope.s=true;
      $scope.id=ind;
    }
    else{
      $scope.s=false;
      this.id=0;
    }
  };
  $scope.edit=function(){
    for(i=0;i<$scope.items.length;i++){
      if($scope.items[i].Id==$scope.cr.Id){
        $scope.items[i]=$scope.cr.New();
      }
    }
  };
  $scope.delete=function(){
    for(i=0;i<$scope.items.length;i++){
      if($scope.items[i].Id==$scope.del.Id){
        $scope.items.splice(i,i);
        $scope.mode=1;
        $scope.s=false;
      }
    }
  };
});

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/