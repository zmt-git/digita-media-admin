class EventBus {
  constructor () {
    this.events = {}
  }

  emit (eventName, ...arg) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(fn => fn(...arg))
    }
  }

  on (eventName, fn) {
    if (this.events[eventName]) {
      this.events[eventName].push(fn)
    } else {
      this.events[eventName] = [fn]
    }
  }

  off (eventName, fn) {
    if (this.events[eventName] && fn) {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== fn)
    } else {
      this.events[eventName] = []
    }
  }

  once (eventName, fn) {
    const cb = function (...arg) {
      fn(...arg)
      this.off(eventName, fn)
    }
    this.on(eventName, cb)
  }
}

export default new EventBus()
