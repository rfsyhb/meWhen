let intervalId: number | undefined;
let reminderIntervalId: number | undefined;

export interface WorkerMessage {
  type: 'start' | 'stop' | 'reset' | 'startReminder' | 'stopReminder';
  duration?: number;
  isReminding?: boolean;
  reminderWebhook?: string;
}

export interface WorkerResponse {
  type: 'reset' | 'sendReminder';
  duration?: number;
  reminderWebhook?: string;
}

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const { type, duration, isReminding, reminderWebhook } = event.data;

  const clearTimerInterval = () => {
    if (intervalId !== undefined) {
      clearInterval(intervalId);
      intervalId = undefined;
    }
  };

  const clearReminderInterval = () => {
    if (reminderIntervalId !== undefined) {
      clearInterval(reminderIntervalId);
      reminderIntervalId = undefined;
    }
  };

  switch (type) {
    case 'start':
      intervalId = setInterval(() => {
        self.postMessage('tick');
      }, 1000); // 1 second
      break;

    case 'stop':
      clearTimerInterval();
      break;

    case 'reset':
      clearTimerInterval();
      clearReminderInterval();
      if (duration !== undefined) {
        self.postMessage({ type: 'reset', duration: duration * 60 });
      }
      break;

    case 'startReminder':
      if (isReminding && reminderWebhook) {
        console.log('Starting reminder interval...');
        console.log('Reminder webhook:', reminderWebhook);
        clearReminderInterval();
        reminderIntervalId = setInterval(() => {
          // Logging to check if interval function is being executed
          console.log('Inside interval: Sending reminder...');
          self.postMessage({
            type: 'sendReminder',
            reminderWebhook,
          });
        }, 8000); // 8 seconds
      }
      break;

    case 'stopReminder':
      clearReminderInterval();
      console.log('Stopped reminder interval.');
      break;

    default:
      console.warn(`Unknown message type: ${type}`);
  }
};
