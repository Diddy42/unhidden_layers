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
                resolve();
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

export async function requestImage(filename){
    return new Promise((resolve, reject) => {
        fetch(url + 'features')
        .then((response) => {
            if(response.ok){
                console.log('api.js - requestImage - response ok')
                console.log(response)
                resolve(response);
            }
            else{
                console.log('api.js - requestImage - response not ok')
                console.log(response)
                reject(response);
            }
        })
        .catch((err) => {
            console.log('api.js - requestImage - could not connect to server' + err)
            reject(err);
        })
    })
}