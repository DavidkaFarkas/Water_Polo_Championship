import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teamStandings'
})
export class TeamStandingsPipe implements PipeTransform {

  transform(teams: any[], args?: any): any[] {
    if (!teams) return [];

    return teams.sort((a, b) => b.points - a.points);
  }

}
