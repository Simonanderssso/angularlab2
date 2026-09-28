import { Component, signal } from '@angular/core';
// import { CommonModule} from '@angular/common';
import { SportMenu } from './sport-menu/sport-menu';
import { LeagueList } from './league-list/league-list';
import { TeamList } from './team-list/team-list';
import { Sport } from './types'

@Component({
  selector: 'app-root',
  // standalone: true, Gammal kod då stadnalone nu är true som standard.
  //CommonModule borttaget nedan då den ej behövs
  // längre då ny syntax med @for/@if är inbyggt 
  // och används istället för gamla *ngIf/*ngFor.
  imports: [SportMenu, LeagueList, TeamList],
  templateUrl: './app.html',
  // tagit bort [] runt ['.app/.css'] och bytt till url 
  // istället för urls då url för en ända fil finns sedan Angular 17.
  styleUrl: './app.css'
})
export class App {

  // Lokal signal som håller reda på vald sport, default 'football'
  // Ändras via funktionen 'onSportChange' som triggas via barnet 'SportMenu'
  // som kopplas ihop i html koden för app.
  currentSport = signal<Sport>('football');
  onSportChange(sport: Sport) {
    this.currentSport.set(sport);
    this.selectedLeagueId.set(null); // Nollställ liga för det blev precis en ny sport
  }

  // Skapa en lokal signal som håller reda på vald liga (id) av typen number
  // Den skall kunna ha 'null' också och default är just 'null'
  selectedLeagueId = signal<number | null>(null);
  // Sätt värdet via en metod som triggas av barnet LeagueList och som skickas
  // in i barnet TeamList

  onLeagueSelect(leagueId: number) {    //LeagueList har output number så det krävs här
    this.selectedLeagueId.set(leagueId); // Sätter in id:t på ligan i signalen 
  }
}
