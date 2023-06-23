import Message from "./Message"
import { useEffect, useState } from "../imports/Reactimports";
import { MessageType } from "../types";
import ScrollToBottom from "react-scroll-to-bottom";

const ShowMessages = ({ messages }: { messages: any }) => {

    const [tempmessages, setTempmessages] = useState<MessageType[]>(messages);

    useEffect(() => {
        setTempmessages(messages);
        console.log(tempmessages);
    }, [messages])

    if (!tempmessages) return <div> loading... </div>

    return (
        <>
            <ScrollToBottom mode="bottom" className="h-[37rem]">
                {tempmessages.map((message: any) => {
                    return <Message message={message} key={message._id} />
                })}
            </ScrollToBottom>

        </>
    )
}

export default ShowMessages;