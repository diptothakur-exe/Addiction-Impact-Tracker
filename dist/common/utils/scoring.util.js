"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ageFactor = exports.norm = exports.clamp = void 0;
exports.computeScore = computeScore;
exports.getRiskLevel = getRiskLevel;
exports.buildAffectedParts = buildAffectedParts;
exports.getRiskMeta = getRiskMeta;
exports.getMonthlyCost = getMonthlyCost;
const constants_1 = require("./constants");
const clamp = (x, min = 0, max = 100) => Math.min(Math.max(x, min), max);
exports.clamp = clamp;
const norm = (x, max) => Math.min(x / max, 1);
exports.norm = norm;
const ageFactor = (age) => age >= 40 ? 1.15 : age >= 30 ? 1.05 : 1.0;
exports.ageFactor = ageFactor;
function computeScore(type, intensity, years, age) {
    const af = (0, exports.ageFactor)(age);
    let raw = 0;
    if (type === 'cigarettes') {
        const exposure = intensity * years;
        raw = (40 * (0, exports.norm)(intensity, 30) +
            40 * (0, exports.norm)(exposure, 300) +
            20 * (0, exports.norm)(years, 20)) * af;
    }
    else if (type === 'alcohol') {
        const exposure = intensity * years;
        raw = (45 * (0, exports.norm)(intensity, 35) +
            35 * (0, exports.norm)(exposure, 350) +
            20 * (0, exports.norm)(years, 15)) * af;
    }
    else {
        const exposure = intensity * years;
        raw =
            50 * (0, exports.norm)(intensity, 5) +
                30 * (0, exports.norm)(exposure, 50) +
                20 * (0, exports.norm)(years, 10);
    }
    return (0, exports.clamp)(raw);
}
function getRiskLevel(score) {
    if (score <= 25)
        return 'LOW';
    if (score <= 50)
        return 'MODERATE';
    if (score <= 75)
        return 'HIGH';
    return 'SEVERE';
}
function buildAffectedParts(type, score) {
    return constants_1.AFFECTED_PARTS[type].map(({ name, weight }) => ({
        name,
        weight,
        pct: Math.min(Math.round(score * weight * 1.2), 100),
        color: constants_1.PART_COLORS[type],
    }));
}
function getRiskMeta(level) {
    return {
        ...constants_1.RISK_RANGES[level],
        meterColor: constants_1.METER_COLORS[level],
        dependency: constants_1.DEPENDENCY_LABELS[level],
    };
}
function getMonthlyCost(type, intensity) {
    return constants_1.MONTHLY_COST_FN[type](intensity);
}
//# sourceMappingURL=scoring.util.js.map