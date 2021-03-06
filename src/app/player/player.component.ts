import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
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

    @Output() prevEvent = new EventEmitter<string>();
    @Output() nextEvent = new EventEmitter<string>();
    @Output() firstEvent = new EventEmitter<string>();


    howler: any;
    intervalVar: any;
    position: any;
    icon: string = 'play_arrow';
    timeStr: string = '--:--';
    durationStr: string = '--:--';
    _isPlaying: boolean;
    volume: number;
    loop: boolean = false;

    get isPlaying():boolean {
        return this._isPlaying;
    }
    set isPlaying(state) {
        if(state == true){
            this._isPlaying = state;
            this.icon = 'pause';
        }
        if(state == false){
            this._isPlaying = state;
            this.icon = 'play_arrow';
        }
    }

    callNext(){
        this.nextEvent.next(this.url);
    }

    callPrev(){
        this.prevEvent.next(this.url);
    }

    timeToStr(time) {
        return new Date(Math.round(time) * 1000).toISOString().substr(14, 5);
    }

    constructor() {
    }

    ngOnInit() {
        this.howler = new Howl({
            src: [this.url],
            html5: true,
            format: ['mp3', 'aac'],
            volume: 0.5
        });
        this.isPlaying = false;
        var obj = this;
        this.howler.on('pause', function () {
            clearInterval(obj.intervalVar);
            obj.isPlaying = false;
        });
        this.howler.on('play', function () {
            obj.isPlaying = true;
            obj.intervalVar = setInterval(function () {
                obj.position = obj.howler.seek();
                //!!!!! WORKAROUND !!!!!
                if (isNaN(obj.position) && (!obj.isFloat(obj.position)))
                    obj.position = 0;
                //!!!!! WORKAROUND !!!!!
                obj.timeStr = obj.timeToStr(obj.position);
            }, 500);
        });
        this.howler.on('end', function () {
            clearInterval(obj.intervalVar);
            obj.position = 0;
            obj.isPlaying = false;
            if(obj.loop == false)
                obj.callNext();
        });
        this.howler.on('load', function () {

        })
    }

    changeTime(timeline) {
        this.howler.stop();
        this.howler.seek(timeline.value);
        this.howler.play();
        this.isPlaying = true;
    }

    toggleLoop(loopBtn){
        if(this.loop == true) {
            this.loop = false;
            this.howler.loop(this.loop);
            loopBtn.color = 'accent';
        } else if(this.loop == false) {
            this.loop = true;
            this.howler.loop(this.loop);
            loopBtn.color = 'primary';
        }
    }


    playpause(play) {
        if(this.url == '') {
            this.firstEvent.next();
        } else {
            if (this.isPlaying == true) {
                this.howler.pause();
                this.isPlaying = false;
            }
            else if (this.isPlaying == false) {
                this.howler.play();
                this.isPlaying = true;
            }
        }
    }

    isFloat(n) {
        return n === +n && n !== (n|0);
    }

    setTrack(url, duration, title) {
        clearInterval(this.intervalVar);
        this.position = 0;
        this.howler.stop();
        this.url = url;
        this.howler.unload();
        this.howler._src = new Array(this.url);
        this.howler.load();
        this.duration = duration;
        this.name = title;
        this.timeStr = '--:--'
        this.durationStr = this.timeToStr(this.duration);
        this.howler.play();
        this.isPlaying = true;

    }

    setVolume(slider){
        this.howler.volume(slider.value);
    }


}
