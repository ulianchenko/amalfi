import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';

export default function useSearch(data, config) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setData] = useState(data || []);
  const [isSearching, setIsSearching] = useState(false);

  const handleChangeSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      const dataFiltered = data.filter((item) =>
        item[config.searchBy].toString().toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setData(dataFiltered);
      setIsSearching(false);
    } else {
      setData(data);
      setIsSearching(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, data]);

  return { filteredData, isSearching, searchTerm, setSearchTerm, handleChangeSearch };
}
