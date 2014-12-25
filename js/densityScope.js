var denScop = (function dScope() {
    'use strict';
    
    var a, f, ua, uw, uc, i, j, k, m, po, lpo, t, tw, w, phrase, result, freq, objFreq, countList, wordList, wordObjectSchema, limit, limitedWordObjectSchema,

        //Defaults
        defaultTargetWords = ['The', 'in', 'that', 'is', 'he', 'she', 'it', 'to', 'for', 'by', 'of', 'and', 'an', 'a', 'the', 'by', 'for', 'on', 'at'],
        limitDefault = 0,
        
        //TODO
        ////Create a default for counting words with the different cases... i.e. The == the (the = 2)
        
        //Helpers
        getUniqueWords = function (a) {
            wordList = [];
            /*jslint plusplus: true */
            for (w = 0; a.length > w; w++) {
                if (wordList.indexOf(a[w]) === -1) {
                    wordList.push(a[w]);
                }
            }
            return wordList;
        },
        
        getUniqueCounts = function (a) {
            countList = [];
            /*jslint plusplus: true */
            ua = getUniqueWords(a);
            for (j = 0; ua.length > j; j++) {
                countList.push(denScop.singleCount(a, ua[j]));
            }
            return countList;
        },
        
        removeTargetObject = function (a, targetWord) {
            /*jslint plusplus: true */
            for (t = 0; a.length > t; t++) {
                if (a[t].name === targetWord) {
                    a.splice(t, 1);
                }
            }
            return a;
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
    
        //Object/Array Makers
        
        wordObject = function (a, w, limit) {
            limit = limit || limitDefault;
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
            uw = denScop.getUniqueWords(a);
            uc = denScop.getUniqueCounts(a);
            /*jslint plusplus: true */
            for (j = 0; uw.length > j; j++) {
                wordObjectSchema.push({name: uw[j], count: uc[j]});
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

        filterSinglets = function (a, tw) {
            tw = tw || defaultTargetWords;
            /*jslint plusplus: true */
            for (f = 0; tw.length > f; f++) {
                removeTargetObject(a, tw[f]);
            }
            return a;
        },
        
        //TODO: limit actually sets lower bound, but what about the upper bound??
        
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
            uw = denScop.getUniqueWords(a);
            uc = denScop.getUniqueCounts(a);
            /*jslint plusplus: true */
            for (j = 0; uw.length > j; j++) {
                if (uc[j] > limit) {
                    limitedWordObjectSchema.push({name: uw[j], count: uc[j]});
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
    
    Count.prototype.everyWord = function (a, w) {
        this.getfrequencyArray = getUniqueCounts(a);
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
    Make.prototype.unique = function (a) {
        this.wordList = getUniqueWords(a);
        this.countList = getUniqueCounts(a);
        return this;
    };
    function Filter() {}
    Filter.prototype.densityObject = function (a) {
        this.removingSinglets = filterSinglets(a);
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
        version: '0.0.9',
        getUniqueWords: getUniqueWords,
        getUniqueCounts: getUniqueCounts,
        singleCount: singleCount,
        wordObject: wordObject,
        phraseObject: phraseObject,
        phraseArray: phraseArray,
        parseSpace: parseSpace,
        parseShortDash: parseShortDash,
        parseLongDash: parseLongDash,
        parseNewLine: parseNewLine,
        parseAll: parseAll,
        filterSinglets: filterSinglets,
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
        make: new Make(),
        filter: new Filter()
    };

}());