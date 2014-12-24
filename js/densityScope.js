var denScop = (function dScope() {
    'use strict';
    
    var a, i, j, k, m, po, lpo, phrase, result, freq, objFreq, wordList, wordObjectSchema, limit, limitedWordList, limitedWordObjectSchema,

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
    
        //Need to get back to this, should be an array of counts
        everyCount = function (a) {
            objFreq = {};
            /*jslint plusplus: true */
            for (j = 0; a.length > j; j++) {
                objFreq[a[j]] = singleCount(a, a[j]);
            }
            return objFreq;
        },
        
        //Object/Array Makers
        
        wordObject = function (a, w, limit) {
            limit = limit || 0;
            freq = 0;
            /*jslint plusplus: true */
            for (i = 0; a.length > i; i++) {
                if (a[i] === w) {
                    freq += 1;
                }
            }
            if (freq > limit) {
                return {name: w, count: freq};
            } else {
                return null;
            }
        },
        
        phraseObject = function (a) {
            po = {};
            /*jslint plusplus: true */
            for (j = 0; a.length > j; j++) {
                po[a[j]] = singleCount(a, a[j]);
            }
            return po;
        },
        
        phraseArray = function (a) {
            wordObjectSchema = [];
            /*jslint plusplus: true */
            for (j = 0; a.length > j; j++) {
                wordObjectSchema.push(wordObject(a, a[j]));
            }
            return wordObjectSchema;
        },
        
        //Parsers
        parseSpace = function (t) {
            return t.split(' ');
        },
        parseShortDash = function (t) {
            return t.split('-');
        },
        parseLongDash = function (t) {
            return t.split('–');
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
                    if (parseSpace(phrase)[j] !== '') {
                        parsedTextStepOne.push(parseSpace(phrase)[j]);
                    }
                }
            }
            /*jslint plusplus: true */
            for (k = 0; parsedTextStepOne.length > k; k++) {
                /*
                 * Parses the new line into a word to be parsed
                 */
                if (parseNewLine(parsedTextStepOne[k]) !== '') {
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
                if (parsedTextStepThree[m] === '') {
                    parsedTextStepThree.splice(m, 1);
                }
            }
            
            this.parsedText = parsedTextStepThree;
            return this.parsedText;
        },
    
        
    
        //Filters
            //TODO: Filter out option of articles (the, he, she) and conjunctions (by, for)

        limitedPhraseObject = function (a, limit) {
            lpo = {};
            /*jslint plusplus: true */
            for (j = 0; a.length > j; j++) {
                if (wordObject(a, a[j], limit) !== null) {
                    lpo[a[j]] = singleCount(a, a[j], limit);
                }
            }
            return lpo;
        },
        
        limitedPhraseArray = function (a, limit) {
            limitedWordObjectSchema = [];
            /*jslint plusplus: true */
            for (j = 0; a.length > j; j++) {
                if (wordObject(a, a[j], limit) !== null) {
                    limitedWordObjectSchema.push(wordObject(a, a[j]));
                }
            }
            return limitedWordObjectSchema;
        };
        
    //Prototypes
    /*
     * Count - Count methods based on word frequncy, max, median, range
     * Separate - Parser methods
     * Combine - Combine methods
     * Make - Make methods
     */
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
        this.bySpace = t.split(' ');
        this.byShortDash = t.split('-');
        this.byLongDash = t.split('–');
        this.byNewLine = t.split(/\r\n|\r|\n/g);
        this.byAll = denScop.parseAll(t);
        return this;
    };
    function Make() {}
    Make.prototype.densityGraphOf = function (a, limit) {
        this.givingPhraseObject = phraseObject(a);
        this.givingPhraseArray = phraseArray(a);
        this.givingPhraseObjectLimited = limitedPhraseObject(a, limit);
        this.givingPhraseArrayLimited = limitedPhraseArray(a, limit);
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
        version: '0.0.8',
        singleCount: singleCount,
        everyCount: everyCount,
        wordObject: wordObject,
        phraseObject: phraseObject,
        phraseArray: phraseArray,
        parseSpace: parseSpace,
        parseShortDash: parseShortDash,
        parseLongDash: parseLongDash,
        parseNewLine: parseNewLine,
        parseAll: parseAll,
        limitedPhraseArray: limitedPhraseArray,
        limitedPhraseObject: limitedPhraseObject,
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
        count: new Count(),
        make: new Make()
    };

}());