import React, {useState} from "react";
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/1337.css';
import ReactBootstrapSlider from "react-bootstrap-slider";

export default function MvpClassifier() {

    const [k, setK] = useState(1);

    let url = `http://35.182.166.228:5000?k=${k}`;

    const [data, setData] = useState({
        'Try out': 'This API',
        'Best Scorer': 'James Harden',
    });

    const theme = {
        main: 'border: 1px solid gray;border-radius:10px;padding:10px;line-height:1.3;' +
            'color:black;background:#ffffff;overflow:auto;',
        error: 'line-height:1.3;color:#66d9ef;background:#272822;overflow:auto;',
        key: 'color:#ae0808;',
        string: 'color:#02416d;',
        value: 'color:#138f75;',
        boolean: 'color:#ac81fe;',
    }

    const getData = () => {
        fetch(url).then(res => res.json()).then(
            data => {
                setData(data);
            }
        )
    }

    const updateK = (e) => {
        setK(e.target.value);
    }

    return (
        <div className='project'>
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
            <div className='api'>
                <JSONPretty theme={theme} data={data}/>
                {/*<p style={{color: "white", fontStyle: 'italic'}}> Temporarily disabled due to deployment issues</p>*/}
                <button onClick={getData} >Try out the api!</button>
                <div className='controls'>
                    <p>K players: </p>
                    <span className='slider'>
                    <ReactBootstrapSlider
                        change={updateK}
                        orientation="horizontal"
                        value={k}
                        step={1}
                        max={10}
                        min={1}
                    />
                </span>
                </div>
            </div>
        </div>
    )
}