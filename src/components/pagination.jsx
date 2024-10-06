import React from 'react';
import Style from '../css/pagination.module.css';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => { // Componente de paginación

    const pageNumbers = []; // Arreglo para almacenar los números de página
    const totalPages = Math.ceil(totalItems / itemsPerPage); // Calcula el número total de páginas

    const maxPageNumbersToShow = 5; // Determina el rango de páginas a mostrar (ejemplo: 3 anteriores y 3 siguientes)
    let startPage = Math.max(1, currentPage - 3); // Página de inicio
    let endPage = Math.min(totalPages, currentPage + 3); // Página final

    if (endPage - startPage < maxPageNumbersToShow - 1) { // Ajusta el rango si hay menos de 7 páginas a mostrar
        startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) { // Rellena el arreglo con los números de página a mostrar
        pageNumbers.push(i);
    }

    return (
        <nav className={Style.paginationNav}>
            <ul className={Style.pagination}>
                {/* Botón para ir a la primera página */}
                {currentPage > 1 && (
                    <li className={Style.pageItem}>
                        <button onClick={() => paginate(1)} className={Style.pageLink}>
                            First
                        </button>
                    </li>
                )}

                {/* Botón para ir a la página anterior */}
                {currentPage > 1 && (
                    <li className={Style.pageItem}>
                        <button onClick={() => paginate(currentPage - 1)} className={Style.pageLink}>
                            &laquo;
                        </button>
                    </li>
                )}

                {/* Muestra los números de página */}
                {pageNumbers.map(number => (
                    <li key={number} className={`${Style.pageItem}${currentPage === number ? ' active' : ''}`}>
                        <button onClick={() => paginate(number)} className={Style.pageLink}>
                            {number}
                        </button>
                    </li>
                ))}


                {/* Botón para ir a la página siguiente */}
                {currentPage < totalPages && (
                    <li className={Style.pageItem}>
                        <button onClick={() => paginate(currentPage + 1)} className={Style.pageLink}>
                            &raquo;
                        </button>
                    </li>
                )}

                {/* Botón para ir a la última página */}
                {currentPage < totalPages && (
                    <li className={Style.pageItem}>
                        <button onClick={() => paginate(totalPages)} className={Style.pageLink}>
                            Last
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Pagination;
