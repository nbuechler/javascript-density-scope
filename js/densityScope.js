var denScop = (function dScope() {
    'use strict';
    
    var a, i, j, phrase, result, freq, objFreq,

        //Parsers
        parseSpace = function (t) {
            return t.split(" ");
        },
        parseShortDash = function (t) {
            return t.split("-");
        },
        parseLongDash = function (t) {
            return t.split("–");
        },
        /*
         * Returns an array called parsedText
         */
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
            this.parsedText = parsedText;
            return this.parsedText;
        },
    
        //Counters
        singleCount = function (a, w) {
            freq = 0;
            /*jslint plusplus: true */
            for (i = 0; a.length > i; i++) {
                if (a[i] === w) {
                    freq += 1;
                }
            }
            return freq;
        },
    
        everyCount = function (a) {
            objFreq = {};
            /*jslint plusplus: true */
            for (j = 0; a.length > j; j++) {
                objFreq[a[j]] = singleCount(a, a[j]);
            }
            return objFreq;
        };
    
    ///Filters
        //TODO: Filter out option of articles (the, he, she) and conjunctions (by, for)
    
    
    //Prototypes
    function Count() {}
    Count.prototype.single = function (a, w) {
        this.frequency = singleCount(a, w);
        //TODO: Add this.max, this.median, this.range, this.sort, etc.
        return this;
    };
    
    Count.prototype.every = function (a, w) {
        this.frequency = everyCount(a);
        //TODO: Add this.max, this.median, this.range, this.sort, etc.
        return this;
    };
        
    function Separate() {}
    Separate.prototype.text = function (t) {
        this.bySpace = t.split(" ");
        this.byShortDash = t.split("-");
        this.byLongDash = t.split("–");
        this.byAll = denScop.parseAll(t);
        return this;
    };
    function Combine() {}
    Combine.prototype.text = function () {
        var result = '';
        /*jslint plusplus: true */
        for (a = 0; arguments.length > a; a++) {
            if (arguments.length === (parseInt(a, 10) + 1)) {
                result += arguments[a];
            } else {
                result += arguments[a] + ' ';
            }
        }
        this.byComma = result;
        return this;
    };
    
    
    return {
        version: "0.0.6",
        singleCount: singleCount,
        everyCount: everyCount,
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
        },
        /*
         * This is the wholesome goodness below I think
         */
        separate: new Separate(),
        combine: new Combine(),
        count: new Count()
    };

}());