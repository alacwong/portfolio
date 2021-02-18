import React from "react";
import '../styling/mvp.scss'

export default function MvpClassifier() {

    return (
        <div className='container'>
            <div className='description'>
                <h1 >Mvp predictor api</h1>
                <ul>
                   <li>Rest api for predict top K NBA mvp-candidates </li>
                    <li>Single layer Perceptron model used to predict better of 2 players</li>
                    <li>Scraped and pre-processed player statistics from Basketball-reference to generate 10,000 player
                    comparison records</li>
                    <li>"Tournament" data structure to compute best player using trained model</li>
                    <li>Update data daily with scheduler</li>
                    <li>Flask api</li>
                </ul>
            </div>
        </div>
    )
}