'use client'
import { Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import Window from '@/components/window'
import useAppsStore from '@/store/app'
import apps from '@/components/apps/config'
import { SessionProvider } from 'next-auth/react'
import GlobalBackGround from '@/components/GlobalBackGround'
import Topbar from '@/components/topbar'
import Apps from '@/components/apps'
import Launchpad from '@/components/Launchpad'

export default function Home() {
  const showApps = useAppsStore(s => s.showApps)
  const renderAppWindows = () => {
    return showApps.map((id) => {
      const appInfo = apps.find(app => app.id === id);
      return (
        <>
          {
            appInfo ? <Window key={appInfo.id} app={appInfo} >
              {appInfo.content}
            </Window> : 'not find appInfo'
          }
        </>

      )
    })
  }

  return (
    <SessionProvider>
      <div className='w-full h-full'>
        <GlobalBackGround>

          {/* Topbar */}
          <Topbar />

          <Suspense fallback={<div>loading</div>}>
            <AnimatePresence>
              {renderAppWindows()}
            </AnimatePresence>
          </Suspense>

          {/* LaunchPad */}
          <Launchpad />

          {/* Apps */}
          <Apps />

        </GlobalBackGround>

      </div>
    </SessionProvider>
  )
}
