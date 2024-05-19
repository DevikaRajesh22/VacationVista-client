import { useState, useRef, useEffect } from "react"
import { io, Socket } from 'socket.io-client'
import { getSellerConversations } from '../../Api/seller'
import ChatList from "./ChatList"
import { getMessages, newMessage, newImageMessage, newVideoMessage } from "../../Api/buyer"

let sellerId: string | undefined;

interface Message {
  senderId: string,
  message: string,
  conversationId: string,
  creationTime: string
}

interface Conversation {
  _id: string,
  updationTime: Date,
  members: [string]
}

const Inbox = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [message, setMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState<Message | null>(null)
  const [conversationId, setConversationId] = useState('')
  const [receiver, setReceiver] = useState('')
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null)
  const socket = useRef<Socket | undefined>()

  useEffect(() => {
    socket.current = io('https://www.vacationvista.cloud');
    socket?.current?.on('getMessage', (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        message: data.text,
        creationTime: data.createdAt
      } as Message);
    });
  }, [])

  useEffect(() => {
    socket.current = io('https://www.vacationvista.cloud');
    socket?.current?.on('getImageMessage', (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        message: data.text,
        creationTime: data.createdAt
      } as Message);
    });
  }, [])

  useEffect(() => {
    socket.current = io('https://www.vacationvista.cloud');
    socket?.current?.on('getVideoMessage', (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        message: data.text,
        creationTime: data.createdAt
      } as Message)
    });
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
      socket.current?.emit('addUser', sellerId);
    }
  }, [])

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
  }, [messages])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleClick = async (conversationId: string) => {
    setConversationId(conversationId)
    const res = await getMessages(conversationId)
    if (res) {
      setMessages(res.data.data)
    }
  }

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      e.preventDefault()
      let res;
      if (image && sellerId) {
        const formData = new FormData();
        formData.append('image', image)
        formData.append('conversationId', conversationId)
        formData.append('sellerId', sellerId)
        res = await newImageMessage(formData)
        if (res) {
          const img = res.data.data.message
          socket?.current?.emit('sendImageMessage', {
            senderId: sellerId,
            receiverId: receiver,
            text: img,
            createdAt: Date.now(),
          })
          setMessage('')
          setMessages([...messages, res?.data.data])
        }
      } else if (video && sellerId) {
        const formData = new FormData();
        formData.append('video', video)
        formData.append('conversationId', conversationId)
        formData.append('sellerId', sellerId)
        res = await newVideoMessage(formData)
        if (res) {
          const vid = res.data.data.message
          socket?.current?.emit('sendVideoMessage', {
            senderId: sellerId,
            receiverId: receiver,
            text: vid,
            createdAt: Date.now(),
          })
          setMessage('')
          setMessages([...messages, res?.data.data])
        }
      } else {
        if (message.trim().length !== 0 && message[0] != ' ') {
          if (sellerId) {
            res = await newMessage(message, conversationId, sellerId)
            socket?.current?.emit('sendMessage', {
              senderId: sellerId,
              receiverId: receiver,
              text: message,
              createdAt: Date.now(),
            })
            setMessage('')
            setMessages([...messages, res?.data.data])
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  function formatTime(dateString: string) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const amPM = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${amPM}`;
  }

  const handleMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (fileType.startsWith('image/')) {
        setImage(selectedFile);
      } else if (fileType.startsWith('video/')) {
        setVideo(selectedFile);
      } else {
        console.error('Unsupported file type');
      }
    }
  };


  function isMediaUrl(url: string): 'image' | 'video' | 'unknown' {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
    const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv', '.webm'];
    if (!url.startsWith("https://")) {
      return 'unknown';
    }
    for (const ext of imageExtensions) {
      if (url.endsWith(ext)) {
        return 'image';
      }
    }
    for (const ext of videoExtensions) {
      if (url.endsWith(ext)) {
        return 'video';
      }
    }
    return 'unknown';
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
                  conversations
                    .slice()
                    .sort((a, b) => {
                      const timeA = new Date(a.updationTime).getTime();
                      const timeB = new Date(b.updationTime).getTime();
                      return timeB - timeA;
                    })
                    .map((conversation) => (
                      <ChatList
                        key={conversation._id}
                        conversation={conversation}
                        setReceiver={setReceiver}
                        handleClick={handleClick}
                      />
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
                                  {(() => {
                                    const mediaType = isMediaUrl(message.message);
                                    if (mediaType === 'image') {
                                      return <img src={message.message} alt="Sent Image" />;
                                    } else if (mediaType === 'video') {
                                      return <video src={message.message} controls />;
                                    } else {
                                      return <div>{message.message}</div>;
                                    }
                                  })()}
                                </div>

                              </div>
                              <p className='text-xs text-gray-700 flex items-center justify-start flex-row-reverse mr-14'>{formatTime(message.creationTime)}</p>
                            </div>
                            :
                            <>
                              <div key={index} className="col-start-1 col-end-8 p-3 rounded-lg" ref={index === messages.length - 1 ? scrollRef : null}>
                                <div className="flex flex-row items-center">
                                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-900 text-white flex-shrink-0">
                                    Y
                                  </div>
                                  <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    {(() => {
                                      const mediaType = isMediaUrl(message.message);
                                      if (mediaType === 'image') {
                                        return <img src={message.message} alt="Sent Image" />;
                                      } else if (mediaType === 'video') {
                                        return <video src={message.message} controls />;
                                      } else {
                                        return <div>{message.message}</div>;
                                      }
                                    })()}
                                  </div>
                                </div>
                                <p className='text-xs text-gray-700 ml-14'>{formatTime(message.creationTime)}</p>
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
                  <input
                    type="file"
                    className="hidden"
                    id="fileInput"
                    onChange={handleMedia}
                  />
                  <label
                    className="flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                    htmlFor="fileInput" // Use htmlFor to associate the label with the input field
                  >
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
                  </label>
                </div>

                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    {image ?
                      <input
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      />
                      :
                      <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      />
                    }

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
