/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import {
  consultaContaServidor,
  UserConta,
} from '@/app/services/server/ServidorConta'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import React, { useEffect } from 'react'
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { userContaSchema } from './FormSchemaConta'
import { error, log } from 'console'
import { id } from 'date-fns/locale'
import { title } from 'process'

const FormSchema = z.object({
  selectedContas: z.array(z.string()).nonempty('Selecione ao menos uma conta'),
})

type FormFieldType = {
  ContaUser: UserConta
  // handleSelectChange: (name: string, selectedValue: number) => void
  form: UseFormReturn<z.infer<typeof userContaSchema>>
  handleSubmit: () => void
  ServidorId: number
}

export function CheckboxReactHookFormSingle({
  ContaUser,
  form,
  ServidorId,
  handleSubmit,
}: FormFieldType) {
  const { control, watch, getValues, setValue } = form
  const [contas, setContas] = React.useState<UserConta[] | undefined>(undefined)
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'pessoa.conta',
  })

  const { toast } = useToast()

  // Função para lidar com a alteração de checkbox
  const handleCheckboxChange = (
    checked: boolean,
    index: number,
    contas: UserConta,
  ) => {
    const userConta = contas.pessoa?.conta?.[index]

    // Verifique se a conta existe
    if (userConta?.contaId && userConta?.contaId.length > 0) {
      let userConta
      if (contas && contas.pessoa && contas.pessoa.conta) {
        userConta = contas.pessoa.conta[index]
      } else {
        userConta = undefined // Ou atribuir um valor padrão, se necessário
      }
      if (userConta) {
        // Adiciona a conta selecionada
        setValue(`pessoa.conta.${index}`, userConta) // Agora você passa a conta correta
      } else {
        // Lógica para remover, se necessário
        remove(index)
      }
    }
  }

  // const ServidorId = getValues('id') // Obtém o ID do servidor do formulário

  // Função para buscar as contas do servidor
  // async function handleGetConta() {
  //   try {
  //     const response = await consultaCreditosServidor(ServidorId)

  //     // Verifique o que a API está retornando
  //     console.log('Resposta da API:', response)

  //     // Verifica se 'response' tem a estrutura esperada
  //     if (!response || !response.pessoa) {
  //       throw new Error('Dados de usuário inválidos ou incompletos')
  //     }

  //     // Mapeia a resposta da API para o tipo UserConta
  //     const userConta: UserConta = {
  //       id: response.id, // Garante que o id exista
  //       pessoa: {
  //         nomeCompleto: response.pessoa.nomeCompleto || 'Nome não disponível',
  //         conta: response.pessoa.conta || [], // Garante que a conta seja um array, mesmo que vazio
  //       },
  //       matricula: response.matricula || 'Matrícula não disponível',
  //       funcao: response.funcao || undefined, // A função é opcional
  //     }

  //     // Define o estado com um array contendo o 'UserConta'
  //     setContas([userConta])
  //   } catch (err) {
  //     // Capture o erro completo
  //     console.error('Erro ao realizar solicitação:', err)

  //     // Mostra uma notificação de erro
  //     toast({
  //       variant: 'destructive',
  //       title: 'Erro ao realizar solicitação',
  //       description: 'Ocorreu um erro inesperado ao buscar as contas.',
  //       duration: 4000,
  //     })
  //   }
  // }

  const id = ServidorId
  async function handleGetConta() {
    try {
      const response = await consultaContaServidor(id)
      console.log('ID do servidor:', ServidorId) // Log do ServidorId
      console.log('Resposta da API:', response) // Para depuração

      // O resto da lógica
    } catch (err) {
      console.error('Erro ao realizar solicitação:', err)
      toast({
        variant: 'destructive',
        title: 'Erro ao realizar solicitação',
        description: 'Ocorreu um erro inesperado ao buscar as contas.',
        duration: 4000,
      })
    }
  }

  useEffect(() => {
    handleGetConta()
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <h3 className="text-lg font-medium">Selecione as contas:</h3>

        {/* Verifica se 'contas' e 'fields' existem antes de mapear */}
        {contas?.length &&
          fields.map((field, index) => {
            // Acessa a conta correta no nível de 'UserConta'
            const userConta = contas?.[index] // Acessa o 'UserConta' diretamente

            return (
              <FormItem
                key={index}
                className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
              >
                <FormControl>
                  <Controller
                    name={`pessoa.conta.${index}`} // Acessa o índice correto no formulário
                    control={control}
                    render={({ field }) => (
                      <label>
                        <input
                          type="checkbox"
                          checked={!!field.value} // Define se está marcado
                          onChange={(e) => {
                            if (userConta) {
                              // Verifica se userConta existe e chama a função handleCheckboxChange
                              handleCheckboxChange(
                                e.target.checked,
                                index,
                                userConta, // Agora passa o 'UserConta' correto
                              )
                            } else {
                              console.warn(
                                `Conta não encontrada para o índice: ${index}`,
                              )
                            }

                            // Atualiza o campo com o valor do checkbox
                            field.onChange(e.target.checked ? userConta : null)
                          }}
                        />
                      </label>
                    )}
                  />
                </FormControl>

                {/* Exibição de informações da conta */}
                {/* {userConta && userConta.pessoa?.conta?.length ? ( */}
                <div className="space-y-1 leading-none">
                  <FormLabel>Conta ID: {field.contaId}</FormLabel>
                  <FormDescription>
                    Agência: {field.agenciaId} - Banco: {field.bancoId}
                  </FormDescription>
                </div>
                {/* ) : (
                  <div className="space-y-1 leading-none">
                    <FormLabel>Conta não encontrada</FormLabel>
                  </div>
                )} */}
              </FormItem>
            )
          })}

        {/* Caso 'contas' seja undefined ou vazio, exibe uma mensagem */}
        {!contas?.length && <p>Nenhuma conta disponível para seleção.</p>}

        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  )
}
