let interval: number | undefined;
let reminderInterval: number | undefined;

interface WorkerMessage {
  type: string;
  duration?: number;
  isReminding?: boolean;
  reminderWebhook?: string;
}

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const { type, duration, isReminding, reminderWebhook } = event.data;

  if (type === 'start') {
    interval = setInterval(() => {
      self.postMessage('tick');
    }, 1000); // 1 second
  } else if (type === 'stop') {
    if (interval !== undefined) {
      clearInterval(interval);
    }
    if (reminderInterval !== undefined) {
      clearInterval(reminderInterval);
    }
  } else if (type === 'reset') {
    if (interval !== undefined) {
      clearInterval(interval);
    }
    if (reminderInterval !== undefined) {
      clearInterval(reminderInterval);
    }
    if (duration !== undefined) {
      self.postMessage({ type: 'reset', duration: duration * 60 });
    }
  } else if (type === 'startReminder') {
    if (isReminding && reminderWebhook && reminderWebhook.length > 1) {
      reminderInterval = setInterval(() => {
        self.postMessage('sendReminder');
      }, 8000); // 8 seconds
    }
  } else if (type === 'stopReminder') {
    if (reminderInterval !== undefined) {
      clearInterval(reminderInterval);
    }
  }
};
