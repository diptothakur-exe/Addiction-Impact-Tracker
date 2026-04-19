import { AddictionType, RiskLevel } from '../types';

export const RISK_RANGES: Record<RiskLevel, { min: number; max: number; color: string; bg: string; label: string }> = {
  LOW:      { min: 0,  max: 25,  color: '#166534', bg: '#dcfce7', label: 'Low' },
  MODERATE: { min: 26, max: 50,  color: '#92400e', bg: '#fef3c7', label: 'Moderate' },
  HIGH:     { min: 51, max: 75,  color: '#9a3412', bg: '#ffedd5', label: 'High' },
  SEVERE:   { min: 76, max: 100, color: '#7f1d1d', bg: '#fee2e2', label: 'Severe' },
};

export const METER_COLORS: Record<RiskLevel, string> = {
  LOW:      '#22c55e',
  MODERATE: '#f59e0b',
  HIGH:     '#f97316',
  SEVERE:   '#ef4444',
};

export const DEPENDENCY_LABELS: Record<RiskLevel, string> = {
  LOW:      'Low',
  MODERATE: 'Moderate',
  HIGH:     'High',
  SEVERE:   'Severe',
};

export const AFFECTED_PARTS: Record<AddictionType, Array<{ name: string; weight: number }>> = {
  cigarettes: [
    { name: 'Lungs',         weight: 0.35 },
    { name: 'Heart',         weight: 0.25 },
    { name: 'Blood vessels', weight: 0.20 },
    { name: 'Skin',          weight: 0.20 },
  ],
  alcohol: [
    { name: 'Liver',      weight: 0.40 },
    { name: 'Brain',      weight: 0.20 },
    { name: 'Heart',      weight: 0.20 },
    { name: 'Digestive',  weight: 0.20 },
  ],
  porn: [
    { name: 'Brain / Dopamine', weight: 0.40 },
    { name: 'Focus',            weight: 0.25 },
    { name: 'Sleep',            weight: 0.20 },
    { name: 'Motivation',       weight: 0.15 },
  ],
};

export const PART_COLORS: Record<AddictionType, string> = {
  cigarettes: '#ef4444',
  alcohol:    '#f59e0b',
  porn:       '#a78bfa',
};

export const MONTHLY_COST_FN: Record<AddictionType, (intensity: number) => number> = {
  cigarettes: (i) => Math.round(i * 7 * 30),
  alcohol:    (i) => Math.round(i * 4 * 150),
  porn:       ()  => 0,
};

export const BASELINE: Record<AddictionType, number> = {
  cigarettes: 20,
  alcohol:    20,
  porn:       15,
};

export const INTENSITY_FACTOR_FN: Record<AddictionType, (i: number) => number> = {
  cigarettes: (i) => i / 10,
  alcohol:    (i) => i / 10,
  porn:       (i) => i,
};

export const TYPE_LABELS: Record<AddictionType, string> = {
  cigarettes: 'Cigarettes',
  alcohol:    'Alcohol',
  porn:       'Behavioral (Porn)',
};

export const INTENSITY_LABELS: Record<AddictionType, string> = {
  cigarettes: 'cigarettes/day',
  alcohol:    'units/week',
  porn:       'sessions/day',
};
