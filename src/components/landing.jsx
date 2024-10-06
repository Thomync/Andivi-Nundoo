import React from 'react'
import NavBar from './NavBar'
import Style from '../css/landing.module.css'

const Landing = () => {
    return (
        <>
            <NavBar />
            <section className={Style.landingContainer}>
                <h1>ANDIVI NUNDOO</h1>
                <h2>About the project</h2>
                    <div>
                        <p>
                            We are an interdisciplinary group of mechatronics, computing, and physics engineers, united by our passion for what lies beyond our planet and for sharing this knowledge with others. This passion is what led us to create this project, and our goal is to inspire people of all ages and educational backgrounds—even from elementary school—to explore exoplanets and unleash their creativity.
                        </p> 
                        <p>
                            At Mixtecnautas, we have developed an interactive platform where anyone can virtually travel to any discovered exoplanet, gaze at its starry sky, and draw their own constellations. You can also share the stories behind your constellations and dive into the fascinating properties of each exoplanet.
                            Our mission is to build a community where people from all walks of life can learn from and be inspired by each other.
                        </p>
                        <p>
                            Everyone brings unique perspectives and imagination, creating different constellations and stories that enrich the entire community. Together, we can explore the wonders of outer space and share the limitless creativity of our minds.
                        </p>
                    </div>
            </section>
        </>
    )
}

export default Landing
