'use client'

import { Button } from 'antd'
import { includes } from 'lodash'
import { usePathname } from 'next/navigation'

type Props = {
  isLoading?: boolean
  onDiscard?: () => void
  onSave?: () => void
  disabledSave?: boolean
}

export const Footer: React.FC<Props> = ({ isLoading, onDiscard, onSave, disabledSave }) => {
  const pathname = usePathname()
  return (
    <div className="flex h-full items-center px-4 justify-end border-b w-full bg-white">
      <div className="flex items-center w-full md:w-auto">
        <Button onClick={onDiscard} className="font-semibold text-gray800 mr-2 w-full md:w-auto">
          Discard changes
        </Button>
        <Button
          disabled={disabledSave}
          onClick={onSave}
          type="primary"
          className="font-semibold text-gray800 w-full md:w-auto"
          loading={isLoading}
        >
          {isLoading ? 'Saving' : includes(pathname, 'design') ? 'Save draft' : 'Save'}
        </Button>
      </div>
    </div>
  )
}
