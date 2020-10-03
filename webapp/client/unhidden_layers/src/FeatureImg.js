import React from 'react';

class FeatureImg extends React.Component {
    render(){
        const url = '/features/' + this.props.filename
        const size = 70
        return <>
            <img src={url} alt='feature not found' width={size + "%"} height={size + "%"}></img>
        </>
    }
}

export default FeatureImg;