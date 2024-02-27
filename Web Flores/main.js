let model;

async function loadModel() {
    model = await tf.loadLayersModel('carpeta_modelo/model.json');
    document.getElementById('result').innerText = 'Modelo cargado correctamente';
}

function loadImage() {
    const inputElement = document.getElementById('imageInput');
    const imageElement = document.getElementById('inputImage');
    const file = inputElement.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageElement.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

async function classify() {
    const imageElement = document.getElementById('inputImage');
    const tensor = tf.browser.fromPixels(imageElement).resizeNearestNeighbor([100, 100]).expandDims();
    const predictions = await model.predict(tensor).data();

    const maxPrediction = Math.max(...predictions);
    const predictedClass = predictions.indexOf(maxPrediction);

    const classNames = ['Diente de leon', 'Margarita', 'Tulipan', 'Girasol', 'Rosa'];
    const resultText = `La flor es de tipo: ${classNames[predictedClass]} con confianza ${maxPrediction.toFixed(2)}`;

    document.getElementById('result').innerText = resultText;
}

window.onload = loadModel;
