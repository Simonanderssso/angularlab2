import { Component, input, signal, effect, inject } from '@angular/core';
import { Team } from '../types';
import { SportsApiService } from '../services/sports-api-service'

//visar lagen i vald liga.
//Input från förälder, lokalt state i signaler, effect som hämtar
// ny data varje gång input ändras.
@Component({
  selector: 'app-team-list',
  imports: [],
  templateUrl: './team-list.html',
  styleUrl: './team-list.css'
})
export class TeamList {

  // Liga id från föräldern App, required = måste skicka värde
  // matchar typen selectedLeagueId i App, för bindningen i app.html ska funka
  leagueIdIn = input.required< number | null>(); //Liga id från päron, null för ingen vald liga.

  //lokalt state likt league.list
  teams = signal<Team[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // samma service instans i hela appen providedIn:'root' ser till det.
  private api = inject(SportsApiService);

  constructor() {
    //effect körs en gång och varje gg nån av dens signaler ändras.
    effect((onCleanup) => {
      const id = this.leagueIdIn();

      
      if (id === null) {   //Om liga ej vald töms allt och inget hämtas
        this.teams.set([]);
        this.loading.set(false);
        this.error.set(null);
        return;
      }
      
      this.loading.set(true); 
      this.error.set(null);

      // Avbryter föregående om liga-id ändras innan hämtningen är klar
      // hindrar överskrivning av äldre data, ingen skillnad i mockläget nu men med api anrop som tar tid.
      const ctrl = new AbortController();
      onCleanup(() => ctrl.abort());
      
      // returnerar ett promise. .then(lyckat, misslyckat)
      // första tar lagen, andra funktionen hanterar fel.
      this.api.getTeams(id, ctrl.signal).then(
        data => { this.teams.set(data); this.loading.set(false); },
        err => { if (err.name !== 'AbortError') { this.error.set('Kunde inte hämta lag'); this.loading.set(false); } }
      );      
    });
  }
}
