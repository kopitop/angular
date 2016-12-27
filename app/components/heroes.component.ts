import { Component } from '@angular/core';
import { Hero } from '../contracts/hero';
import { HeroService } from '../services/hero.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'my-heroes',
    template: `
        <div>
            <label>Hero name: <input #heroName>
            <button (click)="add(heroName.value); heroName.value=''">
                Add
            </button>
            </label>
        </div>
        <h2>My heroes</h2>
        <ul class="heroes">
            <li [class.selected]="hero == selectedHero" *ngFor="let hero of heroes" (click)="onSelect(hero)">
                <span class="badge">{{ hero.id }}</span>
                <span>{{ hero.name }}</span>
                <button class="delete" (click)="delete(hero); $event.stopPropagation">x</button>
            </li>
        </ul>
        <div *ngIf="selectedHero">
            <h2>
                {{ selectedHero.name | uppercase }} is my hero
            </h2>
            <button (click)="gotoDetail()">View Details</button>
        </div>
    `,
    styleUrls: [
        '../app/css/heroes.component.css',
    ],
})
export class HeroesComponent implements OnInit { 
    title = 'Tour of heroes';
    selectedHero: Hero;
    heroes: Hero[];
    constructor(
        private heroService: HeroService,
        private router: Router,
    ) {

    }
    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }
    getHeroes(): void {
        this.heroService
            .getHeroes()
            .then(heroes => this.heroes = heroes)
            .catch(reason => console.log('There \'s something wrong'));
    }
    ngOnInit(): void {
        this.getHeroes();
    }
    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
    add(name: string): void {
        name = name.trim();
        if(!name) {
            return;
        }

        this.heroService.create(name)
            .then(hero => {
                this.heroes.push(hero);
                this.selectedHero = null;
            })
    }
    delete(hero: Hero): void {
        this.heroService.delete(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) {
                    this.selectedHero = null;
                }
            });
    }
}
