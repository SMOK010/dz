var app = angular.module('dziennik', ['ngResource', 'ngGrid', 'ui.bootstrap', 'ngMaterial' , 'ngPassword', 'chart.js']);
app.config(function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
});
app.filter('toDate', function() {
    return function(input) {
        return new Date(input);
    }
})
// Create a controller with name alertMessagesController to bind to the feedback messages section.
app.controller('alertMessagesController', function ($scope) {
    // Picks up the event to display a saved message.
    $scope.$on('trainingSaved', function () {
        $scope.alerts = [
            { type: 'success', msg: 'Record saved successfully!' }
        ];
    });

    // Picks up the event to display a deleted message.
    $scope.$on('productTypeDeleted', function () {
        $scope.alerts = [
            { type: 'success', msg: 'Record deleted successfully!' }
        ];
    });
    
 // Picks up the event to display a saved message.
    $scope.$on('productTypeSaved', function () {
        $scope.alerts = [
            { type: 'success', msg: 'Record saved successfully!' }
        ];
    });

    // Picks up the event to display a deleted message.
    $scope.$on('productDeleted', function () {
        $scope.alerts = [
            { type: 'success', msg: 'Record deleted successfully!' }
        ];
    });
    
    $scope.$on('exerciseSaved', function () {
        $scope.alerts = [
            { type: 'success', msg: 'Record saved successfully!' }
        ];
    });

    // Picks up the event to display a server error message.
    $scope.$on('error', function () {
        $scope.alerts = [
            { type: 'danger', msg: 'There was a problem in the server!' }
        ];
    });
    
 // Picks up the event to display a ingredient duplicate for one product message.
    $scope.$on('badIngredient', function () {
        $scope.alerts = [
            { type: 'danger', msg: 'Ingredients was added to selected product earlier! Please select different ingredient.' }
        ];
    });
    
 // Picks up the event to display a ingredient duplicate for one product message.
    $scope.$on('ingredientFromProductDeleted', function () {
        $scope.alerts = [
            { type: 'success', msg: 'Ingredients was deleted from selected product!' }
        ];
    });
    
 // Picks up the event to display a saved message.
    $scope.$on('ingredientSaved', function () {
        $scope.alerts = [
            { type: 'success', msg: 'Record saved successfully!' }
        ];
    });

    // Picks up the event to display a deleted message.
    $scope.$on('ingredientDeleted', function () {
        $scope.alerts = [
            { type: 'success', msg: 'Record deleted successfully!' }
        ];
    });
    
 // Picks up the event to display a saved message.
    $scope.$on('userSaved', function () {
        $scope.alerts = [
            { type: 'success', msg: 'Record saved successfully!' }
        ];
    });

    // Picks up the event to display a deleted message.
    $scope.$on('userDeleted', function () {
        $scope.alerts = [
            { type: 'success', msg: 'Record deleted successfully!' }
        ];
    });

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
});

angular.element(document).ready(function () {

	var trainingType = $('#trainingType').text();
	if(trainingType != 0 && !$("#defaultTraining").hasClass("hidden")){
		$("#defaultTraining").addClass("hidden");
	}
	if(trainingType == 0 && $("#defaultTraining").hasClass("hidden")){
		$("#defaultTraining").removeClass("hidden");
		alert("zmiana");
	}

});