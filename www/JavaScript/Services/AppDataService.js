/* Created by Gil on 23/08/15 */
(function()
{
    'use strict';

    angular
        .module('App')
        .factory("AppDataService",
        [
            "Utils",
            "$q",
            appDataFunc
        ]);

    function appDataFunc(Utils, $q)
    {
        var appData = {};

        var dataLodaedDeferred = $q.defer();

        //*** App Strings ***//
        appData.Strings = {};

        var initAppData = function(strings)
        {
            appData.Strings = strings;
        };

        // Get DevStore Config File
        var configUrl = "./devstore.config.json";
        Utils.httpGet(configUrl, function(config)
        {
            // Get Path to Versions File
            appData.serverUrl =      config.server_dir_url;
            appData.StoreConfigUrl = config.server_dir_url + config.versions_config_file_name;

            // Get Application Strings
            var fileUrl = "./Data/Local/" + config.local_code +".json";
            Utils.httpGet(fileUrl, initAppData, dataLodaedDeferred);
        });

        return { AppData: appData, onDataLoaded: dataLodaedDeferred.promise };
    }

})();