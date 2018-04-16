import {Component, OnInit} from '@angular/core';
import {trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';
import { DataService} from "../data.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    animations: [ ]
})
export class HomeComponent implements OnInit {

    constructor( ) {
    }

    ngOnInit() {

    }
}
