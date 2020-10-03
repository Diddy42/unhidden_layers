const url = '/'

export async function sendImage(file){
    console.log('api.js - sending image')
    const formData = new FormData()
    formData.append('myFile', file)

    return new Promise((resolve, reject) => {
        fetch(url + 'sendImage', {
            method : 'POST',
            body : formData
        })
        .then((response) => {
            if(response.ok){
                //const resJ = await response.json();
                resolve(response);
            }
            else{
                reject(response);
            }
        })
        .catch((err) => {
            reject(err);
        })
    })
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