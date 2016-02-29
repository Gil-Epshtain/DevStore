/* Created by Gil on 23/08/15 */
(function()
{
    'use strict';

    angular
        .module('App')
        .controller('MainController',
        [
            "AppDataService",
            "$state",
            mainCtrlFunc
        ]);

    function mainCtrlFunc(AppDataService, $state)
    {
        var mainCtrl = this;

        // mainCtrl.title = "Main";

        mainCtrl.AppData = { Strings: {} };

        AppDataService.onDataLoaded.then(function()
        {
            mainCtrl.AppData = AppDataService.AppData;
        });

        mainCtrl.isActiveState = function(state)
        {
            return (state == $state.current.name);
        };

        // **** PopUp (Show/Hide) **** //
        mainCtrl.popUp =
        {
            data:
            {
                title: "",
                text: "",
                buttons: [],
                hideCloseButton: false
            },
            showPopup: function(title, text, buttons, hideCloseButton)
            {
                console.log("Show PopUp [title: '" + title + "'; text: '" + text + "'");

                var popUpDiv = document.getElementById('PopUp');
                var popUpElement = angular.element(popUpDiv);

                // Init popup data object
                mainCtrl.popUp.data =
                {
                    title: title,
                    text: text,
                    buttons: buttons,
                    hideCloseButton: hideCloseButton
                };

                // Show the PopUp
                popUpElement.css(
                {
                    display: ''
                });
            },
            hidePopup:  function()
            {
                console.log("Hide PopUp");

                var popUpDiv = document.getElementById('PopUp');
                var popUpElement = angular.element(popUpDiv);

                // Hide the PopUp
                popUpElement.css(
                {
                    display: 'none'
                });
            }
        };

        mainCtrl.popUp.hidePopup();
    }

})();