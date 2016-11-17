# javascript-density-scope
A simple JavaScript application engineered to measure frequency of words in a text body.

# History
The goal was to see if I could build a tool, and I was interested in political ideology. I wanted to build a tool that I might be able to use to determine the frequency distribution of a passage of text. (2014)

# Lessons Learned
* I built this project before I knew about NLTK.
* This project reinforces for me that when you have a limited set of tools, everything begins to look like the same problem.
* "When all you have is a hammer, everything looks like a nail" is an expression to convey the same idea as the last bullet point.
* I learned that I can build tools, but it might be easier to find tools instead.
* Sometimes, slowing down and thinking about the next step is better than rushing in, and that's why I discontinued work on this project. But, it was quite a bit of fun working on 'javascript-density-scope'

# How to use
Takes a passage of text as a string input and returns a an json object called densityScope with each key:value pair being as follows:

``` javascript
  var densityScope = {
      "stringA" : (integer),
      "stringB" : (integer),
      "stringN" : (integer)
  }
```

# License
GPLv3
