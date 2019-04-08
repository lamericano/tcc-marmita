import React, { Component } from 'react';
import $ from 'jquery';
import InputCustom from './components/InputCustom.js';
import SubmitCustom from './components/SubmitCustom.js';
import PubSub from 'pubsub-js';
import FormValidating from  './components/FormValidating';

class FormProduto extends Component{
	constructor(){
		super();
		this.state = {produto:'',valueUnit:'',valueTotal:'',senha:''};
   		this.enviaForm = this.enviaForm.bind(this);
   		this.setvalueUnit = this.setvalueUnit.bind(this);
   		this.setvalueTotal = this.setvalueTotal.bind(this);
   		this.setSenha = this.setSenha.bind(this);
	}

	enviaForm(event){
    		event.preventDefault();    
   			$.ajax({
   			 		url:'https://cdc-react.herokuapp.com/api/autores',
   			 		contentType:'application/json',
   			 		dataType:'json',
   			 		type:'post',
   			 		data: JSON.stringify({valueUnit:this.state.valueUnit,valueTotal:this.state.valueTotal,senha:this.state.senha}),
   			 		success: function(newList){
   			 		  	PubSub.publish('update-list-produtos',newList);        
   			 		  	this.setState({valueUnit:'',valueTotal:'',senha:''});
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

	setvalueUnit(event){
	  this.setState({valueUnit:event.target.value});
	}
	
	setvalueTotal(event){
	  this.setState({valueTotal:event.target.value});
	}  
	
	setSenha(event){
	  this.setState({senha:event.target.value});
	}

	render(){
		return(
				 <div className="pure-form pure-form-aligned">
	              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
	                <InputCustom id="produto" type="text" name="produto" value={this.state.produto} onChange={this.setproduto} label="Produto"/>                                              
                  <InputCustom id="valueUnit" type="text" name="valueUnit" value={this.state.valueUnit} onChange={this.setvalueUnit} label="Valor unitário"/>                                              
	                <InputCustom id="valueTotal" type="valueTotal" name="valueTotal" value={this.state.valueTotal} onChange={this.setvalueTotal} label="Valor total"/>                                              
	                <InputCustom id="valuePorcao" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Porções"/>  

                  <label className="switch">
                      <input type="checkbox"/>
                      <span className="slider round"></span>
                      <span></span>
                  </label>  
                  <span>Sem glúten</span>
                  <label className="switch">
                      <input type="checkbox"/>
                      <span className="slider round"></span>
                      <span></span>
                  </label>  
                  <span>Low Carb</span>
                  <label className="switch">
                      <input type="checkbox"/>
                      <span className="slider round"></span>
                      <span></span>
                  </label>  
                  <span>Vegano</span>


	                <SubmitCustom type="submit" label = "Filtrar"/>
                  <SubmitCustom type="submit" label = "Cancelar"/>
	              </form>             
	            </div>
			)
	}

}

class TableProduto extends Component{
		render() {
		return(
                    <div>            
                      <table className="pure-table">
                        <thead>
                          <tr>
                            <th>valueUnit</th>
                            <th>E-mail</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.props.list.map(function(produto){
                              return (
                                <tr key={produto.id}>
                                  <td>{produto.valueUnit}</td>
                                  <td>{produto.valueTotal}</td>
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

export default class ProdutoBox extends Component {

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

        PubSub.subscribe('update-list-produtos', function(topico,newList){
    	 	this.setState({list:newList});
    	}.bind(this));          
	}

	

	render(){
    return (
      <div>
        <FormProduto/>
        <TableProduto list={this.state.list}/>

      </div>
    );
  }
}

