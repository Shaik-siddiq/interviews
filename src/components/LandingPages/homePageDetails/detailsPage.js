import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './style.css';
import { Button, Grid } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slide from '@material-ui/core/Slide';
import endpoints from '../../../hoc/config/endpoints';
import Slider from "react-slick";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from 'react-router-dom';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useNavigate } from "react-router";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import OtpInput from "react-otp-input";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});
const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

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



export default function Details() {
    const [dataList, setDataList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [quality360flag, setQuality360flag] = useState(false);
    const [quality480flag, setQuality480flag] = useState(false);
    const [quality720flag, setQuality720flag] = useState(false);
    const [quality1080flag, setQuality1080flag] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [quality, setQuality] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const vidRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [videoTime, setVideoTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [volume, setVolume] = useState(1);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [collectionAdded, setAddToColl] = useState(false);
    const [isTrailer, setIsTrailer] = useState(false);
    const [isMovie, setIsMovie] = useState(false);
    const [categoryA, setCategory] = useState('');
    const [userPro, setUserPro] = useState('');
    const [open, setOpen] = React.useState(false);
    const [register, setRegister] = useState(false);
    const [user, setUser] = useState("");
    const [loginTo, setLoginTo] = useState(false);
    const [errorMessageS, setErrorMessageS] = useState("");
    // const theme = useTheme();
    const [loginError, setLoginError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [mobileNumber, setMobileNumber] = useState("");
    const [mobile, setMobile] = useState("");
    const [loginOtp, setLoginOtp] = useState("");
    const [otp, setOtp] = useState("");
    const [name, setName] = useState("");
    const [checked, setChecked] = useState(false);
    const [iconsVisible, setIconsVisible] = useState(false);

    // const [user, setUser] = useState("");


    let auth = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (auth !== null) {
            window.setInterval(function () {
                setLoginTo(true);
            }, 100);
        }

    }, [auth])

    const handleRegisterClose = () => {
        setRegister(false);
        setLoginError("");
        setErrorMessage("");
        setErrorMessageS("");
    }

    function handleRegisterOtp() {
        const object = {
            PhoneNo: mobile,
            Name: name

        }
        axios.post(`${endpoints.register}`, object).then((response) => {
            if (response.status === 200) {
                // setOtp(response.data[0].message);
            }
            else {
                setLoginError(response.data[0].message);
            }

        }
        )
            .catch((error) => {
                setLoginError("Already Registered");
            })
    }

    const handleMobileNo = (e) => {
        const re = /^[0-9]+$/g;

        if ((e.target.value === '' || re.test(e.target.value)) && (e.target.value.length <= 10)) {
            setMobile(e.target.value)

        } else {
            setIsError("enter valid mobile number");
        }

    }
    const handleMobileNoLogin = (e) => {
        const re = /^[0-9]+$/g;

        if ((e.target.value === '' || re.test(e.target.value)) && (e.target.value.length <= 10)) {
            setMobileNumber(e.target.value)

        }

    }

    const handleClose = () => {
        setOpen(false);
        setLoginError("");
        setErrorMessage("");
    };

    const handleRegisterOpen = () => {
        setOpen(false);
        setRegister(true);
    }

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
                    slidesToShow: dataList?.length > 3 ? 4: dataList?.length,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: dataList?.length > 2 ? 3: dataList?.length,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: dataList?.length > 2 ? 3: dataList?.length,
                    slidesToScroll: 1
                }
            }
        ]
    };


    function handleHome() {
        navigate('/')
    }
    function handleFaq() {
        navigate('/faqs');
    }



    function handleAllData(id) {
        let videoById = atob(id);
        axios.get(`${endpoints.getVideoByid}?id=${videoById}`).then((response) => {
            if (response.status === 200) {
                setDataList(response.data);
                setCategory(response?.data[0]?.Genre);
                hanldeGetCategoryList(response?.data[0]?.Genre);
            }
        })
    }

    function hanldeGetCategoryList(Genre) {
        axios.get(`${endpoints.getByGenere}?name=${Genre}`).then((response) => {
            if (response.status === 200) {
                setCategoryList(response.data);
            }
        })
    }
    function handleDetailsPage(id) {
        let videoById = btoa(id);
        navigate(`/details/${videoById}`)
    }

    function handleViewAll(categoryA) {
        let detailsName = btoa(categoryA);
        navigate(`/viewall-details/${detailsName}`);
    }

    useEffect(() => {
        handleAllData(id);
        getCollevtionId(id);

    }, [])

    function handleQuality() {
        setQuality480flag(true);
        setQuality720flag(false);
        setQuality360flag(false);
        setQuality1080flag(false);
    }
    function handle480Quality() {
        setQuality720flag(true);
        setQuality360flag(false);
        setQuality480flag(false);
        setQuality1080flag(false);
    }

    function handle720Quality() {
        setQuality1080flag(true);
        setQuality360flag(false);
        setQuality480flag(false);
        setQuality720flag(false);

    }
    function handle1080Quality() {
        setQuality360flag(true);
        setQuality480flag(false);
        setQuality720flag(false);
        setQuality1080flag(false);
    }

    function playVideo() {
        vidRef.current.play();
        setIsPlaying(!isPlaying);
    }

    function pauseVideo() {
        vidRef.current.pause();
        setIsPlaying(!isPlaying);
    }

    function farwardVideo() {
        vidRef.current.currentTime = vidRef.current.currentTime + 10;
    }
    function backwardVideo() {
        vidRef.current.currentTime = vidRef.current.currentTime - 10;

    }

    function handleStartOver() {
        if (auth !== null) {
            vidRef.current.currentTime = 0;
        }
    }

    const videoHandler = (control) => {
        if (control === "play") {
            vidRef.current.play();
            setPlaying(true);
            var vid = document.getElementById("video1");
            setVideoTime(vid.duration);
            localStorage.setItem("isPlaying", "playing");
            handleAddMovieHistory(id);

        } else if (control === "pause") {
            vidRef.current.pause();
            setPlaying(false);
            localStorage.setItem("isPlaying", "paused");
        }
    };

    const fastForward = () => {
        vidRef.current.currentTime += 5;
    };

    const revert = () => {
        vidRef.current.currentTime -= 5;
    };

    window.setInterval(function () {
        if (vidRef.current) {
            setCurrentTime(vidRef?.current?.currentTime);
            setProgress((vidRef?.current?.currentTime / videoTime) * 100);
        }
    }, 1000);

    function handleProgressVideo(progress) {
    }

    function scrub(e) {
        var vid = document.getElementById("video1");
        const scrubTime = (e.nativeEvent.offsetX / vid.clientWidth) * vid.duration;
        if (!isNaN(scrubTime)) {
            vidRef.current.currentTime = scrubTime;
        }
    }

    function startMouseDown(e) {
        setIsMouseDown(true);
    }

    function endMouseDown(e) {
        setIsMouseDown(false);
    }

    function handleRangeUpdate(e) {
        const { name, value } = e.target;
        if (name === "volume") {
            setVolume(value);
            vidRef.current.volume = value;
        } else {
            setPlaybackRate(value);
            vidRef.current.playbackRate = value;
        }
        // this.setState({
        //   [name]: value,
        // });
        // Todo: Check how to update state with Immutable JS
        // instead of using refs
        // var vid = document.getElementById("video1");


    }

    function skip(e) {
        const skipValue = e.target.attributes[0].value;
        if (!isNaN(skipValue)) {
            vidRef.video.currentTime += Number(skipValue);
        }
    }

    function handleVolumeDown() {
        setVolume(0);
        vidRef.current.volume = 0;
    }

    function handleVolumeUp() {
        setVolume(1);
        vidRef.current.volume = 1;
    }

    function handleAddMovieHistory(id){
        let videoById = atob(id);
        const data = {
            UserId: auth?.Id,
            MovieId: videoById
        }
        axios.post(`${endpoints.addWatchHistory}`, data).then((response) => {
            if (response.status === 200) {
                // setAddToColl(true);
            }
        })
    }

    function handleAddCollection(id) {
        const data = {
            UserId: auth?.Id,
            MovieId: id
        }
        axios.post(`${endpoints.addFavorite}`, data).then((response) => {
            if (response.status === 200) {
                setAddToColl(true);
            }
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
        setRegister(false);
    };

    function getCollevtionId(id) {
        let movieId = atob(id);
        let userId = auth?.Id;
        axios.get(`${endpoints.getFavoriteById}?userid=${userId}&movieid=${movieId}`).then((response) => {
            if (response.status === 200) {
                if (response?.data === 1) {
                    setAddToColl(true);
                }

            }
        })

    }



    function handleWatchTrailer(id) {
        setIsTrailer(true);
        setIsMovie(false);
        axios.get(`${endpoints.getTrailerById}?id=${id}`).then((response) => {
            if (response.status === 200) {

            }
        })

    }

    function handleWatchMovie() {
        if (auth !== null) {
            setLoginTo(true);
            setIsMovie(true);
            setIsTrailer(false);
            vidRef.current.play();
            setPlaying(true);
            var vid = document.getElementById("video1");
            setVideoTime(vid.duration);
            localStorage.setItem("IsMovie", true);
            setIconsVisible(true);
            localStorage.setItem("isPlaying", "playing");
            window.scrollTo(0, 0);
            handleAddMovieHistory(id);
        }
    }

    function handleLoginOtp() {
        const object = {
            PhoneNo: mobileNumber
        }
        axios.post(`${endpoints.register}`, object).then((response) => {
            if (response.status === 200) {
                // setLoginOtp(response?.data[0]?.message);
                setErrorMessageS("OTP is sent to your register mobile number");
            } else {
                setErrorMessageS('');
                setErrorMessage(response?.data[0]?.message);
            }

        })
            .catch((error) => {
                setErrorMessage("User not found");
            })

    }


    function handleLoginUser() {
        const object = {
            PhoneNo: mobileNumber,
            OTP: loginOtp
        }
        axios.post(`${endpoints.verifyUser}`, object).then((response) => {
            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify(response.data[0]));
                setUser(response.data[0]);
                setMobileNumber("");
                setLoginOtp("");
                setLoginError("");
                setErrorMessage("");
                setOpen(false);
                setRegister(false);
                window.location.reload(false);



            }
        })

    }

    const handleterms = () => {
        navigate("/terms-and-conditions");
    }
    function handleChangeOtp(otp) {
        setOtp(otp);
    }
    const handleChange = (event) => {
        setChecked(!checked);
    };

    function handleSignUp() {
        const object = {
            PhoneNo: mobile,
            OTP: otp
        }
        axios.post(`${endpoints.verifyUser}`, object).then((response) => {
            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify(response.data[0]));
                setUser(response.data[0]);
                setMobile("");
                setName("");
                setOtp("");
                setLoginError("");
                setErrorMessage("");
                setChecked(false);
                setOpen(false);
                setRegister(false);

            }
        })
    }

    function handleLogout() {
        auth = null;
        localStorage.removeItem("user");
        setUser("");
        setUserPro("");
        setLoginOtp("");
        setLoginError("");
        setErrorMessage("");
        window.location.reload(false);
    }

    useEffect(() => {
        if (user) {
            setUserPro(JSON.parse(localStorage.getItem("user")));
        }

    }, [user])

    // useEffect(()=>{
    //     if(user){
    //         setUserPro(JSON.parse(localStorage.getItem("user")));
    //     }

    // },[user])

    useEffect(() => {
        localStorage.removeItem("IsMovie");
    }, [])

    return (
        <div>
            {dataList.map((item, index) =>
                <>
                    <Grid className="player" container spacing={3}>
                        <Grid className="main" item md={12} xs={12}>
                            <Grid className="image-grid" item md={12} xs={12} key={index}>
                                {/* <img src={item?.WebPoster} alt="videoByIdImage" /> */}
                                {quality1080flag ? (
                                    <div className="video-container1">
                                        {loginTo && iconsVisible ?
                                            <div className="controls">
                                                <img
                                                    onClick={revert}
                                                    className="controlsIcon"
                                                    alt=""
                                                    src="/images/player/backward.png"
                                                />
                                                {playing ? (
                                                    <img
                                                        onClick={() => videoHandler("pause")}
                                                        className="controlsIconsmall"
                                                        alt=""
                                                        src="/images/player/pause.png"
                                                    />
                                                ) : (
                                                    <img
                                                        onClick={() => videoHandler("play")}
                                                        className="controlsIconsmall"
                                                        alt=""
                                                        src="/images/player/play.png"
                                                    />
                                                )}
                                                <img
                                                    onClick={fastForward}
                                                    className="controlsIcon"
                                                    alt=""
                                                    src="/images/player/forward.png"
                                                />
                                            </div>
                                            : ""}
                                        <video
                                            ref={vidRef}
                                            className="vedio-palyer video"
                                            poster={item?.WebPoster}
                                            width="100%"
                                            id="video1"
                                        >
                                            <source
                                                src={item?.Quality1080}
                                                type="video/mp4"
                                            ></source>
                                        </video>
                                        {!loginTo ?
                                            <>
                                                <span className='loginWatch' onClick={auth ? "" : () => handleClickOpen()}>
                                                    Login to Watch the Movie
                                                </span>
                                            </>
                                            : ""}
                                        <Button
                                            onClick={() => handle1080Quality()}
                                            className="quality"
                                        >
                                            {'HD'}
                                        </Button>
                                        {/* <div className="controlsContainer">

                                        </div> */}
                                        <div className="timecontrols">
                                            <p className="controlsTime">
                                                {Math.floor(currentTime / (60 * 60)) + ":" + ("0" + Math.floor((currentTime / 60) % 60)).slice(-2) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}
                                            </p>
                                            <div className="time_progressbarContainer"
                                                onClick={() => handleProgressVideo(progress)}
                                            >
                                                <div
                                                    style={{ width: `${progress}%` }}
                                                    className="time_progressBar"

                                                ></div>
                                            </div>
                                            <p className="controlsTime">
                                                {Math.floor(videoTime / (60 * 60)) + ":" + ("0" + Math.floor(videoTime / 60)).slice(-2) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}
                                            </p>
                                        </div>
                                        {volume > 0 ? (
                                            <div className="volume-progress">

                                                <input
                                                    id="player_slider"
                                                    type="range"
                                                    name="volume"
                                                    className="player__slider"
                                                    min="0" max="1" step="0.05"
                                                    value={volume}
                                                    onChange={(e) => handleRangeUpdate(e)}
                                                />
                                                <br />
                                                <VolumeUpIcon
                                                    onClick={handleVolumeDown}
                                                    className="volumeIcons"
                                                />
                                                {/* <input
                                                        type="range"
                                                        name="playbackRate"
                                                        className="player__slider"
                                                        min="0.5" max="2" step="0.1"
                                                        value={playbackRate}
                                                        onChange={(e) => handleRangeUpdate(e)}
                                                    /> */}
                                            </div>
                                        ) : (
                                            <div className="volume-progress">

                                                <input
                                                    id="player_slider"
                                                    type="range"
                                                    name="volume"
                                                    className="player__slider"
                                                    min="0" max="1" step="0.05"
                                                    value={volume}
                                                    onChange={(e) => handleRangeUpdate(e)}
                                                />
                                                <br />
                                                <VolumeOffIcon
                                                    onClick={handleVolumeUp}
                                                    className="volumeIcons"
                                                />

                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    quality720flag ? (
                                        <div className="video-container1">
                                            {loginTo && iconsVisible ?
                                                <div className="controls">
                                                    <img
                                                        onClick={revert}
                                                        className="controlsIcon"
                                                        alt=""
                                                        src="/images/player/backward.png"
                                                    />
                                                    {playing ? (
                                                        <img
                                                            onClick={() => videoHandler("pause")}
                                                            className="controlsIconsmall"
                                                            alt=""
                                                            src="/images/player/pause.png"
                                                        />
                                                    ) : (
                                                        <img
                                                            onClick={() => videoHandler("play")}
                                                            className="controlsIconsmall"
                                                            alt=""
                                                            src="/images/player/play.png"
                                                        />
                                                    )}
                                                    <img
                                                        onClick={fastForward}
                                                        className="controlsIcon"
                                                        alt=""
                                                        src="/images/player/forward.png"
                                                    />
                                                </div>
                                                : ""}
                                            <video
                                                ref={vidRef}
                                                className="vedio-palyer video"
                                                poster={item?.WebPoster}
                                                width="100%"
                                                id="video1"
                                            >
                                                <source
                                                    src={item?.Quality720}
                                                    type="video/mp4"
                                                ></source>
                                            </video>
                                            {!loginTo ?
                                                <>
                                                    <span className='loginWatch' onClick={auth ? "" : () => handleClickOpen()}>
                                                        Login to Watch the Movie
                                                    </span>
                                                </>
                                                : ""}
                                            <Button
                                                onClick={() => handle720Quality()}
                                                className="quality"
                                            >
                                                {'SD'}
                                            </Button>
                                            {/* <div className="controlsContainer">
                                                
                                            </div> */}
                                            <div className="timecontrols">
                                                <p className="controlsTime">
                                                    {Math.floor(currentTime / (60 * 60)) + ":" + ("0" + Math.floor((currentTime / 60) % 60)).slice(-2) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}
                                                </p>
                                                <div className="time_progressbarContainer"
                                                    onClick={() => handleProgressVideo(progress)}
                                                >
                                                    <div
                                                        style={{ width: `${progress}%` }}
                                                        className="time_progressBar"

                                                    ></div>
                                                </div>
                                                <p className="controlsTime">
                                                    {Math.floor(videoTime / (60 * 60)) + ":" + ("0" + Math.floor(videoTime / 60)).slice(-2) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}
                                                </p>
                                            </div>
                                            {volume > 0 ? (
                                                <div className="volume-progress">

                                                    <input
                                                        id="player_slider"
                                                        type="range"
                                                        name="volume"
                                                        className="player__slider"
                                                        min="0" max="1" step="0.05"
                                                        value={volume}
                                                        onChange={(e) => handleRangeUpdate(e)}
                                                    />
                                                    <br />
                                                    <VolumeUpIcon
                                                        onClick={handleVolumeDown}
                                                        className="volumeIcons"
                                                    />
                                                    {/* <input
                                                        type="range"
                                                        name="playbackRate"
                                                        className="player__slider"
                                                        min="0.5" max="2" step="0.1"
                                                        value={playbackRate}
                                                        onChange={(e) => handleRangeUpdate(e)}
                                                    /> */}
                                                </div>
                                            ) : (
                                                <div className="volume-progress">

                                                    <input
                                                        id="player_slider"
                                                        type="range"
                                                        name="volume"
                                                        className="player__slider"
                                                        min="0" max="1" step="0.05"
                                                        value={volume}
                                                        onChange={(e) => handleRangeUpdate(e)}
                                                    />
                                                    <br />
                                                    <VolumeOffIcon
                                                        onClick={handleVolumeUp}
                                                        className="volumeIcons"
                                                    />

                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        quality480flag ?
                                            (
                                                <div className="video-container1">
                                                    {loginTo && iconsVisible ?
                                                        <div className="controls">
                                                            <img
                                                                onClick={revert}
                                                                className="controlsIcon"
                                                                alt=""
                                                                src="/images/player/backward.png"
                                                            />
                                                            {playing ? (
                                                                <img
                                                                    onClick={() => videoHandler("pause")}
                                                                    className="controlsIconsmall"
                                                                    alt=""
                                                                    src="/images/player/pause.png"
                                                                />
                                                            ) : (
                                                                <img
                                                                    onClick={() => videoHandler("play")}
                                                                    className="controlsIconsmall"
                                                                    alt=""
                                                                    src="/images/player/play.png"
                                                                />
                                                            )}
                                                            <img
                                                                onClick={fastForward}
                                                                className="controlsIcon"
                                                                alt=""
                                                                src="/images/player/forward.png"
                                                            />
                                                        </div>
                                                        : ""}
                                                    <video
                                                        ref={vidRef}
                                                        poster={item?.WebPoster}
                                                        width="100%"
                                                        className="vedio-palyer video"
                                                        id="video1"
                                                    ></video>
                                                    <source
                                                        src={item?.Quality480}
                                                        type="video/mp4"
                                                    ></source>
                                                    {!loginTo ?
                                                        <>
                                                            <span className='loginWatch' onClick={auth ? "" : () => handleClickOpen()}>
                                                                Login to Watch the Movie
                                                            </span>
                                                        </>
                                                        : ""}
                                                    <Button
                                                        onClick={() => handle480Quality()}
                                                        className="quality"
                                                    >
                                                        {'SUB'}
                                                    </Button>
                                                    {/* <div className="controlsContainer">
                                                        
                                                    </div> */}
                                                    <div className="timecontrols">
                                                        <p className="controlsTime">
                                                            {Math.floor(currentTime / (60 * 60)) + ":" + ("0" + Math.floor((currentTime / 60) % 60)).slice(-2) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}
                                                        </p>
                                                        <div className="time_progressbarContainer"
                                                            onClick={() => handleProgressVideo(progress)}
                                                        >
                                                            <div
                                                                style={{ width: `${progress}%` }}
                                                                className="time_progressBar"

                                                            ></div>
                                                        </div>
                                                        <p className="controlsTime">
                                                            {Math.floor(videoTime / (60 * 60)) + ":" + ("0" + Math.floor(videoTime / 60)).slice(-2) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}
                                                        </p>
                                                    </div>
                                                    {volume > 0 ? (
                                                        <div className="volume-progress">

                                                            <input
                                                                id="player_slider"
                                                                type="range"
                                                                name="volume"
                                                                className="player__slider"
                                                                min="0" max="1" step="0.05"
                                                                value={volume}
                                                                onChange={(e) => handleRangeUpdate(e)}
                                                            />
                                                            <br />
                                                            <VolumeUpIcon
                                                                onClick={handleVolumeDown}
                                                                className="volumeIcons"
                                                            />
                                                            {/* <input
                                                        type="range"
                                                        name="playbackRate"
                                                        className="player__slider"
                                                        min="0.5" max="2" step="0.1"
                                                        value={playbackRate}
                                                        onChange={(e) => handleRangeUpdate(e)}
                                                    /> */}
                                                        </div>
                                                    ) : (
                                                        <div className="volume-progress">

                                                            <input
                                                                id="player_slider"
                                                                type="range"
                                                                name="volume"
                                                                className="player__slider"
                                                                min="0" max="1" step="0.05"
                                                                value={volume}
                                                                onChange={(e) => handleRangeUpdate(e)}
                                                            />
                                                            <br />
                                                            <VolumeOffIcon
                                                                onClick={handleVolumeUp}
                                                                className="volumeIcons"
                                                            />

                                                        </div>
                                                    )}
                                                </div>
                                            )
                                            :
                                            (
                                                <div className="video-container1">
                                                    {loginTo && iconsVisible ?
                                                        <div className="controls">
                                                            <img
                                                                onClick={revert}
                                                                className="controlsIcon"
                                                                alt=""
                                                                src="/images/player/backward.png"
                                                            />
                                                            {playing ? (
                                                                <img
                                                                    onClick={() => videoHandler("pause")}
                                                                    className="controlsIconsmall"
                                                                    alt=""
                                                                    src="/images/player/pause.png"
                                                                />
                                                            ) : (
                                                                <img
                                                                    onClick={() => videoHandler("play")}
                                                                    className="controlsIconsmall"
                                                                    alt=""
                                                                    src="/images/player/play.png"
                                                                />
                                                            )}
                                                            <img
                                                                onClick={fastForward}
                                                                className="controlsIcon"
                                                                alt=""
                                                                src="/images/player/forward.png"
                                                            />
                                                        </div>
                                                        : ""}
                                                    <video
                                                        ref={vidRef}
                                                        poster={item?.WebPoster}
                                                        width="100%"
                                                        className="vedio-palyer video"
                                                        id="video1"
                                                    >
                                                        <source
                                                            src={item?.Quality360}
                                                            type="video/mp4"
                                                        ></source>
                                                    </video>
                                                    {!loginTo ?
                                                        <>
                                                            <span className='loginWatch' onClick={auth ? "" : () => handleClickOpen()}>
                                                                Login to Watch the Movie
                                                            </span>
                                                        </>
                                                        : ""}
                                                    {item?.IsPremium == false ?
                                                        <>
                                                            <span className='freeTag-details'><img src="/images/free-tag.png" /></span>
                                                        </>
                                                        : ""}
                                                    {loginTo && iconsVisible ?
                                                        <>
                                                            <Button
                                                                onClick={() => handleQuality()}
                                                                className="quality"
                                                            >
                                                                {'LOW'}
                                                            </Button>
                                                            <div className="timecontrols">
                                                                <p className="controlsTime">
                                                                    {Math.floor(currentTime / (60 * 60)) + ":" + ("0" + Math.floor((currentTime / 60) % 60)).slice(-2) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}
                                                                </p>
                                                                <div className="time_progressbarContainer"
                                                                    // onClick={() => handleProgressVideo(progress)}
                                                                    onMouseDown={startMouseDown}
                                                                    onMouseUp={endMouseDown}
                                                                    onMouseLeave={endMouseDown}
                                                                    onMouseMove={(e) => isMouseDown && scrub(e)}
                                                                    onClick={scrub}
                                                                >
                                                                    <div
                                                                        style={{ width: `${progress}%` }}
                                                                        className="time_progressBar"

                                                                    ></div>
                                                                </div>
                                                                <p className="controlsTime">
                                                                    {Math.floor(videoTime / (60 * 60)) + ":" + ("0" + Math.floor(videoTime / 60)).slice(-2) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}
                                                                </p>
                                                            </div>
                                                            {volume > 0 ? (
                                                                <div className="volume-progress">

                                                                    <input
                                                                        id="player_slider"
                                                                        type="range"
                                                                        name="volume"
                                                                        className="player__slider"
                                                                        min="0" max="1" step="0.05"
                                                                        value={volume}
                                                                        onChange={(e) => handleRangeUpdate(e)}
                                                                    />
                                                                    <br />
                                                                    <VolumeUpIcon
                                                                        onClick={handleVolumeDown}
                                                                        className="volumeIcons"
                                                                    />
                                                                    {/* <input
                                                        type="range"
                                                        name="playbackRate"
                                                        className="player__slider"
                                                        min="0.5" max="2" step="0.1"
                                                        value={playbackRate}
                                                        onChange={(e) => handleRangeUpdate(e)}
                                                    /> */}
                                                                </div>
                                                            ) : (
                                                                <div className="volume-progress">

                                                                    <input
                                                                        id="player_slider"
                                                                        type="range"
                                                                        name="volume"
                                                                        className="player__slider"
                                                                        min="0" max="1" step="0.05"
                                                                        value={volume}
                                                                        onChange={(e) => handleRangeUpdate(e)}
                                                                    />
                                                                    <br />
                                                                    <VolumeOffIcon
                                                                        onClick={handleVolumeUp}
                                                                        className="volumeIcons"
                                                                    />

                                                                </div>
                                                            )}
                                                        </>
                                                        : ""}
                                                </div>
                                            )
                                    )
                                )
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <>
                        <div>
                            <Dialog fullScreen={fullScreen} className="dialog-box" aria-labelledby="customized-dialog-title" open={open}>

                                <DialogContent dividers>
                                    <Grid className="main-gridfeedback" container spacing={3}>
                                        <Grid item md={12} xs={12} className="main-dialog" >
                                            <Grid item md={2} xs={12}></Grid>
                                            <Grid item md={5} xs={12} className="first-section">
                                                <div className="logo-iott">
                                                    <img
                                                        className="img-fluid logo1"
                                                        src="/images/logo.png"
                                                        onClick={() => handleHome()}
                                                        alt="iottLogo"
                                                        style={{ cursor: 'pointer', marginBottom: "10px" }}
                                                    />
                                                </div>
                                                <p
                                                    style={{ color: "#Ffda78" }}
                                                >Hey if you are new you can register here</p>
                                                <a onClick={() => handleRegisterOpen()}>
                                                    <p style={{ color: "#Ffda78" }} className="register-redirection">Click here to <u>Register</u></p>
                                                </a>
                                            </Grid>


                                            <Grid item md={3} xs={12} className="second-section">


                                                <CloseIcon onClick={() => handleClose()} style={{ color: '#000', cursor: 'poiner', float: 'right', marginRight: '38px', marginTop: '15px', fontSize: '25px' }} />
                                                <div className="logo-iott">
                                                    <img
                                                        className="img-fluid logo1-mobile"
                                                        src="/images/logo.png"
                                                        onClick={() => handleHome()}
                                                        alt="iottLogo"
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </div>
                                                <h4 className="login-text">Login</h4>

                                                <div className="login">
                                                    <Typography className="fields-input-login">Phone Number</Typography>
                                                    <TextField
                                                        type="tel"
                                                        margin="dense"
                                                        variant="outlined"
                                                        error={isError}
                                                        className="number-text"
                                                        value={mobileNumber}

                                                        onChange={(e) => handleMobileNoLogin(e)}
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">
                                                                +91
                                                            </InputAdornment>,
                                                            endAdornment: <ArrowRightAltIcon onClick={() => handleLoginOtp()} style={{ color: '#000', cursor: "pointer" }} />,
                                                        }}
                                                    >
                                                    </TextField>
                                                    <span className="resend-otp2">Resend OTP?</span>
                                                </div>
                                                {errorMessageS ?
                                                    <p style={{ color: 'green', fontSize: '13px' }}>
                                                        {errorMessageS + " "}

                                                    </p>
                                                    : ""}
                                                <div className="otp-filed">
                                                    <span className="opt-text">OTP</span>
                                                    <OtpInput
                                                        className="opt"
                                                        onChange={otp => setLoginOtp(otp)}
                                                        numInputs={4}
                                                        value={loginOtp}
                                                        separator={<span>-</span>}
                                                    />
                                                </div>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleLoginUser()}
                                                    className="login-button">
                                                    Login
                                                </Button>
                                                <Typography
                                                    style={{ color: 'red' }}>
                                                    {errorMessage ?
                                                        <>
                                                            {errorMessage + " "}
                                                            <a
                                                                onClick={() => handleRegisterOpen()}
                                                                style={{ cursor: 'pointer' }}
                                                            >
                                                                <span style={{ color: 'rgb(0 0 0)' }}>
                                                                    Click here to Register
                                                                </span>
                                                            </a>
                                                        </>
                                                        : ""}

                                                </Typography>
                                                <a onClick={() => handleRegisterOpen()}>
                                                    <h5 className="register-redirection-mobile">Not a member? <b>Register</b></h5></a>
                                                <a onClick={handleFaq} className="faq"><h5>Help</h5></a>
                                            </Grid>
                                            <Grid item md={2} xs={12}></Grid>
                                        </Grid>
                                    </Grid>
                                </DialogContent>

                            </Dialog>

                            <Dialog fullScreen={fullScreen} className="dialog-box" aria-labelledby="customized-dialog-title" open={register}>

                                <DialogContent dividers>
                                    <Grid className="main-gridfeedback" container spacing={3}>
                                        <Grid item md={12} xs={12} className="main-dialog" >

                                            <Grid item md={2} xs={12}></Grid>

                                            <Grid item md={3} xs={12} className="register-second">
                                                <CloseIcon onClick={() => handleRegisterClose()} style={{ color: '#fff', cursor: 'poiner', float: 'right', marginRight: '38px', marginTop: '15px', fontSize: '25px' }} className="close-mobile" />

                                                <div className="logo-iott">
                                                    <img
                                                        className="img-fluid logo2"
                                                        src="/images/logo.png"
                                                        onClick={() => handleHome()}
                                                        alt="iottLogo"
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </div>

                                                <h4 className="login-text1">Register</h4>

                                                <Typography
                                                    style={{ color: 'red' }}>
                                                    {loginError ?
                                                        <>
                                                            {loginError + " "}
                                                            <a
                                                                onClick={handleClickOpen}
                                                                style={{ cursor: 'pointer' }}
                                                            >
                                                                <span style={{ color: 'rgb(0 0 0)' }}>
                                                                    Click here to <u>Login</u>
                                                                </span>
                                                            </a>
                                                        </>
                                                        : ""}
                                                </Typography>
                                                <Grid item md={10} xs={12} className="filed-align">
                                                    <Typography className="fields-input">Name</Typography>
                                                    <TextField margin="dense"
                                                        value={name || ""}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="name-filed"
                                                        variant="outlined"
                                                    />
                                                    <Typography className="fields-input">Phone Number</Typography>
                                                    <TextField
                                                        type="tel"
                                                        margin="dense"
                                                        variant="outlined"
                                                        error={isError}
                                                        className="number-text"
                                                        value={mobile}

                                                        onChange={(e) => handleMobileNo(e)}
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">
                                                                +91
                                                            </InputAdornment>,
                                                            endAdornment: <ArrowRightAltIcon onClick={() => handleRegisterOtp()} style={{ color: '#000', cursor: "pointer" }} />,
                                                        }}
                                                    >
                                                    </TextField>
                                                    <span className="resend-otp1" onClick={() => handleRegisterOtp()}>Resend OTP?</span>
                                                </Grid>
                                                <div className="otp-filed">
                                                    <span className="opt-text">OTP</span>
                                                    <OtpInput
                                                        className="opt"
                                                        onChange={handleChangeOtp}
                                                        numInputs={4}
                                                        value={otp}
                                                        separator={<span>-</span>}
                                                    />
                                                </div>
                                                <div className="check-box">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={checked}
                                                                onChange={handleChange}
                                                                name="checkedB"
                                                                color="primary"
                                                                id="termsandc"
                                                            />
                                                        }

                                                    /><span className="terms1"><span onClick={handleterms} className="terms">TermsAndCondition click here</span></span>
                                                </div>
                                                <Button
                                                    disabled={(checked || otp || mobile || name) ? false : true}
                                                    onClick={() => handleSignUp()}
                                                    variant="contained"
                                                    className="login-button">
                                                    Register
                                                </Button>
                                                <a onClick={() => handleClickOpen()}><h5 className="register-redirection-mobile">Already Register ? <b>Login</b></h5></a>
                                                <a onClick={() => handleFaq()} className="faq"><h5>Help</h5></a>
                                            </Grid>

                                            <Grid item md={5} xs={12} className="register first-section">
                                                <CloseIcon onClick={() => handleRegisterClose()} style={{ color: '#fff', cursor: 'poiner', float: 'right', marginRight: '38px', marginTop: '15px', fontSize: '25px' }} />
                                                <div className="logo-iott">
                                                    <img
                                                        className="img-fluid logo1"
                                                        src="images/logo.png"
                                                        onClick={() => handleHome()}
                                                        alt="iottLogo"
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </div>
                                                <p
                                                    style={{ color: "#Ffda78" }}
                                                >Hey if you are already registered</p>
                                                <a style={{ color: '#Ffda78' }} onClick={() => handleClickOpen()}><p className="login-redirection">Click here to <u>Login</u></p></a>
                                            </Grid>
                                            <Grid item md={2} xs={12}></Grid>
                                        </Grid>
                                    </Grid>
                                </DialogContent>

                            </Dialog>
                        </div>
                    </>
                    <Grid className="description" container spacing={3} >
                        <Grid className="tile-main" item md={12} xs={12}>

                            <Grid className="icon" item md={3} xs={3} onClick={() => handleStartOver()} style={{ cursor: 'pointer' }}>
                                {item?.MovieName !== "null" ? (
                                    <>
                                        <ReplayIcon className="icon-replay" />
                                        <h5 className="start-over" >Start Over</h5>
                                    </>
                                ) : ("")}
                            </Grid>

                            <Grid className="name icon" item md={6} xs={6} key={index}>
                                <h3 className='moviename'>{item?.MovieName !== "null" ? item?.MovieName : "IoTT Advertisement"}</h3>
                                {item?.MovieName !== "null" ? (
                                    <>
                                        <p>{item?.Language}</p>
                                        <p><span>{item?.Genre} | </span><span>{item?.IMDbRating} | </span> <span>{item?.Certificate} | </span><span>{item?.Duration.split(':')[0].substr(1, 1) + 'h ' + item?.Duration.split(':')[1] + 'min'} | </span><span>{item?.ReleasedYear.split(' ')[0].split('/')[2]}</span></p>
                                        {/* <Button className='button-bg' onClick={() => handleWatchTrailer(item?.Id)}>Watch Trailer</Button> */}
                                        <Button className='button-bg' onClick={() => handleWatchMovie()}>Watch Movie</Button>
                                    </>
                                ) : ("")}
                            </Grid>
                            {item?.MovieName !== "null" ? (
                                <Grid className="last-grid" item md={3} xs={3}>
                                    <img src="/images/My collection.png" className="collection" onClick={() => handleAddCollection(item?.Id)} />
                                    <h5 className='addtocollection' >{collectionAdded ? "Remove from Collection" : "Add to collection"}</h5>
                                </Grid>
                            ) : ("")}
                        </Grid>
                    </Grid>
                    {item?.MovieName !== "null" ? (
                        <>
                            <Grid className="description padd" container>
                                <Grid className="description-main" item md={12} xs={12}>
                                    <Grid className="description-text" item md={12} xs={12}>
                                        <h5>Description</h5>
                                        <p className="description-para" key={index}>
                                            {item?.Description}
                                        </p>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className="crew padd" container >
                                <Grid className="crew-main" item md={12} xs={12}>
                                    <Grid className="crew-text" item md={12} xs={12}>
                                        <h5>Cast & Crew</h5>
                                    </Grid>
                                </Grid>
                                <Grid className="crew-images" item md={12} xs={12}>

                                    {item?.cast?.map((cas, index) =>
                                        <Grid className="crew-images1" item md={1} xs={4} key={index}>
                                            <img src={cas?.ImageURL} alt="castAndCrew" />
                                            <p className='role'>{cas?.Role}</p>
                                            <p className='charactor'>{cas?.Charactor.substr(0, 8)}...</p>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </>
                    ) : ("")}

                </>
            )}
            <Grid className="realted padd" container style={{ marginTop: '20px' }}>
                <Grid className="related-main" item md={12} xs={12}>
                    <div className="iq-main-header d-flex align-items-center justify-content-between">
                        <h4 className='main-title'>Related Movies</h4>
                        <a className="iq-view-all" onClick={() => handleViewAll(categoryA)}>View All</a>
                    </div>
                    <Slider {...settings}>
                        {categoryList.map((category, index) => (
                            <div className='highlyRatedslider'
                                //  onClick={() => handleHighlyRated(language)}
                                onClick={() => handleDetailsPage(category?.Id)}
                            >
                                <img className='highlyRatedMovies' src={category?.MoviePoster} />
                                <div className='onhover'>
                                    <div className='onhover-text'>
                                        <p>{category?.Description}</p>
                                        <PlayCircleFilledIcon className='playicon' />
                                    </div>
                                </div>
                            </div>
                        )
                        )
                        }
                    </Slider>
                </Grid>
            </Grid>
        </div>
    )
}