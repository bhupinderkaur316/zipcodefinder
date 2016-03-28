
    var demoModule = angular.module("myApp", []);

    function myController($scope, $http) {
        

        $scope.Result = {
            display: "Not yet retrieved"
        };

        $scope.findZipCodeCity = function() {
            var url = "http://api.geonames.org/postalCodeLookupJSON?" +
                "postalcode=" + $scope.query.postalCode +
                "&country=" + $scope.query.countryCode +
                "&username=bhupinderkaur" +
                "&callback=JSON_CALLBACK";

            $http.jsonp(url).then(function(response) {
                var data = response.data;
                if (data.status) {
                    $scope.Result.display = "Error: " + data.status.message;
                } else {
                    if (data.postalcodes.length === 0) {
                        $scope.Result.display = "No data found";
                    } else {
                        $scope.Result.display = data.postalcodes[0].placeName;
                    }
                }
            }, function(data, status) {
                $scope.Result.display = "HTTP Error - " + status;
            });
        }

    }
    