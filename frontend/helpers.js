import moment from "moment";

export function getTimeLeft(startedAt, length) {
  const timeSince = moment(new Date()).diff(startedAt) / 1000 / 60;

  const timeLeft = (length * 60 * 1000 - timeSince) / 1000 / 60;
  const minsLeft = Math.ceil(timeLeft);
  const secondsLeft = Math.round((timeLeft - minsLeft) * 60);

  return {
    minutes: String(minsLeft).padStart(2, "0"),
    seconds: String(secondsLeft).padStart(2, "0"),
  };
}
