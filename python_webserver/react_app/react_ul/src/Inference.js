import React from 'react';

class Inference extends React.Component {
    render(){         
        if(this.props.status.localeCompare("success") === 0){
            return <>
                <h2>{this.props.data['inference']}</h2>
            </>
        }
        else{
            return <> </>
        }
        
    }
}

export default Inference;

