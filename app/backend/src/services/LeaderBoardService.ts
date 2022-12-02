import Teams from '../database/models/TeamsModel';
import MatchesService from './MatchesServices';
import { ITeams } from '../interface/ITeams';
import { IMatches } from '../interface/IMatches';
import { IGoalsStatistic } from '../interface/ILeaderBoarder';

export default class LeaderBoardService extends MatchesService {
  constructor(private teamsModel = Teams) { super(); }

  async getAllMatchesPerTeam(team: ITeams) {
    const allMatches = await this.getAllFiltedId(false);
    const filterMatches = allMatches
      .filter((currMatche: IMatches) => currMatche.homeTeam === team.id);
    return filterMatches;
  }

  private mountTeamStatistic = (acc: IGoalsStatistic, currMatche: IMatches) => {
    if (currMatche.homeTeamGoals > currMatche.awayTeamGoals) {
      acc.goals += currMatche.homeTeamGoals;
      acc.victories += 1;
      acc.goalsOwn += currMatche.awayTeamGoals;
      return acc;
    }
    acc.goals += currMatche.homeTeamGoals; acc.goalsOwn += currMatche.awayTeamGoals;
    acc.totalLosses = currMatche.homeTeamGoals < currMatche.awayTeamGoals
      ? acc.totalLosses += 1 : acc.totalLosses;
    acc.totalDraws = currMatche.homeTeamGoals === currMatche.awayTeamGoals
      ? acc.totalDraws += 1 : acc.totalDraws;
    return acc;
  };

  async sumVictoriesAndGoals(team: ITeams):Promise<IGoalsStatistic> {
    const matches: IMatches[] = await this.getAllMatchesPerTeam(team);
    const sum = matches
      .reduce(
        this.mountTeamStatistic,
        { victories: 0, goals: 0, goalsOwn: 0, totalLosses: 0, totalDraws: 0 },
      );
    return sum;
  }

  async mountResponse(team: ITeams) {
    const filterMatches: IMatches[] = await this.getAllMatchesPerTeam(team);

    const {
      goals, victories, goalsOwn, totalDraws, totalLosses,
    } = await this.sumVictoriesAndGoals(team);
    const totalGames = filterMatches.length;
    const totalVictories = victories;
    const goalsFavor = goals;
    const goalsBalance = goalsFavor - goalsOwn;
    const totalPoints = totalVictories * 3 + totalDraws * 1;
    const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
    const result = { goalsFavor, goalsOwn, goalsBalance, efficiency, totalLosses };
    return {
      name: team.teamName, totalPoints, totalGames, totalVictories, totalDraws, ...result,
    };
  }

  private sortTeams = (a:any, b:any) =>
    b.totalPoints - a.totalPoints
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor
  || a.goalsOwn - b.goalsOwn;

  async allStatistic() {
    const allTeams: ITeams[] = await this.teamsModel.findAll();
    const getResult = Promise.all(allTeams.map(async (currTeam: ITeams) => {
      const teamStatistic = await this.mountResponse(currTeam);
      return teamStatistic;
    }));
    return (await getResult).sort(this.sortTeams);
  }
}
