import { useState } from 'react'
import blogService from '../services/blogs.js'
const Blog = ({blog, handleLikes, handleDel}) =>{
    const [showAll, setShowAll] = useState(false)
    const partialShow = (
        <div>
            <p>Title: {blog.title} <span>  </span>
            <button onClick={()=>setShowAll(true)}>Show more info </button>
            </p>
            <p>Author: {blog.author}</p>
        </div>
    )
    const showAllInfo = (
        <div>
            <p>Title: {blog.title} <span>  </span>
                <button onClick={()=>setShowAll(false)}>Show less info </button>
            </p>
            <p>Author: {blog.author}</p>
            <p>URL: {blog.url}</p> 
            <p>Likes: {blog.likes} <span>  </span>
                <button onClick={handleLikes}>like</button>
            </p>
            <button onClick={handleDel}>Delete post</button>
        </div>
    )
    return(
        <div>
        {showAll ? showAllInfo : partialShow}
        </div>  
)}

export default Blog
