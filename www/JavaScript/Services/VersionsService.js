/* Created by Gil on 25/08/15 */
(function()
{
    'use strict';

    angular
        .module('App')
        .factory("VersionsService",
        [
            "Utils",
            "AppDataService",
            "$q",
            VersionsFactoryFunc
        ]);

    function VersionsFactoryFunc(Utils, AppDataService, $q, $scope)
    {
        var versionsFactory = {};
        var applications = [];

        var versionsLoadedDeferred = $q.defer();

        AppDataService.onDataLoaded.then(function()
        {
            var fileUrl = AppDataService.AppData.StoreConfigUrl;

            Utils.httpGet(fileUrl, initFactory, versionsLoadedDeferred);
        });

        function initFactory(data)
        {
            applications = data;

            versionsFactory.getApplicationsData = function () { return applications; };

            versionsFactory.getDownloadLink = function(version, platform)
            {
                var urlObj = {};
                var currentPlatform = versionsFactory.getCurrentPlatform();

                if (platform == 'Android')
                {
                    if (version.Links.Android.APK)
                    {
                        if (currentPlatform == 'Android')
                        {
                            urlObj.status = 200; // OK
                        }
                        else
                        {
                            urlObj.status = 403; // Wrong Platform
                        }

                        urlObj.downloadLink = version.Links.Android.APK;
                    }
                    else
                    {
                        urlObj.status = 404; // Link missing
                        urlObj.downloadLink = "";
                    }
                }
                else if (platform == 'iOS')
                {
                    // To download version to iOS we need:
                    // 1. Upload to https server the IPA file
                    // 2. Create a plist file (using xcode and upload it to the server)
                    // 3. Define in the plist file the IPA url
                    // 4. Concat the safari prefix the the plist url and open it from your device
                    //
                    // The safari prefix is:
                    // itms-services://?action=download-manifest&url=

                    if (version.Links.iOS.plist)
                    {
                        if (currentPlatform == 'iOS')
                        {
                            urlObj.status = 200; // OK
                        }
                        else
                        {
                            urlObj.status = 403; // Wrong Platform
                        }

                        urlObj.downloadLink = "itms-services://?action=download-manifest&url=" + version.Links.iOS.plist;
                    }
                    else
                    {
                        urlObj.status = 404; // Link missing
                        urlObj.downloadLink = "";
                    }
                }

                return urlObj;
            };

            versionsFactory.getCurrentPlatform = function()
            {
                var platform;
                var usetAgent = navigator.userAgent;

                if (usetAgent.match('Android'))
                {
                    platform = 'Android';
                }
                else if (usetAgent.match('iPad|iPhone'))
                {
                    platform = 'iOS';
                }

                return platform;
            };
        }

        return { factory: versionsFactory, onDataLoaded: versionsLoadedDeferred.promise };
    }

})();