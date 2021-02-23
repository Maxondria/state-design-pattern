namespace InHeritence {
  /**
   * The Oder defines the interface of interest to clients. It also maintains a
   * reference to an instance of a State subclass, which represents the current
   * state of the Order.
   */
  export class Order {
    /**
     * @type {State} A reference to the current state of the order.
     */
    private state: State;

    constructor(state: State) {
      this.transitionTo(state);
    }

    /**
     * The Context allows changing the State object at runtime.
     */
    public transitionTo(state: State): void {
      console.log(`Order: Current state -> ${(<any>state).constructor.name}.`);
      this.state = state;
      this.state.setOrder(this);
    }

    /**
     * The Order delegates part of its behavior to the current State object.
     */

    public placeOrder(): void {
      this.state.placeOrder();
    }

    public cancelOrder(): void {
      this.state.cancelOrder();
    }

    public verifyPayment(): void {
      this.state.verifyPayment();
    }

    public shipOrder(): void {
      this.state.shipOrder();
    }
  }

  /**
   * The base State class declares methods that all Concrete State should
   * implement and also provides a backreference to the Order object, associated
   * with the State. This backreference can be used by States to transition the
   * Order to another State.
   */
  abstract class State {
    protected order: Order;

    public setOrder(order: Order) {
      this.order = order;
    }

    public abstract placeOrder(): void;

    public abstract cancelOrder(): void;

    public abstract verifyPayment(): void;

    public abstract shipOrder(): void;
  }

  /**
   * Concrete States implement various behaviors, associated with a state of the
   * Order.
   */
  export class OrderCancelledState extends State {
    public placeOrder(): void {
      this.order.transitionTo(new OrderPendingState());
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

  class OrderPendingState extends State {
    public placeOrder(): void {
      console.log("Aww, your order has already been received!");
    }
    public cancelOrder(): void {
      this.order.transitionTo(new OrderCancelledState());
      console.log("Order cancelled successfully.");
    }

    public verifyPayment(): void {
      this.order.transitionTo(new OrderPaymentVerifiedState());
      console.log("Payment verified successfully. Shipping soon!");
    }

    public shipOrder(): void {
      console.log("Cannot ship order that is not paid for!");
    }
  }

  class OrderPaymentVerifiedState extends State {
    public placeOrder(): void {
      console.log("Aww, your order was received, waiting to be shipped now!");
    }

    public cancelOrder(): void {
      this.order.transitionTo(new OrderCancelledState());
      console.log("Order cancelled successfully. Payment has been refunded!");
    }

    public verifyPayment(): void {
      console.log("Order has already been paid for!");
    }

    public shipOrder(): void {
      this.order.transitionTo(new OrderShippedState());
      console.log("Awesome, we have shipped your order, come back again!");
    }
  }

  class OrderShippedState extends State {
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
