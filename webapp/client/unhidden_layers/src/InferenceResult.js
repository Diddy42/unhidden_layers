import React from 'react';
import * as api from './api.js'

class InferenceResult extends React.Component{  
	render(){
		console.log('InferenceResult.js - render')
		if(this.props.results === undefined){
			return <>
				
			</>
		}
		else{
			return <>
				<h3>{this.props.results.inference}</h3>
			</>
		}
	}
}

export default InferenceResult;
