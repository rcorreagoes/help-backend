import { describe, it, expect, vi } from 'vitest';
import { EmployeesController } from './employees.controller.js';
import type { EmployeesService } from './employees.service.js';

describe('EmployeesController', () => {
  it('should call getCustosTotais with correct parameters', async () => {
    const mockResponse = {
      local: 'CAONZE',
      custo_total_folha: 90000,
      impostos_totais: 10000,
      beneficios_totais: 20000,
    };

    const getCustosTotaisSpy = vi.fn().mockResolvedValue(mockResponse);
    const mockService = {
      getCustosTotais: getCustosTotaisSpy,
      getCustosPorCargo: vi.fn(),
      getProvisoesDemissoes: vi.fn(),
    } as unknown as EmployeesService;

    const controller = new EmployeesController(mockService);

    const result = await controller.getCustosTotais('CAONZE');
    expect(getCustosTotaisSpy).toHaveBeenCalledWith('CAONZE');
    expect(result).toEqual(mockResponse);
  });
});
