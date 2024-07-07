export const currentTime = (hours: number, minute: number) => {
  let currentHours = hours.toString();
  let currentMinute = minute.toString();
  if (hours < 10) {
    currentHours = 0 + hours.toString();
  }
  if (minute < 10) {
    currentMinute = 0 + minute.toString();
  }
  return [currentHours, currentMinute];
};

export const monthState = [
  'янв',
  'фев',
  'мар',
  'апр',
  'мая',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек',
];

export const postTime = (time: string | number) => {
  const timeNumber = new Date(time).getTime();
  const timeNow = Date.now();

  const month = new Date(timeNumber).getMonth();
  const day = new Date(timeNumber).getDate();
  const hours = new Date(timeNumber).getHours();
  const minute = new Date(timeNumber).getMinutes();

  const dayNow = new Date(timeNow).getDate();

  const diff = timeNow - timeNumber;

  if (diff < 1000) return `прямо сейчас`;

  const diffSec = Math.floor(diff / 1000);

  if (diffSec < 60) {
    return `${diffSec} сек. назад`;
  }

  const diffMin = Math.floor(diff / 60000);

  if (diffMin < 60) return `${diffMin} мин. назад`;

  const diffHours = Math.floor(diff / 3600000);

  const [currentHours, currentMinute] = currentTime(hours, minute);

  if (diffHours >= 1 && diffHours < 24 && day === dayNow) {
    return `сегодня в ${currentHours}:${currentMinute}`;
  }

  if (diffHours >= 1 && diffHours < 48 && dayNow - day === 1) {
    return `вчера в ${currentHours}:${currentMinute}`;
  }

  return `${day} ${monthState[month]} в ${currentHours}:${currentMinute}`;
};

export const getTime = (time: string | number) => {
  const timeNumber = new Date(time).getTime();

  const hours = new Date(timeNumber).getHours();
  const minute = new Date(timeNumber).getMinutes();
  let hoursString = `${hours}`;
  let minuteString = `${minute}`;

  if (hours < 10) hoursString = `0${hours}`;

  if (minute < 10) minuteString = `0${minute}`;

  return `${hoursString}:${minuteString}`;
};
