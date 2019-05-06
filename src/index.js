import React from 'react';
import { render } from 'react-dom';
import App from './App';
import "./css/index.css";

let root = document.createElement('div');
root.id = 'root';

document.body.appendChild(root);
document.body.style.overflow = "hidden";


render(<App />, document.getElementById('root'));
