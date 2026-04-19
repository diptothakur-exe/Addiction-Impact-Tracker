import { Injectable } from '@nestjs/common';
import { InputDto } from './dto/input.dto';
import { ReportResult } from '../../common/types';
import {
  computeScore,
  getRiskLevel,
  buildAffectedParts,
  getRiskMeta,
  getMonthlyCost,
} from '../../common/utils/scoring.util';
import {
  buildProjections,
  buildRecovery,
  buildProjectionTexts,
} from '../../common/utils/projection.util';
import { TYPE_LABELS, INTENSITY_LABELS } from '../../common/utils/constants';

@Injectable()
export class ReportService {
  generate(dto: InputDto): ReportResult {
    const { type, intensity, years } = dto;
    const age = dto.age ?? 25;

    const score     = computeScore(type, intensity, years, age);
    const riskLevel = getRiskLevel(score);
    const meta      = getRiskMeta(riskLevel);

    const scoreLo = Math.round(Math.max(0, score - 10));
    const scoreHi = Math.round(Math.min(100, score + 10));

    const affectedParts  = buildAffectedParts(type, score);
    const projections    = buildProjections(score, type, intensity);
    const recoveryPoints = buildRecovery(score, type);
    const projTexts      = buildProjectionTexts(score, type, intensity);
    const monthlyCost    = getMonthlyCost(type, intensity);

    const chartLabels   = JSON.stringify(projections.map(p => p.label));
    const chartContinue = JSON.stringify(projections.map(p => p.continueScore));
    const chartQuit     = JSON.stringify(projections.map(p => p.quitScore));

    return {
      type,
      intensity,
      years,
      age,
      score:       Math.round(score),
      scoreLo,
      scoreHi,
      riskLevel,
      riskColor:   meta.color,
      riskBg:      meta.bg,
      meterColor:  meta.meterColor,
      healthIndex: Math.round(100 - score),
      dependency:  meta.dependency,
      monthlyCost,
      affectedParts,
      projections,
      recoveryPoints,
      ...projTexts,
      chartLabels,
      chartContinue,
      chartQuit,
      typeLabel:      TYPE_LABELS[type],
      intensityLabel: INTENSITY_LABELS[type],
    } as any;
  }
}
