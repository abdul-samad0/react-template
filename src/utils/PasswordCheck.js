import { useState } from "react";

const usePasswordValidation = () => {
  const [passwordChecked, setPasswordChecked] = useState({
    lengthCheck: false,
    otherChecks: false,
  });

  const validatePassword = (password) => {
    setPasswordChecked({
      otherChecks: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/.test(password),
      lengthCheck: password.length >= 8 && password.length <= 20,
    });
  };

  return { passwordChecked, validatePassword };
};

export default usePasswordValidation;
