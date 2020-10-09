import React from 'react';
import Table from 'react-bootstrap/Table'

class ResultsTable extends React.Component{
    render(){
    		console.log(this.props.results)
            if(this.props.results === undefined){
                return <>
                    <Table>
            
                    </Table>
            </>
            }
            else{
                return <>
                {this.createTable()}
                </>
            }
    }
    
    createTable = () => {
    	
		return <>
			<Table>
				<thead>
					<tr>
					  <th>Layer number</th>
					  <th>Random output of this layer</th>
					  <th>Random output of this layer</th>
					  <th>Random output of this layer</th>
					</tr>
				</thead>
				
				<tbody>
					{this.props.results.layers_features.map(l => this.createRow(l))}
				</tbody>
			</Table>
		</>
	}
	
	createRow = (layer_feature) => {
		console.log(layer_feature)
		return <tr>
			<td><h3>{layer_feature.layer_number}</h3></td>
			<td><img src={'data:image/png;base64,' + layer_feature.features_b64[0]}/></td>
			<td><img src={'data:image/png;base64,' + layer_feature.features_b64[1]}/></td>
			<td><img src={'data:image/png;base64,' + layer_feature.features_b64[2]}/></td>
		</tr>
	}
}

/*
display base64 image:
    <img src={'data:image/png;base64,' + this.state.json_results.test_img}/>
*/

export default ResultsTable;
