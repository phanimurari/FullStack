import styled from 'styled-components';

export const PostCardContainer = styled.div`
  width: 300px;
  border: 1px solid teal;
  border-radius: 8px;
  overflow: hidden;
  margin: 16px;
`;

export const PostImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const PostContent = styled.div`
  padding: 16px;
`;

export const PostTitle = styled.h3`
  font-size: 1.5em;
  margin: 0 0 8px;
`;

export const PostCategory = styled.p`
  font-size: 1em;
  color: #555;
  margin: 0 0 16px;
`;

export const ReadArticleButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 16px;
  font-size: 1em;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  width: calc(100% - 32px);
  margin: 0 16px 16px;

  &:hover {
    background-color: #0056b3;
  }
`;
