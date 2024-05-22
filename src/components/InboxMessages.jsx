import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const InboxMessages = () => {
  const { messageId } = useParams();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const sentMail = localStorage
      .getItem("Email")
      .replace(".", "")
      .replace("@", "");

    const fetchMessageDetails = async () => {
      try {
        const response = await axios.get(
          `https://mailbox-client-react-e2c67-default-rtdb.firebaseio.com/${sentMail}/${messageId}.json`
        );
        setMessage(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessageDetails();
  }, [messageId]);

  if (!message) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-blue-100 ">
      <h2 className="text-2xl">Message Details</h2>
      {console.log(message)}
      <p>ID: {message.id}</p>
      <p>Message: {message.message}</p>
      <p>Send To: {message.sendTo}</p>
      <p>Subject: {message.subject}</p>
    </div>
  );
};

export default InboxMessages;
