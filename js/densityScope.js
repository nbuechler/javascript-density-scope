var denScop = (function dScope() {
    'use strict';
    
    var a, i, j, k, m, phrase, result, freq, objFreq,

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
        parseNewLine = function (t) {
            return t.split(/\r\n|\r|\n/g);
        },
        /*
         * Returns an array called parsedText
         */
        parseAll = function (t) {
            var merged = [],
                /*
                 * Step One:
                 * Parses the long dashes out into a phrase to be parsed
                 * Parses the spaces into a word to be parsed
                 */
                parsedTextStepOne = [],
                /*
                 * Step Two:
                 * Parses the new line into a word to be parsed
                 */
                parsedTextStepTwo = [],
                /*
                 * Step Three:
                 * Merges the arrays into one nice flat array
                 */
                parsedTextStepThree = [];
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
                        parsedTextStepOne.push(parseSpace(phrase)[j]);
                    }
                }
            }
            /*jslint plusplus: true */
            for (k = 0; parsedTextStepOne.length > k; k++) {
                /*
                 * Parses the new line into a word to be parsed
                 */
                if (parseNewLine(parsedTextStepOne[k]) !== "") {
                    parsedTextStepTwo.push(parseNewLine(parsedTextStepOne[k]));
                }
            }
            /*
             * Merges the arrays into one nice flat array
             */
            merged = merged.concat.apply(merged, parsedTextStepTwo);
            parsedTextStepThree = merged;
            merged = [];
            
            /*jslint plusplus: true */
            for (m = parsedTextStepThree.length; m >= 0; m--) {
                if (parsedTextStepThree[m] === "") {
                    parsedTextStepThree.splice(m, 1);
                }
            }
            
            this.parsedText = parsedTextStepThree;
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
        this.byNewLine = t.split(/\r\n|\r|\n/g);
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
        version: "0.0.7",
        singleCount: singleCount,
        everyCount: everyCount,
        parseSpace: parseSpace,
        parseShortDash: parseShortDash,
        parseLongDash: parseLongDash,
        parseNewLine: parseNewLine,
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