function Animal() { }
function Dog() { }

Object.defineProperties(Animal.prototype, {
  name: {
    value() {
      return 'Animal'
    }
  },
  say: {
    value() {
      return `I'm ${this.name()}`
    }
  }
})



// dog instanceof Aimal === true
// dog.__proto__.__proto__.__proto__... === Animal.prototype
// dog.__proto__ === Dog.prototype
// Dog.prototype.__proto__ === Animal.prototype

Dog.prototype = Object.create(Animal.prototype, {
  constructor: { // 纠正 constructor 指向
    value: Dog,
    enumerable: false
  },
  name: {
    value() {
      return `Dog` // 多态
    }
  }
})

// console.log(new Dog() instanceof Animal) // true

// console.log(new Dog().say()) // I'm Animal

// console.log(Dog.prototype.constructor)
