import { AddictionType, ProjectionPoint, RecoveryPoint } from '../types';
import { clamp, getRiskLevel } from './scoring.util';
import { BASELINE, INTENSITY_FACTOR_FN, DEPENDENCY_LABELS } from './constants';

export function futureContinue(
  score: number,
  type: AddictionType,
  intensity: number,
  years: number,
): number {
  const ifac = INTENSITY_FACTOR_FN[type](intensity);
  return clamp(score + ifac * years * 5);
}

export function futureQuit(
  score: number,
  type: AddictionType,
  months: number,
): number {
  const baseline = BASELINE[type];
  return Math.round(Math.max(baseline, score * Math.exp(-0.15 * months)));
}

export function buildProjections(
  score: number,
  type: AddictionType,
  intensity: number,
): ProjectionPoint[] {
  const labels = ['Now', '1yr', '2yr', '3yr', '4yr', '5yr'];
  return labels.map((label, i) => ({
    label,
    continueScore: Math.round(futureContinue(score, type, intensity, i)),
    quitScore:     Math.round(futureQuit(score, type, i * 12)),
  }));
}

export function buildRecovery(score: number, type: AddictionType): RecoveryPoint[] {
  return [
    { period: '1 week',    months: 0.25 },
    { period: '1 month',   months: 1    },
    { period: '6 months',  months: 6    },
    { period: '1 year',    months: 12   },
  ].map(({ period, months }) => ({
    period,
    months,
    score: Math.round(futureQuit(score, type, months)),
  }));
}

export function buildProjectionTexts(
  score: number,
  type: AddictionType,
  intensity: number,
) {
  const y1 = futureContinue(score, type, intensity, 1);
  const y5 = futureContinue(score, type, intensity, 5);
  const y1inc = Math.round(y1 - score);
  const halfMonths = Math.round(Math.log(2) / 0.15);

  return {
    proj1yr: `1 year → risk ${y1inc >= 0 ? '+' : ''}${y1inc}% (approx. ${Math.round(y1)}/100) if continued`,
    proj5yr: `5 years → ${DEPENDENCY_LABELS[getRiskLevel(y5)]} risk likelihood — score ~${Math.round(y5)}/100`,
    projQuit: `Quitting now → risk halves in ~${halfMonths} months (approximate)`,
  };
}
