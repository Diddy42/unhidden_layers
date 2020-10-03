import React from 'react';

class FeatureImg extends React.Component {
    render(){
        const url = '/features/' + this.props.filename
        return <>
            <img src={url} alt='feature not found'></img>
        </>
    }
}

export default FeatureImg;