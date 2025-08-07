import { Link } from 'react-router-dom';
import {
  PostCardContainer,
  PostImage,
  PostContent,
  PostTitle,
  PostCategory,
  ReadArticleButton,
} from './styledComponents';

const PostCard = ({ post }) => {
  return (
    <Link to={`/post/${post.slug}`} style={{ textDecoration: 'none' }}>
      <PostCardContainer>
        <PostImage src={post.image} alt={post.title} />
        <PostContent>
          <PostTitle>{post.title}</PostTitle>
          <PostCategory>{post.category}</PostCategory>
        </PostContent>
        <ReadArticleButton>Read Article</ReadArticleButton>
      </PostCardContainer>
    </Link>
  );
};

export default PostCard;
