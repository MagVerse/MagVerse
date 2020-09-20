// import 'bootstrap';
import '../sass/index.sass';
import nav from '../home.html';

 
 function navbar() {
   const element = document.createElement('header');
   element.innerHTML = nav;
   return element;
  }
  // console.log(nav);
document.body.appendChild(navbar());
 