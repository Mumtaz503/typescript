type PizzaObj = {
    name: string;
    price: number;
    id?: number;
}

type UpdatePizzaObj = Partial<PizzaObj>;

type Order = {
    id: number;
    pizza: PizzaObj;
    status: "ordered" | "completed";
}

let nextPizzaId: number = 1

const menu: PizzaObj[] = [
    { name: "Margherita", price: 8, id: nextPizzaId++ },
    { name: "Pepperoni", price: 10, id: nextPizzaId++ },
    { name: "Hawaiian", price: 10, id: nextPizzaId++ },
    { name: "Veggie", price: 9, id: nextPizzaId++ },
    { name: "chilie", price: 9, id: nextPizzaId++ },
]

let cashInRegister = 100
let nextOrderId = 1

const orderQueue: Order[] = []

function addNewPizza(pizzaObj: Omit<PizzaObj, "id">): void {  //returns void since we are not returning anything so better to specify it
    if (menu.find(pizza => pizzaObj.name.toLowerCase() === pizza.name.toLowerCase())) {
        console.error(`Pizza with name ${pizzaObj.name} already exists`)
        return
    }
    menu.push({ ...pizzaObj, id: nextPizzaId++ });
}

function updatePizzaPrice(pizzaObj: UpdatePizzaObj): PizzaObj | undefined {
    if (pizzaObj.price === undefined) {
        console.error("Price is required")
        return
    }

    let pizza: PizzaObj | undefined
    if (pizzaObj.id !== undefined && pizzaObj.id !== null) {
        pizza = menu.find(p => p.id === pizzaObj.id)
    } else if (pizzaObj.name !== undefined) {
        const name = pizzaObj.name
        pizza = menu.find(p => p.name.toLowerCase() === name.toLowerCase())
    } else {
        console.error("Pizza id or name is required")
        return
    }

    if (!pizza) {
        console.error("Pizza not found")
        return
    }

    pizza.price = pizzaObj.price
    return pizza
}

function placeOrder(pizzaName): Order | undefined {
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

function completeOrder(orderId): Order | undefined {
    const order = orderQueue.find(order => order.id === orderId)
    if (!order) {
        console.error(`Order ${orderId} not found`)
        return
    }
    order.status = "completed"
    return order
}

export function getPizaDetails(identifier: number | string): PizzaObj | undefined { // : means return type
    if (typeof identifier === "number") {
        return menu.find(pizza => pizza.id === identifier)
    }
    else if (typeof identifier === "string") {
        return menu.find(pizza => pizza.name.toLowerCase() === identifier.toLowerCase())
    }
    else {
        throw new TypeError("Invalid identifier type");
    }
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ name: "BBQ Chicken", price: 12 })
addNewPizza({ name: "Spicy Sausage", price: 11 })
addNewPizza({ name: "Chicken Tikka", price: 12 })
addNewPizza({ name: "Chicken Fajita Ranch", price: 12 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderQueue)