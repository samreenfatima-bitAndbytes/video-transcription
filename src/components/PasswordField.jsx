import { useState } from "react";

export default function PasswordField({ value, onChange, id = "password", label = "Password" }) {
  const [show, setShow] = useState(false);
  return (
    <label htmlFor={id}>
      {label}
      <div className="password-field">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete="current-password"
        />
        <button type="button" className="password-toggle" onClick={() => setShow((v) => !v)}>
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </label>
  );
}
