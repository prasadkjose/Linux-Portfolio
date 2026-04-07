import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { WindowState } from "../../types/window";

type EmailFormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.body};
  overflow-y: auto;
`;

const FormTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 24px;
  font-size: 1.5rem;
  font-weight: 600;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 600px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text["100"]};
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.scrollHandle};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.body};
  color: ${({ theme }) => theme.colors.text["100"]};
  font-size: 0.95rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Textarea = styled.textarea`
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.scrollHandle};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.body};
  color: ${({ theme }) => theme.colors.text["100"]};
  font-size: 0.95rem;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ErrorText = styled.span`
  color: #bf616a;
  font-size: 0.8rem;
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  padding: 16px;
  background-color: #a3be8c;
  color: #2e3440;
  border-radius: 6px;
  margin-top: 16px;
  text-align: center;
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
      <FormTitle>Send an Email</FormTitle>

      {isSubmitSuccessful && (
        <SuccessMessage>
          ✓ Thank you! Your message has been sent successfully.
        </SuccessMessage>
      )}

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
          {isSubmitting ? "Sending..." : "Send Message"}
        </SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default EmailWindow;
