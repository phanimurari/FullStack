
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../redux/blogs/blogsActions';
import PostCard from '../PostCard';
import {
  HomeContainer,
  MainHeading,
  SubHeading,
  ViewAllPosts,
  RecentPostsContainer,
  RecentPostsHeading,
  PostsGrid,
} from './styledComponents';

const Home = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <HomeContainer>
      <MainHeading>Welcome to my Blog</MainHeading>
      <SubHeading>
        Welcome to my blog! Here you'll find a wide range of articles,
        tutorials, and resources designed to help you grow as a developer.
        Whether you're interested in web development, software engineering,
        programming languages, or best practices in the tech industry, there's
        something here for everyone. Dive in and explore the content to expand
        your knowledge and skills.
      </SubHeading>
      <ViewAllPosts to="/blogs">View all posts</ViewAllPosts>

      <RecentPostsContainer>
        <RecentPostsHeading>Recent Posts</RecentPostsHeading>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <PostsGrid>
            {blogs.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </PostsGrid>
        )}
      </RecentPostsContainer>
    </HomeContainer>
  );
};

export default Home;
