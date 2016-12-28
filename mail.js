app.controller('mail', function($scope, $rootScope) {
  $scope.id=0;
  $scope.fil="";
  $rootScope.Type="Users";
  $scope.type="Topic";
  $scope.sel='Topic';
  function find(){
    for(i=0;i<$scope.items.length;i++)
    if($scope.items[i].Id==$scope.id)return $scope.items[i];
    return null;
  }
  $scope.mode=1;
  $scope.items = [
    {Id:1, Topic:"Error", Rec:"Nick", Text:"Invalid"},
    {Id:2, Topic:"Success", Rec:"Jack", Text:"Hello"},
    {Id:3, Topic:"Order", Rec:"Ann", Text:"I am writing to you"},
    {Id:4, Topic:"Response", Rec:"Bill", Text:"Yes we will"}
  ];
  $scope.cr={
    Id:0,Topic:"", Rec:"", Text:"",
    setVal:function(i,a,b,c){
      this.Id=i;
      this.Topic=a;
      this.Rec=b;
      this.Text=c;
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