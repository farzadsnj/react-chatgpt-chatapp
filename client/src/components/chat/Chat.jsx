import React from "react";
import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from "react-chat-engine-advanced";
import Header from "../header/Header";
import StandardMessageFrom from "../forms/StandardMessageFrom";
import Ai from "../forms/Ai";
import AiCode from "../forms/AiCode";
import AiAssist from "../forms/AiAssist";

const Chat = () => {
  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,
    "testuser",
    "1234"
  );
  return (
    <div style={{ flexBasis: "100%" }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <Header chat={chat} />}
        renderMessageForm={(props) => {
          if (chatProps.chat?.title.startsWith("AiChat_")){
            return <Ai props={props} activeChat={chatProps.chat} />
          }
          if (chatProps.chat?.title.startsWith("AiCode_")){
            return <AiCode props={props} activeChat={chatProps.chat} />
          }
          if (chatProps.chat?.title.startsWith("AiAssist_")){
            return <AiAssist props={props} activeChat={chatProps.chat} />
          }
          return(
            <StandardMessageFrom props={props} activeChat={chatProps.chat} />
          )
        }}
      />
    </div>
  );
};

export default Chat;
