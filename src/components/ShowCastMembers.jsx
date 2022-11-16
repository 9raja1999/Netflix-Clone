import React from 'react';
import { Link } from 'react-router-dom';

function ShowCastMembers({ castMembers }) {
    return (
        <>
            {
                castMembers.map((item, index) => {
                    return (
                        // <Link to=''>
                            <p>{item.name}</p>
                        // </Link>
                    )
                })
            }
        </>
    )
}

export default ShowCastMembers