import React from 'react';
import { useHistory } from 'react-router';
import './style.css';
import AuthContext from './../../provider/AuthProvider'
import NavBar from '../../components/navbar';
import axios from 'axios';
import SuperheroCard from '../../components/superheroCard';

const Search = () => {

    const [searchTyped, setSearchTyped] = React.useState("");
    const [typedError, setTypedError] = React.useState("");
    const [cardsData, setCardsData] = React.useState();
    const [loading, setLoading] = React.useState(false);

    const history = useHistory();
    const { isLogged, setIsLogged } = React.useContext(AuthContext);

    const findCards = async () => {
        setCardsData(undefined)
        setTypedError("")
        setLoading(true);

        if (searchTyped.length === 0) {
            setLoading(false);
            return setTypedError("bad name search request")
        }

        const chars = /^[-_ a-zA-Z0-9]+$/;
        if (!chars.test(searchTyped)) {
            setLoading(false);
            return setTypedError("invalid characters")
        }

        await axios(`https://superheroapi.com/api/1911355292361972/search/${searchTyped}`)
            .then(res => {
                setLoading(false)
                if(res.data.error === "character with given name not found") {
                    return setCardsData(null)
                }
                return setCardsData(res.data.results)
            })
            .catch(err => console.log(err))
    }

    React.useEffect(() => {
        setIsLogged();
    })
    React.useEffect(() => {
        if (!isLogged) return history.push("/login")
    }, [])

    return (
        <>
            <NavBar />
            <section className="search">
                <div className="search__container">
                    <article className="search__article">
                        <div className="search__article-box">
                            <input
                                type="text"
                                placeholder="Search here..."
                                className="search__article-box-input"
                                value={searchTyped}
                                onChange={e => setSearchTyped(e.target.value)}
                            />
                            <button className="search__article-box-btn" onClick={findCards}>
                                Search
                            </button>
                        </div>
                        {typedError !== "" &&
                            <div className="search__article-err">
                                <p className="search__article-err-p">{typedError}</p>
                            </div>
                        }
                    </article>
                    <article className="search__article">
                        <div className="search__article-cards">
                            {cardsData === null && 
                                <h4 className="search__article-cards-noOne">
                                    Characters with given name not found
                                </h4>
                            }
                            {cardsData === undefined && cardsData !== null && loading
                                ?
                                <div className="search__article-cards-loading">
                                    <div className="search__article-cards-loading-circle"></div>
                                </div>
                                :
                                <div className="search__article-cards-container">
                                    {cardsData?.map((hero,index)=>{
                                        
                                        return (
                                            <>  
                                                <SuperheroCard 
                                                    key={index}
                                                    image={hero.image.url}
                                                    name={hero.name}
                                                    id={hero.id} 
                                                    role={hero.biography["alignment"]}
                                                />
                                            </>
                                        )
                                    })}
                                </div>
                            }
                            
                        </div>
                    </article>
                </div>
            </section>
        </>
    )
}

export default Search;