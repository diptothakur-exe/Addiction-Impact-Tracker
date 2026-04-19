import { AddictionType, RiskLevel } from '../types';
import {
  RISK_RANGES, METER_COLORS, DEPENDENCY_LABELS,
  AFFECTED_PARTS, MONTHLY_COST_FN, PART_COLORS,
} from './constants';

export const clamp = (x: number, min = 0, max = 100): number =>
  Math.min(Math.max(x, min), max);

export const norm = (x: number, max: number): number =>
  Math.min(x / max, 1);

export const ageFactor = (age: number): number =>
  age >= 40 ? 1.15 : age >= 30 ? 1.05 : 1.0;

export function computeScore(
  type: AddictionType,
  intensity: number,
  years: number,
  age: number,
): number {
  const af = ageFactor(age);
  let raw = 0;

  if (type === 'cigarettes') {
    const exposure = intensity * years;
    raw = (
      40 * norm(intensity, 30) +
      40 * norm(exposure, 300) +
      20 * norm(years, 20)
    ) * af;
  } else if (type === 'alcohol') {
    const exposure = intensity * years;
    raw = (
      45 * norm(intensity, 35) +
      35 * norm(exposure, 350) +
      20 * norm(years, 15)
    ) * af;
  } else {
    const exposure = intensity * years;
    raw =
      50 * norm(intensity, 5) +
      30 * norm(exposure, 50) +
      20 * norm(years, 10);
  }

  return clamp(raw);
}

export function getRiskLevel(score: number): RiskLevel {
  if (score <= 25) return 'LOW';
  if (score <= 50) return 'MODERATE';
  if (score <= 75) return 'HIGH';
  return 'SEVERE';
}

export function buildAffectedParts(
  type: AddictionType,
  score: number,
): Array<{ name: string; weight: number; pct: number; color: string }> {
  return AFFECTED_PARTS[type].map(({ name, weight }) => ({
    name,
    weight,
    pct: Math.min(Math.round(score * weight * 1.2), 100),
    color: PART_COLORS[type],
  }));
}

export function getRiskMeta(level: RiskLevel) {
  return {
    ...RISK_RANGES[level],
    meterColor: METER_COLORS[level],
    dependency: DEPENDENCY_LABELS[level],
  };
}

export function getMonthlyCost(type: AddictionType, intensity: number): number {
  return MONTHLY_COST_FN[type](intensity);
}
