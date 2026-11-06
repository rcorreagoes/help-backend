import { Controller, Get, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service.js';
import type {
  CustosTotaisResponse,
  CargoCustoResponse,
  ProvisoesResponse,
} from './interfaces/employee-costs.interface.js';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get('custos-totais')
  async getCustosTotais(
    @Query('local') local?: string,
  ): Promise<CustosTotaisResponse> {
    return this.employeesService.getCustosTotais(local);
  }

  @Get('custos-por-cargo')
  async getCustosPorCargo(
    @Query('cargo') cargo?: string,
  ): Promise<CargoCustoResponse[]> {
    return this.employeesService.getCustosPorCargo(cargo);
  }

  @Get('provisoes-demissoes')
  async getProvisoesDemissoes(
    @Query('local') local?: string,
  ): Promise<ProvisoesResponse> {
    return this.employeesService.getProvisoesDemissoes(local);
  }
}

