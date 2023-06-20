class EventBus {
  constructor({ logger }) {
    this.eventMap = new Map();
    this.logger = logger;
  }

  /**
   * Subscribes a callback to an event.
   * @param {string} event - The event to subscribe to.
   * @param {function} callback - The callback to execute when the event is emitted.
   * @returns {boolean} - Whether the subscription was successful.
   */
  subscribe(event, callback) {
    try {
      if (typeof event !== "string" || typeof callback !== "function") {
        throw new Error("Invalid arguments");
      }
      if (!this.eventMap.has(event)) {
        this.eventMap.set(event, []);
      }
      const callbackList = this.eventMap.get(event);
      if (callbackList.includes(callback)) {
        throw new Error("Callback is already subscribed to this event");
      }
      callbackList.push(callback);
      this.logger.info(`Subscribed to event: ${event}`);
      return true;
    } catch (error) {
      this.logger.error(
        `[${event}] Error while subscribing: ${error.message}`,
        error
      );
      throw error;
    }
  }

  /**
   * Unsubscribes a callback from an event.
   * @param {string} event - The event to unsubscribe from.
   * @param {function} callback - The callback to remove.
   * @returns {boolean} - Whether the unsubscription was successful.
   */
  unsubscribe(event, callback) {
    try {
      if (typeof event !== "string" || typeof callback !== "function") {
        throw new Error("Invalid arguments");
      }
      if (this.eventMap.has(event)) {
        const callbackList = this.eventMap.get(event);
        const index = callbackList.indexOf(callback);
        if (index === -1) {
          throw new Error("Callback is not subscribed to this event");
        }
        callbackList.splice(index, 1);
        this.logger.info(`Unsubscribed from event: ${event}`);
        return true;
      }
      throw new Error("Event does not exist");
    } catch (error) {
      this.logger.error(
        `[${event}] Error while unsubscribing: ${error.message}`,
        error
      );
      throw error;
    }
  }

  /**
   * Emits an event, calling all subscribed callbacks with the provided data.
   * @param {string} event - The event to emit.
   * @param {any} data - The data to pass to the callbacks.
   */
  emit(event, data) {
    try {
      if (typeof event !== "string") {
        throw new Error("Invalid arguments");
      }
      if (this.eventMap.has(event)) {
        this.eventMap.get(event).forEach((callback) => callback(data));
        this.logger.info(`Emitted event: ${event}`);
      } else {
        throw new Error("Event does not exist");
      }
    } catch (error) {
      this.logger.error(
        `[${event}] Error while emitting: ${error.message}`,
        error
      );
      throw error;
    }
  }
}

export default EventBus;
