export interface GameStats {
    twoPtMade:number;
    twoPtMissed:number;
    threePtMade:number;
    threePtMissed:number;
    ftMade:number;
    ftMissed:number;
    offRebounds:number;
    defRebounds:number;
    assists:number;
    steals:number;
    blocks:number;
    turnovers:number;
    foulsCommitted:number;
    foulsDrawn:number;
}

export interface Game {
    id: string;
    playerId: string;
    team: string;
    opponentTeam:string;
    season: string;
    level: string;
    finalScore:string;
    isFinished:boolean;
    stats?:GameStats;
    createdAt:string;

}