var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var InHeritence;
(function (InHeritence) {
    /**
     * The Oder defines the interface of interest to clients. It also maintains a
     * reference to an instance of a State subclass, which represents the current
     * state of the Order.
     */
    var Order = /** @class */ (function () {
        function Order(state) {
            this.transitionTo(state);
        }
        /**
         * The Context allows changing the State object at runtime.
         */
        Order.prototype.transitionTo = function (state) {
            console.log("Order: Current state -> " + state.constructor.name + ".");
            this.state = state;
            this.state.setOrder(this);
        };
        /**
         * The Order delegates part of its behavior to the current State object.
         */
        Order.prototype.placeOrder = function () {
            this.state.placeOrder();
        };
        Order.prototype.cancelOrder = function () {
            this.state.cancelOrder();
        };
        Order.prototype.verifyPayment = function () {
            this.state.verifyPayment();
        };
        Order.prototype.shipOrder = function () {
            this.state.shipOrder();
        };
        return Order;
    }());
    InHeritence.Order = Order;
    /**
     * The base State class declares methods that all Concrete State should
     * implement and also provides a backreference to the Order object, associated
     * with the State. This backreference can be used by States to transition the
     * Order to another State.
     */
    var State = /** @class */ (function () {
        function State() {
        }
        State.prototype.setOrder = function (order) {
            this.order = order;
        };
        return State;
    }());
    /**
     * Concrete States implement various behaviors, associated with a state of the
     * Order.
     */
    var OrderCancelledState = /** @class */ (function (_super) {
        __extends(OrderCancelledState, _super);
        function OrderCancelledState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OrderCancelledState.prototype.placeOrder = function () {
            this.order.transitionTo(new OrderPendingState());
            console.log("Order placed successfully!");
        };
        OrderCancelledState.prototype.cancelOrder = function () {
            console.log("Order does not exist!");
        };
        OrderCancelledState.prototype.verifyPayment = function () {
            console.log("Can not verify payment of a non existent order!");
        };
        OrderCancelledState.prototype.shipOrder = function () {
            console.log("Cannot ship order that does not exist");
        };
        return OrderCancelledState;
    }(State));
    InHeritence.OrderCancelledState = OrderCancelledState;
    var OrderPendingState = /** @class */ (function (_super) {
        __extends(OrderPendingState, _super);
        function OrderPendingState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OrderPendingState.prototype.placeOrder = function () {
            console.log("Aww, your order has already been received!");
        };
        OrderPendingState.prototype.cancelOrder = function () {
            this.order.transitionTo(new OrderCancelledState());
            console.log("Order cancelled successfully.");
        };
        OrderPendingState.prototype.verifyPayment = function () {
            this.order.transitionTo(new OrderPaymentVerifiedState());
            console.log("Payment verified successfully. Shipping soon!");
        };
        OrderPendingState.prototype.shipOrder = function () {
            console.log("Cannot ship order that is not paid for!");
        };
        return OrderPendingState;
    }(State));
    var OrderPaymentVerifiedState = /** @class */ (function (_super) {
        __extends(OrderPaymentVerifiedState, _super);
        function OrderPaymentVerifiedState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OrderPaymentVerifiedState.prototype.placeOrder = function () {
            console.log("Aww, your order was received, waiting to be shipped now!");
        };
        OrderPaymentVerifiedState.prototype.cancelOrder = function () {
            this.order.transitionTo(new OrderCancelledState());
            console.log("Order cancelled successfully. Payment has been refunded!");
        };
        OrderPaymentVerifiedState.prototype.verifyPayment = function () {
            console.log("Order has already been paid for!");
        };
        OrderPaymentVerifiedState.prototype.shipOrder = function () {
            this.order.transitionTo(new OrderShippedState());
            console.log("Awesome, we have shipped your order, come back again!");
        };
        return OrderPaymentVerifiedState;
    }(State));
    var OrderShippedState = /** @class */ (function (_super) {
        __extends(OrderShippedState, _super);
        function OrderShippedState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OrderShippedState.prototype.placeOrder = function () {
            console.log("Aww, your order was received and shipped!");
        };
        OrderShippedState.prototype.cancelOrder = function () {
            console.log("Order already shipped, cannot cancel it!");
        };
        OrderShippedState.prototype.verifyPayment = function () {
            console.log("Order already paid for!");
        };
        OrderShippedState.prototype.shipOrder = function () {
            console.log("Order already shipped!");
        };
        return OrderShippedState;
    }(State));
})(InHeritence || (InHeritence = {}));
var Composition;
(function (Composition) {
    /**
     * The Oder defines the interface of interest to clients. It also maintains a
     * reference to an instance of a State subclass, which represents the current
     * state of the Order.
     */
    var Order = /** @class */ (function () {
        function Order() {
            this.orderCancelledState = new OrderCancelledState(this);
            this.orderPendingState = new OrderPendingState(this);
            this.orderPaymentVerifiedState = new OrderPaymentVerifiedState(this);
            this.orderShippedState = new OrderShippedState(this);
            //set initial state
            this.transitionTo(this.orderCancelledState);
        }
        Order.prototype.transitionTo = function (state) {
            console.log("Order: Current state -> " + state.constructor.name + ".");
            this.currentState = state;
        };
        /**
         * The Order delegates part of its behavior to the current State object.
         */
        Order.prototype.placeOrder = function () {
            this.currentState.placeOrder();
        };
        Order.prototype.cancelOrder = function () {
            this.currentState.cancelOrder();
        };
        Order.prototype.verifyPayment = function () {
            this.currentState.verifyPayment();
        };
        Order.prototype.shipOrder = function () {
            this.currentState.shipOrder();
        };
        return Order;
    }());
    Composition.Order = Order;
    /**
     * Concrete States implement various behaviors, associated with a state of the
     * Order.
     */
    var OrderCancelledState = /** @class */ (function () {
        function OrderCancelledState(order) {
            this.order = order;
        }
        OrderCancelledState.prototype.placeOrder = function () {
            this.order.transitionTo(this.order.orderPendingState);
            console.log("Order placed successfully!");
        };
        OrderCancelledState.prototype.cancelOrder = function () {
            console.log("Order does not exist!");
        };
        OrderCancelledState.prototype.verifyPayment = function () {
            console.log("Can not verify payment of a non existent order!");
        };
        OrderCancelledState.prototype.shipOrder = function () {
            console.log("Cannot ship order that does not exist");
        };
        return OrderCancelledState;
    }());
    var OrderPendingState = /** @class */ (function () {
        function OrderPendingState(order) {
            this.order = order;
        }
        OrderPendingState.prototype.placeOrder = function () {
            console.log("Aww, your order has already been received!");
        };
        OrderPendingState.prototype.cancelOrder = function () {
            this.order.transitionTo(this.order.orderCancelledState);
            console.log("Order cancelled successfully.");
        };
        OrderPendingState.prototype.verifyPayment = function () {
            this.order.transitionTo(this.order.orderPaymentVerifiedState);
            console.log("Payment verified successfully. Shipping soon!");
        };
        OrderPendingState.prototype.shipOrder = function () {
            console.log("Cannot ship order that is not paid for!");
        };
        return OrderPendingState;
    }());
    var OrderPaymentVerifiedState = /** @class */ (function () {
        function OrderPaymentVerifiedState(order) {
            this.order = order;
        }
        OrderPaymentVerifiedState.prototype.placeOrder = function () {
            console.log("Aww, your order was received, waiting to be shipped now!");
        };
        OrderPaymentVerifiedState.prototype.cancelOrder = function () {
            this.order.transitionTo(this.order.orderCancelledState);
            console.log("Order cancelled successfully. Payment has been refunded!");
        };
        OrderPaymentVerifiedState.prototype.verifyPayment = function () {
            console.log("Order has already been paid for!");
        };
        OrderPaymentVerifiedState.prototype.shipOrder = function () {
            this.order.transitionTo(this.order.orderShippedState);
            console.log("Awesome, we have shipped your order, come back again!");
        };
        return OrderPaymentVerifiedState;
    }());
    var OrderShippedState = /** @class */ (function () {
        function OrderShippedState(order) {
            this.order = order;
        }
        OrderShippedState.prototype.placeOrder = function () {
            console.log("Aww, your order was received and shipped!");
        };
        OrderShippedState.prototype.cancelOrder = function () {
            console.log("Order already shipped, cannot cancel it!");
        };
        OrderShippedState.prototype.verifyPayment = function () {
            console.log("Order already paid for!");
        };
        OrderShippedState.prototype.shipOrder = function () {
            console.log("Order already shipped!");
        };
        return OrderShippedState;
    }());
})(Composition || (Composition = {}));
/// <reference path="inheritance.ts" />
/// <reference path="composition.ts" />
console.log("\n++++++++++++++++++\n\nUSING INHERITANCE\n\n+++++++++++++++++++");
var order1 = new InHeritence.Order(new InHeritence.OrderCancelledState());
order1.placeOrder();
order1.verifyPayment();
order1.shipOrder();
console.log("\n++++++++++++++++++\n\nUSING COMPOSITION\n\n+++++++++++++++++++");
var order2 = new Composition.Order();
order2.placeOrder();
order2.verifyPayment();
order2.shipOrder();
