import { useContext } from "react";
import css from "./pageElement.module.css"  ;
import { UserContext } from "../app/app.tsx";
import backArrow from './Shape.svg';
import backX from './cancel.png'
import { Link } from "react-router-dom";

export default function pageElement(post){

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {Stars} = useContext(UserContext);

    return(
        <main>
            <Link to={`/`} className={css.LinkBack}><img className={css.backX} src={backX} width = "40" height = "40" alt='backX'/></Link>
            <div className={css.mainObject}>
                    <img className={css.loadPicture} src={post.picture} width = "374" height = "374" alt={`${post.title}`}/>
                    <div className={css.bigDiv}>
                        <p className={css.pictureTitle}>{post.title}</p>
                        {Stars(post.rating, post.id)}
                        <p className ={css.picturePrice}>{post.price} ₽</p>
                        <button className={css.trashCan}>Добавить в корзину</button>
                        <div className={css.mediumDiv}>
                            <img className={css.backArrow} src={backArrow} width = "17" height = "15" alt='backArrow'/>
                            <p>Условия возврата</p>
                        </div>
                        <p className={css.warning}>Обменять или вернуть товар надлежащего качества можно в течение 14 дней с момента покупки.</p>
                        <p className={css.secondWarning}>Цены в интернет-магазине могут отличаться от розничных магазинов.</p>
                    </div>
            </div>
            <div className={css.descriptionDiv}>
                <p className={css.description}>Описание</p>
                <p className={css.postDescription}>{post.description}</p>
                </div>
        </main>
)   
}