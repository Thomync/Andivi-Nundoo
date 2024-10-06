import React from 'react'
import NavBar from './NavBar'
import Style from '../css/error.module.css'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <>
            <NavBar />
            <section className={Style.error}>
                <div className={Style.errorContainer}>
                    <h1>Page Not Found</h1>
                    <p>Sorry, the page you are looking for does not exist.</p>
                    <Link to='/' >Go Back Home</Link>
                </div>
            </section>
        </>
    )
}

export default Error