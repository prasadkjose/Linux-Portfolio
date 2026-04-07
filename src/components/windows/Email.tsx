import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled, { keyframes } from "styled-components";
import { WindowState } from "../../types/window";

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
  background: rgba(24, 24, 24, 0.85);
  overflow-y: auto;
  scrollbar-width: thin; /* Firefox */
  animation: ${slideIn} 0.3s ease-out;
`;

const FormLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 48px;
  width: 100%;

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

const FormHeader = styled.div`
  margin-bottom: 32px;
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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 650px;
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
  border: 2px solid #bf616a !important;
  border-radius: 10px;
  background: rgba(24, 24, 24, 0.85);
  color: ${theme.colors.text["100"]};
  font-size: 0.95rem;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover:not(:focus) {
    border-color: ${theme.colors.text["200"]};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${`${theme.colors.primary}20`}, 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: ${theme.colors.text["300"]};
    opacity: 0.7;
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
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary || theme.colors.primary}
  );
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<EmailFormInputs>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<EmailFormInputs> = async data => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Email form submitted:", data);
    reset();
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

      <FormLayout>
        <StyledForm onSubmit={handleSubmit(onSubmit)} data-netlify="true">
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your full name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              type="text"
              placeholder="What's this about?"
              {...register("subject", { required: "Subject is required" })}
            />
            {errors.subject && <ErrorText>{errors.subject.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Write your message here..."
              {...register("message", { required: "Message is required" })}
            />
            {errors.message && <ErrorText>{errors.message.message}</ErrorText>}
          </FormGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner />
                Sending Message...
              </>
            ) : (
              "Send Message"
            )}
          </SubmitButton>
        </StyledForm>

        <ContactInfo>
          <h4>Other ways to reach me</h4>
          <p>📧 Email: prasadkjose@gmail.com</p>
          <p>🔗 LinkedIn: linkedin.com/in/prasadkjose</p>
          <p>🐙 GitHub: github.com/prasadkjose</p>
        </ContactInfo>
      </FormLayout>
    </FormContainer>
  );
};

export default EmailWindow;
