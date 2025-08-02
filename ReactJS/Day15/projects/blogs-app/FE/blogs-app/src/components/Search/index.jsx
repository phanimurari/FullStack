import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../redux/blogs/blogsActions';
import PostCard from '../PostCard';

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
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex   items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              onChange={handleChange}
              value={sidebarData.sort}
              id='sort'
              className='border rounded-lg p-3 w-full'
            >
              <option value='latest'>Latest</option>
              <option value='oldest'>Oldest</option>
            </select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Category:</label>
            <select
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
              className='border rounded-lg p-3 w-full'
            >
              <option value='uncategorized'>Uncategorized</option>
              <option value='javascript'>JavaScript</option>
              <option value='reactjs'>React.js</option>
              <option value='nextjs'>Next.js</option>
            </select>
          </div>
        </form>
      </div>
      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
          Posts results:
        </h1>
        <div className='p-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {!loading && blogs.length === 0 && (
            <p className='text-xl text-gray-500'>No posts found.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading &&
            blogs &&
            blogs.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </div>
  );
};

export default Search;
