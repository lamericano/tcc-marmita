import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import CustomerBox from './Customer.js';


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
                                <a href="testReact" className="pure-menu-link">Home</a>
                              </li>
                              <li className="pure-menu-item">
                                <a href="testReact" className="pure-menu-link">Customer</a>
                              </li>
                              <li className="pure-menu-item">
                                <a href="testReact" className="pure-menu-link">Food</a>
                              </li>
                            </ul>
                          </div>
                  </div>
                  <div id="main">
                    <div className="header">
                      <h1>Cadastro</h1>
                    </div>
                    <br/>
                    <div className="content" id="content">
                      <CustomerBox/>
                    </div>
                  </div>
            </div>    
       );
     }
   }

   export default App;
