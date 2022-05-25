import React, { useContext } from 'react';
import Context from '../context/context';

import { CloseOutlined } from '@ant-design/icons';
import style from './AnimeFavorite.module.scss'


export default function AnimeFavorite() {

    const { favoritList, remuveItemFavorit} = useContext( Context )
    
    return (
        <>
            {favoritList.length !== 0 &&<section>
                <h1>Любимое аниме</h1>
                <div className='container'>
                    
                        <ul className={style.favorite__list}>
                            {favoritList.map(item => (
                                <li  className={style.favorite__item} key={item.id}>
                                    <img src={require("./../../img/animefavorite.png")} className={style.favorite__img} alt="img_item"/>
                                    <div className={style.favorite__content}>
                                        <p className={style.favorite__name_romaji}>{item.title.romaji}</p>
                                        <p className={style.favorite__name_native}>{item.title.native}</p>
                                        <button type='button' onClick={() => remuveItemFavorit(item.id)} className={style.favorite__btn}><CloseOutlined className={style.favorite__btn_close}/></button>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            </section>}
        </>
    )
};
