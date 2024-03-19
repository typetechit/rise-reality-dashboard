import {atom} from "jotai";
import {message, messages} from "@/Components/Inbox/InboxData";

const messagesState = atom<any>(messages)

const messageState = atom<any>(message)


export {
    messagesState,
    messageState
}
