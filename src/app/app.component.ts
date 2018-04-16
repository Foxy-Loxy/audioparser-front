import {Component} from '@angular/core';
import {trigger, style, transition, animate, keyframes, query, stagger, state} from '@angular/animations';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [ ]

})
export class AppComponent {

    state: string;

    ngOnInit() {

    }

    constructor() {

    }

}
