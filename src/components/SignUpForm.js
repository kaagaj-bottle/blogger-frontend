import React from "react";
import "./SignUpForm.css";
import signUpService from "../services/signUp";
function SignUpForm({ handleSignUpButtonInLoginPage }) {
  const [user, setUser] = React.useState({
    name: "",
    username: "",
    password: "",
  });

  function handleChange(ev) {
    const name = ev.target.name;
    const value = ev.target.value;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  }

  function handleSignUpButtonInSignUpPage(ev) {
    ev.preventDefault();
    if (user.fullName && user.username && user.password) {
      signUpService
        .signUp(user)
        .then((user) => setUser(user))
        .then((parameter) => {
          handleSignUpButtonInLoginPage(ev);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.alert("please enter all the data");
    }
  }

  return (
    <>
      <form className="sign--up--form">
        <h2 className="sign--up--form--header">Sign Up Page</h2>

        <div className="sign--up--name--field">
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={user.firstName}
            onChange={handleChange}
            placeholder="Full Name"
          />
        </div>

        <div className="sign--up--email--field">
          <input
            type="username"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Username"
          />
        </div>

        <div className="sign--up--password--field">
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>

        <input
          type="submit"
          className="sign--up--btn"
          value="Sign Up"
          onClick={handleSignUpButtonInSignUpPage}
        />
      </form>
    </>
  );
}

export default SignUpForm;
