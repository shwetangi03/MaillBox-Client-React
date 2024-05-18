import React, { useRef, useState } from "react";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordTwoRef = useRef();
  const [swap, setSwap] = useState(false);

  const swapHandler = () => {
    setSwap((prevValue) => !prevValue);
  };

  const signupHandler = async (event) => {
    event.preventDefault();
    const enterdEmail = emailRef.current.value;
    const enterdPassword = passwordRef.current.value;
    // login
    console.log(passwordRef.current);
    console.log(passwordTwoRef.current);
    if (swap) {
      if (
        passwordRef.current.value.trim().length > 5 &&
        emailRef.current.value.includes("@") &&
        emailRef.current.value.includes(".com")
      ) {
        try {
          const res = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBOZmb_2dK80sMmQLWwglC1oqdBJyGt8ak",
            {
              method: "POST",
              body: JSON.stringify({
                email: enterdEmail,
                password: enterdPassword,
                returnSecureToken: true,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (res.ok) {
            const data = await res.json();
            console.log(data);
            localStorage.setItem("JWTTOKEN", data.idToken);
            localStorage.setItem("userID", data.localId);
            localStorage.setItem("Email", data.email);
            emailRef.current.value = "";
            passwordRef.current.value = "";
          } else {
            const data = await res.json();
            alert(data.error.message);
          }
        } catch (error) {
          console.log("something went wrong!!");
          console.log(error);
        }
      }
    } //signup
    else if (!swap) {
      if (
        passwordRef.current.value === passwordTwoRef.current.value &&
        passwordRef.current.value.trim().length > 5 &&
        emailRef.current.value.includes("@") &&
        emailRef.current.value.includes(".com")
      ) {
        try {
          const res = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBOZmb_2dK80sMmQLWwglC1oqdBJyGt8ak",
            {
              method: "POST",
              body: JSON.stringify({
                email: enterdEmail,
                password: enterdPassword,
                returnSecureToken: true,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (res.ok) {
            const data = await res.json();
            console.log("signed up successfully ",data);
            emailRef.current.value = "";
            passwordRef.current.value = "";
            passwordTwoRef.current.value = "";
            setSwap(true);
          } else {
            const data = await res.json();
            alert(data.error.message);
          }
        } catch (error) {
          console.log("something went wrong!!");
          console.log(error);
        }
      }
    } else {
      alert("Please enter feild properly");
    }
  };

  const forgetPasswordHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className="flex justify-center bg-cover bg-center h-screen"
      style={{
        backgroundImage:
          "url('https://raw.githubusercontent.com/ajiths10/ExpenseTracker-ReactApp/56079a1e8327b5156a4215b8c88884be11441416/src/Components/Global-Componets/background-blue-white.jpg')",
      }}
    >
      <form className=" p-5 mt-36">
        <div className=" h-80 w-64 border-gray-300 border-2 p-5 ">
          <div className="flex justify-center p-8">
            <h1 className="text-3xl">{swap ? "Login" : "Sign Up"}</h1>
          </div>

          <div className="flex justify-center border-gray-300 border-2 rounded-md">
            <input
              className="p-1"
              type="email"
              placeholder="Email"
              ref={emailRef}
              required
            />
          </div>

          <div className="flex justify-center border-gray-300 border-2 p-1 rounded-md">
            <input
              type="password"
              placeholder="Password"
              minLength="6"
              ref={passwordRef}
              maxLength="18"
              required
            />
          </div>

          {!swap && (
            <div className="flex justify-center border-gray-300 border-2 p-1 rounded-md">
              <input
                type="password"
                placeholder="Confirm Password"
                ref={passwordTwoRef}
                maxLength="18"
                required
              />
            </div>
          )}

          <div className="flex justify-center border-gray-300 border-2 p-1 rounded-3xl bg-cyan-500">
            <button onClick={signupHandler}>
              {swap ? "Login" : "Sign up"}
            </button>
          </div>
          <div className="flex justify-center underline">
            {swap && (
              <button onClick={forgetPasswordHandler}>Forget password</button>
            )}
          </div>
        </div>

        <div className="rounded-md border-gray-400 border-2 p-1">
          <button onClick={swapHandler}>
            {swap ? "Don't have an account? Signup" : "Have an account? Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
