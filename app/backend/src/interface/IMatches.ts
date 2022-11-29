interface ITeamHomeAway {
  teamName: string
}

export interface IMatches {
  id: number;
  homeTeam: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome?: ITeamHomeAway;
  teamAway?: ITeamHomeAway;
}
