import React from "react";
import parse from "html-react-parser";

const MailInbox = (props) => {
  console.log(props);
  return (
    <div>
      <label>{props.subject}</label>
      <label>{parse(props.body)}</label>
      <label>{props.sender}</label>
    </div>
  );
};

export default MailInbox;
