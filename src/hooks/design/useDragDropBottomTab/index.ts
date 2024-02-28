import { App } from 'antd'
import { every, find } from 'lodash'
import { useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { v4 } from 'uuid'
import { useGetAllPageQuery, useGetListIconQuery, useModifyUiLayout, useSelectedBottomTab } from '@/hooks'
import { currentIndexBottomTabState, layoutState } from '@/recoil'
import { PageTypes } from '@/types'
import { insertItemToArr, reorderItemInArray } from '@/utils'

export const useDragDropBottomTab = () => {
  const { message } = App.useApp()
  const setCurrentIndexBottomTab = useSetRecoilState(currentIndexBottomTabState)
  const { bottomTabs } = useSelectedBottomTab()
  const { onUpdateBottomTab } = useModifyUiLayout()
  const { data: allPage } = useGetAllPageQuery()
  const { data: dataMediaLibrary } = useGetListIconQuery()
  const layout = useRecoilValue(layoutState)

  const findIcon = useCallback(
    (name: string, code: string) => {
      const findIcon: any = find(find(dataMediaLibrary?.data, (i) => i?.name === name)?.icons, (icon) => icon?.name === code)
      return {
        iconset: {
          ...layout?.options?.bottomTabs?.iconset,
          name,
          source: {
            uri: findIcon?.src,
          },
        },
      }
    },
    [dataMediaLibrary?.data, layout?.options?.bottomTabs]
  )

  const defaultBottomTab: any = useCallback(
    (type: PageTypes) => {
      const findIdPage = find(allPage, (i) => i?.type === type)?.id
      switch (type) {
        case PageTypes.Home:
          return {
            title: {
              ...layout?.options?.bottomTabs?.title,
              visible: true,
              text: 'Home',
            },
            ...findIcon('essetional', 'home'),
            page: {
              id: findIdPage,
            },
          }
        case PageTypes.CategoryTree:
          return {
            title: {
              ...layout?.options?.bottomTabs?.title,
              visible: true,
              text: 'Categories',
            },
            ...findIcon('grid', 'element-3'),
            page: {
              id: findIdPage,
            },
          }
        case PageTypes.Cart:
          return {
            title: {
              ...layout?.options?.bottomTabs?.title,
              visible: true,
              text: 'Cart',
            },
            ...findIcon('shop', 'bag-2'),
            page: {
              id: findIdPage,
            },
          }
        case PageTypes.Notifications:
          return {
            title: {
              ...layout?.options?.bottomTabs?.title,
              visible: true,
              text: 'Notification',
            },
            ...findIcon('notifications', 'notification'),
            page: {
              id: findIdPage,
            },
          }
        case PageTypes.MyAccount:
          return {
            title: {
              ...layout?.options?.bottomTabs?.title,
              visible: true,
              text: 'Profile',
            },
            ...findIcon('users', 'user'),
            page: {
              id: findIdPage,
            },
          }
        case PageTypes.Wishlist:
          return {
            title: {
              ...layout?.options?.bottomTabs?.title,
              visible: true,
              text: 'Wishlist',
            },
            ...findIcon('support-like-question', 'heart'),
            page: {
              id: findIdPage,
            },
          }
        case PageTypes.Search:
          return {
            title: {
              ...layout?.options?.bottomTabs?.title,
              visible: true,
              text: 'Search',
            },
            ...findIcon('search', 'search-normal'),
            page: {
              id: findIdPage,
            },
          }
        default:
          return
      }
    },
    [allPage, findIcon, layout?.options?.bottomTabs?.title]
  )

  const onDropBottomTabFromSidebar = useCallback(
    (type: PageTypes, endIndex: number) => {
      if (bottomTabs?.length === 5) {
        message.destroy()
        message.error('You cannot add more than 5 buttons')
        return
      }
      if (defaultBottomTab(type)) {
        const isVisibleTitle = every(bottomTabs, (item) => item.title?.visible)
        onUpdateBottomTab(
          insertItemToArr(
            bottomTabs || [],
            {
              ...defaultBottomTab(type),
              id: v4(),
              title: {
                ...defaultBottomTab(type).title,
                visible: isVisibleTitle,
              },
            },
            endIndex
          )
        )
      }
    },
    [bottomTabs, defaultBottomTab, message, onUpdateBottomTab]
  )

  const onMoveBottomTabFromPreview = useCallback(
    (startIndex: number, endIndex: number) => {
      const newBottomTabs = reorderItemInArray(bottomTabs, startIndex, endIndex)
      onUpdateBottomTab(newBottomTabs)
      setCurrentIndexBottomTab(undefined)
    },
    [bottomTabs, onUpdateBottomTab, setCurrentIndexBottomTab]
  )

  return {
    onDropBottomTabFromSidebar,
    onMoveBottomTabFromPreview,
  }
}
