import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import NavBar from './NavBar';
import Pagination from './pagination';
import { useNavigate } from 'react-router-dom';
import { IoTelescopeSharp } from 'react-icons/io5';
import Swal from 'sweetalert2';
import Style from '../css/exoplanets.module.css';

const Exoplanets = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState({ name: '', host: '', year: '', distance: '', method: '' });

    const navigate = useNavigate();

    const paginate = (pageNumber) => {
        console.log("Changing to page:", pageNumber); // Añade esto
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('PSCompPars.csv');
                const csvText = await response.text();
                Papa.parse(csvText, {
                    header: true,
                    complete: (result) => setData(result.data),
                });
            } catch (error) {
                console.error('Error al cargar el archivo CSV:', error);
            }
        };

        loadData();
    }, []);

    const handlePlanetClick = (planet) => navigate('/planet-details', { state: planet });

    // Función para restablecer los otros selects excepto el que se seleccionó
    const handleSortChange = (field, value) => {
        setSortBy((prevSortBy) => ({
            ...prevSortBy,
            // Cambia solo el select actual y resetea los demás
            name: field === 'name' ? value : '',
            host: field === 'host' ? value : '',
            year: field === 'year' ? value : '',
            distance: field === 'distance' ? value : '',
            method: field === 'method' ? value : '',
        }));
    };

    const handleFilterCleaning = () => {
        setSortBy((prevSortBy) => ({
            ...prevSortBy,
            // Cambia solo el select actual y resetea los demás
            name: '',
            host: '',
            year: '',
            distance: '',
            method: '',
        }));
    };

    const sortData = (data) => {
        let sortedData = [...data];

        if (sortBy.name) {
            sortedData = sortedData.sort((a, b) => {
                const aName = a.pl_name?.toLowerCase() || '';
                const bName = b.pl_name?.toLowerCase() || '';
                return sortBy.name === 'Asc' ? aName.localeCompare(bName) : bName.localeCompare(aName);
            });
        }

        if (sortBy.host) {
            sortedData = sortedData.sort((a, b) => {
                const aHost = a.hostname?.toLowerCase() || '';
                const bHost = b.hostname?.toLowerCase() || '';
                return sortBy.host === 'Asc' ? aHost.localeCompare(bHost) : bHost.localeCompare(aHost);
            });
        }

        if (sortBy.year) {
            sortedData = sortedData.sort((a, b) => {
                const aYear = parseInt(a.disc_year) || 0;
                const bYear = parseInt(b.disc_year) || 0;
                return sortBy.year === 'Asc' ? aYear - bYear : bYear - aYear;
            });
        }

        if (sortBy.distance) {
            sortedData = sortedData.sort((a, b) => {
                const aDistance = parseFloat(a.sy_dist) || 0;
                const bDistance = parseFloat(b.sy_dist) || 0;
                return sortBy.distance === 'Asc' ? aDistance - bDistance : bDistance - aDistance;
            });
        }

        if (sortBy.method) {
            sortedData = sortedData.filter(planet => planet.discoverymethod === sortBy.method);
        }

        return sortedData;
    };

    const indexOfLastItem = currentPage * itemsPerPage; // Último índice
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Primer índice

    const filteredData = data.filter(planet => {
        const yearMatch = planet.disc_year?.toString().includes(searchTerm);
        const nameMatch = planet.pl_name?.toLowerCase().includes(searchTerm.toLowerCase()) || planet.hostname?.toLowerCase().includes(searchTerm.toLowerCase());
        const methodMatch = planet.discoverymethod?.toLowerCase().includes(searchTerm.toLowerCase());
        return yearMatch || nameMatch || methodMatch;
    });

    const sortedData = sortData(filteredData);
    const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    useEffect(() => {
        if (searchTerm && filteredData.length === 0) {
            const timer = setTimeout(() => {
                setSearchTerm("");
                Swal.fire("No results found. Please try again.");
            }, 2000);
            return () => clearTimeout(timer);
        } else {
            // Solo restablece a la primera página si hay resultados
            if (filteredData.length > 0) {
                setCurrentPage(currentPage); 
            }
        }
    }, [searchTerm, filteredData]);   

    return (
        <>
            <NavBar />
            <section className={Style.landingContainer}>
                <div className={Style.titleContainer}>
                    <h1>Exoplanets</h1>
                </div>
                <div className={Style.navbarSearch}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className={Style.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="search"
                    />
                    <button
                        className={Style.searchButton}
                        onClick={() => setCurrentPage(1)}
                        aria-label="search-button"
                    >
                        <IoTelescopeSharp />
                    </button>
                </div>
                <div>
                    <button className={Style.c} onClick={handleFilterCleaning}>
                        Limpiar filtro
                    </button>
                </div>
                <div className={Style.dataContainer}>
                    {currentData.length > 0 ? (
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Planet Name
                                            <br />
                                            <select
                                                name="name-select"
                                                onChange={(e) => handleSortChange('name', e.target.value)}
                                                value={sortBy.name}
                                            >
                                                <option value="" disabled>---</option>
                                                <option value="Asc">A-Z</option>
                                                <option value="Desc">Z-A</option>
                                            </select>
                                        </th>
                                        <th>Host Name
                                            <br />
                                            <select
                                                name="host-select"
                                                onChange={(e) => handleSortChange('host', e.target.value)}
                                                value={sortBy.host}
                                            >
                                                <option value="" disabled>---</option>
                                                <option value="Asc">A-Z</option>
                                                <option value="Desc">Z-A</option>
                                            </select>
                                        </th>
                                        <th>Discovery Method
                                            <br />
                                            <select
                                                name="discovery-select"
                                                onChange={(e) => handleSortChange('method', e.target.value)}
                                                value={sortBy.method}
                                            >
                                                <option value="" disabled>---</option>
                                                <option value="Transit">Transit</option>
                                                <option value="Radial Velocity">Radial Velocity</option>
                                                <option value="Transit Timing Variations">Transit Timing Variations</option>
                                                <option value="Orbital Brightness Modulation">Orbital Brightness Modulation</option>
                                                <option value="Disk Kinematics">Disk Kinematics</option>
                                                <option value="Eclipse timing Variations">Eclipse timing Variations</option>
                                                <option value="Pulsation Timing Variations">Pulsation Timing Variations</option>
                                                <option value="Imaging">Imaging</option>
                                                <option value="Astrometry">Astrometry</option>
                                                <option value="Microlensing">Microlensing</option>
                                            </select>
                                        </th>
                                        <th>Discovery Year
                                            <br />
                                            <select
                                                name="year-select"
                                                onChange={(e) => handleSortChange('year', e.target.value)}
                                                value={sortBy.year}
                                            >
                                                <option value="" disabled>---</option>
                                                <option value="Asc">Oldest</option>
                                                <option value="Desc">Latest</option>
                                            </select>
                                        </th>
                                        <th>Distance
                                            <br />
                                            <select
                                                name="distance-select"
                                                onChange={(e) => handleSortChange('distance', e.target.value)}
                                                value={sortBy.distance}
                                            >
                                                <option value="" disabled>---</option>
                                                <option value="Asc">Nearest</option>
                                                <option value="Desc">Farthest</option>
                                            </select>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map((planet, index) => (
                                        <tr key={index}>
                                            <td>
                                                <button onClick={() => handlePlanetClick(planet)}>{planet.pl_name || "No Data"}</button>
                                            </td>
                                            <td>{planet.hostname || "No Data"}</td>
                                            <td>{planet.discoverymethod || "No Data"}</td>
                                            <td>{planet.disc_year || "No Data"}</td>
                                            <td>{planet.sy_dist || "No Data"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination
                                currentPage={currentPage}
                                totalItems={sortData(filteredData).length}
                                itemsPerPage={itemsPerPage}
                                paginate={paginate}
                            />
                        </>
                    ) : (
                        <p>Loading data...</p>
                    )}
                </div>
            </section>
        </>
    );
};

export default Exoplanets;
