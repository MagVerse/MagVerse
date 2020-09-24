// import 'bootstrap';


import '../scss/index.sass';
import test from '../home.html';

 function component() {
    const open_source_element = document.createElement('div');
   
  
    open_source_element.innerHTML = test;
    return open_source_element;
  }
  document.body.appendChild(component());