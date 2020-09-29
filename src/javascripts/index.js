// import 'bootstrap';
import '../sass/index.sass';
// import nav from '../home.html';


import '../sass/index.sass';
import test from '../home.html';


// function navbar() {
//   const element = document.createElement('header');
//   element.innerHTML = nav;
//   return element;
//  }
//  // console.log(nav);
// document.body.appendChild(navbar());

 function component() {
    const open_source_element = document.createElement('div');
   
  
    open_source_element.innerHTML = test;
    return open_source_element;
  }
  document.body.appendChild(component());
 