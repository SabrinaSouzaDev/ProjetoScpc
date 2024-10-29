import { EscalaPlantao } from '@/app/(painel)/escala/EditarEscalaDePlantao/components/TypeEditPlantaoEdit/EstacalaPlantaoEditDTO'
import { handleError } from '@/utils/ErrorMensage'
import { scpcApiFetchClient } from './config'

export async function updateEscalaEditRequest(curso: EscalaPlantao) {
  try {
    const formData = new FormData()
    formData.append('id', curso.id.toString())
    formData.append('gerenciaId', curso.gerencia?.id?.toString() || '')
    formData.append('nucleoId', curso.nucleo?.id.toString() || '')
    formData.append('diretoriaId', curso.diretoria?.id.toString() || '')
    formData.append('tipo', curso.tipo || '')

    // Aqui você pode iterar sobre as escalas se houver mais de uma
    curso.escalasPlantaoDias?.forEach((dia) => {
      formData.append(
        'escalasPlantaoDias[]',
        JSON.stringify({
          id: dia.id?.toString() || '',
          servidorId: dia.servidor?.id?.toString() || '',
          relatorioDescricao: dia.relatorioDescricao || '',
          observacaoDia: dia.observacaoDia || '',
          idDia: dia.dia?.id?.toString() || '',
        }),
      )
    })

    const resp: Response = await scpcApiFetchClient(`/escala-plantao`, {
      method: 'POST',
      cache: 'no-cache',
      body: formData,
      headers: {
        Accept: '*/*',
      },
    })

    await handleError(resp)
    return resp.json()
  } catch (error) {
    console.error('Erro ao salvar curso:', error)
    return null
  }
}
