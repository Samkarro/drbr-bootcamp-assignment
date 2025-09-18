export default function Login() {
  return (
    <div className="auth-page-container">
      <h1>Log in</h1>
      <form>
        <input
          className="email"
          // value="email"
          placeholder="Email"
          required
        ></input>
        <input
          className="password"
          // value="password"
          placeholder="Password"
          type="password"
          required
        ></input>
        <button type="submit">Log in</button>
        <p>
          Not a member? <a href="/auth/register">Register</a>
        </p>
      </form>
    </div>
  );
}
