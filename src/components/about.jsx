import React from 'react'
import Style from '../css/about.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import NavBar from './NavBar'

const About = () => {
    return (
        <>
            <NavBar />
            <section className={Style.usContainer}>
                <div className={Style.contributors}>
                    <h2 className={Style.contributorsTitle}>Meet the Team</h2>
                    <div className={Style.contributorsTeam}>
                        <div className={Style.card}>
                            <div className={Style.profilePic}>
                                <img src="https://media.licdn.com/dms/image/v2/D4E03AQHZ2m51srg3Jg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726343759504?e=1732147200&v=beta&t=rXgfqEtMeD968enGrT7ytmWFVE9QLy4mNRBCRpwn4S0" alt="Eng. Ezequiel Martínez" />
                            </div>
                            <div className={Style.bottom}>
                                <div className={Style.content}>
                                    <span className={Style.name}>Eng. Ezequiel Martínez</span>
                                    <span className={Style.aboutMe}>Lorem ipsum dolor sit amet consectetur adipisicinFcls </span>
                                </div>
                                <div className={Style.bottomBottom}>
                                    <div className={Style.socialLinksContainer}>
                                        <a href="https://www.linkedin.com/in/ezequiel-martinez-475088329/" target="_blank" rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={faLinkedin} />
                                            LinkedIn
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={Style.card}>
                            <div className={Style.profilePic}>
                                <img src="https://media.licdn.com/dms/image/v2/D5635AQGzSdPYRHfYzw/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1719443914097?e=1728756000&v=beta&t=w0YCu8-ewz2X61qzVGvBSJBLRSpTvgqNDO1lMVzThJI" alt="Eng. Michelle Suhey" />
                            </div>
                            <div className={Style.bottom}>
                                <div className={Style.content}>
                                    <span className={Style.name}>Eng. Michelle Suhey</span>
                                    <span className={Style.aboutMe}>Lorem ipsum dolor sit amet consectetur adipisicinFcls </span>
                                </div>
                                <div className={Style.bottomBottom}>
                                    <div className={Style.socialLinksContainer}>
                                        <a href="https://www.linkedin.com/in/michelle-suhey-palacios-santos-0408b82a1/" target="_blank" rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={faLinkedin} />
                                            LinkedIn
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={Style.card}>
                            <div className={Style.profilePic}>
                                <img src="https://media.licdn.com/dms/image/v2/D5635AQHlRPc8_oX5Tw/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1721079913993?e=1728756000&v=beta&t=xsclHs6uSX89FGsKN4vcGmM-_Fy9z5DhHrDj3d8MlCA" alt="Eng. Erick Chávez" />
                            </div>
                            <div className={Style.bottom}>
                                <div className={Style.content}>
                                    <span className={Style.name}>Eng. Erick Chávez</span>
                                    <span className={Style.aboutMe}>Lorem ipsum dolor sit amet consectetur adipisicinFcls </span>
                                </div>
                                <div className={Style.bottomBottom}>
                                    <div className={Style.socialLinksContainer}>
                                        <a href="https://www.linkedin.com/in/zevach98/" target="_blank" rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={faLinkedin} />
                                            LinkedIn
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={Style.card}>
                            <div className={Style.profilePic}>
                                <img src="https://media.licdn.com/dms/image/v2/D5603AQHw5Nfwt3UMQw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1722835538623?e=1731542400&v=beta&t=QZrwRzE5PJfkOeAQL0A8NwPXn5RoBmcYgDLNvbKTOZU" alt="Eng. Thomás" />
                            </div>
                            <div className={Style.bottom}>
                                <div className={Style.content}>
                                    <span className={Style.name}>Eng. Tomás</span>
                                    <span className={Style.aboutMe}>Lorem ipsum dolor sit amet consectetur adipisicinFcls </span>
                                </div>
                                <div className={Style.bottomBottom}>
                                    <div className={Style.socialLinksContainer}>
                                        <a href="https://www.linkedin.com/in/tom%C3%A1s-osorio-de-los-%C3%A1ngeles-31743131a/" target="_blank" rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={faLinkedin} />
                                            LinkedIn
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={Style.card}>
                            <div className={Style.profilePic}>
                                <img src="https://media.licdn.com/dms/image/v2/D4D35AQHRx0XOjFOuoQ/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1692131419327?e=1728756000&v=beta&t=qAg0SZ8j3c5uMR5it82v-_tFtexZ5j6auqvgm_sjC2I" alt="Eng. Emma" />
                            </div>
                            <div className={Style.bottom}>
                                <div className={Style.content}>
                                    <span className={Style.name}>Eng. Emma</span>
                                    <span className={Style.aboutMe}>Lorem ipsum dolor sit amet consectetur adipisicinFcls </span>
                                </div>
                                <div className={Style.bottomBottom}>
                                    <div className={Style.socialLinksContainer}>
                                        <a href="https://www.linkedin.com/in/esmeralda-galindo-0917051ba/" target="_blank" rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={faLinkedin} />
                                            LinkedIn
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={Style.card}>
                            <div className={Style.profilePic}>
                                <img src="https://media.licdn.com/dms/image/v2/D5603AQE2irraiw4pcg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1689214948031?e=1730332800&v=beta&t=NytLdT3eAH-mQ0KiFx9toEJXm0-jK0NsNSPtC7sHczo" alt="Omar Cruz" />
                            </div>
                            <div className={Style.bottom}>
                                <div className={Style.content}>
                                    <span className={Style.name}>Developer Omar Cruz</span>
                                    <span className={Style.aboutMe}>Web Developer & Mobile Developer</span>
                                </div>
                                <div className={Style.bottomBottom}>
                                    <div className={Style.socialLinksContainer}>
                                        <a href="https://www.linkedin.com/in/omar-cruzr97/" target="_blank" rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={faLinkedin} />
                                            LinkedIn
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About