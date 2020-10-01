const url = '/'

export async function sendImage(file){
    console.log('api.js - sending image')
    return new Promise((resolve, reject) => {
        fetch(url + 'sendImage', {
            method : 'POST',
            body : file
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