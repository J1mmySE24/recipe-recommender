import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
    botName: "Personal Cooking Assistant",
    initialMessages: [createChatBotMessage(`Welcome to your personal AI recipe  advisor! What are you cooking today?`)],
    customComponents: {
        botAvatar: (props) => <div className='A' >A</div>
    },
}
export default config;