import { Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../app/app.tsx';
import Main from '../main';
import pageElement from '../pageElement/pageElement.tsx';



export default function Content(){

    const {posts, Stars} = useContext(UserContext);


    return (
        <Routes>
            <Route path = "/product/3" element = {<p>This task is not existing</p>}/>
            {posts.map(post => (<Route key ={post.id} path = {`/product/${post.id}`} element = {pageElement(post)}/>))}  
            <Route path="*" element={<Main/>}/>
        </Routes>

        
    )

}