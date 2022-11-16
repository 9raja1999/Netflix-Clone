import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getShowDetails, getCastofShow } from '../services/tmdb-api';
import providers from '../data/providers';
import ShowCastMembers from '../components/ShowCastMembers';

const DetailsPage = ({ watchList, toggle }) => {
  const [showDetails, setShowDetails] = useState(null);

  const [showCast, setShowCast] = useState(null);
  const { id } = useParams();

  const onWatchList =
    watchList.findIndex((item) => item.id === showDetails?.id) === -1
      ? false
      : true;

  useEffect(() => {
    getShowDetails(id).then((details) => {
      console.log(details)
      setShowDetails(details)
      setShowCast(details.created_by)

    })
  }, [id]);


  useEffect(() => {
    if (showCast !== null) {
      getCastofShow(showDetails.id).then(res => setShowCast(res.cast))
    }
  }, [showDetails])

  // if (showDetails == null && showCast == null) {
  //   return <h1>Loading</h1>
  // }
  return (
    <>
      {showDetails && showCast ? (
        <div className="show-details">
          <img
            src={`https://image.tmdb.org/t/p/original${showDetails.backdrop_path}`}
            alt=""
          />
          <div className="show-details-inner">
            <h1>{showDetails.name}</h1>
            <div className='cast'>
              <p>Cast Members :</p>
              <div
                style={{
                  display : 'flex',
                  justifyContent : 'space-around',
                  alignItems : 'flex-start'
                }}
              >
                {
                  showCast.map((obj, idx) => {
                    return <Link to={{
                      pathname: `/actors?id=${obj.id}`,
                      state: showCast
                    }}><p>{obj.name}</p></Link>
                  })
                }
              </div>
            </div>
            <div className="description">{showDetails.overview}</div>
            {onWatchList ? (
              <button className="remove-to-watchlist">
                - Remove from watch list
              </button>
            ) : (
              <button className="add-to-watchlist">+ Add to watch list</button>
            )}
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default DetailsPage;
