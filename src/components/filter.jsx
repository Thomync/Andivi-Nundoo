import React, { useState, useEffect } from 'react'; // Importa React y hooks useState y useEffect

const Filter = () => {
    const [filter, setFilter] = useState([]); // Estado para almacenar los datos del CSV

    console.log(filter);

    onChangeValue = (e) => {
        console.log(e.target.value);
      }
    
    return (
        <>
            <section className='filter-container'> {/* Contenedor principal de la página */}
                <div className="filter-title-container"> {/* Contenedor del título */}
                    <p>Filtrado</p> {/* Título de la página */}
                </div>
                <div className="data-filter-container"> {/* Contenedor de datos */}
                    {currentData.length > 0 ? ( // Verifica si hay datos para mostrar
                        <div onChange = {this.onChangeValue}>
                            <input type="radio" value="pl_name" name="Type" /> Tipo de estrella
                            <input type="radio" value="discoverymethod" name="Method" /> Método de descubrimiento
                            <input type="radio" value="sy_dist" name="Distance" /> Distancia
                        </div>
                    ) : (
                        <p>Loading...</p> // Mensaje de carga si no hay datos
                    )}
                </div>
            </section>
        </>
    );
}

export default Landing; // Exporta el componente Landing para usarlo en otras partes de la aplicación