import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GuessWordPage from "./components/GuessWordPage";
import MainMenu from "./components/MainMenu";
import ModeSelect from "./components/ModeSelect";
import GuessImagePage from "./components/GuessImagePage";
import {HashRouter, Route, Switch} from 'react-router-dom';
import RandomPage from "./components/RandomPage";
import PracticePage from "./components/PracticePage";


ReactDOM.render(
    <HashRouter>
        <div id={"indexDiv"}>
            <Switch>
                <Route exact path="/" component={MainMenu} />
                <Route exact path={"/mode"} component={ModeSelect}/>
                <Route exact path={"/record"} component={GuessWordPage}/>
                <Route exact path={"/recordImage"} component={GuessImagePage}/>
                <Route exact path={"/random"} component={RandomPage}/>
                <Route exact path={"/practice"} component={PracticePage}/>
            </Switch>
        </div>

    </HashRouter>, document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
