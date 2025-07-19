import React from "react"

import { useState, useEffect, useCallback, useMemo } from 'react';
import Cookies from 'js-cookie';
import { 
  IoAdd, 
  IoTrash, 
  IoCheckmark, 
  IoClose, 
  IoCheckboxOutline,
  IoCheckbox,
  IoListOutline,
  IoTimeOutline,
  IoStatsChartOutline
} from 'react-icons/io5';

// Constants for better maintainability
const API_BASE_URL = 'http://localhost:8005/api';
const TOKEN_KEY = 'jwt_token';
const MESSAGE_TIMEOUT = 3000;

// Custom hook for token management
const useAuthToken = () => {
  return useMemo(() => {
    const token = Cookies.get(TOKEN_KEY);
    return token ? `Bearer ${token}` : null;
  }, []);
};

// Custom hook for API calls
const useApiCall = () => {
  const authToken = useAuthToken();

  const apiCall = useCallback(async (endpoint, options = {}) => {
    if (!authToken) {
      throw new Error('No authentication token found');
    }

    const config = {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  }, [authToken]);

  return { apiCall, isTokenAvailable: !!authToken };
};

// Custom hook for notifications
const useNotifications = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const showMessage = useCallback((message, type = 'success') => {
    if (type === 'success') {
      setSuccess(message);
      setError('');
      setTimeout(() => setSuccess(''), MESSAGE_TIMEOUT);
    } else {
      setError(message);
      setSuccess('');
      setTimeout(() => setError(''), MESSAGE_TIMEOUT);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setError('');
    setSuccess('');
  }, []);

  return { error, success, showMessage, clearMessages };
};

// Custom hook for todos management
const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { apiCall, isTokenAvailable } = useApiCall();
  const { showMessage } = useNotifications();

  // Memoized computed values
  const todoStats = useMemo(() => ({
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length,
    completedTodos: todos.filter(todo => todo.completed),
    pendingTodos: todos.filter(todo => !todo.completed),
  }), [todos]);

  const fetchTodos = useCallback(async () => {
    if (!isTokenAvailable) {
      showMessage('Authentication token not found', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const data = await apiCall('/todos');
      if (data.success) {
        setTodos(data.data);
      } else {
        showMessage(`Failed to fetch todos: ${data.message}`, 'error');
      }
    } catch (error) {
      showMessage(`Error fetching todos: ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [apiCall, isTokenAvailable, showMessage]);

  const createTodo = useCallback(async (todoData) => {
    if (!isTokenAvailable) {
      showMessage('Authentication token not found', 'error');
      return false;
    }

    if (!todoData.title?.trim() || !todoData.description?.trim()) {
      showMessage('Please fill in both title and description', 'error');
      return false;
    }

    setIsLoading(true);
    try {
      const data = await apiCall('/todos', {
        method: 'POST',
        body: JSON.stringify(todoData),
      });

      if (data.success) {
        // Optimistic update
        setTodos(prevTodos => [...prevTodos, data.data]);
        showMessage('Todo created successfully!');
        return true;
      } else {
        showMessage(`Failed to create todo: ${data.message}`, 'error');
        return false;
      }
    } catch (error) {
      showMessage(`Error creating todo: ${error.message}`, 'error');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [apiCall, isTokenAvailable, showMessage]);

  const updateTodo = useCallback(async (id, updates) => {
    if (!isTokenAvailable) {
      showMessage('Authentication token not found', 'error');
      return;
    }

    // Optimistic update
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo._id === id ? { ...todo, ...updates } : todo
      )
    );

    try {
      const data = await apiCall(`/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });

      if (data.success) {
        showMessage(`Todo updated successfully!`);
      } else {
        // Revert optimistic update on failure
        fetchTodos();
        showMessage(`Failed to update todo: ${data.message}`, 'error');
      }
    } catch (error) {
      // Revert optimistic update on failure
      fetchTodos();
      showMessage(`Error updating todo: ${error.message}`, 'error');
    }
  }, [apiCall, isTokenAvailable, showMessage, fetchTodos]);

  const deleteTodo = useCallback(async (id) => {
    if (!isTokenAvailable) {
      showMessage('Authentication token not found', 'error');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this todo?')) {
      return;
    }

    // Optimistic update
    const originalTodos = todos;
    setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));

    try {
      const data = await apiCall(`/todos/${id}`, {
        method: 'DELETE',
      });

      if (data.success) {
        showMessage('Todo deleted successfully!');
      } else {
        // Revert optimistic update on failure
        setTodos(originalTodos);
        showMessage(`Failed to delete todo: ${data.message}`, 'error');
      }
    } catch (error) {
      // Revert optimistic update on failure
      setTodos(originalTodos);
      showMessage(`Error deleting todo: ${error.message}`, 'error');
    }
  }, [apiCall, isTokenAvailable, showMessage, todos]);

  return {
    todos,
    isLoading,
    todoStats,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  };
};

