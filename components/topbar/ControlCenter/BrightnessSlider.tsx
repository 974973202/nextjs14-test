import React from 'react'
import { Sun } from 'lucide-react'
import Slider from 'react-slider'

interface Props {
  brightness: number
  setBrightness: (v: number) => void
}

const BrightnessSlider = ({ brightness, setBrightness }: Props) => {
  return (
    <div className="flex flex-col p-2 my-2 rounded-[13px] bg-white/50">
      <div className="flex w-full slider">
        <div className="flex items-center justify-center bg-gray-100 border-gray-300 rounded-l-full w-7 h-7">
          <Sun size={16} color="black" />
        </div>
        <Slider
          className="w-full rangeslider rangeslider-horizontal"
          trackClassName="rangeslider__fill bg-gray-300"
          thumbClassName="rangeslider__handle w-6 h-6 bg-white border-2 border-gray-300 rounded-full shadow-md"
          value={brightness}
          orientation="horizontal"
          onChange={(v: number) => setBrightness(v)}
        />
      </div>
    </div>
  )
}

export default BrightnessSlider
