/* Created by Gil on 23/08/15 */
(function()
{
    'use strict';

    angular
        .module('App',
        [
            'ui.router'
        ])
        .run(runApp);

    function runApp()
    {
        console.log("~*~ Welcome to Application ~*~");
        console.log("App stared at: " + getTimeFormat());

        function getTimeFormat(time) // Return the time in string format: "hh:mm dd/mm/yyyy"
        {
            time = time ? time : new Date();

            return (time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + " " +
            + time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear());
        }
    }

})();