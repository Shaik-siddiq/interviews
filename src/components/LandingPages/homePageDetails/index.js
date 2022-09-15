import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../headerPage/header';
import { useNavigate } from "react-router";
import './style.css';
import Footer from '../../footerPage/footer';
import Details from './detailsPage';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


export default function DetailsPage() {
    const [user, setUser] = useState('');
    const navigate = useNavigate();
    const myRef = React.createRef();

    React.useEffect(() => {
        window.scrollTo(0, 0);
        localStorage.setItem("isPlaying", null);
    }, [])

    window.setInterval(function () {
        setUser(localStorage.getItem('isPlaying'))
    }, 1000);

    function handleHome() {
        navigate('/');
    }

    return (
        <div ref={myRef}>
            <Grid className="headerContainer">
                {user === 'playing' ?
                    (
                        ""
                    )
                    : (
                        <Header />
                    )

                }
            </Grid>
            <Grid className='datailsContainer'>
                <Grid>
                    <Details />
                </Grid>
            </Grid>
            <Grid className='footerContainer'>
                <Grid >
                    <Footer />
                </Grid>
            </Grid>
        </div>
    );
}