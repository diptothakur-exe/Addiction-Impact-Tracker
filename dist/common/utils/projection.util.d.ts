import { AddictionType, ProjectionPoint, RecoveryPoint } from '../types';
export declare function futureContinue(score: number, type: AddictionType, intensity: number, years: number): number;
export declare function futureQuit(score: number, type: AddictionType, months: number): number;
export declare function buildProjections(score: number, type: AddictionType, intensity: number): ProjectionPoint[];
export declare function buildRecovery(score: number, type: AddictionType): RecoveryPoint[];
export declare function buildProjectionTexts(score: number, type: AddictionType, intensity: number): {
    proj1yr: string;
    proj5yr: string;
    projQuit: string;
};
