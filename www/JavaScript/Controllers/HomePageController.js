/* Created by Gil on 23/08/15 */
(function()
{
    'use strict';

    angular
        .module('App')
        .controller('HomePageController',
        [
            'VersionsService',
            '$scope',
            homePageCtrlFunc
        ]);

    function homePageCtrlFunc(VersionsService, $scope)
    {
        var homePageCtrl = this;

        // homePageCtrl.title = 'Home Page';

        homePageCtrl.applications = [];
        var mainCtrl = $scope.$parent.mainCtrl;

        VersionsService.onDataLoaded.then(function()
        {
            homePageCtrl.applications = VersionsService.factory.getApplicationsData();

            homePageCtrl.onClick_Download = function(version, platform)
            {
                console.log("OnClick -> Download Link [version: '" + version.Version + "'; platform: '" + platform + "']");

                var urlObj = VersionsService.factory.getDownloadLink(version, platform);

                if (urlObj.status == 200) // OK
                {
                    downloadLink(urlObj.downloadLink);
                }
                else if(urlObj.status == 404) // Link Missing
                {
                    var title = mainCtrl.AppData.Strings._Error_;
                    var text = mainCtrl.AppData.Strings._PopUp_Text_LinkMissing_;
                    var buttons = [{ text: mainCtrl.AppData.Strings._OK_ }];

                    mainCtrl.popUp.showPopup(title, text, buttons);
                }
                else if (urlObj.status == 403) // Wrong Platform
                {
                    var title = mainCtrl.AppData.Strings._Warning_;
                    var text =
                        mainCtrl.AppData.Strings._PopUp_Text_WrongPlatform_1_ + platform +
                        mainCtrl.AppData.Strings._PopUp_Text_WrongPlatform_2_ + platform +
                        mainCtrl.AppData.Strings._PopUp_Text_WrongPlatform_3_;
                    var hideCloseButton = true;
                    var buttons =
                    [
                        {
                            text: mainCtrl.AppData.Strings._Cancel_
                        },
                        {
                            text: mainCtrl.AppData.Strings._OK_,
                            callback: function()
                            {
                                downloadLink(urlObj.downloadLink);
                            }
                        }
                    ];

                    mainCtrl.popUp.showPopup(title, text, buttons, hideCloseButton);
                }

                function downloadLink(downloadLink)
                {
                    downloadLink = mainCtrl.AppData.serverUrl + downloadLink;

                    console.log("Downloading platform: '" + platform + "', version: '" + version + "', link: '" + downloadLink + "'");


                    window.open(downloadLink);
                }
            }
        });
    }

})();