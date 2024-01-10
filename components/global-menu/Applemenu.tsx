import React, { useRef } from 'react'
import { useClickAway } from 'ahooks'
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import router from 'next/router';

interface ApplemenuProps {
  appleMenuSwitch: (value: boolean) => void
}

const Applemenu = ({ appleMenuSwitch }: ApplemenuProps) => {
  const ref = useRef<HTMLDivElement>(null)
  useClickAway(() => appleMenuSwitch(false), ref)
  const { data: session } = useSession();

  const clickSignIn = () => {
    signIn('github')
  }

  const getUser = () => {
    if (session) {
      console.log('Logged in as:', session);
    } else {
      console.log('Not logged in');

    }
  }

  return (
    <div
      ref={ref}
      className={'absolute text-black rounded-md cursor-pointer font-md h-70 w-52 bg-gray-400/90 top-9 left-1'}
      onClick={() => {
        appleMenuSwitch(false)
      }}
    >
      <ul className="p-1" >
        <li className="appleMenuItem">About This Mac</li>
        <div className="menuDivider"></div>
        <li className="appleMenuItem">Systeam Prefrences...</li>
        <li className="appleMenuItem">Apple Store...</li>
        <div className="menuDivider"></div>
        <li className="appleMenuItem">Recent Items</li>
        <div className="menuDivider"></div>
        <li className="appleMenuItem">Force Quit...</li>
        <div className="menuDivider"></div>
        <li className="appleMenuItem">Sleep</li>
        <li className="appleMenuItem" onClick={getUser}>获取信息</li>
        <li className="appleMenuItem" onClick={clickSignIn}>登录</li>
        <div className="menuDivider"></div>
        <li className="appleMenuItem">锁屏</li>
        <li className="appleMenuItem">关机</li>
      </ul>
    </div>
  )
}

export default Applemenu
