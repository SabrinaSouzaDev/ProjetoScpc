'use client'
import { useState } from 'react'
import WatchListRow from './ListMes'
import WatchListColumn from './ListDia'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

export function Donuts() {
  const [tabs, setTab] = useState<string | null>('watch_list_columns')

  return (
    <>
      <div className="flex items-center justify-start gap-3">
        <Button size={'sm'} onClick={() => setTab('watch_list_columns')}>
          Horas
        </Button>
        <Button size={'sm'} onClick={() => setTab('watch_list_rows')}>
          Dias
        </Button>
      </div>
      {tabs === 'watch_list_columns' && <WatchListColumn />}
      {tabs === 'watch_list_rows' && <WatchListRow />}
      {!tabs && (
        <div className="flex items-center space-x-4">
          <Skeleton className="size-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      )}
    </>
  )
}
