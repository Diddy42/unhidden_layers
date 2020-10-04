import React from 'react';
import * as api from './api.js'

class InferenceResult extends React.Component{
	constructor(props){
	    super(props);

	    this.state = {inference : ''};
	  }
	  
	render(){
		if(this.props.unique_id === -1){
			return <>
				
			</>
		}
		else{
			return <>
				<h3>{this.state.inference}</h3>
			</>
		}
	}
	
	componentDidUpdate = () => {
		if(this.props.unique_id !== -1){
			console.log('getting inference')
			api.getInference(this.props.unique_id)
			.then((res) => {
            console.log('InferenceResult.js - getInference then')
            console.log(res.inference.toString())
            //this.setState({ inference : res.inference })
        })
		}
	}
}

export default InferenceResult;
