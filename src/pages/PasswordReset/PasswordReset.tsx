import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "../../firebase"
import style from "./PasswordReset.module.css"

const PasswordReset: React.FC = () => {

    const [email, setEmail] = useState<string>("");

    const resetPassword = async (email: string) => {
        try {
          await sendPasswordResetEmail(auth, email);
          alert('Password reset email sent!');
        } catch (error) {
          console.error('Error sending password reset email:', error);
          alert('Failed to send password reset email. Please try again.');
        }
      };

    const handleReset = async () => {
    if (!email) {
        alert('Please enter your email address.');
        return;
    }
    await resetPassword(email);
    };

  return (
    <div className={style.resetPasswordContainer}>
      <h2>Reset Password</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handleReset}>Send Password Reset Email</button>
    </div>
  );
};

export default PasswordReset;
