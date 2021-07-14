const url = 'https://unhidden-layers.herokuapp.com/'

export async function extractFromImage(){
    return new Promise((resolve, reject) => {
        fetch(url + 'extract_from_image')
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


