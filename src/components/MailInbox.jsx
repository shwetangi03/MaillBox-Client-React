import React from "react";
import parse from "html-react-parser";
import { GoDotFill } from "react-icons/go";
import { useDispatch } from "react-redux";
import { MailItemActions } from "./store/MailFullBody";
import { InboxActions } from "./store/inboxToggle";
import axios from "axios";

const MailInbox = (props) => {
  const dispatch = useDispatch();
  console.log(props);

  const mailBoxHandler = async () => {
    console.log(props);
    dispatch(MailItemActions.addNewItem(props));
    dispatch(MailItemActions.setCliked(true));
    dispatch(InboxActions.setInbox(false));

    console.log(props.id);
    if (!props.isRead) {
      const receiver = props.receiver;
      const name = receiver.substring(0, receiver.lastIndexOf("@"));
      const id = props.id;
      const data = {
        read: true,
      };
      try {
        const res = await axios.patch(
          `https://mailbox-client-react-e2c67-default-rtdb.firebaseio.com/${name}/receive/${id}.json`,
          data
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div onClick={mailBoxHandler}>
        {!props.isRead && (
          <span className="props.isRead ? text-transparent : text-blue-400">
            <GoDotFill />
          </span>
        )}
        <label>{props.subject}</label>
        <label>{parse(props.body)}</label>
        <label>{props.sender}</label>
      </div>
    </div>
  );
};

export default MailInbox;
