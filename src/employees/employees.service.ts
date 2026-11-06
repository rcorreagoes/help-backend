import {
  Injectable,
  BadGatewayException,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type {
  CustosTotaisResponse,
  CargoCustoResponse,
  ProvisoesResponse,
} from './interfaces/employee-costs.interface.js';

@Injectable()
export class EmployeesService {
  private readonly logger = new Logger(EmployeesService.name);
  private readonly engineUrl = process.env.ENGINE_URL ?? 'http://localhost:8000';

  private async requestEngine<T>(
    path: string,
    params?: Record<string, string | undefined>,
  ): Promise<T> {
    const url = new URL(path, this.engineUrl);
    if (params) {
      for (const [key, val] of Object.entries(params)) {
        if (val !== undefined && val !== null && val !== '') {
          url.searchParams.set(key, val);
        }
      }
    }

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        const errorBody = await response.text();
        this.logger.error(
          `Erro retornado pelo Help Engine em ${url.toString()} [status ${response.status}]: ${errorBody}`,
        );
        throw new HttpException(
          {
            message: `Erro retornado pelo Help Engine (${response.statusText})`,
            details: errorBody,
          },
          response.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(
        `Falha de comunicação com o Help Engine em ${url.toString()}: ${(error as Error).message}`,
      );
      throw new BadGatewayException(
        `Help Engine indisponível em ${this.engineUrl}. Certifique-se de que a API Python está em execução.`,
      );
    }
  }

  async getCustosTotais(local?: string): Promise<CustosTotaisResponse> {
    return this.requestEngine<CustosTotaisResponse>(
      '/api/v1/employees/custos-totais',
      { local },
    );
  }

  async getCustosPorCargo(cargo?: string): Promise<CargoCustoResponse[]> {
    return this.requestEngine<CargoCustoResponse[]>(
      '/api/v1/employees/custos-por-cargo',
      { cargo },
    );
  }

  async getProvisoesDemissoes(local?: string): Promise<ProvisoesResponse> {
    return this.requestEngine<ProvisoesResponse>(
      '/api/v1/employees/provisoes-demissoes',
      { local },
    );
  }
}

