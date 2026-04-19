import { Response } from 'express';
import { ReportService } from './report.service';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    index(): {
        title: string;
    };
    report(body: any, res: Response): void;
}
