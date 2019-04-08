import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import UsuarioBox from './Usuario';
import ProdutoBox from './Produto';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
            <div id="layout">
                  <a href="#menu" id="menuLink" className="menu-link">
                    <span></span>
                  </a>
                  <div id="menu">
                          <div className="pure-menu">
                            <a className="pure-menu-heading" href="testReact">Company</a>
                            <ul className="pure-menu-list">
                              <li className="pure-menu-item">
                                <a href="/" className="pure-menu-link">Home</a>
                              </li>
                              <li className="pure-menu-item">
                                <a href="/usuario" className="pure-menu-link">Usuario</a>
                              </li>
                              <li className="pure-menu-item">
                                <a href="/produto" className="pure-menu-link">Food</a>
                              </li>
                            </ul>
                          </div>
                  </div>
                  <div id="main">
                    <div className="content" id="content">
                      <Route exact path='/' render={() => (<UsuarioBox/>)}/>
                      <Route exact path='/produto' render={() => (<ProdutoBox/>)}/>
                      
                    </div>
                  </div>
            </div>   


       );
     }
   }

   export default App;
