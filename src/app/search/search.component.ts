import {Component, OnInit} from '@angular/core';
import {trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { HttpClient } from '@angular/common/http';
import { Howl } from "howler";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    animations: [ ]

})
export class SearchComponent implements OnInit {

    response: any;
    sound: any;
    url: string = '';
    search: string;
    page: number = 0;
    playing: string = '-';

    ngOnInit() {
        this.sound = new Howl({
            src: [this.url],
            html5: true,
            format: ['mp3', 'aac']
        })
    }

    startSearch(stringGiven){
        this.search = stringGiven;
        this.http.get('http://127.0.0.1:8000/api/getList?search=' + this.search).subscribe(data => {
            this.response = data;
        });
    }

    createPlayer(url, name) {
        this.sound.stop();
        this.url = url;
        this.sound.unload();
        this.sound._src = new Array(this.url);
        this.sound.load();
        this.sound.play();
        this.playing = name;
    }

    stop() {
        this.sound.stop();
        this.playing = '-';
    }

    extendList() {
        this.page++;
        this.http.get('http://127.0.0.1:8000/api/getList?search=' + this.search + '&page=' + this.page).subscribe(data => {
            console.log(this.response.length);
            this.response = this.response.concat(data);
            console.log(this.response.length);
        });
    }

    constructor (private http: HttpClient){

    }

}
