export interface Player {
  name: string;
  score: number;
}

export interface JeopardyAnswer {
  answer: string;
  pointValue: number;
  isValid: boolean;
  isDailyDouble: boolean;
  isTriplePlay: boolean;
  question: string;
}

export interface JeopardyGame {
  categoryMap: Record<string, JeopardyAnswer[]>;
  players: Player[];
}
