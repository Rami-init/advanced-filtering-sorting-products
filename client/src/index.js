import ReactDom from "react-dom";
import reportWebVitals from "./reportWebVitals";
import App from './App'
import 'typeface-roboto'
import './index.css'
import { BrowserRouter } from "react-router-dom"
ReactDom.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
, document.getElementById("root"))


reportWebVitals();

