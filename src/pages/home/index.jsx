import React from "react";
import { Link, useHistory } from "react-router-dom";
import './style.css'
import AuthContext from './../../provider/AuthProvider'
import axios from "axios";

import NavBar from "../../components/navbar";

const Home = () => {

    const [myTeamData, setMyTeamData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [powerstats, setPowerstats] = React.useState();
    const [averages, setAverages] = React.useState();

    const { isLogged, setIsLogged } = React.useContext(AuthContext);

    const history = useHistory();

    const getPowerstats = (team) => {

        let status = [
            { name: 'intelligence', value: 0 },
            { name: 'strength', value: 0 },
            { name: 'speed', value: 0 },
            { name: 'durability', value: 0 },
            { name: 'power', value: 0 },
            { name: 'combat', value: 0 }
        ];

        let status_two = [
            { name: 'weight', value: 0 },
            { name: 'height', value: 0 },
        ];

        team.map(hero => {
            status[0].value += parseInt(hero.powerstats.intelligence);
            status[1].value += parseInt(hero.powerstats.strength);
            status[2].value += parseInt(hero.powerstats.speed);
            status[3].value += parseInt(hero.powerstats.durability);
            status[4].value += parseInt(hero.powerstats.power);
            status[5].value += parseInt(hero.powerstats.combat);

            status_two[0].value += parseInt(hero.appearance.weight[1]);
            status_two[1].value += parseInt(hero.appearance.height[1]);
        })
        status_two[0].value = status_two[0].value / team.length;
        status_two[1].value = status_two[1].value / team.length;


        setPowerstats(status);
        setAverages(status_two);
        setLoading(false);
    }

    const getMyTeam = () => {
        setLoading(true);
        let heros = [];
        if (localStorage.getItem('team') !== null) {
            heros = JSON.parse(localStorage.getItem('team'));
        }
        if (localStorage.getItem('team') === null || heros.length === 0) {
            setLoading(false)
            return setMyTeamData(null)
        }
        let myTeam = [];
        heros.forEach(async (hero) => {
            await axios(`https://superheroapi.com/api/1911355292361972/${hero.id}`)
                .then(res => {
                    myTeam.push(res.data);
                    if (myTeam.length === heros.length) {
                        setMyTeamData(myTeam)
                        getPowerstats(myTeam)
                    }
                })
                .catch(err => console.log(err))
        })
    }

    const removeFromMyTeam = (id) => {
        setMyTeamData(undefined)
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
            getMyTeam();
        }
    }

    React.useEffect(() => {
        setIsLogged();
    })
    React.useEffect(() => {
        if (!isLogged) return history.push("/login")
    }, [])

    React.useEffect(() => {
        setLoading(true);
        getMyTeam();
    }, []);

    return (
        <>
            <NavBar />
            <section className="homePage">
                <div className="homePage__container">

                    {loading && 
                            <div className="homePage__loading">
                                <div className="homePage__loading-circle"></div>
                            </div>
                    }

                    {myTeamData === null && !loading &&
                        <div className="homePage__noHeros">
                            <div className="homePage__noHeros-container">
                                <h3 className="homePage__noHeros-container-h3">
                                    You don't have heros in your team
                                </h3>
                                <Link to="/search" className="homePage__noHeros-container-link">
                                    Search
                                </Link>
                            </div>
                        </div>
                    }

                    

                    {myTeamData !== undefined && myTeamData !== null && !loading &&
                        (
                            <div className="homePage__team">
                                <div className="homePage__team-info">
                                    <div className="homePage__team-info-box">
                                        <div className="homePage__team-info-title">
                                            <h2 className="homePage__team-info-title-h2">
                                                Powerstats
                                            </h2>
                                        </div>
                                        <div className="homePage__team-info-progressBar">
                                            {
                                                (powerstats?.sort((a, b) => b.value - a.value).map((power, index) => {
                                                    return (
                                                        <div className="homePage__team-info-progressBar-item" key={index}>
                                                            <span className="homePage__team-info-progressBar-item-name">{power.name}: </span>
                                                            <span className="homePage__team-info-progressBar-item-value">{power.value}</span>
                                                        </div>
                                                    )
                                                }))
                                            }

                                        </div>
                                    </div>
                                    <div className="homePage__team-info-box">
                                        <div className="homePage__team-info-title">
                                            <h2 className="homePage__team-info-title-h2">
                                                Averages
                                            </h2>
                                            <div className="homePage__team-info-progressBar">
                                                {averages &&
                                                    <>
                                                        <div className="homePage__team-info-progressBar-item">
                                                            <span className="homePage__team-info-progressBar-item-name">Weigth: </span>
                                                            <span className="homePage__team-info-progressBar-item-value">{Math.round(averages[0].value*100)/100} kg</span>
                                                        </div>
                                                        <div className="homePage__team-info-progressBar-item">
                                                            <span className="homePage__team-info-progressBar-item-name">Heitgh: </span>
                                                            <span className="homePage__team-info-progressBar-item-value">{Math.round(averages[1].value*100)/100} cm</span>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="homePage__team-heros">
                                    <div className="homePage__team-heros-container">
                                        {myTeamData.map(hero => {
                                            return (
                                                <div className="homePage__superhero" key={hero.id}>
                                                    <div className="homePage__superhero-image">
                                                        <img
                                                            src={hero.image.url}
                                                            className="homePage__superhero-image-img"
                                                            alt="hero img"
                                                        />
                                                    </div>
                                                    <div className="homePage__superhero-name">
                                                        <h3 className="homePage__superhero-name">
                                                            {hero.name}
                                                        </h3>
                                                    </div>
                                                    <div className="homePage__superhero-action">
                                                        <button className="homePage__superhero-action-btn" onClick={() => removeFromMyTeam(hero.id)}>
                                                            Remove From My Team
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    }


                </div>
            </section>
        </>
    )
}

export default Home;
