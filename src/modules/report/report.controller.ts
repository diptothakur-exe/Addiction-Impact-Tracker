import { Controller, Get, Post, Body, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportService } from './report.service';
import { InputDto } from './dto/input.dto';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

@Controller()
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('/')
  @Render('index')
  index() {
    return { title: 'Addiction Impact Tracker' };
  }

  @Post('/report')
  report(@Body() body: any, @Res() res: Response) {
    const dto = plainToInstance(InputDto, body);
    const errors = validateSync(dto);

    if (errors.length > 0) {
      return res.redirect('/?error=invalid-input');
    }

    const result = this.reportService.generate(dto);
    return res.render('report', { title: 'Your Risk Report', ...result });
  }
}
