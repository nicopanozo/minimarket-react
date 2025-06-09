import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Moon, Sun } from 'lucide-react';
import type { RootState } from '../redux/store';
import { toggleTheme, initializeTheme } from '../features/theme/themeSlice';

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default DarkModeToggle;
