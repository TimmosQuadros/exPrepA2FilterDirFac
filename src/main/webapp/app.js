
var myApp = angular.module('examApp', ['ngResource']);
myApp.factory('ExamFactory', function () {
    var studentsInfo = {};
    studentsInfo.allCourses = [
        {courseId: 1000, courseName: "Basic Programming"},
        {courseId: 1001, courseName: "Advanced Programming"},
        {courseId: 1003, courseName: "DataBase Intro"}];
    studentsInfo.students = [];
    studentsInfo.students.push({studentId: 100, name: "Peter Hansen", grades: [{grade: "10"}, {grade: "12"}, {}]});
    studentsInfo.students.push({studentId: 101, name: "Jan Olsen", grades: [{grade: "7"}, {grade: "10"}, {}]});
    studentsInfo.students.push({studentId: 102, name: "Gitte Poulsen", grades: [{grade: "7"}, {grade: "7"}, {}]});
    studentsInfo.students.push({studentId: 103, name: "John McDonald", grades: [{grade: "10"}, {}, {grade: "7"}]});
    var getStudents = function () {
        return studentsInfo.students;
    };
    var getCourses = function () {
        return studentsInfo.allCourses;
    };
    return {
        getStudents: getStudents,
        getCourses: getCourses
    };
});

//**********************Moved to studentGrades directive*************************//
//myApp.controller('ExamController', ["$scope", "ExamFactory", function ($scope, ExamFactory) {
//        var self = this;
//
//        self.students = ExamFactory.getStudents();
//        self.courses = ExamFactory.getCourses();
//
//        $scope.calculateAverage = function (MyData) {
//            var sum = 0;
//            var length = 0;
//            for (var i = 0; i < MyData.length; i++) {
//                if (MyData[i].grade) {
//                    sum += parseInt(MyData[i].grade, 10);
//                    length++;
//                }
//            }
//            var avg = sum / length;
//            return avg;
//        };
//
//    }]);

myApp.directive('studentGrades', ["ExamFactory",function (ExamFactory) {
    return {
        restrict: 'E',
        templateUrl: 'student-grades.html',
        controller: function ($scope) {
            var self = this;

            self.students = ExamFactory.getStudents();
            self.courses = ExamFactory.getCourses();

            $scope.calculateAverage = function (MyData) {
                var sum = 0;
                var length = 0;
                for (var i = 0; i < MyData.length; i++) {
                    if (MyData[i].grade) {
                        sum += parseInt(MyData[i].grade, 10);
                        length++;
                    }
                }
                var avg = sum / length;
                return avg;
            };
        },
        controllerAs: 'exctrl'
    };
}]);

//*************************EX6************************//
//Example of implementation of rest fetching with resource from ajax/libs/angular.js/1.2.16/angular-resource.min.js
//myApp.factory('RestStudentsFactory', function ($resource) {
//    var getAllStudentsInfo = function () {
//        return $resource('https://api/students/info:id',{student: "@id"});
//    };
//
//    return {
//        getAllStudentsInfo: getAllStudentsInfo
//    };
//});
//
//myApp.controller('RestStudentController', ["$scope", "RestStudentsFactory", function ($scope, RestStudentsFactory) {
//        var self = this;
//        
//        self.getAllStudentsInfo = function () {
//            return RestStudentsFactory.getAllStudentsInfo().query();
//        };
//        self.students = self.getAllStudentsInfo().students;
//        self.courses = self.getAllStudentsInfo().allCourses;
//}]);