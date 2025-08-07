import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../redux/blogs/blogsActions';
import PostCard from '../PostCard';
import {
  SearchContainer,
  Sidebar,
  FilterForm,
  FilterGroup,
  Label,
  Input,
  Select,
  MainContent,
  Header,
  Title,
  PostsGrid,
  StatusMessage,
  LoadingMessage
} from './styledComponents.js'

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'latest',
    category: 'uncategorized',
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('title');
    const sortFromUrl = urlParams.get('sortby');
    const categoryFromUrl = urlParams.get('category');

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        searchTerm: searchTermFromUrl || '',
        sort: sortFromUrl || 'latest',
        category: categoryFromUrl || 'uncategorized',
      });
    }

    const searchQuery = urlParams.toString();
    dispatch(fetchBlogs(searchQuery));
  }, [location.search, dispatch]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData({ ...sidebarData, [id]: value });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('title', sidebarData.searchTerm);
      urlParams.set('sortby', sidebarData.sort);
      urlParams.set('category', sidebarData.category);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [sidebarData, location.search, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('title', sidebarData.searchTerm);
    urlParams.set('sortby', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <SearchContainer>
      <Sidebar>
        <FilterForm onSubmit={handleSubmit}>
          <FilterGroup>
            <Label>Search Term:</Label>
            <Input
              type='text'
              id='searchTerm'
              placeholder='Search posts...'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </FilterGroup>
          
          <FilterGroup>
            <Label>Sort:</Label>
            <Select
              onChange={handleChange}
              value={sidebarData.sort}
              id='sort'
            >
              <option value='latest'>Latest</option>
              <option value='oldest'>Oldest</option>
            </Select>
          </FilterGroup>
          
          <FilterGroup>
            <Label>Category:</Label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
            >
              <option value='uncategorized'>Uncategorized</option>
              <option value='javascript'>JavaScript</option>
              <option value='reactjs'>React.js</option>
              <option value='nextjs'>Next.js</option>
            </Select>
          </FilterGroup>
        </FilterForm>
      </Sidebar>
      
      <MainContent>
        <Header>
          <Title>Posts results:</Title>
        </Header>
        
        <PostsGrid>
          {!loading && blogs.length === 0 && (
            <StatusMessage>No posts found.</StatusMessage>
          )}
          {loading && (
            <LoadingMessage>Loading</LoadingMessage>
          )}
          {!loading &&
            blogs &&
            blogs.map((post) => <PostCard key={post._id} post={post} />)}
        </PostsGrid>
      </MainContent>
    </SearchContainer>
  );
};

export default Search;
