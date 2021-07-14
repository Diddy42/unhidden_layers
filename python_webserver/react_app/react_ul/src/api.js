const url = 'https://unhidden-layers.herokuapp.com/'

export async function extractFromImage(imgFile){
    const formData = new FormData()
    formData.append('imgFile', imgFile)

    const res = await fetch(url + 'extract_from_image', {
        method : 'POST',
        body : formData
    });

    if(res.ok){
        const resJ = await res.json();
        return resJ;
    }
    
    let err = {status: res.status, errObj:res};
    throw err;

    /*return new Promise((resolve, reject) => {
        fetch(url + 'extract_from_image')
        .then(response => response.json())
        .then((data) => {
            resolve(data)
        })
        .catch((err) => {
            console.log('could not connect to server' + err)
            reject(err);
        })
    })*/
}


