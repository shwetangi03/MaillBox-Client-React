import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Compose from "./Compose";
import { composeActions } from "./store/ComposeToggle";
import axios from "axios";
import MailInbox from "./MailInbox";
import { InboxActions } from "./store/inboxToggle";
import { MailItemActions } from "./store/MailFullBody";
import MailItemBody from "./MailItemBody";

const MailboxBody = () => {
  const dispatch = useDispatch();
  const isCompose = useSelector((state) => state.compose.isCompose);
  const isInbox = useSelector((state) => state.isInbox.isInbox);
  const isClicked = useSelector((state) => state.mailItem.isClicked);
  const isSentBox = useSelector((state) => state.mailItem.isClicked);

  var arr = [];
  var sendArr = [];
  const [msg, setMsg] = useState([]);
  const [sendMsg, setSendMsg] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const composeHandler = (event) => {
    event.preventDefault();
    dispatch(composeActions.toggleCompose());
    dispatch(MailItemActions.setCliked(false));
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
      }
      const sendRes = await axios.get(
        `https://mailbox-client-react-e2c67-default-rtdb.firebaseio.com/${name}/receive.json`
      );
      if (sendRes.statusText === "OK") {
        let indexSend = 0;
        for (const key in sendRes.data) {
          sendArr[indexSend] = sendRes.data[key];
          sendArr[indexSend].id = key;
          indexSend++;
        }
      }
      setMsg([...arr]);
      setSendMsg([...sendArr]);
    } catch (error) {
      console.log(`${error}`);
    }
  };
  useEffect(() => {
    loadInbox();
  }, []);

  const mails = msg.map((element) => {
    return (
      <MailInbox
        body={element.body}
        sender={element.sender}
        subject={element.subject}
        receiver={element.receiver}
        key={element.id}
        id={element.id}
        isRead={element.read}
      />
    );
  });

  const sendMails = sendMsg.map((element) => {
    return (
      <MailInbox
        body={element.body}
        sender={element.sender}
        subject={element.subject}
        receiver={element.receiver}
        key={element.id}
        id={element.id}
        isRead={element.read}
      />
    );
  });

  const sendboxHandler = () => {
    dispatch(InboxActions.setInbox(false));
    dispatch(InboxActions.setSentBox(true));
    dispatch(MailItemActions.setCliked(false));
  };

  const inboxHandler = () => {
    loadInbox();
    dispatch(InboxActions.setInbox(true));
    dispatch(MailItemActions.setCliked(false));
    dispatch(InboxActions.setSentBox(false));
  };

  const counter = () => {
    let c = 0;
    msg.map((element) => {
      if (!element.read) {
        c++;
      }
      setTotalCount(c);
    });
  };

  useEffect(() => {
    counter();
  }, [msg]);

  return (
    <div>
      <div className="m-3 flex justify-center h-96 w-20 float-left pr-10">
        <div className="p-3 h-full w-52 bg-slate-300 float-left ">
          <button
            className="bg-blue-500 p-1 pr-3 px-3 rounded-md ml-20 text-white"
            onClick={composeHandler}
          >
            Compose
          </button>
          <div className="p-3" onClick={inboxHandler}>
            <button className="bg-gray-200 p-1 px-3 rounded-md ml-20 ">
              Inbox{totalCount}
            </button>
          </div>
          <div className="p-2 pl-3" onClick={sendboxHandler}>
            <button className="bg-gray-200 p-1 px-3 rounded-md ml-20">
              Sent
            </button>
          </div>
        </div>
      </div>
      {isCompose && (
        <div>
          <Compose />
        </div>
      )}
      {!isCompose && (
        <div>
          {isInbox && <div>{mails}</div>}
          {isSentBox && <div>{sendMails}</div>}
        </div>
      )}
      {isClicked && (
        <div>
          <MailItemBody />
        </div>
      )}
    </div>
  );
};

export default MailboxBody;
