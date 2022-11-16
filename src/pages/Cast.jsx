import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { getShowsByProviderId, getShowsByAllProviders, getShowsByActors, getMoviesOfActor } from '../services/tmdb-api';
import providers from '../data/providers';
import Title from '../components/Title';


function Cast(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [id, setID] = useState(null);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        console.log(searchParams.get("id"));




        getMoviesOfActor(searchParams.get("id"))
            .then(res => {
                console.log(res)
                if (res.hasOwnProperty('results'))
                    setData(res.results)
                else
                    setError(true)
            })
            .catch(err => {
                console.log(err)
            })


        console.log("I am in Cast component")
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])


    // if(data == null){
    //     return <h1>Loading</h1>
    // }
    return (
        <div className='Holder' style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', marginTop: '20%' }}>
            {
                error == false && data.length > 0 ? (
                    data.map((item, idx) => {
                        return <div style={{
                            margin: '5px',
                            width: '25%',
                            height: '50vh',
                            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.backdrop_path})`,
                            backgroundSize: '100% 100%',
                            position : 'relative'
                        }}>
                            <div style={{
                                position : 'absolute',
                                bottom : '1px',
                                width : '100%',
                                backgroundColor : 'rgba(78,76,77,0.8)'
                            }}>
                                <p>Movie : {item.title}</p>
                                <p>Release Date : {item.release_date}</p>
                            </div>
                        </div>
                    })
                ) : (
                    <h1>No Search Results</h1>
                )
            }
        </div>
    )
}

export default Cast



