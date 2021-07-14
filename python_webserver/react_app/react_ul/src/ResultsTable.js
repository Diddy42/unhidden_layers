import React from 'react';
import Table from 'react-bootstrap/Table';

class ResultsTable extends React.Component{
    render(){
        if(this.props.status.localeCompare("pending") === 0){
            return <>
                <h1>Maybe show loading gif?</h1>
            </>
        }
        else if(this.props.status.localeCompare("server_too_busy") === 0){
            return <>
                <h1>Server is busy, please try again in a few seconds</h1>
                <h2>{"I'm on Heroku free tier yo! (thanks Heroku <3)"}</h2>
            </>
        }
        else if(this.props.status.localeCompare("connection_error") === 0){
            return <>
                <h1>Error connecting to the server</h1>
            </>
        }
        else if(this.props.status.localeCompare("success") === 0){
            return <>
                {this.createTable()}
            </>
        }
        else if(this.props.status.localeCompare("not_requested") === 0){
            return <>
                <h1>Upload an image and click extract!</h1>
            </>
        }
    }

    createTable = () => {
        var layers = [];

        for(var key in this.props.data){
            if(key.includes("layer_")){
                var layer_obj = {};
                layer_obj["name"] = key;
                layer_obj["images"] = this.props.data[key];

                layers.push(layer_obj);
            }

            //console.log(key);
            //console.log(this.props.data[key]);
        }

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
					{layers.map(l => this.createRow(l))}
				</tbody>
			</Table>
		</>
	}

    createRow = (layer_obj) => {

		const size = 70;
		return <tr key={layer_obj.name}>
			<td><h3>{layer_obj.name}</h3></td>
			<td><img src={'data:image/png;base64,' + layer_obj.images[0]} alt='' width={size + "%"} height={size + "%"}/></td>
			<td><img src={'data:image/png;base64,' + layer_obj.images[1]} alt='' width={size + "%"} height={size + "%"}/></td>
			<td><img src={'data:image/png;base64,' + layer_obj.images[2]} alt='' width={size + "%"} height={size + "%"}/></td>
		</tr>
	}
}

export default ResultsTable;

