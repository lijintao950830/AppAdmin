export function trim(str: string) {
  return str.trim();
}

export function formatTime(seconds: number) {
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let remainingMinutes = minutes % 60;
  let remainingSeconds = Math.floor(seconds % 60);
  let time = '';

  if (hours > 0) {
    time += hours + ':';
  }

  if (remainingMinutes < 10) {
    time += '0';
  }

  time += remainingMinutes + ':';

  if (remainingSeconds < 10) {
    time += '0';
  }

  time += remainingSeconds;

  return time;
}
