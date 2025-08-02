import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlog } from '../../redux/blogs/blogsActions';
import {
  PostDetailsContainer,
  PostTitle,
  PostCategory,
  PostImage,
  PostContent,
} from './styledComponents';

const PostDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { blog, loading, error, blogs } = useSelector((state) => state.blogs);

  useEffect(() => {
    const post = blogs.find((p) => p.slug === slug);
    if (post) {
      dispatch(fetchBlog(post._id));
    }
  }, [dispatch, slug, blogs]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!blog) {
    return <p>Post not found.</p>;
  }

  return (
    <PostDetailsContainer>
      <PostTitle>{blog.title}</PostTitle>
      <PostCategory>{blog.category}</PostCategory>
      <PostImage src={blog.image} alt={blog.title} />
      <PostContent dangerouslySetInnerHTML={{ __html: blog.content }} />
    </PostDetailsContainer>
  );
};

export default PostDetails;
