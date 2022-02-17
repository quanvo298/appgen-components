import { EventEmitter } from 'events';

export const SUBSCRIPTION = {
  Default: 'Subscription',
  Notification: 'Notification',
};

class PubSubDefinition {
  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  on(listener, eventName = SUBSCRIPTION.Default) {
    this.eventEmitter.on(eventName, listener);
  }

  removeEventListener(listener, eventName = SUBSCRIPTION.Default) {
    this.eventEmitter.removeListener(eventName, listener);
  }

  publish(payload, eventName = SUBSCRIPTION.Default, error = false) {
    this.eventEmitter.emit(eventName, payload, error);
  }

  getEventEmitter() {
    return this.eventEmitter;
  }
}

const PubSub = new PubSubDefinition();

export default PubSub;
