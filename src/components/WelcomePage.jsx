import React, { useState } from "react";
import ComposeMail from "./ComposeMail";

const WelcomePage = () => {
  const [mail, setMail] = useState(false);

  const mailHandler = () => {
    setMail(true);
  };

  const cancelHandler = () => {
    setMail(false);
  };

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-xl text-slate-600 p-4 flex-initial">
          Welcome to your mail box!!!
        </p>
      </div>
      <hr className="border-gray-300 border-1"></hr>
      <div>
        {!mail && (
          <button
            className="p-2 bg-blue-400 w-44 px-4 rounded-sm text-white mb-5"
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
      </div>
    </div>
  );
};

export default WelcomePage;
