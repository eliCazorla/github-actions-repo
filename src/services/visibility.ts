type VisibilityListener = ((e: Event) => void) | ((e?: Event) => void);

class Service {
  listeners: VisibilityListener[] = [];

  onVisibility = (e: Event) => {
    this.listeners.forEach((listener) => listener(e));
  };

  listen = (listener: VisibilityListener) => {
    if (!this.listeners.length) {
      document.addEventListener('visibilitychange', this.onVisibility);
    }

    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener);
    }
  };

  dismiss = (listener: VisibilityListener) => {
    this.listeners = this.listeners.filter((l) => l !== listener);

    if (!this.listeners.length) {
      document.removeEventListener('visibilitychange', this.onVisibility);
    }
  };
}

const VisibilityService = new Service();

export default VisibilityService;
