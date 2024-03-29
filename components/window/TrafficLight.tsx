'use client'
import { Maximize2, Minimize2, Minus, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { shallow } from 'zustand/shallow'
import useAppsStore from '@/store/app'

interface TrafficProps {
  id: string
  handleMax: () => void
  handleMini: () => void
  handleMinimize: () => void
}

const TrafficHeader = ({ id, handleMax, handleMini, handleMinimize }: TrafficProps) => {
  const [max, closeApp] = useAppsStore(s => [s.max, s.closeApp], shallow)
  const trafficLightRef = useRef<HTMLDivElement | null>(null)
  const [enter, setEnter] = useState(false)
  const closeHandler = () => {
    closeApp(id)
  }
  useEffect(() => {
    const trafficLight = trafficLightRef.current
    if (trafficLight) {
      trafficLight.addEventListener('mouseenter', () => {
        setEnter(true)
      })
      trafficLight.addEventListener('mouseleave', () => {
        setEnter(false)
      })
      return () => {
        trafficLight.removeEventListener('mouseenter', () => {
          setEnter(true)
        })
        trafficLight.removeEventListener('mouseleave', () => {
          setEnter(false)
        })
      }
    }
  }, [trafficLightRef])

  return (
    <div className='bg-transparent absoulte'>
      <div ref={trafficLightRef} className="traffic-lights relative flex space-x-2 w-[60px] ml-1 " >
        <div onClick={closeHandler} className="bg-red-500 w-[13px] h-[13px] mt-2 rounded-full ml-1">  </div>
        <div onClick={handleMinimize} className="bg-yellow-500 w-[13px] h-[13px] mt-2 rounded-full "></div>
        <div className="bg-green-500 w-[13px] h-[13px] mt-2 rounded-full "></div>
        {
          enter
          && <div className='absolute flex mt-[9px]'>
            <X onClick={closeHandler} size={10} color='black' strokeWidth={2} className='-ml-[2px]' />
              <Minus onClick={handleMinimize} size={10} color='black' strokeWidth={3} className='mx-[10px]' />
            {
              max
                ? <Minimize2 onClick={handleMini} size={10} color='black' strokeWidth={2} className='ml-[1px]' />
                : <Maximize2 onClick={handleMax} size={10} color='black' strokeWidth={2} className='ml-[1px]' />
            }

          </div>
        }

      </div>

    </div>

  )
}

export default TrafficHeader
