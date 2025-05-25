function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function() {
  console.log("Hi, I'm " + this.name);
};

const p1 = new Person("Alice");
p1.sayHi(); // 👈 Works! Because it found sayHi in the prototype


// p1 doesn't have sayHi

// But it finds it in Person.prototype