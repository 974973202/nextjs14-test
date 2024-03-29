'use client'
import React, { useEffect, useRef, useState } from 'react'
import useAlertStore from '@/store/alert'

interface Message {
  text: string
  isBot: boolean
  timestamp: string
}

const ChatGPT: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const chatListRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const setUseAlertStore = useAlertStore(s => s.setUseAlertStore)

  useEffect(() => {
    if (chatListRef.current)
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight
  }, [messages])

  const sendMessage = async () => {
    if (inputValue.trim() === '')
      return

    setIsLoading(true)
    setError('')

    const newMessage: Message = {
      text: inputValue.trim(),
      isBot: false,
      timestamp: '',
    }
    setMessages(prevMessages => [...prevMessages, newMessage])
    setInputValue('')
    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            messages: [{ role: 'user', content: inputValue.trim() }],
            max_tokens: 100,
            model: 'gpt-3.5-turbo',
          }),
        },
      )

      const data = await response.json()

      if (data?.choices?.[0]?.message) {
        const botMessage: Message = {
          text: data.choices[0].message.content.trim(),
          isBot: true,
          timestamp: '',
        }
        setMessages(prevMessages => [...prevMessages, botMessage])
      }
      if (data?.error)
        throw new Error(data?.error.message)
    }
    catch (error) {
      setUseAlertStore('error', 'Make sure you have set the right openai key and connect the accessible internet. An error occurred. Please try again later.', 8000)
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter')
      sendMessage()
  }

  return (
    <div className="w-full h-full bg-[#343540] rounded-lg shadow-lg">
      <div className="fixed rounded-t-lg w-full top-0 h-7bg-[#343540]"></div>
      <div className="flex flex-col px-3 py-6">
        <h1 className="text-2xl font-bold text-gray-100">Chat with GPT!</h1>
        <div ref={chatListRef} className="mt-4 overflow-y-scroll chatlist h-[450px] custom-scrollbar">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start text-white mt-4 ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`p-3 rounded-lg ${message.isBot ? 'bg-primary rounded-bl-none' : 'bg-gray-500 rounded-br-none'}`}
              >
                <p className="text-sm text-gray-100">{message.text}</p>
                <span className="block mt-1 text-xs text-gray-400">{message.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="fixed flex w-full bottom-[10px]">
          <input
            type="text"
            className={`text-black py-2 border rounded-lg grow-[0.8] focus:outline-none focus:ring-2 ring-blue-500 transition duration-200 ${isLoading ? 'opacity-50' : ''}`}
            placeholder="Type your message here..."
            value={inputValue}
            autoFocus={true}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            className="ml-4 py-2 w-[80px]  text-white bg-primary rounded-lg disabled:opacity-50 transition duration-200"
            disabled={inputValue.trim() === '' || isLoading}
            onClick={sendMessage}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatGPT
