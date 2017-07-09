
(function () {
    "use strict";

    angular.module("app-trips")
        .controller("tripEditorController", tripEditorController);

    function tripEditorController($routeParams, $http) {
        var vm = this;

        vm.tripName = $routeParams.tripName;
        vm.stops = [];
        vm.errorMessage = "";
        vm.isBusy = true;


        $http.get("/api/trips/" + vm.tripName + "/stops")
            .then(function (responce) {
                // Success
                angular.copy(responce.data, vm.stops);
                _showMap(vm.stops);

            }, function (error) {
                // Failure
                vm.errorMessage = "Failed to load stops" + error;
            })
            .finally(function () {
                vm.isBusy = false;
            });
    }


    function _showMap(stops) {

        if (stops && stops.length > 0) {

            var mapStops = _.map(stops, function (item) {
                return {
                    lat: item.latitude,
                    long: item.longitude,
                    info: item.name
                };
            });

            //show map
            travelMap.createMap({
                stops: mapStops,
                selector: "#map",
                currentStop: 1,
                initialZoom: 3
            });
        }

    }


})();