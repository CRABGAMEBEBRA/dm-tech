import css from './header.module.css'
import logo from './Logo.svg'
import trashCan from './trashCan.svg'


export default function Header(){
    return (
        <header className={css.header}>
            <img className={css.logoImg} src={logo} alt='logo'/>
            <section className={css.middleSection}>
                <p className={css.activeEl}>Товары</p>
                <p className={css.notActiveEl}>Заказы</p>
            </section>
            <div className={css.lastSection}>
                <img className={css.trashCan} src={trashCan} alt='trashCan'/>
                <p className={css.trash}>Корзина (2)</p>              
            </div>
        </header>
    )
}