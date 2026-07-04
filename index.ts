type PizzaObj = {
    name: string;
    price: number;
    id: number;
}
type Order = {
    id: number;
    pizza: PizzaObj;
    status: "ordered" | "completed";
}


const menu: PizzaObj[] = [
    { name: "Margherita", price: 8, id: 1 },
    { name: "Pepperoni", price: 10, id: 2 },
    { name: "Hawaiian", price: 10, id: 3 },
    { name: "Veggie", price: 9, id: 4 },
    { name: "chilie", price: 9, id: 5 },
]

let cashInRegister = 100
let nextOrderId = 1

const orderQueue: Order[] = []

function addNewPizza(pizzaObj: PizzaObj) {
    if (menu.find(pizza => pizzaObj.id === pizza.id)) {
        console.error(`Pizza with id ${pizzaObj.id} already exists`)
        return
    }
    menu.push(pizzaObj)
}

function placeOrder(pizzaName) {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    if (!selectedPizza) {
        console.error(`${pizzaName} does not exist in the menu`)
        return
    }
    cashInRegister += selectedPizza.price
    const newOrder: Order = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" }
    orderQueue.push(newOrder)
    return newOrder
}

/**
 * Challenge: Teach TS what data type should be used for the 
 * orderId in the completeOrder function. Then check for any
 * additional warnings TS comes up with and fix those.
 */

function completeOrder(orderId) {
    const order = orderQueue.find(order => order.id === orderId)
    if (!order) {
        console.error(`Order ${orderId} not found`)
        return
    }
    order.status = "completed"
    return order
}

export function getPizaDetails(identifier: number | string): PizzaObj | null { // : means return type
    if (typeof identifier === "number") {
        return menu.find(pizza => pizza.id === identifier) || null
    }
    else if (typeof identifier === "string") {
        return menu.find(pizza => pizza.name.toLowerCase() === identifier.toLowerCase()) || null
    }
    else {
        throw new TypeError("Invalid identifier type");
    }
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12, id: 6 })
addNewPizza({ name: "BBQ Chicken", price: 12, id: 7 })
addNewPizza({ name: "Spicy Sausage", price: 11, id: 8 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderQueue)