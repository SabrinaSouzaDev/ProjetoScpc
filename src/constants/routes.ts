export const routes = {
  HOME: '/',
  PERFIL: '/perfil',
  SETORES: '/folgas',

  // Início - Capacitação
  REGISTER_COURSE: '/cursos/cadastro',
  COURSE_REQUESTS: '/cursos/solicitacao',
  COURSE_REQUESTS_STATUS: '/cursos/status',
  // Fim - Capacitação

  // Início - Relatório
  REGISTER_SCALE_REPORT: '/relatorio/cadastrar',
  APROVE_SCALE_REPORT: '/relatorio/solicitacoes',
  // Fim - Relatório

  // Início - Escala
  REGISTER_SCALE: '/escala/cadastro',
  APROVAR_ESCALA: '/escala/EscalaDePlantaoAdmin',
  // Fim - Relatório

  // Início - Folgas
  SOLICITACAO_FOLGA: '/folgas/solicitacao',
  LANCAR_FOLGA_ESP: '/folgas/lancar-creditos-escola',
  LANCAR_FOLGA_DIR: '/folgas/lancar-creditos-plantao',
  APROVAR_FOLGA_DIRETORIA: '/folgas/aprovacao-folga-diretoria',
  GERENCIA_FOLGA: '/folgas/aprovacao-folga-gerencia',
  ADICIONAR_COORDENADORIA: '/folgas/aprovacao-folga-coordenadoria',
  CIENCIA_SUBDEFENSORIA: '/folgas/subdiretoria',
  // Fim - Folgas

  // Início - Pecunia
  SOLICITACAO_PECUNIA: '/pecunia/solicitacao',
  APROVAR_PECUNIA_COORDENADORIA: '/pecunia/coordenadoria',
  APROVAR_PECUNIA_DIRETORIA: '/pecunia/diretoria',
  APROVAR_PECUNIA_SUBDEFENSORIA: '/pecunia/subdefensoria',
  APROVAR_PECUNIA_GERENCIA: '/pecunia/gerencia',
  FINANCEIRO: '/pecunia/financeiro',
  NUPLAN: '/pecunia/nuplan',
  CONTROLE_INTERNO: '/pecunia/controle-interno',
  // Fim - Pecunia

  // Início - Administrativo
  SOLICITACAO_STATUS: '/administrativo/solicitacao-servidor',
  GGP: '/administrativo/ggp',
  // Fim - Administrativo

  // Início - Area do Usuário
  CERTICICADO: '/Area-do-usuario/adicionar-certificado',
  MINHAS_SOLICITACOES: '/minhas-solicitacoes',
  TESTE: '/Area-do-usuario/TesteTabela',
  USER_INCLUSAO_CURSO: '/cursos/inclusaoDeCurso',
  EDITA_SOLICITACAO_PLANTAO_ESCALA: '/escala/EditarEscalaDePlantao',
  // Fim - Area do Usuário
}
