import { ChatUser } from "@/interfaces/user";

const generateId = () => Math.random().toString(36).substr(2, 9);

export const getChatsUsers = async (): Promise<ChatUser[]> => {
  return [
    {
      id: generateId(),
      user: {
        id: generateId(),
        name: "Kendra Sunders",
        email: "kendra@gmail.com",
        image: "/imgs/chat1.png"
      },
      messages: [
        {
          id: generateId(),
          text: "Hey, how are you?",
          createdAt: "2021-08-01T12:00:00.000Z",
          from: {
            id: generateId(),
            name: "Kendra Sunders",
            email: "kendra@gmail.com",
            image: "/imgs/chat1.png"
          }
        }, {
          id: generateId(),
          text: "I'm fine, thanks",
          createdAt: "2021-08-01T12:00:00.000Z",
          from: {
            id: generateId(),
            name: "Joseph Wright",
            email: "josepth@gmail.com",
            image: "/imgs/user.png"
          }
        }
      ]
    }, {
      id: generateId(),
      user: {
        id: generateId(),
        name: "John Cooper",
        email: "john@gmail.com",
        image: "/imgs/chat2.png"
      },
      messages: [
        {
          id: generateId(),
          text: "Hey, how are you?",
          createdAt: "2021-08-01T12:00:00.000Z",
          from: {
            id: generateId(),
            name: "John Cooper",
            email: "john@gmail.com",
            image: "/imgs/chat2.png"
          }
        }, {
          id: generateId(),
          text: "I'm fine, thanks",
          createdAt: "2021-08-01T12:00:00.000Z",
          from: {
            id: generateId(),
            name: "Joseph Wright",
            email: "josepth@gmail.com",
            image: "/imgs/user.png"
          }
        }
      ]
    }
  ]
}