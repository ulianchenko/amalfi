import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFiltersQuery, usePagination, useSort, useSearch } from '../../../hooks';
import { setSessionStorageData } from '../../../services/sessionStorage.service';
import { getFilteredRooms, getRoomsLoadingStatus, loadFilteredRoomsList } from '../../../store/rooms';
import Pagination from '../../common/Pagination';
import Searchbar from '../../common/Searchbar';
import RoomsDisplayCount from '../../ui/rooms/RoomsDisplayCount';
import RoomsFilter from '../../ui/rooms/RoomsFilters';
import RoomsList from '../../ui/rooms/RoomsList';
import RoomsListSkeleton from '../../ui/rooms/RoomsList/RoomsListSkeleton';
import RoomsSort from '../../ui/rooms/RoomsSort';

const setPageSizeOptions = [
  { name: '6', value: 6 },
  { name: '12', value: 12 },
  { name: '18', value: 18 },
  { name: '24', value: 24 },
];

const RoomsPage = () => {
  const dispatch = useDispatch();


  const rooms = useSelector(getFilteredRooms());
  const roomsIsLoading = useSelector(getRoomsLoadingStatus());

  const { searchFilters, handleResetSearchFilters } = useFiltersQuery();
  const { filteredData, searchTerm, setSearchTerm, handleChangeSearch } = useSearch(rooms, {
    searchBy: 'roomNumber',
  });
  const { sortedItems, sortBy, setSortBy } = useSort(filteredData || [], { path: 'roomNumber', order: 'desc' });
  const {
    itemsListCrop: roomsListCrop,
    currentPage,
    pageSize,
    handleChangePage,
    handleChangePageSize,
  } = usePagination(sortedItems || [], setPageSizeOptions[1].value);

  const handleSort = useCallback(
    (event) => {
      setSortBy(JSON.parse(event.target.value));
      handleChangePage(event, 1);
    },
    [handleChangePage, setSortBy]
  );

  const handleResetFilters = useCallback(() => {
    handleResetSearchFilters();
    setSearchTerm('');
    setSortBy({ path: 'roomNumber', order: 'desc' });
    handleChangePageSize({ target: setPageSizeOptions[1] });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleChangePageSize, handleResetSearchFilters]);

  useEffect(() => {
    const oneDayMs = 86400000;
    const initialSearchFilters = {
      arrivalDate: Date.now(),
      departureDate: Date.now() + oneDayMs,
    };

    setSessionStorageData(searchFilters);
    dispatch(loadFilteredRoomsList({ ...initialSearchFilters, ...searchFilters }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilters]);

  return (
    <main className='rooms-page'>
      <aside className='rooms-page__filters'>
        <RoomsFilter onReset={handleResetFilters} />
      </aside>
      <section className='rooms-page__rooms'>
        <div className='rooms-page__sorting'>
          <Searchbar value={searchTerm} onChange={handleChangeSearch} />
          <RoomsSort sortBy={sortBy} onSort={handleSort} />
          <RoomsDisplayCount count={pageSize} setCount={handleChangePageSize} options={setPageSizeOptions} />
        </div>
        <h2 className='rooms__title'>Numbers we have found for you</h2>
        {roomsIsLoading ? <RoomsListSkeleton pageSize={pageSize} /> : <RoomsList rooms={roomsListCrop} />}
        {roomsListCrop.length === 0 && <h2>We did not find suitable rooms for you according to your parameters. &#128577;</h2>}

        {sortedItems.length > pageSize && (
          <div className='rooms-page__pagination'>
            <Pagination items={sortedItems} pageSize={pageSize} currentPage={currentPage} onChange={handleChangePage} />
            <p className='rooms-page__pagination-info'>
              {`${(currentPage - 1) * pageSize || 1} -
              ${pageSize * currentPage > rooms.length ? rooms.length : pageSize * currentPage}
              from ${rooms.length} rooms variants`}
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default RoomsPage;
