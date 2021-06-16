import axios from 'axios';
import React from 'react';
import './style.css'
import { useHistory, useLocation } from 'react-router';
import AuthContext from './../../provider/AuthProvider'
import NavBar from './../../components/navbar'

const Superhero = () => {

    const [heroData, setHeroData] = React.useState();
    const [heroInTeam, setHeroInTeam] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const history = useHistory();
    const location = useLocation();

    const { isLogged, setIsLogged } = React.useContext(AuthContext);

    const getHero = async () => {
        setLoading(true);
        await axios(`https://superheroapi.com/api/1911355292361972/${location.pathname.slice(location.pathname.lastIndexOf("/") + 1)}`)
            .then(res => setHeroData(res.data))
            .then(() => {
                let heros = [];
                if (localStorage.getItem('team') !== null) {
                    heros = JSON.parse(localStorage.getItem('team'));
                    heros.forEach(hero => {
                        if (hero.id === location.pathname.slice(location.pathname.lastIndexOf("/") + 1)) setHeroInTeam(true)
                    })
                }
                return setLoading(false)
            })
            .catch(err => console.log(err))
    }

    const addToMyTeam = () => {
        let heros = [];
        let herosGood = 0;
        let herosBad = 0;
        let herosNeutral = 0;
        
        const heroInfo = {
            id : heroData.id,
            role : heroData.biography["alignment"]
        }

        if (localStorage.getItem("team") !== null) {
            heros = JSON.parse(localStorage.getItem("team"))
        }
        else {
            heros = [];
        }
        if (heroInfo.role === "good" && herosGood === 3) return alert("You can't have more than 3 good heros")
        if (heroInfo.role === "bad" && herosBad === 3) return alert("You can't have more than 3 bad heros")
        if (heroInfo.role === "neutral" && herosNeutral === 3) return alert("You can't have more than 3 neutral heros")
        if (heros.length === 6) {
            return alert("You cant't have more than 6 heros in your team");
        }
        heros.push(heroInfo);
        localStorage.setItem("team", JSON.stringify(heros));
        setHeroInTeam(true);
    }

    const removeFromMyTean = () => {
        let heros  = [];
        if (localStorage.getItem("team") !== null){
            heros = JSON.parse(localStorage.getItem("team"))
            let i;
            for(i=0; i<heros.length; i++){
                if(heros[i].id === heroData.id){
                    heros.splice(i,1);
                }
            }
            localStorage.setItem("team",JSON.stringify(heros));
            setHeroInTeam(false)
        }
    }


    React.useEffect(() => {
        setIsLogged();
    });
    React.useEffect(() => {
        if (!isLogged) return history.push("/login")
    }, []);

    React.useEffect(() => {
        setHeroData()
        getHero();
    }, []);

    return (
        <>
            <NavBar />
            <section className="heroPage">
                <div className="heroPage__container">
                    {heroData !== undefined && !loading
                        ?
                        <div className="heroPage__box">
                            <div className="heroPage__box-image">
                                <img
                                    src={heroData.image.url}
                                    className="heroPage__box-image-img"
                                />
                            </div>
                            <div className="heroPage__box-info">
                                <div className="heroPage__box-info-title">
                                    <h3 className="heroPage__box-info-title-h3">
                                        {heroData.name}
                                    </h3>
                                </div>
                                <div className="heroPage__box-info-data">
                                    <ul className="heroPage__box-info-data-ul">
                                        <li className="heroPage__box-info-data-ul-item">
                                            <span className="heroPage__box-info-data-ul-item-bold">Full Name:</span> {heroData.biography['full-name']}
                                        </li>
                                        <li className="heroPage__box-info-data-ul-item">
                                            <span className="heroPage__box-info-data-ul-item-bold">Aliases:</span> {heroData.biography['aliases'].toString().replace(/,/g, ", ")}
                                        </li>
                                        <li className="heroPage__box-info-data-ul-item">
                                            <span className="heroPage__box-info-data-ul-item-bold">Occupation:</span> {heroData.work.occupation}
                                        </li>
                                        <li className="heroPage__box-info-data-ul-item">
                                            <span className="heroPage__box-info-data-ul-item-bold">Weight:</span> {heroData.appearance.weight[1]}
                                        </li>
                                        <li className="heroPage__box-info-data-ul-item">
                                            <span className="heroPage__box-info-data-ul-item-bold">Height:</span> {heroData.appearance.height[1]}
                                        </li>
                                        <li className="heroPage__box-info-data-ul-item">
                                            <span className="heroPage__box-info-data-ul-item-bold">Eye Color:</span> {heroData.appearance['eye-color']}
                                        </li>
                                        <li className="heroPage__box-info-data-ul-item">
                                            <span className="heroPage__box-info-data-ul-item-bold">Hair Color:</span> {heroData.appearance['hair-color']}
                                        </li>
                                    </ul>
                                </div>
                                <div className="heroPage__box-info-actions">
                                    {heroInTeam
                                        ?
                                        <button className="heroPage__box-info-actions-btn remove__btn" onClick={removeFromMyTean}>
                                            Remove From My Team
                                        </button>
                                        :
                                        <button className="heroPage__box-info-actions-btn add__btn" onClick={addToMyTeam}>
                                            Add To My Team
                                        </button>
                                    }
                                </div>

                            </div>
                        </div>
                        :
                        <div className="heroPage__loading">
                            <div className="heroPage__loading-circle"></div>
                        </div>
                    }
                </div>
            </section>
        </>
    )
}

export default Superhero;