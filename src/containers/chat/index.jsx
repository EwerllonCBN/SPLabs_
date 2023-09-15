import React, { useEffect, useRef, useState } from 'react'
import './styles.scss'

import { api } from '../../routes/api'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import chatBotIcon from '../../assets/chatbot-icon.svg'
import headerIconChat from '../../assets/header-icon-chat.svg'

export function Chat() {
  const [showModal, setShowModal] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [messages, setMessages] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const chatContentRef = useRef(null)
  const lastMessageRef = useRef(null)
  const historyTextRef = useRef(null)

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  function handleExpandToggle() {
    setExpanded(!expanded)
  }

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return

    const newMessageObj = { text: newMessage, sender: 'user' }
    setMessages(prevState => [...prevState, newMessageObj])
    setNewMessage('')

    try {
      const response = await api.post('/api/chat', {
        question: newMessage
      })
      const botMessage = {
        text: response.data,
        sender: 'bot',
        icon: chatBotIcon
      }

      setMessages(prevState => [...prevState, botMessage])
    } catch (error) {
      console.error('Erro ao enviar mensagem para o chat bot:', error)
    }
  }

  const handleScroll = () => {
    const chatContentElement = chatContentRef.current
    const historyTextElement = historyTextRef.current

    if (chatContentElement && historyTextElement) {
      const { scrollHeight, clientHeight } = chatContentElement

      if (scrollHeight > clientHeight) {
        historyTextElement.style.display = 'block'
      } else {
        historyTextElement.style.display = 'none'
      }
    }
  }

  useEffect(() => {
    const chatContentElement = chatContentRef.current

    if (chatContentElement) {
      chatContentElement.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (chatContentElement) {
        chatContentElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [messages])

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className="modal-container">
      {showModal ? (
        <button className="close-modal-button" onClick={toggleModal}>
          <svg
            className="icon-close-modal"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g className="content-close-icon">
              <rect width="48" height="48" rx="24" />
              <path
                d="M18 21L24 27L30 21"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </button>
      ) : (
        <button className="show-modal-button" onClick={toggleModal}>
          <svg
            className="icon-show-modal"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g className="content-icon">
              <rect width="48" height="48" rx="24" />
              <path
                d="M32.5968 26.8656C32.5968 27.3723 32.3955 27.8582 32.0372 28.2164C31.6789 28.5747 31.193 28.776 30.6864 28.776H19.2241L15.4033 32.5968V17.3137C15.4033 16.807 15.6046 16.3211 15.9629 15.9629C16.3211 15.6046 16.807 15.4033 17.3137 15.4033H30.6864C31.193 15.4033 31.6789 15.6046 32.0372 15.9629C32.3955 16.3211 32.5968 16.807 32.5968 17.3137V26.8656Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </button>
      )}

      {showModal && (
        <div className={`chat-modal ${expanded ? 'expanded' : ''}`}>
          <div className="header-modal">
            <img src={headerIconChat} />

            <button
              className="button-expand-and-compress"
              onClick={handleExpandToggle}
            >
              {expanded ? (
                <p>
                  Recolher <i className="fas fa-compress-alt"></i>
                </p>
              ) : (
                <p>
                  Expandir <i className="fas fa-expand-alt"></i>
                </p>
              )}
            </button>
          </div>
          <div className="header-title">
            <p>&#128406; Como posso ajudar?</p>
          </div>
          <hr />

          <div
            ref={chatContentRef}
            onScroll={handleScroll}
            className={`chat-content ${showHistory ? 'show-history' : ''}`}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                ref={el => {
                  if (index === messages.length - 1) {
                    lastMessageRef.current = el
                  }
                }}
                className={`message ${
                  message.sender === 'user' ? 'sent' : 'received'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="bot-message">
                    <img
                      src={chatBotIcon}
                      alt="Ícone do chat bot"
                      className="bot-icon"
                    />
                    <div className="bot-text">{message.text}</div>
                  </div>
                )}
                {message.sender === 'user' && (
                  <div className="user-message">{message.text}</div>
                )}
              </div>
            ))}
            <div ref={historyTextRef} className={`history-text`}>
              Role para cima <FontAwesomeIcon icon="fa-solid fa-turn-up" /> para
              ver o histórico
            </div>
          </div>

          <div className="input-send-message-container">
            <input
              className="input-send-message"
              type="text"
              placeholder="Digite sua dúvida"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
            />
            <button className="send-button" onClick={handleSendMessage}>
              <svg
                className="send-icon"
                width="50"
                height="40"
                viewBox="0 0 50 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  className="icon-chat"
                  width="50"
                  height="40"
                  rx="16"
                  fill="#5DFED6"
                  stroke-width="0"
                />
                <path
                  className="stroke-icon1"
                  d="M33 12L24.2 20.8"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="stroke-icon2"
                  d="M33 12L27.4 28L24.2 20.8L17 17.6L33 12Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
