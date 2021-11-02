import React from "react";
import FormContainer from "./FormContainer";
import { useLocation } from "react-router-dom";
import Form from "./Form.js";

const Auth = () => {
  const location = useLocation().pathname;
  const formType = location === "/login" ? "login" : "register";

  return (
    <FormContainer>
      <Form type={formType} />
    </FormContainer>
  );
};

export default Auth;
