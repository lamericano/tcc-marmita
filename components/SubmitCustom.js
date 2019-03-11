import React from 'react';

export default class SubmitCustom extends React.Component{
	render(){
			return(
				<div className="pure-control-group">                                  
                    <label></label> 
                    <button type="{this.props.type}" className="pure-button pure-button-primary">{this.props.label}</button>                                    
                </div> 
				);
		}

}