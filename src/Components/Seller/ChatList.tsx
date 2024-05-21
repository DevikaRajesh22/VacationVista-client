import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../Api/seller";

let sellerId: string | undefined;

interface RootState {
    auth: {
        sellerInfo: string
    }
}

interface Props {
    conversation: { members: [string], _id: string };
    handleClick(conversationId: string): void;
    setReceiver(id: string): void
}

interface User {
    _id: string,
    name: string,
    image: string
}

const ChatList = ({ conversation, handleClick, setReceiver }: Props) => {
    const [userId, setUserId] = useState('');
    const [userInfo, setUserInfo] = useState<User>()
    const sellerInfo = useSelector((state: RootState) => state.auth.sellerInfo)

    useEffect(() => {
        const sellerData = localStorage.getItem('sellerInfo')
        if (sellerData) {
            const tokenPayload = sellerData.split('.')[1];
            const decodedPayload = atob(tokenPayload);
            const payloadObject = JSON.parse(decodedPayload);
            sellerId = payloadObject.id;
        }
    }, [sellerInfo])

    useEffect(() => {
        const filteredMember = conversation.members.filter((mem) => mem !== sellerId)
        const fetchData = async () => {
            const id = filteredMember.toString()
            setUserId(id)
        }
        fetchData()
    }, [conversation.members])

    const Conversation = (conversationId: string, userId: string) => {
        setReceiver(userId)
        handleClick(conversationId)
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getUser(userId)
            if (user?.data) {
                setUserInfo(user.data.data.data)
            }
        }
        fetchUserData()
    })

    return (
        <div>
            <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2" onClick={() => Conversation(conversation._id, userId)}>
                <img src={userInfo?.image} className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full" />
                <div className="ml-2 text-sm font-semibold">{userInfo?.name}</div>
            </button>
        </div>
    )
}

export default ChatList