function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { error, success, showMessage } = useNotifications();
  const {
    todos,
    isLoading,
    todoStats,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  } = useTodos();

  // Initialize todos on component mount
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Memoized form submission handler
  const handleCreateTodo = useCallback(async () => {
    const success = await createTodo({ title, description });
    if (success) {
      setTitle('');
      setDescription('');
    }
  }, [createTodo, title, description]);

  // Memoized toggle handler
  const handleToggleTodo = useCallback((id, currentStatus) => {
    updateTodo(id, { completed: !currentStatus });
  }, [updateTodo]);

  // Form validation
  const isFormValid = useMemo(() => {
    return title.trim().length > 0 && description.trim().length > 0;
  }, [title, description]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <HeaderSection todoCount={todoStats.total} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Alert Messages */}
        <AlertMessages error={error} success={success} />

        {/* Create Todo Form */}
        <CreateTodoForm
          title={title}
          description={description}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onSubmit={handleCreateTodo}
          isLoading={isLoading}
          isFormValid={isFormValid}
        />

        {/* Statistics Cards */}
        <StatisticsCards stats={todoStats} />

        {/* Todo Lists */}
        <TodoLists
          pendingTodos={todoStats.pendingTodos}
          completedTodos={todoStats.completedTodos}
          totalTodos={todoStats.total}
          isLoading={isLoading}
          onToggle={handleToggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}

// Memoized Header Component
const HeaderSection = React.memo(({ todoCount }) => (
  <div className="bg-white shadow-lg border-b border-gray-200">
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <IoListOutline className="mr-3 text-blue-600" />
            Todo Dashboard
          </h1>
          <p className="text-gray-600 mt-1">Manage your daily tasks efficiently</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600 flex items-center justify-end">
            <IoStatsChartOutline className="mr-2" />
            {todoCount}
          </div>
          <div className="text-sm text-gray-500">Total Tasks</div>
        </div>
      </div>
    </div>
  </div>
));

// Memoized Alert Messages Component
const AlertMessages = React.memo(({ error, success }) => (
  <>
    {error && (
      <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
        <IoClose className="text-xl mr-2" />
        {error}
      </div>
    )}
    
    {success && (
      <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
        <IoCheckmark className="text-xl mr-2" />
        {success}
      </div>
    )}
  </>
));

// Memoized Create Todo Form Component
const CreateTodoForm = React.memo(({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
  isLoading,
  isFormValid
}) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
      <IoAdd className="text-xl mr-2 text-blue-600" />
      Add New Todo
    </h2>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          placeholder="Enter todo title..."
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
          disabled={isLoading}
          maxLength={100}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <input
          type="text"
          placeholder="Enter description..."
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
          disabled={isLoading}
          maxLength={500}
        />
      </div>
      
      <button
        onClick={onSubmit}
        disabled={isLoading || !isFormValid}
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
      >
        {isLoading ? (
          <LoadingSpinner text="Creating..." />
        ) : (
          <>
            <IoAdd className="text-lg mr-2" />
            Create Todo
          </>
        )}
      </button>
    </div>
  </div>
));

