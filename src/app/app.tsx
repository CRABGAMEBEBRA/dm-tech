import Header from '../header'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';
import fullStar from './Fillness=Full.svg';
import halfStar from './Fillness=Half.svg';
import noneStar from './Fillness=None.svg';
import {round} from 'mathjs';
import Content from '../content';
import Main from '@/main/main';
import css from './app.module.css'
export const UserContext = createContext();

export default function Home() {
  const [posts, setPosts] = useState([]);


  const Stars = (rating: number, id: number)=>{
    // eslint-disable-next-line react/jsx-key
    const fullStars = Array.from({length:5}, (item,index) => {if((rating-index)>0 && (rating-index)<1){return <img className={`star`} src={halfStar} alt="star"/>};if(round(rating)-index>0){return <img className={`star`} src={fullStar} alt="star"/>};if(round(rating)-index<0){return <img className={`star`} src={noneStar} alt="star"/>}})
    return <div className={css.pictureStars}>{fullStars}</div>
}
  
  return (
    <BrowserRouter>
    <UserContext.Provider value={{ posts, setPosts, Stars }}>
        <Header />
        <Content />
    </UserContext.Provider>
    </BrowserRouter>
  );
}
