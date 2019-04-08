import React, { Component } from 'react';
import $ from 'jquery';
import InputCustom from './components/InputCustom.js';
import SubmitCustom from './components/SubmitCustom.js';
import PubSub from 'pubsub-js';
import FormValidating from  './components/FormValidating';

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
        <div className="header">
                      <h1>Cadastro de Usuários</h1>
                    </div>
        <br/>
        <FormProduto/>
        <TableProduto list={this.state.list}/>

      </div>
    );
  }
}

class FormProduto extends Component{
	constructor(){
		super();
		this.state = { idProduto:'', titulo:'', descricao:'', pacote:'', imagem:'', valor:'', unitario:'', fornecedor:'', gluten:'', lowCarb:'', vegano:'', porcoes:'', listProduto:'' };
   		this.enviaForm = this.enviaForm.bind(this);
      this.setidProduto = this.setidProduto.bind(this);
      this.setTitulo = this.setTitulo.bind(this);
      this.setDescricao = this.setDescricao.bind(this);
      this.setPacote = this.setPacote.bind(this);
      this.setImagem = this.setImagem.bind(this);
      this.setValor = this.setValor.bind(this);
      this.setUnitario = this.setUnitario.bind(this);
      this.setFornecedor = this.setFornecedor.bind(this);
      this.setGluten = this.setGluten.bind(this);
      this.setLowCarb = this.setLowCarb.bind(this);
      this.setVegano = this.setVegano.bind(this);
      this.setPorcoes = this.setPorcoes.bind(this);
      this.setListProduto = this.setListProduto.bind(this);
	}

	enviaForm(event){
    		event.preventDefault();    
   			$.ajax({
   			 		url:'https://cdc-react.herokuapp.com/api/autores',
   			 		contentType:'application/json',
   			 		dataType:'json',
   			 		type:'post',
   			 		data: JSON.stringify({ titulo:this.state.titulo, descricao:this.state.descricao, pacote:this.state.pacote, imagem:this.state.imagem, valor:this.state.valor, unitario:this.state.unitario, fornecedor:this.state.fornecedor, gluten:this.state.gluten, lowCarb:this.state.lowCarb, vegano:this.state.vegano, porcoes:this.state.porcoes, listProduto:this.state.listProduto}), 
   			 		success: function(newList){
   			 		  	PubSub.publish('update-list-produtos',newList);        
   			 		  	this.setState({ titulo:'', descricao:'', pacote:'', imagem:'', valor:'', unitario:'', fornecedor:'', gluten:'', lowCarb:'', vegano:'', porcoes:'', listProduto:''});
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

    setidProduto(event){this.setState({titulo:event.target.value});}
    setTitulo(event){this.setState({titulo:event.target.value});}
    setDescricao(event){this.setState({descricao:event.target.value});}
    setPacote(event){this.setState({pacote:event.target.value});}
    setImagem(event){this.setState({imagem:event.target.value});}
    setValor(event){this.setState({valor:event.target.value});}
    setUnitario(event){this.setState({unitario:event.target.value});}
    setFornecedor(event){this.setState({fornecedor:event.target.value});}
    setGluten(event){this.setState({gluten:event.target.value});}
    setLowCarb(event){this.setState({lowCarb:event.target.value});}
    setVegano(event){this.setState({vegano:event.target.value});}
    setPorcoes(event){this.setState({porcoes:event.target.value});}
    setListProduto(event){this.setState({listProduto:event.target.value});}

	render(){
		return(
				 <div className="pure-form pure-form-aligned">
	         <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustom id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo} label="Título"/>
                    <InputCustom id="descricao" type="text" name="descricao" value={this.state.descricao} onChange={this.setDescricao} label="Descricao"/>
                    <InputCustom id="pacote" type="text" name="pacote" value={this.state.pacote} onChange={this.setPacote} label="Pacote"/>
                    <InputCustom id="imagem" type="text" name="imagem" value={this.state.imagem} onChange={this.setImagem} label="Imagem"/>
                    <InputCustom id="valor" type="text" name="valor" value={this.state.valor} onChange={this.setValor} label="Valor"/>
                    <InputCustom id="unitario" type="text" name="unitario" value={this.state.unitario} onChange={this.setUnitario} label="Unitario"/>
                    <InputCustom id="fornecedor" type="text" name="fornecedor" value={this.state.fornecedor} onChange={this.setFornecedor} label="Fornecedor"/>
                    <InputCustom id="gluten" type="text" name="gluten" value={this.state.gluten} onChange={this.setGluten} label="Gluten"/>
                    <InputCustom id="lowCarb" type="text" name="lowCarb" value={this.state.lowCarb} onChange={this.setLowCarb} label="LowCarb"/>
                    <InputCustom id="vegano" type="text" name="vegano" value={this.state.vegano} onChange={this.setVegano} label="Vegano"/>
                    <InputCustom id="porcoes" type="text" name="porcoes" value={this.state.porcoes} onChange={this.setPorcoes} label="Porcoes"/>
                    <InputCustom id="listProduto" type="text" name="listProduto" value={this.state.listProduto} onChange={this.setListProduto} label="Lista de Produtos"/>
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
                          <th>Titulo</th>
                          <th>Descricao</th>
                          <th>Pacote</th>
                          <th>Imagem</th>
                          <th>Valor</th>
                          <th>Unitario</th>
                          <th>Fornecedor</th>
                          <th>Gluten</th>
                          <th>LowCarb</th>
                          <th>Vegano</th>
                          <th>Porcoes</th>
                          <th>ListProduto</th>
                          </tr>
                  </thead>
                  <tbody>
                      {this.props.list.map(function(produto){
                        return (
                                <tr key={produto.id}>
                                <td>{produto.titulo}</td>
                                <td>{produto.descricao}</td>
                                <td>{produto.pacote}</td>
                                <td>{produto.imagem}</td>
                                <td>{produto.valor}</td>
                                <td>{produto.unitario}</td>
                                <td>{produto.fornecedor}</td>
                                <td>{produto.gluten}</td>
                                <td>{produto.lowCarb}</td>
                                <td>{produto.vegano}</td>
                                <td>{produto.porcoes}</td>
                                <td>{produto.listProduto}</td>
                                </tr>
                        );
                  })}
                  </tbody>
                  </table> 
            </div>             		
		);
	}
}