// Memoized Statistics Cards Component
const StatisticsCards = React.memo(({ stats }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
    <StatCard
      icon={<IoListOutline className="text-2xl text-blue-600" />}
      value={stats.total}
      label="Total Tasks"
      bgColor="bg-blue-100"
    />
    <StatCard
      icon={<IoCheckmark className="text-2xl text-green-600" />}
      value={stats.completed}
      label="Completed"
      bgColor="bg-green-100"
    />
    <StatCard
      icon={<IoTimeOutline className="text-2xl text-orange-600" />}
      value={stats.pending}
      label="Pending"
      bgColor="bg-orange-100"
    />
  </div>
));

// Memoized Stat Card Component
const StatCard = React.memo(({ icon, value, label, bgColor }) => (
  <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
    <div className="flex items-center">
      <div className={`p-2 ${bgColor} rounded-lg`}>
        {icon}
      </div>
      <div className="ml-3">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </div>
  </div>
));

// Memoized Todo Lists Component
const TodoLists = React.memo(({
  pendingTodos,
  completedTodos,
  totalTodos,
  isLoading,
  onToggle,
  onDelete
}) => (
  <div className="space-y-8">
    {/* Pending Todos */}
    {pendingTodos.length > 0 && (
      <TodoSection
        title="Pending Tasks"
        icon={<IoTimeOutline className="text-xl text-orange-500 mr-2" />}
        count={pendingTodos.length}
        todos={pendingTodos}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    )}

    {/* Completed Todos */}
    {completedTodos.length > 0 && (
      <TodoSection
        title="Completed Tasks"
        icon={<IoCheckmark className="text-xl text-green-600 mr-2" />}
        count={completedTodos.length}
        todos={completedTodos}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    )}

    {/* Empty State */}
    {totalTodos === 0 && !isLoading && <EmptyState />}

    {/* Loading State */}
    {isLoading && totalTodos === 0 && <LoadingState />}
  </div>
));

// Memoized Todo Section Component
const TodoSection = React.memo(({ title, icon, count, todos, onToggle, onDelete }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      {icon}
      {title} ({count})
    </h3>
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  </div>
));

// Memoized TodoItem Component
const TodoItem = React.memo(({ todo, onToggle, onDelete }) => (
  <div className={`bg-white rounded-lg shadow-md border border-gray-200 p-4 transition-all duration-200 hover:shadow-lg ${
    todo.completed ? 'opacity-75' : ''
  }`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4 flex-1">
        <button
          onClick={() => onToggle(todo._id, todo.completed)}
          className={`flex-shrink-0 transition-all duration-200 ${
            todo.completed
              ? 'text-green-500'
              : 'text-gray-300 hover:text-green-500'
          }`}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed ? (
            <IoCheckbox className="text-2xl" />
          ) : (
            <IoCheckboxOutline className="text-2xl" />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium truncate ${
            todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'
          }`}>
            {todo.title}
          </h4>
          <p className={`text-sm mt-1 truncate ${
            todo.completed ? 'text-gray-400 line-through' : 'text-gray-600'
          }`}>
            {todo.description}
          </p>
        </div>
      </div>
      
      <button
        onClick={() => onDelete(todo._id)}
        className="flex-shrink-0 ml-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
        aria-label="Delete todo"
      >
        <IoTrash className="text-xl" />
      </button>
    </div>
  </div>
));

// Loading Spinner Component
const LoadingSpinner = React.memo(({ text = "Loading..." }) => (
  <div className="flex items-center">
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
    {text}
  </div>
));

// Empty State Component
const EmptyState = React.memo(() => (
  <div className="text-center py-12">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <IoAdd className="text-3xl text-gray-400" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">No todos yet</h3>
    <p className="text-gray-600">Create your first todo to get started!</p>
  </div>
));

// Loading State Component
const LoadingState = React.memo(() => (
  <div className="text-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
    <p className="text-gray-600">Loading your todos...</p>
  </div>
));

export default Home;
