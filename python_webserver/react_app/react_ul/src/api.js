const url = 'https://unhidden-layers.herokuapp.com/'

export async function testRequest(){
    return new Promise((resolve, reject) => {
        fetch(url + 'test_request')
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


