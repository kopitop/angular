import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { HeroDetailComponent } from './components/hero-detail.component';
import { HeroesComponent } from './components/heroes.component';
import { HeroService } from './services/hero.service';
import { DashboardComponent } from './components/dashboard.component';

import { AppRoutingModule } from './routes/app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';

@NgModule({
    imports:      [ 
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
    ],
    declarations: [ 
        AppComponent,
        HeroDetailComponent,
        HeroesComponent,
        DashboardComponent,
    ],
    providers: [
        HeroService,
    ],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule { }
