import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  text-align: center;
  margin: 0 auto;
`;

export const MainHeading = styled.h1`
  font-family: 'Pacifico', cursive;
  font-size: 4rem;
  color: #ffA500;
  margin-bottom: 1rem;
`;

export const SubHeading = styled.p`
  font-size: 1.2rem;
  color: #34495e;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

export const ViewAllPosts = styled(Link)`
  font-size: 1.1rem;
  color: #16a085;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: border-bottom 0.3s ease;

  &:hover {
    border-bottom: 2px solid #16a085;
  }
`;

export const RecentPostsContainer = styled.div`
  margin-top: 3rem;
  width: 100%;
`;

export const RecentPostsHeading = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
`;

export const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

export const ReadArticleButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #3498db;
  color: white;
  border: none;
  padding: 1rem;
  cursor: pointer;
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;
  width: 100%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const PostCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: left;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover ${ReadArticleButton} {
    transform: translateY(0);
  }
`;

export const PostImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const PostContent = styled.div`
  padding: 1rem;
  flex-grow: 1;
`;

export const PostTitle = styled.h3`
  font-size: 1.2rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
`;

export const PostCategory = styled.p`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin: 0;
`;

export const PostCardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const StyledImage = styled.img`
  width: 800px;
`;
