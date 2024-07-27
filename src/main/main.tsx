"use client";
import { useContext, useState } from "react";
import css from './main.module.css'
import InfiniteScroll from 'react-infinite-scroller';
import {UserContext} from '../app/app.tsx'
import { Route, Routes, Link } from "react-router-dom";



export default function Main(){
    const [page, setPage] = useState(1);
    const [flag, setFlag] = useState(0);

    const {posts, setPosts, Stars} = useContext(UserContext);


    const loadNewProducts = async () => {
          try {
            const res = await fetch (`https://skillfactory-task.detmir.team/products?search=%D0%9A%D0%BE%D0%BB%D1%8F%D1%81%D0%BA%D0%B0&page=${page}&limit=15&sort=title%3Aasc`,{credentials: "include"});
            const data = await res.json();
      
            setPosts((prevPosts) => {
              const newPosts = data.data.filter((item) => !prevPosts.some((post) => post.id === item.id));
              return [...prevPosts, ...newPosts];
            });
          } catch (err) {
            console.error(err.message);
          } setPage(page => page+1);if(flag==0){setPage(page => page-1);setFlag(1)};
      };
      


        // eslint-disable-next-line react-hooks/exhaustive-deps




        
    return(
        <main className={css.main}>           
                <section className = {css.pictureSection}>
                    {posts.map(post => 
                    // eslint-disable-next-line react/jsx-key
                    <div className={css.pictureDiv} key ={post.id}>
                        <Link to={`/product/${post.id}`} key={post.id} className={css.pictureTitle}><img className={css.loadPicture} src={post.picture} width = "250" height = "250" alt={`${post.title}`}/></Link>
                        <div className={css.pictureTitle}><Link to={`/product/${post.id}`} key={post.id} className={css.pictureTitle}>{post.title}</Link></div>
                        {Stars(post.rating, post.id)}
                        <p className ={css.picturePrice}>{post.price} ₽</p>
                    </div>)}
                </section>
                <InfiniteScroll  pageStart={0} loadMore={() => {loadNewProducts()}} hasMore={true} loader=''>{<h4 className={css.Loading}>Загрузка...</h4>}</InfiniteScroll>
        </main>
        )
}


