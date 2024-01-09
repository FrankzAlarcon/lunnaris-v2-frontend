import { ChatContext, ChatContextProps } from "@/context/chat-context-provider"
import { useContext } from "react"

const useChatManagement = () => {
return useContext(ChatContext) as ChatContextProps
}

export default useChatManagement