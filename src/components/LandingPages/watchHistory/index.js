import React from 'react';
import "./style.css";

import Header from "../../headerPage/header";
import Footer from "../../footerPage/footer";

import WatchHistoryOne from './watchHistoryOne';

export default function WatchHistory(){

    return(
        <div>
            <div>
                <Header/>
            </div>
            <div>
                <WatchHistoryOne/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}