import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ComposeMail from "./ComposeMail";
import { useDispatch, useSelector } from "react-redux";
import { ClassActions } from "./store/ClassSlice";
import { GoDotFill } from "react-icons/go";

const Inbox = () => {
  const sentMail = localStorage
    .getItem("Email")
    .replace(".", "")
    .replace("@", "");

  const [sentboxArr, setSentboxArr] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [mail, setMail] = useState(false);
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.class.class);
  const deleteMail = useSelector((state) => state.auth.email);
  console.log(deleteMail);

  let unreadCount = 0;
  sentboxArr.forEach((email) => {
    if (!classes) {
      unreadCount++;
    }
  });

  useEffect(() => {
    setIsLoading(true);

    const FetchSentEmails = async () => {
        try {
            const response = await axios.get(
                `https://mailbox-client-react-e2c67-default-rtdb.firebaseio.com/${sentMail}.json`
              );
        
              console.log(response);
        
              const data = response.data;
              const updatedSentboxArr = [];
        
              for (const key in data) {
                updatedSentboxArr.push({ id: key, ...data[key] });
              }
        
              setSentboxArr(updatedSentboxArr);
              setIsLoading(false);
             
        } catch (error) {
            console.log(error);
        }
    }
    const interval = setInterval(() => {
        FetchSentEmails();
      }, 2000);
  
      return () => {
        clearInterval(interval);
      };
    
  }, [sentMail]);

  const mailHandler = () => {
    setMail(true);
  };

  const cancelHandler = () => {
    setMail(false);
  };

  const readHandler = () => {
    dispatch(ClassActions.classHandler());
  };

  const deleteHandler = async (id) => {
    await axios.delete(
      `https://mailbox-client-react-e2c67-default-rtdb.firebaseio.com/${sentMail}/${id}.json`
    );

    const updatedSentboxArr = sentboxArr.filter((email) => email.id !== id);
    setSentboxArr(updatedSentboxArr);
  };

  return (
    <div>
      <h1 className="text-xl text-blue-500 p-5 ">Inbox</h1>
      <div>
        {!mail && (
          <button
            className="p-2 bg-blue-400 w-44 px-4 rounded-sm text-white mb-5 ml-2"
            onClick={mailHandler}
          >
            Compose Mail
          </button>
        )}
        {mail && <ComposeMail />}
        {mail && (
          <button
            className="bg-red-500 p-1 px-4 rounded-sm text-white ml-2"
            onClick={cancelHandler}
          >
            Cancel
          </button>
        )}
        <p className="p-1 ml-4">Unread Emails: {unreadCount}</p>
      </div>

      {loading && <p>loading...</p>}
      {!loading && (
        <>
          {sentboxArr.length === 0 ? (
            <p>Inbox box is empty</p>
          ) : (
            sentboxArr.map((email) => (
              <div className="flex bg-blue-200 gap-5 mx-5 p-2">
                {classes ? (
                  <span className="to-blue-400 text-blue-400">
                    <GoDotFill />
                  </span>
                ) : (
                  <span className=""></span>
                )}
                <strong>mail from:</strong> {email.from}
                <p></p>
                <p>
                  <strong>Subject:</strong> {email.subject}
                </p>
                <Link to={`/inboxmessages/${email.id}`}>
                  <button
                    onClick={readHandler}
                    className="bg-blue-500 px-3 rounded-sm text-white"
                  >
                    View Message
                  </button>
                </Link>
                <button
                  className="bg-red-500 px-3 rounded-sm text-white"
                  onClick={() => deleteHandler(email.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Inbox;
