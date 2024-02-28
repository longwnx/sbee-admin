'use client'

import classNames from 'classnames'
import { map } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { css } from '@emotion/css'
import { appPageState, currentIndexPageState, layoutState } from '@/recoil'
import { invertColor } from '@/utils'

type Props = {
  isEdit?: boolean
}

export const BlockMultipleHome: React.FC<Props> = ({ isEdit = false }) => {
  const layout = useRecoilValue(layoutState)
  const className = css({
    backgroundColor: layout?.options?.topBar?.backgroundColor,
  })
  const classNameTitle = css({
    color: `${
      invertColor(layout?.options?.topBar?.backgroundColor || '#1F2128') === 'dark' ? '#ffffff' : '#1F2128' || '#1F2128'
    } !important`,
    borderBottom: `2px solid ${
      invertColor(layout?.options?.topBar?.backgroundColor || '#1F2128') === 'dark' ? '#ffffff' : '#1F2128' || '#1F2128'
    } !important`,
  })
  const appPage = useRecoilValue(appPageState)
  const [currentIndexPage, setCurrentIndexPage] = useRecoilState(currentIndexPageState)

  return (
    <>
      {appPage?.multiplePage && (
        <div className={className}>
          <div className="flex items-center py-4">
            <div
              className={classNames(
                'flex flex-nowrap overflow-x-auto flex-1 mx-[2px]',
                isEdit && 'hover:ring-2 hover:ring-primary'
              )}
            >
              {map(appPage?.pages, (i, index) => (
                <div
                  key={i?.id}
                  className={classNames(
                    'px-4 py-2 cursor-pointer font-medium whitespace-nowrap text-center flex-1',
                    index === currentIndexPage ? classNameTitle : 'text-neutral05'
                  )}
                  onClick={() => setCurrentIndexPage(index)}
                >
                  {i?.title?.text || 'Title page'}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
