import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { uploadImage } from '../../utils/imageUploader';
import { PublishContainer, PublishTitle, PublishForm, FormLabel, FormInput, FormTextarea, SubmitButton } from './styledComponents';

const Publish = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert('Please select an image to upload.');
      return;
    }

    try {
      const imageUrl = await uploadImage(imageFile);
      const slug = title.toLowerCase().split(' ').join('-');
      const blogData = { title, content, image: imageUrl, category, slug };

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
        navigate('/');
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
        <FormLabel htmlFor="image">Image</FormLabel>
        <FormInput
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
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
