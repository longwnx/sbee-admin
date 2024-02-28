import { App } from 'antd'
import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState } from '@/recoil'
import { PageTypes } from '@/types'

type Arg = {
  name?: string
  type?: PageTypes
}

export const useCreatePageMutation = (
  onSuccess?: ((arg: any) => void) | undefined,
  onError?: ((arg: any) => void) | undefined
) => {
  const { message } = App.useApp()
  const appKey = useRecoilValue(appKeyState)
  const queryClient = useQueryClient()

  const callbackSusscess = useCallback(() => {
    message.success('Create page successfully')
    queryClient.refetchQueries({ queryKey: ['useGetAllPageQuery'] })
  }, [message, queryClient])

  const { api } = useApi()

  const fetcher = async (arg: Arg) => {
    const data: AppPage = {
      multiplePage: false,
      title: {
        text: arg?.name,
      },
      type: arg?.type,
      pages: [],
      options: {
        layout: {
          searchBar: {
            visible: true,
            placeholder: 'Search by City, Address, or ZIP Code',
            backgroundColor: '#F5F5F5',
          },
        },
      },
    }
    const rs = await api.post(`/app/v1/builder/${appKey}/pages`, {
      data,
    })
    return rs.data
  }

  const fn = useMutation({
    mutationKey: ['useCreatePageMutation'],
    mutationFn: fetcher,
    onSuccess: (rs) => {
      callbackSusscess()
      onSuccess?.(rs)
    },
    onError: (err: any) => {
      onError?.(err)
    },
    retry: false,
  })
  return { ...fn }
}
