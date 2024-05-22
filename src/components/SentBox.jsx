import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SentBox = () => {
  const [sentboxArr, setSentboxArr] = useState([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const FetchSentEmails = async () => {
      const sentMail = localStorage
        .getItem("Email")
        .replace(".", "")
        .replace("@", "");
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
    };

    FetchSentEmails();
  }, []);

  return (
    <div>
      <h1 className="text-2xl p-2">Sent Box</h1>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div>
          {sentboxArr.length === 0 ? (
            <p>Sent box is empty</p>
          ) : (
            sentboxArr.map((Email) => (
              <div className="flex bg-blue-200 gap-5 mx-5 p-3" key={Email.id}>
                <p>ID: {Email.id}</p>
                <p>Message: {Email.message}</p>
                <p>Send To: {Email.sendTo}</p>
                <p>Subject: {Email.subject}</p>
                <hr />

                <Link to={`/messages/${Email.id}`}>
                  <button className="bg-blue-500 px-3 rounded-sm text-white">
                    View Message
                  </button>
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SentBox;
