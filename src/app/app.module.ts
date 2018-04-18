import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {DataService} from "./data.service";
import {FormsModule} from "@angular/forms"
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from './/app-routing.module';
import {SearchComponent} from './search/search.component';
import {PlayerComponent} from './player/player.component';
import {MaterialModule} from './material/material.module';
import {SearchAlertComponent} from "./search/search.component"


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SearchComponent,
        PlayerComponent,
        SearchAlertComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        InfiniteScrollModule,
        MaterialModule
    ],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
