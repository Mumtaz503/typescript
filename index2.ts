type Address = {
    street: number;
    city: string;
    state: string;
    zip: number;
}
type Person = {
    name: string;
    age: number;
    isStudent: boolean;
    address?: Address; //? means optional
}

let person: Person = {
    name: "John",
    age: 20,
    isStudent: true,
    address: {
        street: 123,
        city: "New York",
        state: "NY",
        zip: 10001,
    }
}

let personDous:Person = {
    name: "Alex",
    age: 25,
    isStudent: false,
}

let myName: "Douche" = "Douche"
const myName2: "Douche" = "Douche" //const is used to declare a constant variable

let persons: Person[] = [person, personDous]
let personArrays: Array<Person> = [person, personDous]
// ^--- same as let personArrays: Person[] = [person, personDous]

type User = {
    name: string;
    role: "admin" | "user" | "guest";
}

console.log(person)