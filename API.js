// src/CricketMatches.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.get('https://g.cricapi.com/api/matches', {
                    params: {
                        apikey: '7c500ba9-b15f-416b-b983-efcc3e855fae'
                    }
                });
                setMatches(response.data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;

    return (
        <div>
            <h1>Upcoming Cricket Matches</h1>
            <ul>
                {matches.map(match => (
                    <li key={match.id}>
                        <img src={match.t1img} alt={match.t1} style={{ width: '50px', marginRight: '10px' }} />
                        {match.t1} vs {match.t2} - {new Date(match.dateTimeGMT).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;