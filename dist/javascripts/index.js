// import 'bootstrap';
// import '../sass/index.sass';
// import nav from '../home.html';
import '../css/default.css'
// import '../css/jquery.ui.css'

// import '../sass/index.sass';
import test from '../index.html';
import mag from '../mag.html';


// let routes = {
//   '/': index.html,
//   '/patrika':mag.html 
// };







 function component() {
    const home = document.createElement('div');
  	home.innerHTML = test;
	return home;
  }
document.body.appendChild(component());


 