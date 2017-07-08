
(function () {

    "use strict";


    // Getting the existing module
    angular.module("app-trips")
        .controller("tripsController", tripsController);

    function tripsController($http) {

        var vm = this;

        vm.trips = [];

        vm.newTrip = {};

        vm.isBusy = true;
        vm.errorMessage = "";

        $http.get("/api/trips")
            .then(function (responce) {
                // Success
                angular.copy(responce.data, vm.trips);

            }, function (error) {
                // Failure
                vm.errorMessage = "Failed to load data" + error;
            })
            .finally(function () {
                vm.isBusy = false;
            });




        vm.AddTrip = function () {

            vm.isBusy = true;
            vm.errorMessage = "";

            $http.post("/api/trips", vm.newTrip)
                .then(function (responce) {
                    // Success
                    vm.trips.push(responce.data);
                    vm.newTrip = {};

                }, function (error) {
                    // Failure
                    vm.errorMessage = "Failed to send data" + error;
                })
                .finally(function () {
                    vm.isBusy = false;
                });


        };

    }

})();