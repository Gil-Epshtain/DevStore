/* Created by Gil on 23/08/15 */
(function()
{
    'use strict';

    angular
        .module('App')
        .controller('AboutController',
        [
            '$scope',
            '$timeout',
            aboutCtrlFunc
        ]);

    function aboutCtrlFunc($scope, $timeout)
    {
        var aboutCtrl = this;

        // aboutCtrl.title = "About Page";

        var mainCtrl = $scope.$parent.mainCtrl;

        aboutCtrl.onClick_SendUdIdMail = function()
        {
            console.log('OnClick -> Send UDID eMail');

            var sendButtonDiv = document.getElementById('sendUdIdEmailButton');
            var sendButtonElement = angular.element(sendButtonDiv);

            sendButtonElement.addClass('button-active');

            var mailEmail = mainCtrl.AppData.Strings._eMail_Dev_;
            var mailSubject = mainCtrl.AppData.Strings._SendEmail_AddUdId_Subject_;
            var mailBody = mainCtrl.AppData.Strings._SendEmail_AddUdId_Body_;

            var mailUrl =
                "mailto:" + mailEmail +
                "?subject=" + mailSubject +
                "&body=" + mailBody;

            $timeout(function()
            {
                sendButtonElement.removeClass('button-active');
            }, 750);

            window.open(mailUrl);
        }
    }

})();