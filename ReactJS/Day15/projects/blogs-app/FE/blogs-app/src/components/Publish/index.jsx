import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PublishContainer, PublishTitle, PublishForm, FormLabel, FormInput, FormTextarea, SubmitButton } from './styledComponents';

const Publish = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slug = title.toLowerCase().split(' ').join('-');
    const blogData = { title, content, image, category, slug };

    try {
      const response = await fetch('http://localhost:8005/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
        credentials: 'include',
      });

      if (response.ok) {
        alert('Blog published successfully!');
        setTitle('');
        setContent('');
        setImage('');
        setCategory('');
      } else {
        alert('Failed to publish blog.');
      }
    } catch (error) {
      console.error('Error publishing blog:', error);
      alert('An error occurred while publishing the blog.');
    }
  };

  if (user?.role !== 'admin') {
    return <div>You are not authorized to publish a blog.</div>;
  }

  return (
    <PublishContainer>
      <PublishTitle>Publish a New Blog</PublishTitle>
      <PublishForm onSubmit={handleSubmit}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <FormInput
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <FormLabel htmlFor="content">Content</FormLabel>
        <FormTextarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <FormLabel htmlFor="image">Image URL</FormLabel>
        <FormInput
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <FormLabel htmlFor="category">Category</FormLabel>
        <FormInput
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <SubmitButton type="submit">Publish</SubmitButton>
      </PublishForm>
    </PublishContainer>
  );
};

export default Publish;
