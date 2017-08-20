console.log('client.js has been loaded');

var app = angular.module('EmployeeApp', []);

app.controller('EmployeeController', ['$http', function ($http){
    console.log('Employee Controller has been loaded');
    var self = this;
    self.employees = [];
    self.newEmployee = {};

    self.getEmployees = function(){
        $http({
            method: 'GET',
            url: '/employee'
        }).then(function(response){
            console.log(response);
            console.log(response.data);
            self.employees = response.data;
        });
    };

    self.postNewEmployee = function(){
        console.log(self.newEmployee);
        $http({
            method: 'POST',
            url: '/employee',
            data: self.newEmployee
        }).then(function(response){
            console.log(response);
            self.getEmployees();
            self.newEmployee = {};
        });
    };
    self.getEmployees();
}]);