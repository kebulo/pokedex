import './App.css';
import { useEffect, useState } from 'react';

function App() {
    const apiLink = 'https://pokeapi.co/api/v2/pokemon/';

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(apiLink+'?limit=151&offset=0')
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }

                throw response;
            })
            .then((data) => {
                let all_data = [];
                const results = data.results;
                results.map((item) => { 
                    all_data.push( fetch(`${item.url}`).then(res => res.json()) )
                })

                return Promise.all(all_data);
            })
            .then((response) => {
                setData(response);
            })
            .catch((error) => {
                console.error("Error getting data for Pokedex: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    if (loading) return 'Loading...';
    if (error) return 'Error!';

    return (
        <div className="App">
            <header>
                Pokedex
            </header>

            <main className='container-fluid'>
                {data.map((item) => (
                    <div id={'pokedex--pokemon-'+item.name} className='pokedex--main-container col-sm-6 col-md-4 col-lg-3'>
                        <div>
                            <span className='float-start pokedex--name'>{item.name.toUpperCase()}</span>
                            <span className='float-end'>{item.stats[0].base_stat}</span>
                        </div>
                        <div id={item.name+'carouselExampleControls'} className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={item.sprites.front_default} alt={item.name+' Front view'} />
                                </div>
                                <div className="carousel-item">
                                    <img src={item.sprites.back_default} alt={item.name+' Back view'} />
                                </div>
                                <div className="carousel-item">
                                    <img src={item.sprites.front_shiny} alt={item.name+' Front shiny view'} />
                                </div>
                                <div className="carousel-item">
                                    <img src={item.sprites.back_shiny} alt={item.name+' Back shiny view'} />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target={'#'+item.name+'carouselExampleControls'} data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target={'#'+item.name+'carouselExampleControls'} data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                        <div className='pokedex--info-section'>
                            <span className='float-start'>weight: </span><span className='float-end'>{item.weight}</span> <br />
                            <span className='float-start'>Pokedex #: </span><span className='float-end'>{item.order}</span> <br />
                            <span className='float-start'>Height: </span><span className='float-end'>{item.height}</span> <br />
                            <span className='float-start'>Base Experience: </span><span className='float-end'>{item.base_experience}</span>
                        </div>
                    </div>
                ))}
                
            </main>

            <footer></footer>
        </div>
    );
}

export default App;
