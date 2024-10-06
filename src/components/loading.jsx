import React, { useEffect, useRef } from 'react';
import Style from '../css/loading.module.css';
import { vec3 } from 'gl-matrix';
import backgroundImage from '../../public/bk2.webp';

function Loading() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const flr = Math.floor;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        let halfw = canvas.width / 2,
            halfh = canvas.height / 2,
            step = 2,
            warpZ = 12,
            speed = 1;
        let stampedDate = new Date();

        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        function rnd(num1, num2) {
            return flr(Math.random() * num2 * 2) + num1;
        }

        function getColor() {
            return `hsla(200, 100%, ${rnd(50, 100)}%, 1)`;
        }

        class Star {
            constructor() {
                this.v = vec3.fromValues(rnd(0 - halfw, halfw), rnd(0 - halfh, halfh), rnd(1, warpZ));
                this.x = this.v[0];
                this.y = this.v[1];
                this.z = this.v[2];
                this.color = getColor();
                this.vel = this.calcVel();
            }

            reset() {
                this.v = vec3.fromValues(rnd(0 - halfw, halfw), rnd(0 - halfh, halfh), rnd(1, warpZ));
                this.x = this.v[0];
                this.y = this.v[1];
                this.color = getColor();
                this.vel = this.calcVel();
            }

            calcVel() {
                return vec3.fromValues(0, 0, 0 - speed);
            }

            draw() {
                this.vel = this.calcVel();
                this.v = vec3.add(vec3.create(), this.v, this.vel);
                const x = this.v[0] / this.v[2];
                const y = this.v[1] / this.v[2];
                const x2 = this.v[0] / (this.v[2] + speed * 0.5);
                const y2 = this.v[1] / (this.v[2] + speed * 0.5);

                ctx.strokeStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x2, y2);
                ctx.stroke();

                if (x < 0 - halfw || x > halfw || y < 0 - halfh || y > halfh) {
                    this.reset();
                }
            }
        }

        class Starfield {
            constructor() {
                this.numOfStars = 250;
                this.stars = [];
                this.init();
            }

            init() {
                for (let i = 0; i < this.numOfStars; i++) {
                    this.stars.push(new Star());
                }
            }

            draw() {
                ctx.translate(halfw, halfh);
                for (const star of this.stars) {
                    star.draw();
                }
            }
        }

        const mStarField = new Starfield();

        function draw() {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.fillStyle = 'rgba(0,0,0,0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            mStarField.draw();
            window.requestAnimationFrame(draw);
        }

        draw();

        const handleResize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            halfw = canvas.width / 2;
            halfh = canvas.height / 2;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <section className={Style.spaceShipContainer}>
                <canvas ref={canvasRef} id="canvas" className={Style.canvas}></canvas>
                <img src={backgroundImage} alt="Background" className={Style.backgroundImage} />
            </section>
        </>
    );
}

export default Loading;
