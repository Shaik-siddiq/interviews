import React, { useEffect, useState } from 'react';
import axios from 'axios';
import endpoints from '../../../hoc/config/endpoints';
import { Grid, Typography } from '@material-ui/core';
import './style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slide from '@material-ui/core/Slide';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from "react-router";
import { useParams } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            onClick={onClick}
        >
            <ArrowForwardIosIcon className={className} />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            onClick={onClick}
        >
            <ArrowBackIosNewIcon className={className} />
        </div>
    );
}


export default function WatchHistoryOne() {

    const [dataList, setDataList] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 5000,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: dataList?.length > 2 ? 3: dataList?.length,
                    slidesToScroll: 1,
                    infinite: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    function handleAllData(id) {
        axios.get(`${endpoints.getWatchHistory}?userid=${id}`).then((response) => {
            if (response.status === 200) {
                setDataList(response.data);
            }
        })
    }

    useEffect(() => {
        if (user) {
            handleAllData(user?.Id);
        }
    }, [])

    function handleDetailsPage(id) {
        let videoById = btoa(id);
        navigate(`/details/${videoById}`)
    }

    function handleClearAllHistory() {
        axios.delete(`${endpoints.clearAllWatchHistory}?userid=${user?.Id}`).then((response) => {
            if (response.status === 200) {
                setDataList([]);
            }
        })
    }

    function daysConvertion(apiDate) {
        let date = apiDate.split(' ')[0];
        let date1 = new Date(date);
        let date2 = new Date();
        let difference = date2.getTime() - date1.getTime();
        let days = Math.ceil(difference / (1000 * 3600 * 24));
        return days
    }

    function handleSingleMovieClear(id) {
        axios.delete(`${endpoints.clearSingleWatchHistory}?userid=${user?.Id}&movieid=${id}`).then((response) => {
            if (response.status === 200) {
                handleAllData(user?.Id);
            }
        })

    }


    return (
        <div className='watchHistoryDiv'>
            <div className="iq-main-header d-flex align-items-center justify-content-between">
                <h4 className='main-title'>
                    Watch History
                </h4>
                <a className="iq-view-all" onClick={() => handleClearAllHistory()}>Clear All</a>
            </div>
            <Grid item className="notification-main-grid" container spacing={3}>
                <Grid item className="notification-container" md={12} xs={12}>
                    {dataList.map((data, index) => (
                        <Grid item className="notification-sub-container" md={12} xs={12}
                            key={index + 1}
                        >
                            <Grid
                                item md={3} xs={12}
                                onClick={() => { handleDetailsPage(data?.Id) }}
                            >
                                <img className='highlyRatedMovies' style={{ width: '180px' }} src={data?.MoviePoster ? data?.MoviePoster : `${"/images/logo.png"}`} alt="notificationPoster" />
                            </Grid>
                            <Grid item md={7} xs={12}>
                                <Typography className="notification-text">{data?.MovieName}</Typography>
                            </Grid>
                            <Grid item md={2} xs={12}>
                                <Typography className="notification-days" onClick={() => handleSingleMovieClear(data?.Id)}>clear</Typography>
                            </Grid>
                        </Grid>
                    )
                    ).reverse()
                    }
                </Grid>
            </Grid>
        </div>

    );
}