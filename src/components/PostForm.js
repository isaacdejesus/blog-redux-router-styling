import { useState } from 'react'
const PostForm = ({ createPost }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [likes, setLikes] = useState(0)
    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }
    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }
    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }
    const handleLikes = (event) => {
        setLikes(event.target.value)
    }
    const addPost = (event) => {
        event.preventDefault()
        createPost({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            likes: likes
        })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setLikes('')
    }
    return (
        <div>
            <h2>Create new blog post</h2>
            <form onSubmit={addPost}>
                <div>
                    title
                    <input 
                        value={newTitle}
                        onChange={handleTitleChange} 
                    />
                </div>
                <div>
                    author
                    <input 
                        value={newAuthor}
                        onChange={handleAuthorChange} 
                    />
                </div>
                <div>
                    url
                    <input 
                        value={newUrl}
                        onChange={handleUrlChange} 
                    />
                </div>
                <div>
                    likes
                    <input 
                        value={likes}
                        onChange={handleLikes} 
                    />
                </div>
                    <button type="submit">post</button>
            </form>
        </div>
    )
}
export default PostForm
