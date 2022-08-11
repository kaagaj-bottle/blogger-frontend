// const LoginForm = ({ handleLogin, handleChange, username, password }) => {
//   return (
//     <div>
//       <h2>Log in to application</h2>
//       <form onSubmit={handleLogin}>
//         <label htmlFor="username">username</label>
//         <input
//           id="username"
//           type="text"
//           value={username}
//           name="Username"
//           onChange={handleChange}
//         />
//         <label htmlFor="password">password</label>
//         <input
//           id="password"
//           type="password"
//           value={password}
//           name="Password"
//           onChange={handleChange}
//         />
//         <br />
//         <button type="submit">login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;

import React from "react";
import "./LoginForm.css";
function LoginForm({ handleLogin, handleChange, username, password }) {
  return (
    <>
      <form className="login--form" onSubmit={handleLogin}>
        <h2 className="login--form--header">Login Page</h2>
        <div className="login--email--field">
          <input
            type="text"
            id="username"
            name="Username"
            value={username}
            onChange={handleChange}
            placeholder="Username"
          />
        </div>

        <div className="login--password--field">
          <input
            type="password"
            id="password"
            name="Password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>

        <input type="submit" className="login--btn" value="Login" />

        {/* <input type="submit" className="login--sign--up--btn" value="Sign Up" /> */}
      </form>
    </>
  );
}

export default LoginForm;
