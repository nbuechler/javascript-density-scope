var denScop = (function dScope() {
    'use strict';

    //Parsers
    var a, i, j, phrase, result,
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
        },
    
        concat = function concat() {
            result = '';
            /*jslint plusplus: true */
            for (a = 0; arguments.length > a; a++) {
                if (arguments.length === (parseInt(a, 10) + 1)) {
                    result += arguments[a];
                } else {
                    result += arguments[a] + ' ';
                }
            }
            return result;
        };
    
    return {
        version: "0.0.3",
        parseSpace: parseSpace,
        parseShortDash: parseShortDash,
        parseLongDash: parseLongDash,
        parseAll: parseAll,
        concat: concat,
        greeting: function () {
            return 'Hello';
        },
        //Not certain if this will keep
        nameGenerator: function (name) {
            return name;
        }
    };

}());