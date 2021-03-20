import moment from "moment";

export function getTimeLeft(startedAt, length) {
  const timeSince = moment(new Date()).diff(startedAt);
  const timeLeft = length * 60 * 1000 - timeSince;
  const duration = moment.duration(timeLeft);
  return {
    minutes: String(duration.minutes()).padStart(2, "0"),
    seconds: String(duration.seconds()).padStart(2, "0"),
  };
}
