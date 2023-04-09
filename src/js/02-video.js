import Player from "@vimeo/player/src/player";
import throttle from "lodash.throttle";

const STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');


  const player = new Player(iframe);

player.on('timeupdate', throttle(function (data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Number(data.seconds)))
}, 1000));
  
const currentTime = localStorage.getItem(STORAGE_KEY) || [];

player.setCurrentTime(currentTime).then(function (seconds) {
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});