import React from "react";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

const MailItemBody = () => {
  const mailItem = useSelector((state) => state.mailItem.item);
  console.log(mailItem);
  return (
    <div>
      <div>
        {mailItem.subject}
        <hr></hr>
      </div>
      <div>
        <div>
          <label>{mailItem.sender}</label>
        </div>
        <div>
          <span>To:</span>
          <span>{mailItem.receiver}</span>
        </div>
      </div>
      <div>
        <p>{parse(mailItem.body)}</p>
      </div>
    </div>
  );
};

export default MailItemBody;
