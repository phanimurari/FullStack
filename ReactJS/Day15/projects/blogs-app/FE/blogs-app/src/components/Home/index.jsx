
import {
  HomeContainer,
  MainHeading,
  SubHeading,
  ViewAllPosts,
  RecentPostsContainer,
  RecentPostsHeading,
  PostsGrid,
  PostCard,
  PostImage,
  PostTitle,
  PostCategory,
} from './styledComponents';

const posts = [
  {
    id: 1,
    title: 'Crafting a MERN Stack Application with Tailwind CSS and TypeScript - A Step-by-Ste...',
    category: 'reactjs',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/mern-blog-b327f.appspot.com/o/1743057963123-photo_2025-03-27%2013.40.00-min.jpeg?alt=media&token=fc4e3665-9516-4b53-9126-58dc0208f468',
  },
  {
    id: 2,
    title: 'Understanding Inngest: A Durable Execution Platform for Developers',
    category: 'javascript',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/mern-blog-b327f.appspot.com/o/1743057963123-photo_2025-03-27%2013.40.00-min.jpeg?alt=media&token=fc4e3665-9516-4b53-9126-58dc0208f468',
  },
  {
    id: 3,
    title: 'Installing Next.js with Tailwind CSS: A Seamless Integration Guide',
    category: 'nextjs',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/mern-blog-b327f.appspot.com/o/1743057963123-photo_2025-03-27%2013.40.00-min.jpeg?alt=media&token=fc4e3665-9516-4b53-9126-58dc0208f468',
  },
  {
    id: 4,
    title: 'Integrating Tailwind CSS with Flowbite in Your React Project: A Step-by-Step Guide',
    category: 'reactjs',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/mern-blog-b327f.appspot.com/o/1743057963123-photo_2025-03-27%2013.40.00-min.jpeg?alt=media&token=fc4e3665-9516-4b53-9126-58dc0208f468',
  },
];

const Home = () => {
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
        <PostsGrid>
          {posts.map((post) => (
            <PostCard key={post.id}>
              <PostImage src={post.imageUrl} alt={post.title} />
              <PostTitle>{post.title}</PostTitle>
              <PostCategory>{post.category}</PostCategory>
            </PostCard>
          ))}
        </PostsGrid>
      </RecentPostsContainer>
    </HomeContainer>
  );
};

export default Home;
