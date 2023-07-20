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
            <div className="blog_container">
                {blogs?.map((blog) => {
                    return (
                        <Card className="card_background blog_card" key={blog.blogId}>
                            <h4 className="blog_title">{blog.title}</h4>
                            <p className="blog_content">{blog.content}</p>
                        </Card>
                    );
                })}
            </div>
        </Section>
    )
}
