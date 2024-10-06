import React from 'react'; // Importa React para poder crear el componente
import { Canvas } from '@react-three/fiber'; // Importa el Canvas de react-three-fiber
import { useGLTF, OrbitControls } from '@react-three/drei'; // Importa el hook useGLTF de drei para cargar el modelo y OrbitControls
import { useLocation } from 'react-router-dom'; // Importa el hook useLocation para acceder a la ubicación actual
import NavBar from './NavBar'; // Importa el componente NavBar
import Style from '../css/planetDetails.module.css'; // Importa los estilos CSS específicos para la página de detalles del planeta

// Mapa que relaciona los nombres de las columnas con descripciones más amigables
const columnNames = {
    pl_name: "Planet Name",
    hostname: "Host Name",
    sy_snum: "Number of Stars",
    sy_pnum: "Number of Planets",
    discoverymethod: "Discovery Method",
    disc_year: "Discovery Year",
    pl_orbper: "Orbital Period [days]",
    pl_rade: "Planet Radius [Earth Radius]",
    st_spectype: "Spectral Type",
    sy_dist: "Distance [pc]",
    sy_gaiamag: "Gaia Magnitude",
};

const PlanetModel = ({ modelPath, radius, position }) => { // Agrega position como prop
    const { scene } = useGLTF(modelPath); // Carga el modelo GLTF

    // Cambia la escala del modelo usando pl_rade
    const scale = radius * 0.00005;

    return <primitive object={scene} scale={[scale, scale, scale]} position={position} dispose={null} />;
};

const PlanetDetails = () => {
    const location = useLocation(); // Obtiene la ubicación actual, donde se almacenan los datos del planeta
    const planet = location.state; // Extrae el objeto del planeta pasado en el estado de la navegación

    // Lista de variables que se quieren mostrar
    const selectedKeys = [
        'pl_name',
        'hostname',
        'sy_snum',
        'sy_pnum',
        'discoverymethod',
        'disc_year',
        'pl_orbper',
        'pl_rade',
        'st_spectype',
        'sy_dist',
        'sy_gaiamag',
    ];

    // Rutas de los modelos GLTF
    const keplerModelPath = '/kepler-22b/scene.gltf';
    const earthModelPath = '/planet_earth/scene.gltf';

    return (
        <>
            <NavBar /> {/* Renderiza la barra de navegación */}
            <section className={Style.planetDetailsSection}> {/* Sección que contiene los detalles del planeta */}
                <button onClick={() => window.history.back()} className={Style.backButton}>Back</button> {/* Botón para volver a la página anterior */}
                <div className={Style.titleContainer}> {/* Contenedor para el título */}
                    <h1>{planet.pl_name} Details</h1> {/* Muestra el nombre del planeta en el título */}
                </div>
                
                <div className={Style.planetDetailsContainer}> {/* Contenedor para los detalles del planeta */}
                    <table> {/* Tabla para mostrar los detalles del planeta */}
                        <tbody>
                            {selectedKeys.map(key => ( // Mapea sobre las claves seleccionadas
                                <tr key={key}> {/* Cada fila tiene una clave única */}
                                    <td>{columnNames[key]}</td> {/* Muestra el nombre de la columna */}
                                    <td>{planet[key] ? planet[key] : 'No Data'}</td> {/* Muestra el valor o "No Data" si el valor es nulo o indefinido */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className={Style.modelContainer}>
                    <Canvas style={{ height: '500px' }}> {/* Ajusta la altura según sea necesario */}
                        <ambientLight /> {/* Luz ambiental para iluminar el modelo */}
                        <pointLight position={[10, 10, 20]} /> {/* Luz puntual para dar más iluminación */}
                        <PlanetModel modelPath={keplerModelPath} radius={2 * planet.pl_rade} position={[-1, 0, -2]} /> {/* Pasa el modelo de Kepler-452b */}
                        <PlanetModel modelPath={earthModelPath} radius={50} position={[1, 0, 0]} /> {/* Pasa el modelo de la Tierra */}
                        <OrbitControls enableZoom={false} /> {/* Agrega controles de órbita para interactuar con los modelos */}
                    </Canvas>
                </div>
            </section>
        </>
    );
}

export default PlanetDetails; // Exporta el componente PlanetDetails para usarlo en otras partes de la aplicación
