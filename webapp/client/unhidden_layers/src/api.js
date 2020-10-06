const url = '/'

export async function sendImage(file){
    console.log('api.js - sending image')
    const formData = new FormData()
    formData.append('myFile', file)

    const res = await fetch(url + 'sendImage', {
        method : 'POST',
        body : formData
    });

    if(res.ok){
        const resJ = await res.json();
        return resJ;
    }
    
    let err = {status: res.status, errObj:res};
    throw err;
}

export async function getInference(unique_id){
	console.log('api.js - getInference called with ' + unique_id)
	
	const res = await fetch(url + 'inference/' + unique_id)
	if(res.ok){
		const resJ = await res.json();
		return resJ;
	}
	
	let err = {status: res.status, errObj:res};
    throw err;
}

export async function testPing(){
    return new Promise((resolve, reject) => {
        fetch(url + 'test')
        .then((response) => {
            if(response.ok){
                console.log(response)
                resolve();
            }
            else{
                console.log('response not ok' + response)
                reject(response);
            }
        })
        .catch((err) => {
            console.log('could not connect to server' + err)
            reject(err);
        })
    })
}

export async function getJsonResults(unique_id){
    console.log('api.js - getJsonResults called with ' + unique_id)
	
	const res = await fetch(url + 'jsonresults/' + unique_id)
	if(res.ok){
		const resJ = await res.json();
		return resJ;
	}
	
	let err = {status: res.status, errObj:res};
    throw err;
}