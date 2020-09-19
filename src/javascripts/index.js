// import 'bootstrap';


import '../scss/index.scss';
import test from '../home.html';

 function component() {
    const element = document.createElement('div');
   
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.innerHTML = test;
    return element;
  }
  console.log(test);
  document.body.appendChild(component());