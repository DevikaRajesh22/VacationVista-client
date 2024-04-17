import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { io, Socket } from 'socket.io-client'
import { getSellerConversations } from '../../Api/seller'
import ChatList from "./ChatList"
import { getMessages, newMessage } from "../../Api/buyer"

let sellerId: string | undefined;

interface RootState {
  auth: {
    sellerInfo: string
  }
}

interface Message {
  senderId: string,
  message: string,
  conversationId: string,
  createdAt: string
}

interface MessageType {
  sender: string,
  text: string,
  createdAt: Date,
  conversationId: string
}

interface SocketMessage {
  senderId: string;
  text: string;
  conversationId: string;
}

const Inbox = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState([]);
  const [message, setMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState<MessageType | null>(null)
  const [conversationId, setConversationId] = useState('')
  const [receiver, setReceiver] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const sellerInfo = useSelector((state: RootState) => state.auth.sellerInfo)
  const socket = useRef<Socket | undefined>()

  useEffect(() => {
    socket.current = io('ws://localhost:3000');
    socket.current.on('getMessage', (data: SocketMessage) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: new Date(),
        conversationId: data.conversationId
      } as MessageType);
    });
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [])

  useEffect(() => {
    arrivalMessage &&
      setMessages((prev) => [...prev, arrivalMessage] as Message[])
  }, [arrivalMessage])

  useEffect(() => {
    const sellerData = localStorage.getItem('sellerInfo')
    if (sellerData) {
      const tokenPayload = sellerData.split('.')[1];
      const decodedPayload = atob(tokenPayload);
      const payloadObject = JSON.parse(decodedPayload);
      sellerId = payloadObject.id;
      console.log('selid', sellerId)
      socket.current?.emit('addUser', sellerId);
    }
  }, [sellerInfo])

  useEffect(() => {
    const fetchData = async () => {
      if (sellerId) {
        const res = await getSellerConversations(sellerId)
        if (res) {
          setConversations(res.data.data)
        }
      }
    }
    fetchData()
  }, [sellerInfo])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleClick = async (conversationId: string) => {
    setConversationId(conversationId)
    const res = await getMessages(conversationId)
    console.log('eh', res?.data.data)
    if (res) {
      setMessages(res.data.data)
    }
  }

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      console.log('handle send')
      e.preventDefault()
      if (message.trim().length !== 0 && message[0] != ' ') {
        if (sellerId) {
          console.log(sellerId)
          console.log(message)
          console.log(conversationId)
          const res = await newMessage(message, conversationId, sellerId)
          socket?.current?.emit('sendMessage', {
            senderId: sellerId,
            receiverId: receiver,
            text: message
          })
          if (res?.data) {
            setMessages([...messages, res.data])
            setMessage('')
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex h-screen antialiased text-gray-800 mt-10">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Active Conversations</span>
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                {conversations &&
                  conversations.map((conversation) => (
                    <ChatList conversation={conversation} setReceiver={setReceiver} handleClick={handleClick} />
                  ))
                }
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">
                    {messages && messages.map((message, index) => (
                      <>
                        {
                          message.senderId == sellerId ?
                            <div key={index} className="col-start-6 col-end-13 p-3 rounded-lg" ref={index === messages.length - 1 ? scrollRef : null}>
                              <div className="flex items-center justify-start flex-row-reverse">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-900 text-white flex-shrink-0">
                                  M
                                </div>
                                <div className="relative mr-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                  <div>{message.message}</div>
                                </div>
                              </div>
                            </div>
                            :
                            <>
                              <div key={index} className="col-start-1 col-end-8 p-3 rounded-lg" ref={index === messages.length - 1 ? scrollRef : null}>
                                <div className="flex flex-row items-center">
                                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-900 text-white flex-shrink-0">
                                    Y
                                  </div>
                                  <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <div>
                                      {message.message}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                        }
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div>
                  <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      type="text"
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    />
                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="ml-4">
                  <button onClick={sendMessage} className="flex items-center justify-center bg-blue-900 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                    <span>Send</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Inbox
