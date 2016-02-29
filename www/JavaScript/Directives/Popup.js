/* Created by Gil on 24/10/2015 */
(function()
{
    'use strict';

    angular
        .module('App')
        .directive('popUp',
        [
            popupDirective
        ]);

    function popupDirective()
    {
        var linkFunc = function(scope, element, attrs)
        {
            // *** DataObject: ***//
            //data =
            //{
            //    title: "",
            //    text: "",
            //    buttons:
            //    [
            //        {
            //            text: "",
            //            callback: function() {}
            //        }
            //    ],
            //    hideCloseButton: true
            //}

            // OnClick
            scope.onClick_ClosePopUp = function()
            {
                closePopup();
            };

            scope.onClick_Button = function(button)
            {
                if (button.callback) { button.callback(); }

                closePopup();
            };

            // Show/Hide
            function closePopup()
            {
                element.css({
                    display: 'none'
                });
            }

            function showPopup()
            {
                element.css({
                    display: ''
                });
            }
        };

        var popUp =
        {
            restrict: 'AE',
            templateUrl: "./Views/Popup.html",
            link: linkFunc,
            scope:
            {
                data: "="
            }

            // -> "@" String: (with expression {{ }} ), data stored in attrs
            // -> "&" Callback (function)
            // -> "=" two way binding. don't use {{ }}, data stored in scope
        };

        return popUp;
    }


})();

// *** Controller Functions: *** //
//ctrl.popUp =
//{
//    data:
//    {
//        title: "",
//        text: "",
//        buttons: [],
//        hideCloseButton: false
//    },
//    showPopup: function(title, text, buttons, hideCloseButton)
//    {
//        console.log("Show PopUp [title: '" + title + "'; text: '" + text + "'");
//
//        var popUpDiv = document.getElementById('PopUp');
//        var popUpElement = angular.element(popUpDiv);
//
//        // Init popup data object
//        ctrl.popUp.data =
//        {
//            title: title,
//            text: text,
//            buttons: buttons,
//            hideCloseButton: hideCloseButton
//        };
//
//        // Show the PopUp
//        popUpElement.css(
//        {
//            display: ''
//        });
//    },
//    hidePopup:  function()
//    {
//        console.log("Hide PopUp");
//
//        var popUpDiv = document.getElementById('PopUp');
//        var popUpElement = angular.element(popUpDiv);
//
//        // Hide the PopUp
//        popUpElement.css(
//        {
//            display: 'none'
//        });
//    }
//};