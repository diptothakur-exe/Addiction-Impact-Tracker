import { AddictionType, RiskLevel } from '../types';
export declare const RISK_RANGES: Record<RiskLevel, {
    min: number;
    max: number;
    color: string;
    bg: string;
    label: string;
}>;
export declare const METER_COLORS: Record<RiskLevel, string>;
export declare const DEPENDENCY_LABELS: Record<RiskLevel, string>;
export declare const AFFECTED_PARTS: Record<AddictionType, Array<{
    name: string;
    weight: number;
}>>;
export declare const PART_COLORS: Record<AddictionType, string>;
export declare const MONTHLY_COST_FN: Record<AddictionType, (intensity: number) => number>;
export declare const BASELINE: Record<AddictionType, number>;
export declare const INTENSITY_FACTOR_FN: Record<AddictionType, (i: number) => number>;
export declare const TYPE_LABELS: Record<AddictionType, string>;
export declare const INTENSITY_LABELS: Record<AddictionType, string>;
