'use client'
import React, { useEffect, useRef, useState } from 'react'
import { shallow } from 'zustand/shallow'
import ContextMenu from './global-menu/ContextMenu'
import useAlertStore from '@/store/alert'
import useThemeStore from '@/store/theme'
import GlobalAlertMessage from './GlobalAlertMessage'

const wallpapers = {
  day: 'img/ui/wallpaper-day.jpg',
  night: 'img/ui/wallpaper-night.jpg',
  github: 'img/ui/github.jpg',
  valley: 'img/ui/valley.jpeg',
}

const GlobalBackGround = ({ children }: { children: React.ReactNode }) => {
  const [brightness] = useThemeStore(s => [s.brightness], shallow)
  const setUseAlertStore = useAlertStore(s => s.setUseAlertStore)
  const [menu, setMenuStyle] = useState(false)
  const [pagePosition, setPagePosition] = useState({
    pageX: -999,
    pageY: -999,
  })
  const bgRef = useRef(null)
  const contextMenu = (e: MouseEvent) => {
    setMenuStyle(true)
    setPagePosition({ pageX: e.pageX, pageY: e.pageY })
  }

  useEffect(() => {
    setUseAlertStore('success', 'Welcome to the New World!')
    // 禁用window区域右键默认菜单弹窗
    window.oncontextmenu = function (e) {
      e.preventDefault()
    }
    const desktop: any = bgRef.current
    desktop.addEventListener('contextmenu', contextMenu)
    return () => {
      desktop.removeEventListener('contextmenu', contextMenu)
    }
  }, [])
  return (
    <div
      className="relative flex flex-col w-full h-full overflow-hidden bg-center bg-cover"
      ref={bgRef}
      style={{
        backgroundImage: `url(${wallpapers.github})`,
        filter: `brightness( ${(brightness as number) * 0.7 + 50}%)`,
      }}
    >
      <GlobalAlertMessage />
      {children}
      {menu && <ContextMenu setMenuStyle={setMenuStyle} pagePosition={pagePosition} />}
    </div>
  )
}

export default GlobalBackGround
