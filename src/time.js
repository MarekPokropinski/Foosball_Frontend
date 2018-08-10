export default class Time {
    constructor(data) {
        this.data = data
    }

    getConverted() {
        let r = '';
        let time = Math.floor(this.data / 1000);
        let seconds = time % 60;
        r = (seconds < 10) ? '0' + seconds : seconds;
        time = Math.floor(time / 60);

        if (time > 0) {
            r = time % 60 + ':' + r;
            time = Math.floor(time / 60);
        }

        if (time > 0) {
            r = time + ':' + r;
        }

        return r;
    }
}