import { scpcApiFetchServer } from './config'
import { CursoType } from '@/app/(painel)/cursos/type/CursoType'
type Session = {
  diretoriaId?: number | null
  nucleoId?: number | null
  gerenciaId?: number | null
  idServidor: number | null
}
export async function salvarCurso(
  curso: CursoType,
  certificado: File,
  session: Session,
) {
  const diretoriaId = session.diretoriaId
  const gerenciaId = session.gerenciaId
  const nucleoId = session.nucleoId
  const idServidor = session.idServidor
  try {
    const formData = new FormData()
    // Adicione os campos de dados ao FormData
    formData.append('nome', curso.nome)
    formData.append(
      'cargaHorariaEstimada',
      curso.cargaHoraria?.toString() || '',
    )
    formData.append('nomeInstituicao', curso.nomeInstituicao)
    formData.append('inicioCurso', curso.periodo || '')
    formData.append('finalCurso', curso.periodoFim || '')
    formData.append('dataExpedido', curso.dataCertificacao || '')
    formData.append('certificado', certificado, certificado.name)
    formData.append('diretoriaId', diretoriaId?.toString() || '')
    formData.append('servidorEmail', curso.email)
    formData.append('servidorId', idServidor?.toString() || '') // Diretamente da sessão
    formData.append('nucleoId', nucleoId?.toString() || '')
    formData.append('gerenciaId', gerenciaId?.toString() || '')
    formData.append(
      'areaConhecimento.id',
      String(curso.areaDeConhecimento) || '',
    )
    formData.append('tipo.id', String(curso.tipo) || '')
    formData.append('modalidade.id', String(curso.modalidadeDoEvento) || '')

    const resp: Response = await scpcApiFetchServer(`/capacitacao`, {
      method: 'POST',
      cache: 'no-cache',
      body: formData,
      headers: {
        accept: '*/*',
      },
    })

    if (!resp.ok) {
      throw new Error(`Erro ao salvar curso: ${resp.statusText}`)
    }

    return resp
  } catch (error) {
    console.error('Erro ao salvar curso:', error)
    throw error
  }
}
