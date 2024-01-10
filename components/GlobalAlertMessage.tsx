'use client'
import React, { useEffect } from 'react'
import useAlertStore from '@/store/alert'
import { shallow } from 'zustand/shallow'
import { AnimatePresence, motion } from 'framer-motion'

const renderType: any = {
  'success': <svg className="flex-shrink-0 w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  'info': <svg fill="none" viewBox="0 0 24 24" className="flex-shrink-0 w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
  'error': <svg className="flex-shrink-0 w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  'warning': <svg className="flex-shrink-0 w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
}

const GlobalAlertMessage = () => {
  const [show, type, content, duration, setShow] = useAlertStore(s => [s.show, s.type, s.content, s.duration, s.setShow], shallow)

  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, duration)
  }, [show])

  return (
    <AnimatePresence>
      {show
        && <motion.div
          className={'fixed w-[30%] top-[8%] left-[35%] z-[100]'}
          initial={{ opacity: 0.8, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 30 }}
        >
          {
            renderType[type] ? <div className={`shadow-lg alert alert-${type}`}>
              <div className='flex'>
                {renderType[type]}
                <span className='ml-2'>{content}</span>
              </div>
            </div> : <div className="shadow-lg alert">
              <div className='flex'>
                <svg fill="none" viewBox="0 0 24 24" className="flex-shrink-0 w-6 h-6 stroke-info"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span className='ml-2'>{content}</span>
              </div>
            </div>
          }
        </motion.div>}

    </AnimatePresence>

  )
}

export default GlobalAlertMessage
