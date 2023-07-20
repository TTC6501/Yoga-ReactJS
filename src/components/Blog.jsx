import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Section } from 'react-materialize'
import './Blog.css'
export default function Blog() {

    const blogURL = 'https://ygcapi.azurewebsites.net/api/blog';

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getAllBlog = async () => {
            try {
                const response = await axios.get(blogURL)
                setBlogs(response.data);
            } catch (error) {
                console.log(error);
            }

        }

        getAllBlog();
    }, [])

    return (
        <Section>
            <div class="Blog_place center">
                <h2>BLOG POSTS MAKE YOU BETTER</h2>
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
        </Section>
    )
}
