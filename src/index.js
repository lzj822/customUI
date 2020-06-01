import "./index.scss";

class Person {
    constructor(name) {
        this.name = name;
    }
    getName() {
        console.log("this is index.js");
        return this.name;
    }
}

const person = new Person("Tom");