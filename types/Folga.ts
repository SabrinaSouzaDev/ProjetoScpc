import { Diretoria } from "@/types/UnidadesAdministrativas";
import { DiretoriaDTO } from "./Diretoria";
import { PageableProps } from "./PageableProps";

export type FolgaDTO = {
  id: number;
  nomeServidor: string;
  diretoria: DiretoriaDTO;
  dataFolga?: string;
  observacao: string;
  nomelotacaoSolicitante?: string;
  resourceUrl?: string;
  publicado: boolean
  pagamentoRealizado: boolean
};

export type FolgasDiretoria = {
  listaDiretorias: Diretoria[];
};

export type SolicitacaoFolgaDTO = {
  id: number;
  nomeServidor: string;
  dataFolga: string;
  observacao: string;
};

export interface SolicitacaoFolgaParams extends PageableProps {
  diretoriaId?: number;
  nucleoId?: number;
  gerenciaId?: number;
}

export type FolgaAprovarUpdateDTO = {
  id: number;
  status: string;
  situacao: string;
  indeferir: boolean;
  cancelar: boolean;
};
