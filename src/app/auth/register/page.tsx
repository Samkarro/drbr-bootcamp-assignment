export default function Register() {
  return (
    <div className="auth-page-container">
      <h1>Register</h1>
      <h2>
        <i>(Add an image upload input)</i> {/* placeholder */}
      </h2>
      <form>
        <input
          className="username"
          //   value="username"
          placeholder="Username"
          required
        ></input>
        <input
          className="email"
          //   value="email"
          placeholder="Email"
          required
        ></input>
        <input
          className="password"
          //   value="password"
          placeholder="Password"
          type="password"
          required
        ></input>
        <input
          className="password-confirmation"
          //   value="password-confirmation"
          placeholder="Confirm password"
          type="password"
          required
        ></input>
        <button type="submit">Register</button>
        <p>
          Already a member? <a href="/auth/login">Log in</a>
        </p>
      </form>
    </div>
  );
}
