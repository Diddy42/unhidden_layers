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
		const size = 70;
		return <tr key={layer_feature.layer_number}>
			<td><h3>{layer_feature.layer_number}</h3></td>
			<td><img src={'data:image/png;base64,' + layer_feature.features_b64[0]} alt='' width={size + "%"} height={size + "%"}/></td>
			<td><img src={'data:image/png;base64,' + layer_feature.features_b64[1]} alt='' width={size + "%"} height={size + "%"}/></td>
			<td><img src={'data:image/png;base64,' + layer_feature.features_b64[2]} alt='' width={size + "%"} height={size + "%"}/></td>
		</tr>
	}
}

export default ResultsTable;
