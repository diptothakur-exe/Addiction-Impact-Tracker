import { AddictionType, RiskLevel } from '../types';
export declare const clamp: (x: number, min?: number, max?: number) => number;
export declare const norm: (x: number, max: number) => number;
export declare const ageFactor: (age: number) => number;
export declare function computeScore(type: AddictionType, intensity: number, years: number, age: number): number;
export declare function getRiskLevel(score: number): RiskLevel;
export declare function buildAffectedParts(type: AddictionType, score: number): Array<{
    name: string;
    weight: number;
    pct: number;
    color: string;
}>;
export declare function getRiskMeta(level: RiskLevel): {
    meterColor: string;
    dependency: string;
    min: number;
    max: number;
    color: string;
    bg: string;
    label: string;
};
export declare function getMonthlyCost(type: AddictionType, intensity: number): number;
