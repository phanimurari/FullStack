class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.score = 0;
  }


   hitSix() {
    this.score += 6;
    return this.score
   }
}
let person1 = new Person("Virat", "Kohli");
let person2 = new Person("Sachin", "Tendulkar");

console.log(person1.hitSix());  // Person {...}
console.log(person2);  // Person {...}




// In class, this refers to the instance object.

// class Animal {
//   constructor(name) {
//     this.name = name;
//  }
//  eat() {
//    return this;  
//  }
//  makeSound() {
//    return `${this.name} is shouting!`;
//  }
// }
// let animal1 = new Animal("dog");

// console.log(animal1.eat());  // Animal {...}

class Animal {
    constructor() {
    this.name = "";
    this.breed = ""
  }

  makeSound() {

  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super();
    this.breed = breed;
  }
  sniff() {
    return this;
  }

  makeSound() {
    
  }
}
let dog = new Dog("dog", "german Shepherd");

// console.log(dog.sniff());  // Dog {...}