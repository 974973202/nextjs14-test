'use client'
import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../ThemeContext'
import { dayjs } from '@/utils'

const CurrentDate = () => {
  const [time, setTime] = useState(new Date())
  const { dark } = useContext(ThemeContext)

  useEffect(() => {
    setTime(new Date())
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div suppressHydrationWarning className={dark ? 'text-white ' : ''}>
      {/* {time.toLocaleTimeString()} */}
      {/* {dayjs(time).locale('en').format('MMMD ddd HH:mm')} */}
      {/* Chinese */}
      {dayjs(time).format('YYYY-MM-DD HH:mm:ss')}
    </div>
  )
}
export default CurrentDate
