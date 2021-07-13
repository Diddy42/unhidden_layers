const url = 'https://unhidden-layers.herokuapp.com/'

export async function testRequestJson(){
    return new Promise((resolve, reject) => {
        fetch(url + 'test_request')
        .then(response => response.json())
        .then((data) => {
            resolve(data)
        })
        .catch((err) => {
            console.log('could not connect to server' + err)
            reject(err);
        })
    })
}


