/// <reference path="inheritance.ts" />
/// <reference path="composition.ts" />

console.log(`
++++++++++++++++++

USING INHERITANCE

+++++++++++++++++++`);
const order1 = new InHeritence.Order(new InHeritence.OrderCancelledState());
order1.placeOrder();
order1.verifyPayment();
order1.shipOrder();

console.log(`
++++++++++++++++++

USING COMPOSITION

+++++++++++++++++++`);
const order2 = new Composition.Order();
order2.placeOrder();
order2.verifyPayment();
order2.shipOrder();
