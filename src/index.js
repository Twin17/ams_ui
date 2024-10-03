import React from "react"
import * as Rdc from "react-dom/client"
import App from './App'
import App2 from "./App2"
import './css/main.css'

//npm i react
//npm i react-dom
//npm i react-scripts
//npm i react-icons
//npm i axios

const app = Rdc.createRoot(document.getElementById("app"))

app.render(<App />)
