import { usePathname } from 'next/navigation'
import { useCallback, useEffect } from 'react'

export const useWindowBeforeUnload = () => {
  const pathname = usePathname()
  const onBeforeUnload = useCallback((e: BeforeUnloadEvent) => {
    e.preventDefault()
    e.returnValue = 'Leaving this page will reset the wizard'
  }, [])

  useEffect(() => {
    if (pathname?.includes('/design')) {
      window.addEventListener('beforeunload', onBeforeUnload)
    }
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  }, [onBeforeUnload, pathname])
}
