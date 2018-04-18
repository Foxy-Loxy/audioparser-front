import {Component, OnInit} from '@angular/core';
import {trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import {log} from "util";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    animations: [ ]

})
export class SearchComponent implements OnInit {

    response: any;
    search: string;
    page: number = 0;
    displayedColumns = ['url', 'title', 'duration', 'origin'];
    dataSource: Element[];

    ngOnInit() {

    }

    download(url){
        window.open(url, "_blank");
    }

    startSearch(stringGiven){
        this.search = stringGiven;
        this.http.get('http://127.0.0.1:8000/api/getList?search=' + this.search).subscribe(data => {
            this.response = data;
            this.response = Array.from(this.response);
        });
    }

    selectTrack(player, url, title, duration){
        player.setTrack(url, duration, title);
    }

    timeToStr(time){
        return new Date(time * 1000).toISOString().substr(14, 5);
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
