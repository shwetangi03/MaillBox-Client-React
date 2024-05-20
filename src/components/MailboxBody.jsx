import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Compose from "./Compose";
import { composeActions } from "./store/ComposeToggle";
import axios from "axios";
import MailInbox from "./MailInbox";
import { InboxActions } from "./store/inboxToggle";

const MailboxBody = () => {
  const dispatch = useDispatch();
  const isCompose = useSelector((state) => state.compose.isCompose);
  const isInbox = useSelector((state) => state.isInbox.isInbox);
  var arr = [];
  const [msg, setMsg] = useState([]);

  const composeHandler = (event) => {
    event.preventDefault();
    dispatch(composeActions.toggleCompose());
  };

  const loadInbox = async () => {
    const Ename = localStorage.getItem("Email");
    const name = Ename.substring(0, Ename.lastIndexOf("@"));
    try {
      const res = await axios.get(
        `https://mailbox-client-react-e2c67-default-rtdb.firebaseio.com/${name}/receive.json`
      );
      if (res.statusText === "OK") {
        let index = 0;
        for (const key in res.data) {
          arr[index] = res.data[key];
          arr[index].id = key;
          index++;
        }
        setMsg([...arr]);
      }
    } catch (error) {
      console.log(`${error}`);
    }
  };
  useEffect(() => {
    loadInbox();
  }, []);
  console.log(msg);

  const mails = msg.map((element) => {
    console.log(element.body);
    return (
      <MailInbox
        body={element.body}
        sender={element.sender}
        subject={element.subject}
        receiver={element.receiver}
        key={element.id}
        id={element.id}
      />
    );
  });

  const sendboxHandler = () => {
    dispatch(InboxActions.setInbox(false));
  };
  const inboxHandler = () => {
    dispatch(InboxActions.setInbox(true));
  };

  return (
    <div>
      <div>
        <div>
          <button onClick={composeHandler}>Compose</button>
          <div onClick={inboxHandler}>
            <label>Inbox</label>
          </div>
          <div onClick={sendboxHandler}>
            <label>Sent</label>
          </div>
        </div>
      </div>
      {isCompose && (
        <div>
          <Compose />
        </div>
      )}
      {!isCompose && isInbox && <div>{mails}</div>}
    </div>
  );
};

export default MailboxBody;
