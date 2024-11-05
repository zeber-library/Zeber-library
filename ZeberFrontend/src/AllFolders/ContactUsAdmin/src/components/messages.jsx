import { useEffect, useState } from "react"
import axios from "axios";
import Message from "./message"

export default function Messages(){
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/admin/messages`)
        .then((res) => {
            setMessages(res.data.messages);
        }).catch((err) => {
            console.error(err);
        })
    }, []);

    return <div className='m-10 border-2 rounded-md p-4 pt-6'>
        {messages.map((message, index) => {
            return <Message element={message} key={index} index={index + 1}/>
        })}
    </div>
}