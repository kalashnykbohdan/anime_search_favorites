import React, { useState, useEffect, useContext} from 'react';
import Context from './../context/context';
import { HeartOutlined, HeartFilled, CloseOutlined } from '@ant-design/icons';

import feachRequest from'../FetchRequest'
import { useDebounce } from 'use-debounce';

import style from './AnimeList.module.scss';
import arrow from './../../img/arow.svg';

export default function AnimeList() {

    const [query, setQuery] = useState('');
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, sethasNextPage] = useState(false);

    const [error, setError] = useState(null);
    const[isLoadingSearch, setIsLoadingSearch] = useState(false);
    const[isLoadingMore, setIsLoadingMore] = useState(false);

    const {favoritList, addItemFavorit, filterItemFavorit, remuveItemFavorit} = useContext(Context);
    const [search] = useDebounce(query, 500);

    const handleClearSearch = () =>{
        setQuery('');
    }

    const handleAddFavorit = (item) => {
        if(filterItemFavorit(item.id)){
            remuveItemFavorit(item.id);
        }else{
            addItemFavorit(item)
        }      
    }

    const onLoadMore = () => {
        feachRequest.fetchAnimeList(query, currentPage)
            .then(data => {
                setList(prevList => [...list, ...data.media]);
                setCurrentPage(currentPage + 1);
            }
        );
        
    }

    useEffect(() => {
        if(search){
            setIsLoadingSearch(true);
            feachRequest.fetchAnimeList(search, currentPage)
                .then(data => {
                    setList(data.media);
                    setCurrentPage(currentPage + 1)
                    console.log(data.media);
                    }
                )
                .catch(error => setError(error.message))
                .finally(() => setIsLoadingSearch(false));
        }
        else{
            setList(''); 
            setCurrentPage(1);
        }
    }, [search])

    useEffect(() => {
        setIsLoadingMore(true)
        feachRequest.fetchAnimeList(query, currentPage)
            .then(data => {
                sethasNextPage(data.pageInfo.hasNextPage);
            }
        )
        .catch(error => setError(error.message))
        .finally(() => setIsLoadingMore(false));
    },[currentPage])




    return(
        <section>
            <div className={style.search}>
                <h1>Список аниме</h1>
                <form>
                    <input type="text" value={query} placeholder="Text here" onChange={(e) => setQuery(e.currentTarget.value)}></input>
                    {query !== '' && <button type='button' onClick={handleClearSearch}><CloseOutlined className={style.search__btn_clear}/></button>}
                </form>
            </div>
            <div className='container'>
                {isLoadingSearch ? <div className="spinner"></div> : 
                <>
                    {error && <h1>Erorr {error}</h1>}
                    {list.length !== 0 && !error && <ul className={style.anime__list}>
                        {list.map(item => (
                                <li key={item.id} className={style.anime__item}>
                                    <img src={require("./../../img/animefavorite.png")} className={style.anime__img} alt="img_item"/>
                                    <div className={style.anime__name}>
                                        <p className={style.anime__name_romaji}>{item.title.romaji}</p>
                                        <p className={style.anime__name_native}>{item.title.native}</p>
                                    </div>

                                    <button type='button' className={style.anime__favorit_btn} onClick={() => handleAddFavorit(item)}>
                                        {favoritList.length !== 0 && filterItemFavorit(item.id)
                                        ? <HeartFilled className={style.heart_complete}/> : <HeartOutlined className={style.heart_void}/>} 
                                    </button>
                                </li>
                            ))}  
                    </ul>}
                    {isLoadingMore ? <div className="spinner"></div> : <>
                        {hasNextPage && <button type='button' className={style.anime__pagination}  onClick={onLoadMore}><span>More</span> <img src={arrow} alt="arrow"/></button>}
                    </>}
                </>}
            </div>
            
        </section>
         
    )
};

