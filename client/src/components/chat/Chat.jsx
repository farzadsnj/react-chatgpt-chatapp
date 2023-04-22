import React from "react";
import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from "react-chat-engine-advanced";
import Header from "../header/Header";
import StandardMessageFrom from "../forms/StandardMessageFrom";

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
        renderChatHeader={(chat) => (
          <Header
            chat={chat}
            renderMessageForm={(props) => {
              <StandardMessageFrom props={props} activeChat={chatProps.chat} />;
            }}
          />
        )}
      />
    </div>
  );
};

export default Chat;
