import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';
import { useCallback, useMemo } from 'react';
import omit from 'lodash/omit';
// import history from '../utils/history';

const useFiltersQuery = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchFilters = useMemo(() => {
    return queryString.parse(search, { parseNumbers: true, parseBooleans: true });
  }, [search]);

  const setSearchQuery = useCallback(
    filter => {
      const search = queryString.stringify(filter);
      // history.replace({ search });
      // navigate(`/rooms/${search}`, { replace: true });
      navigate({pathname: '/rooms', search: search});
      // setSearchParams({ ...filter });
    },
    // [history]
    [navigate]
  );

  const clearFilter = useCallback(
    ({ target }) => {
      const { name } = target;
      const newFilter = omit(searchFilters, name);

      setSearchQuery(newFilter);
    },
    [searchFilters, setSearchQuery]
  );

  const handleChangeFilter = useCallback(
    ({ target }) => {
      const { name, value } = target;
      if (value === false || value === 0) {
        const newFilter = { ...searchFilters, [name]: value };
        setSearchQuery(newFilter);
        return clearFilter({ target });
      }
      const newFilter = { ...searchFilters, [name]: value };
      return setSearchQuery(newFilter);
    },

    [searchFilters, setSearchQuery, clearFilter]
  );
  // const handleResetSearchFilters = useCallback(() => {
  //   history.replace({});
  // }, [history]);
  const handleResetSearchFilters = useCallback(() => {
    // navigate('/rooms', { replace: true });
    navigate({pathname: '/rooms', search: ''});
    // setSearchParams({});
  }, [navigate]);

  return { searchFilters, handleChangeFilter, handleResetSearchFilters };
};

export default useFiltersQuery;
