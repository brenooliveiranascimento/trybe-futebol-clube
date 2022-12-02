import Teams from '../database/models/TeamsModel';
import MatchesService from './MatchesServices';
import { ITeams } from '../interface/ITeams';
import { IMatches } from '../interface/IMatches';
import { IGoalsStatistic } from '../interface/ILeaderBoarder';

export default class LeaderBoardService extends MatchesService {
  constructor(private teamsModel = Teams) {
    super();
  }

  async getAllMatchesPerTeam(team: ITeams) {
    const allMatches = await this.getAllFiltedId(false);
    const filterMatches = allMatches
      .filter((currMatche: IMatches) => currMatche.homeTeam === team.id);
    return filterMatches;
  }

  async sumVictoriesAndGoals(team: ITeams):Promise<IGoalsStatistic> {
    const matches: IMatches[] = await this.getAllMatchesPerTeam(team);
    const sum = matches.reduce((acc: IGoalsStatistic, currMatche: IMatches) => {
      if (currMatche.homeTeam === team.id && currMatche.homeTeamGoals > currMatche.awayTeamGoals) {
        acc.goals += currMatche.homeTeamGoals;
        acc.victories += 1;
        acc.goalsOwn += currMatche.awayTeamGoals;
        return acc;
      }
      acc.goals += currMatche.homeTeamGoals;
      acc.goalsOwn += currMatche.awayTeamGoals;
      return acc;
    }, { victories: 0, goals: 0, goalsOwn: 0 });
    return sum;
  }

  async sumDraws(team: ITeams):Promise<number> {
    const matches: IMatches[] = await this.getAllMatchesPerTeam(team);
    const sum = matches.reduce((acc: number, currMatche: IMatches) => {
      if (currMatche.homeTeam === team.id && currMatche.homeTeamGoals
         === currMatche.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return sum;
  }

  async sumLosses(team: ITeams):Promise<number> {
    const matches: IMatches[] = await this.getAllMatchesPerTeam(team);
    const sum = matches.reduce((acc: number, currMatche: IMatches) => {
      if (currMatche.homeTeam === team.id && currMatche.homeTeamGoals
         < currMatche.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return sum;
  }

  async mountResponse(team: ITeams) {
    const allMatches = await this.getAllFiltedId(false);
    const filterMatches = allMatches
      .filter((currMatche: IMatches) => currMatche.teamHome?.teamName === team.teamName);

    const { goals, victories, goalsOwn } = await this.sumVictoriesAndGoals(team);
    const totalGames = filterMatches.length;
    const totalVictories = victories;
    const totalDraws = await this.sumDraws(team);
    const totalLosses = await this.sumLosses(team);
    const goalsFavor = goals;
    const goalsBalance = goalsFavor - goalsOwn;
    const totalPoints = totalVictories * 3 + totalDraws * 1;
    const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
    const result = { goalsFavor, goalsOwn, goalsBalance, efficiency, totalLosses };
    return {
      name: team.teamName, totalPoints, totalGames, totalVictories, totalDraws, ...result,
    };
  }

  async allStatistic() {
    const allTeams: ITeams[] = await this.teamsModel.findAll();
    const getResult = Promise.all(allTeams.map(async (currTeam: ITeams) => {
      const teamStatistic = await this.mountResponse(currTeam);
      console.log(teamStatistic);
      return teamStatistic;
    }));

    const sortTeams = (a:any, b:any) =>
      b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn;

    return (await getResult).sort(sortTeams);
  }
}
