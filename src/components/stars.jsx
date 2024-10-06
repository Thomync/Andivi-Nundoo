import React, { useState, useRef, useCallback, useEffect } from 'react';
import { auth } from '../../firebase';
import NavBar from './NavBar';
import axios from 'axios';
import { ref, uploadString } from "firebase/storage";
import { storage } from "../../firebase";
import Loading from './loading';
import Swal from 'sweetalert2';
import Me from './me';
import Style from '../css/stars.module.css';
import { pass } from 'three/webgpu';

const Stars = () => {
    const [starMap, setStarMap] = useState(null);
    const [loading, setLoading] = useState(false);
    const [planetName, setPlanetName] = useState(' ');
    const [isCleared, setIsCleared] = useState(false);
    const [points, setPoints] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentMousePos, setCurrentMousePos] = useState(null);
    const canvasRef = useRef(null);
    const [userId, setUserId] = useState(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid); // Save userId on login
            } else {
                setUserId(null); // Clear userId if no user is authenticated
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const writePlanetName = () => {
            Swal.fire("Welcome to the Stars section! I´ll show you a little demo. Enjoy!")
                .then(() => {
                    const planetName = " Kepler-20 b";
                    let index = 0;
                    setPlanetName('');
                    const interval = setInterval(() => {
                        if (index < planetName.length) {
                            if (planetName[index] === 'b') {
                                clearInterval(interval); // Stop the interval if 'b' is found
                                getStarMap(); // Call getStarMap directly
                                
                            }
                            setPlanetName(prev => prev + planetName[index]);
                            index++;
                        } else {
                            clearInterval(interval);
                            getStarMap(); // Call the function if writing is complete
                        }
                    }, 500);
                });
        };
        writePlanetName();
    }, []);    
    
    // To store constellations
    const [constellations, setConstellations] = useState([]);

    const getStarMap = async () => {

        setLoading(true); // Start loading state
        // Wait 1 second before making the request
        const loadingTimeout = setTimeout(async () => {
            try {
                const encodedPlanetName = encodeURIComponent(planetName.trim());
                const url = `/api/mapa_estelar?nombre_planeta=${encodedPlanetName}`;

                const response = await axios.get(url, { responseType: 'blob' });
                if (response.status === 200) {
                    const imageUrl = URL.createObjectURL(response.data);
                    setStarMap(imageUrl);
                    setIsCleared(false);
                    setPoints([]);
                } else {
                    alert("Error: " + response.statusText);
                }
            } catch (error) {
                console.error('Error getting the star map:', error);
                Swal.fire("Error getting the star map. Please try again.");
            } finally {
                clearTimeout(loadingTimeout); // Clear timeout if request is successful or failed
                setLoading(false); // End loading state
                document.getElementById("getStarMap").click();
            }
        }, 300);
    };

    const clearScreen = () => {
        setIsCleared(true);
        setPoints([]);
        setPlanetName('');
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleCanvasMouseDown = useCallback((event) => {
        if (isCleared) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setPoints((prevPoints) => {
            const newPoints = [...prevPoints, { x, y }];
            drawLines(newPoints, null); // Draw line immediately
            return newPoints;
        });
        setIsDrawing(true); // Start drawing
    }, [isCleared]);

    const handleCanvasMouseMove = (event) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setCurrentMousePos({ x, y });
        drawLines(points, { x, y }); // Draw line to new mouse position
    };

    const handleCanvasMouseUp = () => {
        setIsDrawing(false);
        setCurrentMousePos(null);
        drawLines(points, null); // Draw final lines on mouse up

        // Save constellation in state
        if (planetName && points.length > 0) {
            setConstellations((prev) => [...prev, { name: planetName, points: points }]);
        }
    };

    const drawLines = (newPoints, mousePos) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw star map
        if (imageRef.current) {
            ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
        }

        drawConstellation(newPoints, ctx, mousePos); // Draw constellation
        if (planetName) {
            ctx.font = '20px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'right';
            ctx.fillText(planetName, canvas.width - 10, canvas.height - 10); // Planet name
        }
    };

    const drawConstellation = (newPoints, ctx, mousePos) => {
        if (newPoints.length > 0) {
            ctx.beginPath();
            ctx.moveTo(newPoints[0].x, newPoints[0].y);
            for (let i = 1; i < newPoints.length; i++) {
                ctx.lineTo(newPoints[i].x, newPoints[i].y);
            }
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw line to current mouse position
            if (mousePos) {
                ctx.lineTo(mousePos.x, mousePos.y);
                ctx.stroke();
            }

            // Close path if first and last points are equal
            if (newPoints.length > 2 && newPoints[0].x === newPoints[newPoints.length - 1].x && newPoints[0].y === newPoints[newPoints.length - 1].y) {
                ctx.closePath();
                ctx.stroke();
            }
        }
    };

    const saveImage = async (userId) => { // Add userId parameter
        const canvas = canvasRef.current;
        const imageURL = canvas.toDataURL('image/png');

        // Save to computer
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = `${planetName.trim()}.png`; // File name
        link.click();

        // Save to Firebase Storage
        try {
            const storageRef = ref(storage, `star_maps/${userId}/${planetName.trim()}.png`); // Path to save image per user
            await uploadString(storageRef, imageURL, 'data_url'); // Upload image
            console.log('Image uploaded to Firebase Storage successfully.');
        } catch (error) {
            console.error('Error uploading image to Firebase Storage:', error);
        }
    };

    const handleImageLoad = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = starMap;
        image.onload = () => {
            imageRef.current = image;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
    };

    return (
        <div className={Style.container}>
            <NavBar />
            <h1 className={Style.title}>Draw your own Constellation!</h1>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div>
                        <Me userId={userId} />
                        <input
                            className={Style.searching}
                            type="text"
                            value={planetName}
                            onChange={(e) => setPlanetName(e.target.value)}
                            placeholder="Planet Name"
                        />
                        <button id="getStarMap" onClick={getStarMap}>Get Star Map</button>
                        <button onClick={clearScreen}>Clear</button>
                        <button onClick={() => saveImage(userId)}>Save Image</button>
                    </div>
                    <canvas
                        ref={canvasRef}
                        width={800}
                        height={600}
                        onMouseDown={handleCanvasMouseDown}
                        onMouseMove={handleCanvasMouseMove}
                        onMouseUp={handleCanvasMouseUp}
                        className={Style.can}
                    />
                    {starMap && (
                        <img
                            src={starMap}
                            alt="Star Map"
                            style={{ display: 'none' }}
                            onLoad={handleImageLoad}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default Stars;
