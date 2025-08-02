import styled from 'styled-components';

export const PublishContainer = styled.div`
  padding: 2rem;
`;

export const PublishTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

export const PublishForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormLabel = styled.label`
  font-weight: bold;
`;

export const FormInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const FormTextarea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 150px;
`;

export const SubmitButton = styled.button`
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
