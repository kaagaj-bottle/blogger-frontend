const LoginForm = ({ handleLogin, handleChange, username, password }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">username</label>
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={handleChange}
        />
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={handleChange}
        />
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
