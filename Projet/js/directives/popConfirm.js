"use strict";



(function () {
angular.module("popconfirm_module", []).directive("popconfirm", function () {

        return {
            priority: 100,
            restrict: 'A',
            replace: false,
            scope: {
            title: "=", // The title of the confirm
            content: "=", // The message of the confirm
            placement: "@", // The placement of the confirm (Top, Right, Bottom, Left)
            container: "=", // The html container
            yesBtn: "=",
            noBtn: "=",
            ngClick: "&"
      },link: function ($scope, element) {
            var defaults = {
                title: "Êtes-vous sûr ?", // The title of the confirm
                content: "", // The message of the confirm
                placement: "top", // The placement of the confirm (Top, Right, Bottom, Left)
                container: "body", // The html container
                yesBtn: "Oui",
                noBtn: "Non"
            };
            var actual = $.extend({}, defaults, $scope || {});
            element.popConfirm(actual);
            }
        };
    });

}());

onclick;
