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

export interface IAddMatches {
  homeTeam: number;
  awayTeam: number;
  awayTeamGoals: number;
  homeTeamGoals: number;
  inProgress?: boolean
}
