import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-materialize';
import ReactPlayer from 'react-player';
import { VscMute, VscUnmute } from 'react-icons/vsc';
import './Home.css';

export default function Home() {
    const [isMuted, setIsMuted] = useState(false);
    const blogURL = 'https://ygcapi.azurewebsites.net/api/blog';

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getAllBlog = async () => {
            try {
                const response = await axios.get(blogURL);
                setBlogs(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getAllBlog();
    }, []);

    return (
        <div>
            <div className='introPF'>
                <ReactPlayer
                    className='videoIntro'
                    playing={true}
                    loop={true}
                    width='100%'
                    height='100%'
                    volume={1}
                    muted={isMuted}
                    url="https://vimeo.com/12434588"
                />
                {isMuted ? (
                    <VscMute className='btnVolume' onClick={() => setIsMuted((prev) => !prev)} />
                ) : (
                    <VscUnmute className='btnVolume' onClick={() => setIsMuted((prev) => !prev)} />
                )}
                <div className='introBottom'></div>
            </div>
            <hr />
            <div >
                <h3 className='service-title'>SERVICE</h3>
                <div className='service-container'>
                    <div className="card grey darken-4">
                        <div className='card-image'>
                            <img src='service_image_2.jpg' className='service-image' alt='image 1' />
                        </div>
                        <div className="card-content white-text">
                            <span class="card-title">Personal Trainer</span>
                            <p>Workout with a Personal Trainer in a 1-on-1 format, specially designed for your fitness and fitness goals.</p>
                        </div>
                    </div>
                    <div className="card grey darken-4">
                        <div className='card-image'>
                            <img src='service_image_1.jpg' className='service-image' alt='image 2' />
                        </div>
                        <div class="card-content white-text">
                            <span class="card-title">Yoga</span>
                            <p>Many Yoga training programs from basic to advanced such as Inside, Detox, Hatha, bell meditation, etc. will bring you a lot of quality Yoga exercises from domestic and foreign masters.</p>
                        </div>
                    </div>
                    <div className="card grey darken-4">
                        <div className='card-image'>
                            <img src='service_image_3.jpg' className='service-image' alt='image 3' />
                        </div>
                        <div className="card-content white-text">
                            <span className="card-title">Muscle Relaxants</span>
                            <p>Highly specialized master not only helps you recover your body after hours of exercise but also supports therapy for bone and joint problems that you have.</p>
                        </div>
                    </div>
                </div>
            </div>

            <hr />
            <div>
                <h3 className='blogHome_header'>BLOG POSTS MAKE YOU BETTER</h3>
            </div>
            <div className="blogHome_container">
                {blogs?.map((blog) => {
                    return (
                        <Card className='card_background blogHome_card' key={blog.blogId}>
                            <h5 className="blogHome_title">{blog.title}</h5>
                            <p className="blogHome_content">{blog.content}</p>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}