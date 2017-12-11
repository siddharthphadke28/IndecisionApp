class Person {
    constructor(name = 'Anonymous', age = 0){
        this.name = name;
        this.age = age;
    }
    getGreeting(){
        return `Hi. I am ${this.name}!`;
    }
    getDescription(){
        return `${this.name} is ${this.age} years old.`;
    }
}

class Traveller extends Person{
    constructor(name, age, homeLocation){
        super(name, age);
        this.homeLocation = homeLocation;
    }
    getHomeLocation(){
        return !!this.homeLocation;
    }
    getGreeting(){
        let greeting = super.getGreeting();

        if(this.getHomeLocation()) {
            greeting += ` I am from ${this.homeLocation}.`;
        }
        return greeting;
    }
}

const me = new Traveller('Siddharth', 12, 'Surat');
console.log(me.getGreeting());

const noOne = new Traveller();
console.log(noOne.getGreeting());