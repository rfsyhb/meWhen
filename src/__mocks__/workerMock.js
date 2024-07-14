class Worker {
  constructor(stringUrl) {
    this.url = stringUrl;
    this.onmessage = () => {};
    this.onerror = () => {};
    this._listeners = {};
    this._intervals = {};
  }

  postMessage(msg) {
    if (msg.type === 'start') {
      this._startTimer();
    } else if (msg.type === 'stop') {
      this._stopTimer();
    } else if (msg.type === 'reset') {
      this._resetTimer(msg.duration);
    } else if (msg.type === 'startReminder') {
      this._startReminder(msg.isReminding, msg.reminderWebhook);
    } else if (msg.type === 'stopReminder') {
      this._stopReminder();
    }
  }

  addEventListener(event, callback) {
    this._listeners[event] = callback;
  }

  removeEventListener(event) {
    delete this._listeners[event];
  }

  terminate() {
    this._clearAllIntervals();
    this._listeners = {};
  }

  _startTimer() {
    this._clearTimerInterval();
    this._intervals.timer = setInterval(() => {
      if (this._listeners['message']) {
        this._listeners['message']({ data: 'tick' });
      }
    }, 1000);
  }

  _stopTimer() {
    this._clearTimerInterval();
  }

  _resetTimer(duration) {
    this._clearTimerInterval();
    this._clearReminderInterval();
    if (this._listeners['message']) {
      this._listeners['message']({
        data: { type: 'reset', duration: duration * 60 },
      });
    }
  }

  _startReminder(isReminding, reminderWebhook) {
    if (isReminding && reminderWebhook) {
      this._clearReminderInterval();
      this._intervals.reminder = setInterval(() => {
        if (this._listeners['message']) {
          this._listeners['message']({
            data: { type: 'sendReminder', reminderWebhook },
          });
        }
      }, 8000);
    }
  }

  _stopReminder() {
    this._clearReminderInterval();
  }

  _clearTimerInterval() {
    if (this._intervals.timer !== undefined) {
      clearInterval(this._intervals.timer);
      this._intervals.timer = undefined;
    }
  }

  _clearReminderInterval() {
    if (this._intervals.reminder !== undefined) {
      clearInterval(this._intervals.reminder);
      this._intervals.reminder = undefined;
    }
  }

  _clearAllIntervals() {
    this._clearTimerInterval();
    this._clearReminderInterval();
  }
}

globalThis.Worker = Worker;
