import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import axios from "axios";
import "./Draft.css";

const Compose = () => {
  const emailRef = useRef();
  const subjectRef = useRef();
  const [text, setText] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    const receiver = emailRef.current.value;
    const sender = localStorage.getItem("Email");

    const ename = receiver.substring(0, receiver.lastIndexOf("@"));
    const senderName = sender.substring(0, sender.lastIndexOf("@"));
    console.log(senderName);

    const data = {
      sender: sender,
      receiver: receiver,
      subject: subjectRef.current.value,
      body: text,
      read: false,
    };

    try {
      const res = await axios.post(
        `https://mailbox-client-react-e2c67-default-rtdb.firebaseio.com/${ename}/receive.json`,
        data
      );
      console.log(res.statusText === "OK");
      if (res.statusText === "OK") {
        const res2 = await axios.post(
          `https://mailbox-client-react-e2c67-default-rtdb.firebaseio.com/${senderName}/send.json`,
          data
        );
        if (res2.statusText === "OK") {
          alert("Mail sended successfully");
        } else {
          throw new Error("Something went wrong");
        }
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="pl-20 pt-3">
      <div className="p-1 border-2 border-gray-300 w-96 rounded-md ml-20">
        <label htmlFor="email">To:</label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          placeholder="Email Address"
        />
      </div>

      <div className="p-1 border-2 border-gray-300 w-96 rounded-md ml-20">
        <label htmlFor="sub">Subject:</label>
        <input
          type="text"
          id="sub"
          ref={subjectRef}
          placeholder="Email Subject"
        />
      </div>

      <div className="App">
        <div className="editor">
          <CKEditor
            editor={ClassicEditor}
            data={text}
            onChange={(event, editor) => {
              const data = editor.getData();
              setText(data);
            }}
          />
        </div>
      </div>

      <div>
        <button
          className="bg-blue-500 p-1 px-3 rounded-md ml-20"
          onClick={submitHandler}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Compose;
