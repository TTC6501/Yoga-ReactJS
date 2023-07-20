import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Section } from 'react-materialize';
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
            <div class="Service_place">
                <h2>SERVICE</h2>
            </div>
            <div className="image-container">
                <img src="https://oms.hotdeal.vn/images/editors/sources/000357570457/357570-the-tap-yoga-Prince-Yoga-Center-body-5.jpg" alt="Image 1" />
                <img src="https://hdfitness.vn/wp-content/uploads/2023/05/kinh-nghiem-lua-chon-do-tap-yoga-6-min-1024x683.jpg" alt="Image 2" />
                <img src="https://cdn.batdongsan.com.vi/gpictures/500x250/7295/MnxBRjFRaXBORHBQeXNFc3R0YkhWTE1WV2RiYmZGQ1Jyd25lU0RfS1NvdkxNbA.jpg" alt="Image 3" />
            </div>
            <div class="Blog_place">
                <h2>BLOG</h2>
            </div>
            <div className="blog-container">
                {blogs?.map((blog) => {
                    return (
                        <Card className="blog-card" key={blog.blogId}>
                            <h5 className="blog-title">{blog.title}</h5>
                            <p className="blog-content">{blog.content}</p>
                        </Card>
                    );
                })}
            </div>
            {/* <div className="customer-reviews">
                <h1>EVALUATE</h1>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <p className="card-subtitle">- John Doe</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-text">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                                <p className="card-subtitle">- Jane Smith</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <p className="card-subtitle">- John Doe</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-text">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                                <p className="card-subtitle">- Jane Smith</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { Card, Section } from 'react-materialize';
// import ReactPlayer from 'react-player';
// import { VscMute, VscUnmute } from 'react-icons/vsc';
// import './Home.css'

// export default function Home() {

//     const blogURL = 'https://ygcapi.azurewebsites.net/api/blog';

//     const [blogs, setBlogs] = useState([]);

//     useEffect(() => {
//         const getAllBlog = async () => {
//             try {
//                 const response = await axios.get(blogURL)
//                 setBlogs(response.data);
//             } catch (error) {
//                 console.log(error);
//             }

//         }

//         getAllBlog();
//     }, [])

//     return (
//         <Section>
//             {
//                 blogs?.map((blog) => {
//                     return (
//                         <Card key={blog.blogId}>
//                             <h5>{blog.title}</h5>
//                             <p>{blog.content}</p>
//                             <p>{blog.creator.phone}</p>
//                             <p>{blog.creator.email}</p>
//                             <p>{blog.creator.fullName}</p>
//                             <p>{blog.creator.address}</p>
//                             <p>{blog.creator.dateOfBirth}</p>
//                             <p>{blog.creator.status}</p>
//                         </Card>

//                     )
//                 })
//             }
//         </Section>

//     )
// }
