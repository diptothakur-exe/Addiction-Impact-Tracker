export type AddictionType = 'cigarettes' | 'alcohol' | 'porn';

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE';

export interface AffectedPart {
  name: string;
  weight: number;
  pct: number;
}

export interface ProjectionPoint {
  label: string;
  continueScore: number;
  quitScore: number;
}

export interface RecoveryPoint {
  period: string;
  months: number;
  score: number;
}

export interface ReportResult {
  type: AddictionType;
  intensity: number;
  years: number;
  age: number;
  score: number;
  scoreLo: number;
  scoreHi: number;
  riskLevel: RiskLevel;
  riskColor: string;
  riskBg: string;
  meterColor: string;
  healthIndex: number;
  dependency: string;
  monthlyCost: number;
  affectedParts: AffectedPart[];
  projections: ProjectionPoint[];
  recoveryPoints: RecoveryPoint[];
  proj1yr: string;
  proj5yr: string;
  projQuit: string;
  chartLabels: string;
  chartContinue: string;
  chartQuit: string;
}
