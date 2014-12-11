var denScop = (function dScope() {
    'use strict';

    //Parsers
    var i, j, phrase,
        parseSpace = function (t) {
            return t.split(" ");
        },
        parseShortDash = function (t) {
            return t.split("-");
        },
        parseLongDash = function (t) {
            return t.split("–");
        },
        parseAll = function (t) {
            var parsedText = [];
            /*jslint plusplus: true */
            for (i = 0; parseLongDash(t).length > i; i++) {
                /*
                 * Parses the long dashes out into a phrase to be parsed
                 */
                phrase = parseLongDash(t)[i];
                for (j = 0; parseSpace(phrase).length > j; j++) {
                    /*
                     * Parses the spaces into a word to be parsed
                     */
                    if (parseSpace(phrase)[j] !== "") {
                        parsedText.push(parseSpace(phrase)[j]);
                    }
                }
            }
            return parsedText;
        };
    
    return {
        version: "0.0.2",
        parseSpace: parseSpace,
        parseShortDash: parseShortDash,
        parseLongDash: parseLongDash,
        parseAll: parseAll,
        greeting: function () {
            return 'Hello';
        },
        //Not certain if this will keep
        nameGenerator: function (name) {
            return name;
        }
    };

}());