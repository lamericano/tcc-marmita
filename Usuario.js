import React, { Component } from 'react';
import $ from 'jquery';
import InputCustom from './components/InputCustom.js';
import SubmitCustom from './components/SubmitCustom.js';
import PubSub from 'pubsub-js';
import FormValidating from  './components/FormValidating';


export default class UsuarioBox extends Component {

  constructor() {
    super();    
    this.state = {list : []};    
  }

  componentDidMount(){
        $.ajax({
                  url:"https://cdc-react.herokuapp.com/api/autores",
                  dataType: 'json',
                  success:function(resposta){    
                    console.log("chegou a resposta");          
                    this.setState({list:resposta})
                  }.bind(this)
        });

        PubSub.subscribe('update-list-usuarios', function(topico,newList){
        this.setState({list:newList});
      }.bind(this));          
  }
  
  render(){
    return (
      <div>
        <div className="header">
                      <h1>Cadastro de Usuários</h1>
                    </div>
        <br/>
        <FormUsuario/>
        <TableUsuario list={this.state.list}/>

      </div>
    );
  }
}

class FormUsuario extends Component{
	constructor(){
		super();
		this.state = {nome:'', email:'', senha:''};
   		this.enviaForm = this.enviaForm.bind(this);
   		this.setNome = this.setNome.bind(this);
   		this.setEmail = this.setEmail.bind(this);
   		this.setSenha = this.setSenha.bind(this);
	}

	enviaForm(event){
    		event.preventDefault();    
   			$.ajax({
   			 		url:'https://cdc-react.herokuapp.com/api/autores',
   			 		contentType:'application/json',
   			 		dataType:'json',
   			 		type:'post',
   			 		data: JSON.stringify({nome:this.state.nome, email:this.state.email, senha:this.state.senha}),
   			 		success: function(newList){
   			 		  	PubSub.publish('update-list-usuarios',newList);        
   			 		  	this.setState({nome:'', email:'', senha:''});
   			 		}.bind(this),
   			  		error: function(resposta){
   			    		if(resposta.status === 400) {
   			      		new FormValidating().publishError(resposta.responseJSON);
   			    	}},
   			  		beforeSend: function(){
   			    		PubSub.publish("limpa-erros",{});
   			  		}      
   			});
  	}

	setNome(event){
	  this.setState({nome:event.target.value});
	}
	
	setEmail(event){
	  this.setState({email:event.target.value});
	}  
	
	setSenha(event){
	  this.setState({senha:event.target.value});
	}

	render(){
		return(
				<div className="pure-form pure-form-aligned">
	              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
	                <InputCustom id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>                                              
	                <InputCustom id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email"/>                                              
	                <InputCustom id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha"/> 
	                <SubmitCustom type="submit" label = "Gravar"/>
	              </form>                                                 
	      </div>
			)
	}

}

class TableUsuario extends Component{
		render() {
		return(
                    <div>            
                      <table className="pure-table">
                        <thead>
                          <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.props.list.map(function(usuario){
                              return (
                                <tr key={usuario.id}>
                                  <td>{usuario.nome}</td>
                                  <td>{usuario.email}</td>
                                </tr>
                              );
                            })
                          }
                        </tbody>
                      </table> 
                    </div>             		
		);
	}
}



