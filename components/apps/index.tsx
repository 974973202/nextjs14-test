'use client'
import React from 'react'
import { useMotionValue } from 'framer-motion'
import AppsItem from './AppsItem'
import apps from './config'
import useAppsStore from '@/store/app'
import useDockStore from '@/store/dock'
import useLaunchpadStore from '@/store/launchpad'

const Dock = () => {
  const dockSize = useDockStore(s => s.dockSize)
  const dockMag = useDockStore(s => s.dockMag)
  const openApp = useAppsStore(s => s.openApp)
  const showApps = useAppsStore(s => s.showApps)
  const max = useAppsStore(s => s.max)
  const setShowLaunchpad = useLaunchpadStore(s => s.setShow)
  const mouseX = useMotionValue<number | null>(null)

  const isOpen = (id: string) => {
    return showApps.includes(id)
  }

  return (
    <div
      className={`dock z-10 select-none w-full  fixed left-0 right-0 mx-auto bottom-4 ${max ? 'z-0' : 'z-50'} overflow-x-visible`}
    >
      <ul
        className="flex px-2 mx-auto space-x-2 bg-white rounded-none dock max-w-max backdrop-blur-2xl border-1 sm:rounded-xl bg-opacity-20 glass"
        style={{ height: `${(dockSize as number) + 15}px` }}
        onMouseMove={e => mouseX.set(e.nativeEvent.x)}
        onMouseLeave={() => mouseX.set(null)}
      >
        {apps.map(app => (
          <AppsItem
            key={`dock-${app.id}`}
            app={app}
            mouseX={mouseX}
            openApp={openApp}
            isOpen={isOpen}
            setShowLaunchpad={setShowLaunchpad}
            dockSize={dockSize as number}
            dockMag={dockMag as number}
          />
        ))}
      </ul>
    </div>
  )
}

export default Dock
