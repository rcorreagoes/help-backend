export interface CustosTotaisResponse {
  local: string;
  custo_total_folha: number;
  impostos_totais: number;
  beneficios_totais: number;
}

export interface ImpostosEncargos {
  inss_gps: number;
  irrf_fgts: number;
}

export interface Beneficios {
  alimentacao: number;
  transporte: number;
  plano_saude: number;
}

export interface CargoCustoResponse {
  cargo: string;
  salario_base: number;
  impostos_e_encargos: ImpostosEncargos;
  beneficios: Beneficios;
  custo_total_cargo: number;
}

export interface ProvisaoTotais {
  total_ferias_13: number;
  total_demissao: number;
  total_geral_provisoes: number;
}

export interface ProvisaoFuncionarioItem {
  id: number;
  mes: string;
  local: string;
  cargo: string;
  ferias_13: number;
  demissao: number;
  total_linha: number;
}

export interface ProvisoesResponse {
  totais: ProvisaoTotais;
  detalhado_por_funcionario: ProvisaoFuncionarioItem[];
}

