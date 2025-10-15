const secToTime = (sec: number) => {
  const hour = Math.floor(sec / 60 / 60);
  const minute = Math.floor((sec / 60) % 60);
  const second = Math.floor(sec % 60);
  return { hour, minute, second };
};
// setTimeout(function() {console.log('timeout');}, 3000);
// console.log('working...');
// setInterval(function() {count++; console.log(count);}, 1000);

const clockDisplay = ({
  hour,
  minute,
  second,
}: {
  hour: number;
  minute: number;
  second: number;
}) => {
  let clock = ``;
  if (hour < 10) {
    clock += `0${hour}`;
  } else {
    clock += `${hour}`;
  }

  if (minute < 10) {
    clock += `:0${minute}`;
  } else {
    clock += `:${minute}`;
  }

  if (second < 10) {
    clock += `:0${second}`;
  } else {
    clock += `:${second}`;
  }
  return clock;
};

export const timeFormat = (timeInput: number) => {
  return clockDisplay(secToTime(timeInput));
};
