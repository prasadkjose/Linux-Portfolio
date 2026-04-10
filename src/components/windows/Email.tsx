import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { WindowState } from "../../types/window";
import { PERSONAL_DATA } from "../../config/personalData.config";
import logger from "../../utils/logger";

type EmailFormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(0.8); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.5; }
  100% { transform: scale(0.8); opacity: 1; }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 30px;
  height: 100%;
  scrollbar-width: thin; /* Firefox */
  animation: ${slideIn} 0.3s ease-out;
`;

const FormLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 48px;
  width: 60%;
  align-self: center;

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

const FormHeader = styled.div`
  margin-bottom: 32px;
  padding-left: 45px;
`;

const FormTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text["100"]};
  margin: 0 0 8px 0;
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const FormSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.text["200"]};
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text["100"]};
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.01em;
`;

const baseInputStyles = (theme: import("styled-components").DefaultTheme) => `
  padding: 14px 16px;
  border: 2px solid #6a6162ff !important;
  border-radius: 10px;
  background-color: transparent !important;  
  color: ${theme.colors.text["100"]};
  font-size: 0.95rem;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &::placeholder {
    color: ${theme.colors.text["100"]};
    opacity: 0.7;
  }

  &:invalid:not(:placeholder-shown) {
    border-color: #bf616a !important;
  }
`;

const Input = styled.input`
  ${({ theme }) => baseInputStyles(theme)}
`;

const Textarea = styled.textarea`
  ${({ theme }) => baseInputStyles(theme)}
  min-height: 140px;
  resize: vertical;
  line-height: 1.6;
`;

const ErrorText = styled.span`
  color: #bf616a;
  font-size: 0.8rem;
  font-weight: 500;
  padding-left: 4px;
  animation: ${slideIn} 0.2s ease-out;
`;

const SubmitButton = styled.button`
  position: relative;
  padding: 14px 28px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 12px;
  box-shadow: 0 4px 14px ${({ theme }) => `${theme.colors.primary}40`};
  min-height: 52px;
  width: 100%;
  margin-bottom: 48px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${({ theme }) => `${theme.colors.primary}55`};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px ${({ theme }) => `${theme.colors.primary}40`};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 576px) {
    padding: 12px 20px;
    min-height: 48px;
    font-size: 0.95rem;
  }
`;

const Spinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: ${pulse} 0.8s infinite;
  margin-right: 8px;
  vertical-align: middle;
`;

const SuccessMessage = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #a3be8c, #88c0d0);
  color: #2e3440;
  border-radius: 10px;
  margin-bottom: 24px;
  text-align: center;
  font-weight: 600;
  animation: ${slideIn} 0.3s ease-out;
  box-shadow: 0 4px 12px rgba(163, 190, 140, 0.3);
`;

const ContactLink = styled.a`
  color: ${({ theme }) => theme.colors.text["200"]};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;

const ContactInfo = styled.div`
  padding: 24px;
  background-color: ${({ theme }) => `${theme.colors.scrollHandle}10`};
  border-radius: 12px;
  height: fit-content;
  position: sticky;
  top: 0;

  h4 {
    color: ${({ theme }) => theme.colors.text["100"]};
    margin: 0 0 16px 0;
    font-size: 1rem;
    font-weight: 600;
  }

  p {
    color: ${({ theme }) => theme.colors.text["200"]};
    margin: 10px 0;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    word-break: break-all;
  }

  @media (max-width: 576px) {
    padding: 18px;
    position: static;

    h4 {
      font-size: 0.95rem;
      margin-bottom: 12px;
    }

    p {
      font-size: 0.825rem;
      margin: 8px 0;
    }
  }
`;

const EmailWindow: React.FC<WindowState> = () => {
  const [formData, setFormData] = useState<EmailFormInputs>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [errors, setErrors] = useState<Partial<EmailFormInputs>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for field when user types
    if (errors[name as keyof EmailFormInputs]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof EmailFormInputs];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<EmailFormInputs> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    /* Post form submission to Netlify */
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...formData }),
    })
      .then(() => logger.info("Email form submitted"))
      .catch(error => logger.info(`Email form failed: ${error}`));

    setIsSubmitting(false);
    setIsSubmitSuccessful(true);

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>Get In Touch</FormTitle>
        <FormSubtitle>
          Have a question, project idea, or just want to say hello? Fill out the
          form below and I'll get back to you as soon as possible.
        </FormSubtitle>
      </FormHeader>

      {isSubmitSuccessful && (
        <SuccessMessage>
          ✓ Thank you! Your message has been sent successfully.
        </SuccessMessage>
      )}

      <textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              autoComplete="off"
            />
    </FormContainer>
  );
};

export default EmailWindow;
