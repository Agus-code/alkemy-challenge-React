import axios from 'axios';
import React from 'react';
import './style.css'
import { useHistory, useLocation } from 'react-router';
import AuthContext from './../../provider/AuthProvider'
import NavBar from './../../components/navbar'

const Superhero = () => {

    const [heroData, setHeroData] = React.useState();

    const history = useHistory();
    const location = useLocation();


    const getHero = async () => {
        await axios(`https://superheroapi.com/api/1911355292361972/${location.pathname.slice(location.pathname.lastIndexOf("/") + 1)}`)
            .then(res => setHeroData(res.data))
            .catch(err => console.log(err))
    }

    const { isLogged, setIsLogged } = React.useContext(AuthContext);

    React.useEffect(() => {
        setIsLogged();
    })
    React.useEffect(() => {
        if (!isLogged) return history.push("/login")
    }, [])

    React.useEffect(() => {
        setHeroData()
        getHero();
    }, [])

    return (
        <>
            <NavBar />
            <section className="heroPage">
                <div className="heroPage__container">
                    {heroData !== undefined
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
                                            Full Name: {heroData.biography['full-name']}
                                        </li>
                                        <li className="heroPage__box-info-data-ul-item">
                                            Aliases: {heroData.biography['aliases'].toString()}
                                        </li>
                                        <li className="heroPage__box-info-data-ul-item">
                                            Occupation: {heroData.work.occupation}
                                        </li>
                                        <li className="heroPage__box-info-data-ul-item">
                                            Weight: {heroData.appearance.weight[1]}
                                        </li>
                                        <li className="heroPage__box-info-data-ul-item">
                                            Height: {heroData.appearance.height[1]}
                                        </li>
                                        <li className="heroPage__box-info-data-ul-item">
                                            Eye Color: {heroData.appearance['eye-color']}
                                        </li>
                                        <li className="heroPage__box-info-data-ul-item">
                                            Hair Color: {heroData.appearance['hair-color']}
                                        </li>
                                    </ul>
                                </div>
                                <div className="heroPage__box-info-actions">
                                    <button className="heroPage__box-info-actions-btn">
                                        Add To My Team
                                    </button>
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