namespace Composition {
  /**
   * State interface
   */
  interface State {
    order: Order;
    placeOrder(): void;
    cancelOrder(): void;
    verifyPayment(): void;
    shipOrder(): void;
  }

  /**
   * The Oder defines the interface of interest to clients. It also maintains a
   * reference to an instance of a State subclass, which represents the current
   * state of the Order.
   */
  export class Order {
    /**
     * State references
     */
    public orderCancelledState: State;
    public orderPendingState: State;
    public orderPaymentVerifiedState: State;
    public orderShippedState: State;

    /**
     * @type {State} A reference to the current state of the order.
     */
    public currentState: State;

    constructor() {
      this.orderCancelledState = new OrderCancelledState(this);
      this.orderPendingState = new OrderPendingState(this);
      this.orderPaymentVerifiedState = new OrderPaymentVerifiedState(this);
      this.orderShippedState = new OrderShippedState(this);
      //set initial state
      this.transitionTo(this.orderCancelledState);
    }

    public transitionTo(state: State) {
      console.log(`Order: Current state -> ${(<any>state).constructor.name}.`);
      this.currentState = state;
    }

    /**
     * The Order delegates part of its behavior to the current State object.
     */
    public placeOrder(): void {
      this.currentState.placeOrder();
    }

    public cancelOrder(): void {
      this.currentState.cancelOrder();
    }

    public verifyPayment(): void {
      this.currentState.verifyPayment();
    }

    public shipOrder(): void {
      this.currentState.shipOrder();
    }
  }

  /**
   * Concrete States implement various behaviors, associated with a state of the
   * Order.
   */
  class OrderCancelledState implements State {
    constructor(public order: Order) {}

    public placeOrder(): void {
      this.order.transitionTo(this.order.orderPendingState);
      console.log("Order placed successfully!");
    }
    public cancelOrder(): void {
      console.log("Order does not exist!");
    }

    public verifyPayment(): void {
      console.log("Can not verify payment of a non existent order!");
    }

    public shipOrder(): void {
      console.log("Cannot ship order that does not exist");
    }
  }

  class OrderPendingState implements State {
    constructor(public order: Order) {}

    public placeOrder(): void {
      console.log("Aww, your order has already been received!");
    }
    public cancelOrder(): void {
      this.order.transitionTo(this.order.orderCancelledState);
      console.log("Order cancelled successfully.");
    }

    public verifyPayment(): void {
      this.order.transitionTo(this.order.orderPaymentVerifiedState);
      console.log("Payment verified successfully. Shipping soon!");
    }

    public shipOrder(): void {
      console.log("Cannot ship order that is not paid for!");
    }
  }

  class OrderPaymentVerifiedState implements State {
    constructor(public order: Order) {}

    public placeOrder(): void {
      console.log("Aww, your order was received, waiting to be shipped now!");
    }

    public cancelOrder(): void {
      this.order.transitionTo(this.order.orderCancelledState);
      console.log("Order cancelled successfully. Payment has been refunded!");
    }

    public verifyPayment(): void {
      console.log("Order has already been paid for!");
    }

    public shipOrder(): void {
      this.order.transitionTo(this.order.orderShippedState);
      console.log("Awesome, we have shipped your order, come back again!");
    }
  }

  class OrderShippedState implements State {
    constructor(public order: Order) {}

    public placeOrder(): void {
      console.log("Aww, your order was received and shipped!");
    }

    public cancelOrder(): void {
      console.log("Order already shipped, cannot cancel it!");
    }

    public verifyPayment(): void {
      console.log("Order already paid for!");
    }

    public shipOrder(): void {
      console.log("Order already shipped!");
    }
  }
}
