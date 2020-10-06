import React from 'react';
import Table from 'react-bootstrap/Table'

class ResultsTable extends React.Component{
    render(){
            if(this.props.results === undefined){
                return <>
                    <Table>
            
                    </Table>
            </>
            }
            else{
                return <>
                dsahdgsa
                </>
            }
    }
}

/*
display base64 image:
    <img src={'data:image/jpg;base64,' + this.state.json_results.test_img}/>
*/

export default ResultsTable;