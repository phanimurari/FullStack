// The trim( ) method removes whitespace from both ends of a string.

// Syntax : string.trim()

const greeting = "   Hello world!  ";
console.log(greeting.trim());


// slice()
// The slice() method extracts a section of a string and returns it as a new string, without modifying the original string.

// Syntax : string.slice(start, end)

const text = "The quick brown fox";
console.log(text.slice(0, 4)); // The 
console.log(text.slice(2, 3)); // e


// toUpperCase()
// The toUpperCase() method converts a string to upper case letters.

// Syntax : string.toUpperCase()

const text2 = "The quick brown fox";
console.log(text2.toUpperCase()); // THE QUICK BROWN FOX

// toLowerCase()
// The toLowerCase() method converts a string to lower case letters.

// Syntax : string.toLowerCase()


const text3 = "Learn JavaScript";
console.log(text3.toLowerCase()); // learn javascript


// split()
// The split() method is used to split a string into an array of substrings and returns the new array.

// Syntax : string.split(separator, limit)

const str = "He-is-a-good-boy";
const words = str.split("-");
const newString10 = "he is good boy"

console.log(words); // ["He", "is", "a", "good", "boy"]
console.log(newString10.split(" "))

// replace()
// The replace() method searches a string for a specified value, or a regular expression, and returns a new string where the specified value is replaced.

// Syntax : string.replace(specifiedvalue, newvalue)

const str1 = "Football is a popular sport. Many countries play Football. Football tournaments are watched worldwide. Football fans are everywhere.";
const words1 = str1.replace("Football", "Soccer");

console.log(words1); // Soccer is a popular sport. Many countries play Football. Football tournaments are watched worldwide. Football fans are everywhere.


// includes()
// The includes() method determines whether a string contains the characters of a specified string.

// It returns true if the string contains the value, otherwise it returns false.

// Syntax : string.includes(searchvalue, start)


const str2 = "Learn 4.0 Technologies";
const word2 = str2.includes("Tech");
const number2 = str2.includes("5.0");

console.log(word2); // true
console.log(number2); // false

// Array.includes() [2, 3, 4].includes(2) -> /true


// concat()
// The concat() method is used to join two or more strings.

// Syntax : string.concat(string1, string2, ..., stringX)

const string1 = "Hello";
const string2 = "World";
console.log(string1.concat(string2)); // HelloWorld
console.log(string1.concat(" Pavan", ". Have a nice day.")); // Hello Pavan. Have a nice day.

console.log(string1 + string2)

// indexOf()
// The indexOf() method returns the position of the first occurrence of a specified value in a string.

// Syntax : string.indexOf(searchvalue, start)

const newStr1 = "Building Global Startups";
console.log(newStr1.indexOf("Global")); // 9
console.log(newStr1.indexOf("up")); // 21


// startsWith()
// The startsWith() method determines whether a string begins with the characters of a specified string, returning true or false as appropriate.

// Syntax : string.startsWith(searchvalue, start)

const newStr2 = "World-class Products";
console.log(newStr2.startsWith("rld")); // false
console.log(newStr2.startsWith("World")); // true


// endsWith()
// The endsWith() method determines whether a string ends with the characters of a specified string, returning true or false as appropriate.

// Syntax : string.endsWith(searchvalue, length)

const newStr3 = "How are you?";
console.log(newStr3.endsWith("you?")); // true
console.log(newStr3.endsWith("re")); // false


//  toString()
// The toString() method returns the value of a string object.

// Syntax : string.toString()


const number = 46;
const newNumber = number.toString();

console.log(newNumber); // 46
console.log(typeof newNumber); // string

console.log(46 === "46") // Strict Equality -> false
console.log(number.toString() === "46") // Loose Equality -> true




// substring()
// The substring() method returns the part of the string between the start and end indexes, or to the end of the string.

// Syntax : string.substring(start, end)

const newStr4 = "I am learning JavaScript";
console.log(newStr4.substring(2, 9)); // am lear
console.log(newStr4.substring(6)); // earning JavaScript


// Length
// The length property returns the length of a string (number of characters).

// Syntax : string.length

const newStr5 = "Upgrade to CCBP Tech 4.0 Intensive";
console.log(newStr5.length); // 34