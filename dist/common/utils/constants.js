"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTENSITY_LABELS = exports.TYPE_LABELS = exports.INTENSITY_FACTOR_FN = exports.BASELINE = exports.MONTHLY_COST_FN = exports.PART_COLORS = exports.AFFECTED_PARTS = exports.DEPENDENCY_LABELS = exports.METER_COLORS = exports.RISK_RANGES = void 0;
exports.RISK_RANGES = {
    LOW: { min: 0, max: 25, color: '#166534', bg: '#dcfce7', label: 'Low' },
    MODERATE: { min: 26, max: 50, color: '#92400e', bg: '#fef3c7', label: 'Moderate' },
    HIGH: { min: 51, max: 75, color: '#9a3412', bg: '#ffedd5', label: 'High' },
    SEVERE: { min: 76, max: 100, color: '#7f1d1d', bg: '#fee2e2', label: 'Severe' },
};
exports.METER_COLORS = {
    LOW: '#22c55e',
    MODERATE: '#f59e0b',
    HIGH: '#f97316',
    SEVERE: '#ef4444',
};
exports.DEPENDENCY_LABELS = {
    LOW: 'Low',
    MODERATE: 'Moderate',
    HIGH: 'High',
    SEVERE: 'Severe',
};
exports.AFFECTED_PARTS = {
    cigarettes: [
        { name: 'Lungs', weight: 0.35 },
        { name: 'Heart', weight: 0.25 },
        { name: 'Blood vessels', weight: 0.20 },
        { name: 'Skin', weight: 0.20 },
    ],
    alcohol: [
        { name: 'Liver', weight: 0.40 },
        { name: 'Brain', weight: 0.20 },
        { name: 'Heart', weight: 0.20 },
        { name: 'Digestive', weight: 0.20 },
    ],
    porn: [
        { name: 'Brain / Dopamine', weight: 0.40 },
        { name: 'Focus', weight: 0.25 },
        { name: 'Sleep', weight: 0.20 },
        { name: 'Motivation', weight: 0.15 },
    ],
};
exports.PART_COLORS = {
    cigarettes: '#ef4444',
    alcohol: '#f59e0b',
    porn: '#a78bfa',
};
exports.MONTHLY_COST_FN = {
    cigarettes: (i) => Math.round(i * 7 * 30),
    alcohol: (i) => Math.round(i * 4 * 150),
    porn: () => 0,
};
exports.BASELINE = {
    cigarettes: 20,
    alcohol: 20,
    porn: 15,
};
exports.INTENSITY_FACTOR_FN = {
    cigarettes: (i) => i / 10,
    alcohol: (i) => i / 10,
    porn: (i) => i,
};
exports.TYPE_LABELS = {
    cigarettes: 'Cigarettes',
    alcohol: 'Alcohol',
    porn: 'Behavioral (Porn)',
};
exports.INTENSITY_LABELS = {
    cigarettes: 'cigarettes/day',
    alcohol: 'units/week',
    porn: 'sessions/day',
};
//# sourceMappingURL=constants.js.map