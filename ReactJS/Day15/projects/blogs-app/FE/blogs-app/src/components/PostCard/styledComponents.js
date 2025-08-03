import styled from 'styled-components';

export const PostCardContainer = styled.div`
  width: 300px;
  border: 1px solid teal;
  border-radius: 8px;
  overflow: hidden;
  margin: 16px;
  position: relative;
  height: 400px;
  display: flex;
  flex-direction: column;

  &:hover button {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const PostImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const PostContent = styled.div`
  padding: 16px;
  flex-grow: 1;
`;

export const PostTitle = styled.h3`
  font-size: 1.5em;
  margin: 0 0 8px;
`;

export const PostCategory = styled.p`
  font-size: 1em;
  color: #555;
  margin: 0;
`;

export const ReadArticleButton = styled.button`
  background: linear-gradient(to right, #8a2be2, #ff1493);
  color: white;
  border: none;
  padding: 10px 16px;
  font-size: 1em;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  transform: translateY(100%);
  opacity: 0;
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`;
