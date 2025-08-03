import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const Sidebar = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(156, 163, 175, 0.3);
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    border-right: 1px solid rgba(156, 163, 175, 0.3);
    border-bottom: none;
    min-height: 100vh;
    width: 320px;
    flex-shrink: 0;
  }
`;

export const FilterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Label = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  width: 100%;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Select = styled.select`
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  width: 100%;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }
`;

export const MainContent = styled.div`
  flex: 1;
  background: white;
  min-height: 100vh;
`;

export const Header = styled.div`
  color: #374151;
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: #1f2937;

  @media (min-width: 640px) {
    font-size: 2.5rem;
  }
`;

export const PostsGrid = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
`;

export const StatusMessage = styled.p`
  font-size: 1.25rem;
  color: #6b7280;
  text-align: center;
  grid-column: 1 / -1;
  padding: 3rem;
  background: #f9fafb;
  border-radius: 12px;
  border: 2px dashed #d1d5db;
`;

export const LoadingMessage = styled(StatusMessage)`
  background: linear-gradient(45deg, #f0f9ff, #e0f2fe);
  color: #0369a1;
  border-color: #0369a1;
  
  &::after {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid #0369a1;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s ease-in-out infinite;
    margin-left: 10px;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
