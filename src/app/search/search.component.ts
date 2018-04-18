import {Component, OnInit, ViewChild} from '@angular/core';
import {trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map'
import {log} from "util";
import {PlayerComponent} from "../player/player.component";
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    animations: []

})
export class SearchComponent implements OnInit {

    @ViewChild(PlayerComponent) private playComponent: PlayerComponent;

    response: any;
    search: string;
    page: number = 0;
    displayedColumns = ['url', 'title', 'duration', 'origin'];


    ngOnInit() {

    }

    firstTrack(): string{
        console.log(this.response);
        if (!(this.response === undefined)) {
            this.playComponent.setTrack(this.response[0].url, this.response[0].duration, this.response[0].title);
        }
        return 'none';
    }

    nextTrack(url): string {
        if (!(this.response === undefined)) {
            var index = this.response.findIndex(function (element) {
                return element.url == url;
            });
            if (!(this.response.length - 5 <= index + 1)) {
                this.playComponent.setTrack(this.response[index + 1].url, this.response[index + 1].duration, this.response[index + 1].title);
            }
            else {
                this.extendList();
                if (!(this.response.length <=  index + 1))
                    this.playComponent.setTrack(this.response[index + 1].url, this.response[index + 1].duration, this.response[index + 1].title);
            }
        }
        return 'none';
    }

    prevTrack(url): string {
        if (!(this.response === undefined)) {
            var index = this.response.findIndex(function (element) {
                return element.url == url;
            });
            if (!(0 >= index))
                this.playComponent.setTrack(this.response[index - 1].url, this.response[index - 1].duration, this.response[index - 1].title);
        }
        return 'none';
    }

    download(url) {
        window.open(url, "_blank");
    }

    startSearch(stringGiven) {
        this.search = stringGiven;
        this.http.get('http://127.0.0.1:8000/api/getList?search=' + this.search).subscribe(data => {
            if (this.isEmpty(data)) {
                this.openAlert('Nothing found by you query');
            }
            else {
                this.response = data;
                this.response = Array.from(this.response);
            }
        });
    }

    selectTrack(player, url, title, duration) {
        player.setTrack(url, duration, title);
    }

    timeToStr(time) {
        return new Date(time * 1000).toISOString().substr(14, 5);
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    extendList() {
        this.page++;
        this.http.get('http://127.0.0.1:8000/api/getList?search=' + this.search + '&page=' + this.page).subscribe(data => {
            if (this.isEmpty(data)) {
                this.openAlert("You\'ve reached the bottom of search. Yay !");
            } else {
                this.response = this.response.concat(data);
            }
        });
    }

    openAlert(message){
        this.snackBar.open(message, 'OK');
    }

    constructor(private http: HttpClient, public snackBar: MatSnackBar) {

    }

}

//Snackbar component. Currently unused
@Component({
    selector: 'app-search-alert',
    templateUrl: 'search.alert.component.html',
    styles: [``],
})
export class SearchAlertComponent {}
