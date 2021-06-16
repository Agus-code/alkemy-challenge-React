import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'

const SuperheroCard = ({ image, name, id, role }) => {

    const [heroInTeam, setHeroInTeam] = React.useState(false);
    // const [error, setError] = React.useState("");

    const addToTeam = () => {
        let heros = [];
        let herosGood = 0;
        let herosBad = 0;
        let herosNeutral = 0;
        const heroData = {
            id,
            role
        }

        if (localStorage.getItem("team") !== null) {
            heros = JSON.parse(localStorage.getItem("team"))
            heros.forEach(hero => {
                if (hero.role === "good") {
                    herosGood++;
                }
                if (hero.role === "bad") {
                    herosBad++;
                }
                if (hero.role === "neutral") {
                    herosNeutral++;
                }
            })
        }
        else {
            heros = [];
        }
        if (role === "good" && herosGood === 3) return alert("You can't have more than 3 good heros")
        if (role === "bad" && herosBad === 3) return alert("You can't have more than 3 bad heros")
        if (role === "neutral" && herosNeutral === 3) return alert("You can't have more than 3 neutral heros")
        if (heros.length === 6) {
            return alert("You cant't have more than 6 heros in your team");
        }
        heros.push(heroData);
        localStorage.setItem("team", JSON.stringify(heros));
        setHeroInTeam(true);
    }

    const removefromTeam = () => {
        let heros = [];
        if (localStorage.getItem("team") !== null) {
            heros = JSON.parse(localStorage.getItem("team"))
            let i;
            for (i = 0; i < heros.length; i++) {
                if (heros[i].id === id) {
                    heros.splice(i, 1);
                }
            }
            localStorage.setItem("team", JSON.stringify(heros));
            setHeroInTeam(false)
        }
    }

    React.useEffect(() => {
        let team = [];
        if (localStorage.getItem("team") !== null) {
            team = JSON.parse(localStorage.getItem("team"))
            team.forEach(hero => {
                if (hero.id === id) return setHeroInTeam(true)
            });
        }
    }, [])

    return (
        <>
            <div className="card">
                <div className="card__container">
                    <div className="card__container-image">
                        <img
                            src={image}
                            alt={`image of ${name}`}
                            className="card__container-image-img"
                            title={name}
                        />
                    </div>
                    <div className="card__container-name">
                        <h3 className="card__container-name-h3">
                            {name}
                        </h3>
                    </div>
                    <div className="card__container-actions">
                        <div className="card__container-actions-item">
                            <Link to={`/hero/${id}`} className="card__container-actions-item-btn infobtn">
                                See Hero
                            </Link>
                        </div>
                        <div className="card__container-actions-item">
                            {heroInTeam
                                ?
                                <button className="card__container-actions-item-btn removebtn" onClick={removefromTeam}>
                                    Remove From My Team
                                </button>
                                :
                                <button className="card__container-actions-item-btn addbtn" onClick={addToTeam}>
                                    Add To My Team
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SuperheroCard;