(function () {
    'use strict';

    function factory() {
        var pubsub = {
            cache: {}
        };

        pubsub.publish = function (event, args) {
            pubsub.cache[event] && _.forIn(pubsub.cache[event],
                function (cb) {
                    cb.apply(null, args || []);
                });
        };

        pubsub.subscribe = function (event, cb) {
            if (!pubsub.cache[event]) {
                pubsub.cache[event] = [];
            }
            pubsub.cache[event].push(cb);
            return [event, cb];
        };

        pubsub.unsubscribe = function (handle) {
            var t = handle[0],
                x,
                length;
            if (pubsub.cache[t]) {
                for (x = 0, length = pubsub.cache[t].length; x < length; x++) {
                    if (pubsub.cache[t][x] === handle[1]) {
                        pubsub.cache[t].splice(x, 1);
                    }
                }
            }
        };

        return {
            publish: pubsub.publish,
            subscribe: pubsub.subscribe,
            unsubscribe: pubsub.unsubscribe
        };
    }

    angular
        .module('electoralApp')
        .factory('pubsub', factory);
})();