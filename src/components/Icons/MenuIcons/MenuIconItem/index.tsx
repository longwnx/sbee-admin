import { includes } from 'lodash'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import {
  IconDashboard,
  IconDesign,
  IconIntegrations,
  IconManageUser,
  IconNotification,
  IconPublish,
  IconSettings,
  IconSwitchApp,
} from '@/components'

type Props = {
  path?: string
}

export const MenuIconItem: React.FC<Props> = ({ path }) => {
  const pathname = usePathname()
  const isActive = useMemo(() => path !== '/' && includes(pathname, path), [path, pathname])

  const _renderIcon = useMemo(() => {
    switch (path) {
      case '/insights':
        return <IconDashboard stroke={pathname === '/' ? '#C5AE8F' : '#1D2939'} />
      case '/':
        return <IconDesign stroke={isActive ? '#C5AE8F' : '#1D2939'} />
      case '/settings':
        return <IconSettings stroke={isActive ? '#C5AE8F' : '#1D2939'} />
      case '/integrations':
        return <IconIntegrations stroke={isActive ? '#C5AE8F' : '#1D2939'} />
      case '/app-store-info':
        return <IconPublish stroke={isActive ? '#C5AE8F' : '#1D2939'} />
      case '/notifications':
        return <IconNotification stroke={isActive ? '#C5AE8F' : '#1D2939'} />
      case '/manage-user':
        return <IconManageUser stroke={isActive ? '#C5AE8F' : '#1D2939'} />
      case '/switch-application':
        return <IconSwitchApp stroke={isActive ? '#C5AE8F' : '#1D2939'} />
      default:
        return null
    }
  }, [isActive, path, pathname])
  return <>{_renderIcon}</>
}
