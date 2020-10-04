import React from 'react';

class FeatureImg extends React.Component {
	constructor(props){
		super(props);
		
		this.state = { show : false }
	}

    render(){
        const url = '/features/' + this.props.filename
        const size = 70
        
        if(this.state.show){
        	return <>
            	<img src={url} alt='feature not found' width={size + "%"} height={size + "%"}></img>
        	</>
        }
        else{
        	return <>
            	
        	</>
        }
    }
    
    componentDidMount = () => {
		setTimeout(() => {
			console.log(this.props.filename + ' - waited');
			this.setState({ show : true });
		}, this.props.sec_wait * 1000);
    }
}

export default FeatureImg;
