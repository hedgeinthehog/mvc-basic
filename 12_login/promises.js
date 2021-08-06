function writeAfterTime(text = 'I am a text', time = 2000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(text);
            resolve('logged');
        }, time);

        // reject();
    });
}

(async () => {
    const result = await writeAfterTime();
    console.log(result, 1);
})();

writeAfterTime()
    .then(data => {
        console.log(data);
        console.log(1);
    })
    .catch(err => {
        console.error(err);
    })
