import { useState } from "react";

const FormGroup = ({ label, placeholder, value, onChange }) => {
  const isPassword = label.toLowerCase() === "password";
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>

      <div className="input-wrapper">
        <input
          value={value}
          onChange={onChange}
          type={isPassword && !showPassword ? "password" : "text"}
          id={label}
          name={label}
          placeholder={placeholder}
          required
        />

        {isPassword && (
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormGroup;
