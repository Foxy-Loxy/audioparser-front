import {Component, Input, OnInit} from '@angular/core';
import {Howl} from "howler";


@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

    @Input('urlString') url: string;
    @Input('trackDuration') duration: number;
    @Input('trackName') name: string;

    howler: any;
    intervalVar: any;
    position: any;
    icon: string = 'play_arrow';
    timeStr: string = '--:--';
    durationStr: string = '--:--';

    timeToStr(time){
        return new Date(time * 1000).toISOString().substr(14, 5);
    }

    constructor() {
    }

    ngOnInit() {
        this.howler = new Howl({
            src: [this.url],
            html5: true,
            format: ['mp3', 'aac']
        });
        this.icon = 'pause';
        var obj = this;
        this.howler.on('pause', function () {
            clearInterval(obj.intervalVar);
        });
        this.howler.on('play', function () {
            console.log(obj);
            obj.intervalVar = setInterval(function () {
                obj.position = obj.howler.seek();
                obj.timeStr = obj.timeToStr(obj.position);
                console.log(obj.position);
            }, 100);
        });
        this.howler.on('end', function () {
            clearInterval(obj.intervalVar);
            obj.position = 0;
        });
    }

    changeTime(timeline) {
        this.howler.seek(timeline.value);
    }


    playpause(play) {
        if (this.icon == 'play_arrow') {
            this.howler.play();
            this.icon = 'pause';
        } else {
            this.howler.pause();
            this.icon = 'play_arrow';
        }
    }

    setTrack(url, duration, title) {
        this.howler.stop();
        this.url = url;
        this.howler.unload();
        this.howler._src = new Array(this.url);
        this.howler.load();
        this.duration = duration;
        this.name = title;
        this.durationStr = this.timeToStr(this.duration);
        this.howler.play();
        console.log(this.howler);
    }

    qwe() {
        console.log(this.howler._duration);
    }

}
