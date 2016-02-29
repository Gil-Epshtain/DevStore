/* Created by Gil on 23/08/15 */
(function()
{
    'use strict';

    angular
        .module('App')
        .factory("Utils",
        [
            "$http",
            "$q",
            "$timeout",
            utilsFunc
        ]);

    function utilsFunc($http, $q, $timeout)
    {
        var utils = {};

        // $http
        utils.httpGet = function(fileUrl, successCallBack, getDeferred)
        {
            console.log("Sending Get request [" + fileUrl + "]");

            $http({
                method: 'GET',
                url: fileUrl
            })
            .success(function (data)
            {
                // this callback will be called asynchronously
                // when the response is available
                console.log("Successfully Get response [" + fileUrl + "]");
                console.log(data);

                if (successCallBack) { successCallBack(data); }
                if (getDeferred) { getDeferred.resolve(); }
            })
            .error(function (data, status, headers, config)
            {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.warn("Error in Get response [url=" + fileUrl + "; status=" + status + "]");
            });
        };

        utils.httpPost = function (fileUrl, fileData, successCallBack, postDeferred)
        {
            console.log("Sending Post request [" + fileUrl + "]");

            $http({
                method: 'POST',
                url: fileUrl,
                data: fileData
                //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
            success(function (data, status, headers, config)
            {
                // this callback will be called asynchronously
                // when the response is available
                console.log("Successfully Post response [" + fileUrl + "]");
                console.log(data);

                if (successCallBack) { successCallBack(data); }
                if (postDeferred) { postDeferred.resolve(); }
            }).
            error(function (data, status, headers, config)
            {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.warn("Error in Post response [url=" + fileUrl + "; status=" + status + "]");
            });
        };

        // search in array of objects
        utils.Search = function(array, key, searchQuery)
        {
            var retVal = null;

            if ((array) && (key) && (searchQuery)) // validate input
            {
                for (var i = 0; i < array.length; i++)
                {
                    if (array[i][searchQuery] == key)
                    {
                        retVal = array[i];
                        break;
                    }
                }
            }

            return retVal;
        };

        return utils;
    }

})();