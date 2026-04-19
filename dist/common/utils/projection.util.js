"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.futureContinue = futureContinue;
exports.futureQuit = futureQuit;
exports.buildProjections = buildProjections;
exports.buildRecovery = buildRecovery;
exports.buildProjectionTexts = buildProjectionTexts;
const scoring_util_1 = require("./scoring.util");
const constants_1 = require("./constants");
function futureContinue(score, type, intensity, years) {
    const ifac = constants_1.INTENSITY_FACTOR_FN[type](intensity);
    return (0, scoring_util_1.clamp)(score + ifac * years * 5);
}
function futureQuit(score, type, months) {
    const baseline = constants_1.BASELINE[type];
    return Math.round(Math.max(baseline, score * Math.exp(-0.15 * months)));
}
function buildProjections(score, type, intensity) {
    const labels = ['Now', '1yr', '2yr', '3yr', '4yr', '5yr'];
    return labels.map((label, i) => ({
        label,
        continueScore: Math.round(futureContinue(score, type, intensity, i)),
        quitScore: Math.round(futureQuit(score, type, i * 12)),
    }));
}
function buildRecovery(score, type) {
    return [
        { period: '1 week', months: 0.25 },
        { period: '1 month', months: 1 },
        { period: '6 months', months: 6 },
        { period: '1 year', months: 12 },
    ].map(({ period, months }) => ({
        period,
        months,
        score: Math.round(futureQuit(score, type, months)),
    }));
}
function buildProjectionTexts(score, type, intensity) {
    const y1 = futureContinue(score, type, intensity, 1);
    const y5 = futureContinue(score, type, intensity, 5);
    const y1inc = Math.round(y1 - score);
    const halfMonths = Math.round(Math.log(2) / 0.15);
    return {
        proj1yr: `1 year → risk ${y1inc >= 0 ? '+' : ''}${y1inc}% (approx. ${Math.round(y1)}/100) if continued`,
        proj5yr: `5 years → ${constants_1.DEPENDENCY_LABELS[(0, scoring_util_1.getRiskLevel)(y5)]} risk likelihood — score ~${Math.round(y5)}/100`,
        projQuit: `Quitting now → risk halves in ~${halfMonths} months (approximate)`,
    };
}
//# sourceMappingURL=projection.util.js.map