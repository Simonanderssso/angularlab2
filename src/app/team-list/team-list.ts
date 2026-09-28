import { Component, input } from '@angular/core';

@Component({
  selector: 'app-team-list',
  imports: [],
  templateUrl: './team-list.html',
  styleUrl: './team-list.css'
})
export class TeamList {

  leagueIdIn = input.required< number | null>(); //Liga id från päron, null för ingen vald liga.

  teams = signal<Teams[]>([]);
  loading = Signal(false);
  error = signal<string | null>(null);

  private api = inject(SportsApiService);

  constructor() {
    effect((onCleanup) => {
      const id = this.leagueIdIn();

      if (id === null) {   //Om liga ej vald töms allt och inget hämtas
        this.teams.set(null);
        this.loading.set(false);
        this.error.set(null);
        return;
      }

      this.loading.set(true); 
      this.error.set(null);

      const ctrl = new AbortController();
      onCleanup(() => ctrl.abort());
      
      this.api.getTeams(id, ctrl.signal).then(
        data => { this.leagues.set(data); this.loading.set(false); },
        err => {if (err.name !== 'AbortError') { this.error.set('Kunde inte hämta lag'); this.loading.set(false); } }
      );      
    });
  }
}
