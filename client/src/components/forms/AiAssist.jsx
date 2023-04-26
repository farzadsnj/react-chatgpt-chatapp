import { usePostAiAssistMutation } from "@/state/api";
import React, { useEffect, useState } from "react"; //eslint-disable-line
import MessageFormUI from "./MessageFormUI";

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounced;
}

const AiAssist = ({ props, activeChat }) => { //eslint-disable-line
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [triggerAssist, resultAssist] = usePostAiAssistMutation();
  const [appendText, setAppendText] = useState("")

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    const form = {
      attachments: at,
      created: date,
      sender_username: props.username, //eslint-disable-line
      text: message,
      activeChatId: activeChat.id, //eslint-disable-line
    };

    props.onSubmit(form); //eslint-disable-line
    setMessage("");
    setAttachment("");
  };

  const debouncedValue = useDebounce(message, 1000);
  useEffect(() => {
    if (debouncedValue) {
      const form = { text: message };
      triggerAssist(form);
    }
  }, [debouncedValue]); //eslint-disable-line

  const handleKeyDown = (e)=>{
    if(e.keyCode === 9 || e.keyCode===13 ){
        e.preventDefault()
        setMessage(`${message} ${appendText}`)
    }
    setAppendText("")
  }

  useEffect(()=>{
    if(resultAssist.data?.text){
        setAppendText(resultAssist.data?.text)
    }
  },[resultAssist]) //eslint-disable-line

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      appendText={appendText}
      handleKeyDown={handleKeyDown}
    />
  );
};

export default AiAssist;
