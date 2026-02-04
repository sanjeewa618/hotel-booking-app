import React, { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';
import RoomResult from '../common/RoomResult';
import RoomSearch from '../common/RoomSearch';



const AllRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [selectedAcType, setSelectedAcType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(7);

  // Function to handle search results
  const handleSearchResult = (results) => {
    setRooms(results);
    // Re-apply current filters to the search results
    filterRooms(selectedRoomType, selectedAcType, results);
  };


  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await ApiService.getAllRooms();
        const allRooms = response.roomList;
        setRooms(allRooms);
        setFilteredRooms(allRooms);
      } catch (error) {
        console.error('Error fetching rooms:', error.message);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    // Extract unique room types from the current list of rooms
    // If selectedAcType is set, show only room types available for that AC type
    // Otherwise show all unique room types
    let availableRooms = rooms;
    if (selectedAcType !== '') {
        availableRooms = rooms.filter(room => room.acType?.trim() === selectedAcType);
    }
    const uniqueTypes = [...new Set(availableRooms.map(room => room.roomType))];
    setRoomTypes(uniqueTypes);
    
    // Re-apply filters when rooms or selectedAcType changes
    filterRooms(selectedRoomType, selectedAcType, rooms);
  }, [rooms, selectedAcType]);

  // ScrollReveal animations
  useEffect(() => {
    if (window.ScrollReveal && rooms.length > 0) {
      const scrollRevealOption = {
        distance: "50px",
        duration: 900,
        easing: "ease-in-out",
        origin: "bottom",
        reset: false,
      };

      window.ScrollReveal().reveal(".all-rooms-title", {
        ...scrollRevealOption,
        origin: "top",
        delay: 300,
      });

      window.ScrollReveal().reveal(".room-search", {
        ...scrollRevealOption,
        origin: "bottom",
        delay: 300,
      });

      window.ScrollReveal().reveal(".room-filter-div", {
        ...scrollRevealOption,
        origin: "bottom",
        delay: 400,
      });

      window.ScrollReveal().reveal(".room-list-item", {
        ...scrollRevealOption,
        origin: "bottom",
        interval: 200,
        delay: 500,
      });
    }
  }, [rooms]);

  const handleRoomTypeChange = (e) => {
    setSelectedRoomType(e.target.value);
    filterRooms(e.target.value, selectedAcType, rooms);
  };

  const handleAcTypeChange = (e) => {
    const newAcType = e.target.value;
    setSelectedAcType(newAcType);
    setSelectedRoomType(''); // Reset room type to "All" when AC type changes
    filterRooms('', newAcType, rooms);
  };

  const filterRooms = (type, acType, roomsToFilter = rooms) => {
    console.log('Filtering - Room Type:', type, 'AC Type:', acType);
    console.log('Total rooms:', roomsToFilter.length);
    
    let filtered = roomsToFilter;
    
    // Filter by AC type first
    if (acType !== '') {
      filtered = filtered.filter((room) => {
        const roomAcType = room.acType?.trim();
        console.log('Room ID:', room.id, 'AC Type:', roomAcType);
        return roomAcType === acType;
      });
      console.log('After AC filter:', filtered.length, 'rooms');
    }
    
    // Then filter by room type if specified
    if (type !== '') {
      filtered = filtered.filter((room) => room.roomType === type);
      console.log('After room type filter:', filtered.length, 'rooms');
    }
    
    console.log('Final filtered rooms:', filtered.length);
    setFilteredRooms(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Pagination
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='all-rooms'>
      <h2>All Rooms</h2>
      <div className='all-room-filter-div'>
        <div>
          <label>Filter by AC:</label>
          <select value={selectedAcType} onChange={handleAcTypeChange}>
            <option value="">All</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
          </select>
        </div>
        <div>
          <label>Filter by Room Type:</label>
          <select value={selectedRoomType} onChange={handleRoomTypeChange}>
            <option value="">All</option>
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <RoomSearch handleSearchResult={handleSearchResult} />
      <RoomResult roomSearchResults={currentRooms} />

      <Pagination
        roomsPerPage={roomsPerPage}
        totalRooms={filteredRooms.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default AllRoomsPage;
