"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const scoring_util_1 = require("../../common/utils/scoring.util");
const projection_util_1 = require("../../common/utils/projection.util");
const constants_1 = require("../../common/utils/constants");
let ReportService = class ReportService {
    generate(dto) {
        const { type, intensity, years } = dto;
        const age = dto.age ?? 25;
        const score = (0, scoring_util_1.computeScore)(type, intensity, years, age);
        const riskLevel = (0, scoring_util_1.getRiskLevel)(score);
        const meta = (0, scoring_util_1.getRiskMeta)(riskLevel);
        const scoreLo = Math.round(Math.max(0, score - 10));
        const scoreHi = Math.round(Math.min(100, score + 10));
        const affectedParts = (0, scoring_util_1.buildAffectedParts)(type, score);
        const projections = (0, projection_util_1.buildProjections)(score, type, intensity);
        const recoveryPoints = (0, projection_util_1.buildRecovery)(score, type);
        const projTexts = (0, projection_util_1.buildProjectionTexts)(score, type, intensity);
        const monthlyCost = (0, scoring_util_1.getMonthlyCost)(type, intensity);
        const chartLabels = JSON.stringify(projections.map(p => p.label));
        const chartContinue = JSON.stringify(projections.map(p => p.continueScore));
        const chartQuit = JSON.stringify(projections.map(p => p.quitScore));
        return {
            type,
            intensity,
            years,
            age,
            score: Math.round(score),
            scoreLo,
            scoreHi,
            riskLevel,
            riskColor: meta.color,
            riskBg: meta.bg,
            meterColor: meta.meterColor,
            healthIndex: Math.round(100 - score),
            dependency: meta.dependency,
            monthlyCost,
            affectedParts,
            projections,
            recoveryPoints,
            ...projTexts,
            chartLabels,
            chartContinue,
            chartQuit,
            typeLabel: constants_1.TYPE_LABELS[type],
            intensityLabel: constants_1.INTENSITY_LABELS[type],
        };
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)()
], ReportService);
//# sourceMappingURL=report.service.js.map