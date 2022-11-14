import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
    const apiLink = 'https://pokeapi.co/api/v2/pokemon/';

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(apiLink+'ditto')
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }

                throw response;
            })
            .then((data) => {
                setData(data);
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
                <span>{data.name}</span>
                <span>{data.stats[0].base_stat}</span>
            </header>

            <main>
                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src={data.sprites.back_default} alt={data.name+' Back view'} className="d-block w-100" />
                        </div>
                        <div class="carousel-item">
                            <img src={data.sprites.front_default} alt={data.name+' Front view'} className="d-block w-100" />
                        </div>
                        <div class="carousel-item">
                            <img src={data.sprites.back_shiny} alt={data.name+' Back shiny view'} className="d-block w-100" />
                        </div>
                        <div class="carousel-item">
                            <img src={data.sprites.front_shiny} alt={data.name+' Front shiny view'} className="d-block w-100" />
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>

                <div className='pokedex--info-section'>
                    <span>weight: {data.weight}</span> <br />
                    <span>Pokedex #: {data.order}</span> <br />
                    <span>Height: {data.height}</span> <br />
                    <span>Base Experience: {data.base_experience}</span>
                </div>
            </main>

            <footer></footer>
        </div>
    );
}

export default App;
