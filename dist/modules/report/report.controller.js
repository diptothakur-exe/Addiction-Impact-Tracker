"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const report_service_1 = require("./report.service");
const input_dto_1 = require("./dto/input.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    index() {
        return { title: 'Addiction Impact Tracker' };
    }
    report(body, res) {
        const dto = (0, class_transformer_1.plainToInstance)(input_dto_1.InputDto, body);
        const errors = (0, class_validator_1.validateSync)(dto);
        if (errors.length > 0) {
            return res.redirect('/?error=invalid-input');
        }
        const result = this.reportService.generate(dto);
        return res.render('report', { title: 'Your Risk Report', ...result });
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.Render)('index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "index", null);
__decorate([
    (0, common_1.Post)('/report'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "report", null);
exports.ReportController = ReportController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
//# sourceMappingURL=report.controller.js.map