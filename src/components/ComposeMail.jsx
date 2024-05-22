import axios from "axios";
import React, { useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ComposeMail = () => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [sent, setSent] = useState(false);
  const history = useHistory();

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleMessageChange = (editorState) => {
    setEditorState(editorState);
  };

  const sentMailHandler = async (event) => {
    event.preventDefault();

    let receivedEmail = recipient.replace(".", "").replace("@", "");
    let senderEmail = localStorage
      .getItem("Email")
      .replace(".", "")
      .replace("@", "");

    try {
      const contentState = editorState.getCurrentContent();
      const rawContentState = convertToRaw(contentState);
      const message = rawContentState.blocks[0].text;

      await axios.post(
        `https://mailbox-client-react-e2c67-default-rtdb.firebaseio.com/${receivedEmail}.json`,
        {
          from: recipient,
          subject: subject,
          message: message,
        }
      );

      await axios.post(
        `https://mailbox-client-react-e2c67-default-rtdb.firebaseio.com/${senderEmail}.json`,
        {
          sendTo: recipient,
          subject: subject,
          message: message,
        }
      );
    } catch (error) {
      console.log(error);
    }
    setSent(true);
  };

  const sentHandler = () => {
    history.replace("/mailbox");
  };

  const inboxHandler = () => {
    history.replace("/inbox");
  };

  return (
    <>
      {!sent && (
        <div className="p-3">
          <h1 className="p-2 bg-blue-400 w-44 px-4 rounded-sm text-white mb-5">
            Compose Mail
          </h1>
          <form onSubmit={sentMailHandler}>
            <div className="p-2">
              <label htmlFor="recipient">Recipient:</label>
              <input
                className="bg-gray-300"
                type="email"
                name=""
                id="recipient"
                value={recipient}
                onChange={handleRecipientChange}
              />
            </div>

            <div className="p-2">
              <label htmlFor="subject">Subject:</label>
              <input
                className="bg-gray-300"
                type="text"
                id="subject"
                value={subject}
                onChange={handleSubjectChange}
              />
            </div>

            <div className="p-2 w-2/4">
              <label htmlFor="mes">Message:</label>
              <CKEditor
                editor={ClassicEditor}
                onEditorStateChange={handleMessageChange}
              />
            </div>

            <button className="bg-blue-400 p-1 px-4 rounded-sm text-white">
              Send
            </button>
          </form>
        </div>
      )}

      {sent && (
        <p className="text-blue-500 py-4 text-2xl">Email sent successfully</p>
      )}
      <button className="bg-green-500 p-1 px-3 ml-2" onClick={sentHandler}>
        Sent Box
      </button>

      <button className="bg-green-500 p-1 px-3 ml-2" onClick={inboxHandler}>
        Inbox
      </button>
    </>
  );
};

export default ComposeMail;
