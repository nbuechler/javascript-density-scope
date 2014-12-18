

/*
 * Defines anmial class
 */
function animal() {};

animal.prototype.eat = function() {
  console.log('Eating');
  return this;
};
animal.prototype.drink = function() {
  console.log('Drinking');
  return this;
};
animal.prototype.sleep = function() {
  console.log('Sleeping');
  return this;
};
animal.prototype.taxonomy = function() {
  console.log('Taxonomy is ==> Animal');
  return this;
};

/*
 * Defines mammal class
 */
function mammal() {};

mammal.prototype = new animal;
mammal.prototype.taxonomy = function() {
  console.log('Taxonomy is ==> Animal > Mammal');
  return this;
};

/*
 * Defines cat class
 */
function cat() {};

cat.prototype = new mammal;
cat.prototype.purr = function() {
  console.log('Purring');
  return this;
};
cat.prototype.shakeWhiskers = function() {
  console.log('Shaking Whiskers');
  return this;
};
cat.prototype.taxonomy = function() {
  console.log('Taxonomy is ==> Animal > Mammal > Cat');
  return this;
};

/*
 * Defines dog class
 */
function dog() {};

dog.prototype = new mammal;
dog.prototype.wagTail = function() {
  console.log('Waging Tail');
  return this;
};
dog.prototype.taxonomy = function() {
  console.log('Taxonomy is ==> Animal > Mammal > Dog');
  return this;
};

/*
//Variable Definitions
var animal = new animal();
var mammal = new mammal();
var cat = new cat();
var dog = new dog();

//Animal methods
animal.eat();
animal.drink();
animal.sleep();
animal.taxonomy();

//Mammal methods
mammal.eat();
mammal.drink();
mammal.sleep();
mammal.taxonomy();

//Cat methods
cat.eat();
cat.drink();
cat.sleep();
cat.purr();
cat.shakeWhiskers();
cat.taxonomy();

//Dog methods
dog.eat();
dog.drink();
dog.sleep();
dog.wagTail;
dog.taxonomy();
*/