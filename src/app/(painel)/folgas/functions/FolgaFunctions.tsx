import { updateFolgaRequestList } from '@/app/services/client/folgaClient'
import { useToast } from '@/components/ui/use-toast'
import { PutPecuniaParams } from '@/types/Pecunia'
import { StatusSolicitacao } from '@/types/Status'
import { ErrorMapping } from '@/utils/errorMapping'

export default function FolgaFunctions() {
  const { toast } = useToast()

  async function handleUpdateFolgaStatus(
    id: number,
    status: StatusSolicitacao,
    observacao?: string,
  ): Promise<boolean> {
    const params: PutPecuniaParams[] = [{ id, status, observacao }]
    let errorTreatment
    try {
      const response = await updateFolgaRequestList(params)

      if (response !== 'SUCCESS_UPDATE') {
        errorTreatment = ErrorMapping(response.technicalMessage)
        throw new Error(`Response status: ${response.status}`)
      }

      toast({
        title: 'Solicitação atualiza com sucesso',
        duration: 3000,
      })
      return true
    } catch (err) {
      toast({
        variant: 'destructive',
        title: errorTreatment || 'Erro ao realizar solicitação',
        duration: 4000,
      })
      return false
    }
  }

  return {
    handleUpdateFolgaStatus,
  }
}
