import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {render} from "react-dom";
import Index from "./pages/index";

function App() {
    return (
            <Switch>
                <Route path={`${process.env.PUBLIC_URL}/`} exact component={Index}/>
            </Switch>
    );
}

render(
    <Router>
        <App/>
    </Router>,
    document.getElementById("root")
);

