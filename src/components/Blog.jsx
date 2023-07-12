import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Section } from 'react-materialize'

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
            {
                blogs?.map((blog) => {
                    return (
                        <Card key={blog.blogId}>
                            <h5>{blog.title}</h5>
                            <p>{blog.content}</p>
                            <p>{blog.creator.phone}</p>
                            <p>{blog.creator.email}</p>
                            <p>{blog.creator.fullName}</p>
                            <p>{blog.creator.address}</p>
                            <p>{blog.creator.dateOfBirth}</p>
                            <p>{blog.creator.status}</p>
                        </Card>
                    )
                })
            }
        </Section>
    )
}
