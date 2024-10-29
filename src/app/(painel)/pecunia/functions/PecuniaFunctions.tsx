import { updatePecuniaRequest } from '@/app/services/pecuniaService'
import { useToast } from '@/components/ui/use-toast'
import { StatusSolicitacao } from '@/types/Status'
import { ErrorMapping } from '@/utils/errorMapping'

export default function PecuniaFunctions() {
  const { toast } = useToast()

  async function handleUpdatePecuniaStatus(
    id: number,
    status: StatusSolicitacao,
    observation?: string,
  ): Promise<boolean> {
    let errorTreatment
    try {
      const response = await updatePecuniaRequest({
        id,
        status,
        observation: observation || undefined,
      })

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
    handleUpdatePecuniaStatus,
  }
}
