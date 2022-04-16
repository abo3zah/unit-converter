var model;
var data;
var label;

async function saveModel() {
    //save model
    await model.save('downloads://IRIS');
}

async function testModel() {

    yPred = tf.tensor2d([[+document.getElementById('PL').value, +document.getElementById('PW').value]])

    let result = await model.predict(yPred).dataSync()

    result = result.map(x => Math.round(x))

    document.getElementById('result').innerText = result[0]==1?'setosa':result[2]==1?'versicolor':'virginca'

}

async function createModel() {
    // Create a sequential model
    const newModel = tf.sequential();

    // Add a single input layer
    newModel.add(tf.layers.dense({ 
        inputShape: [2],
        activation: "sigmoid", //'elu'|'hardSigmoid'|'linear'|'relu'|'relu6'| 'selu'|'sigmoid'|'softmax'|'softplus'|'softsign'|'tanh'|'swish'|'mish'
        units: 5,
        name: "Input_Layer",
        //dtype: 'float32',//'float32'|'int32'|'bool'|'complex64'|'string'
    }));

    // create hidden layers
    newModel.add(tf.layers.dense({ units: 20 }));
    newModel.add(tf.layers.dense({ units: 10 }));

    // Add an output layer
    newModel.add(tf.layers.dense({ 
        units: 3,
        name: "Output_Layer"
    }))

    // Prepare the model for training.
    await newModel.compile({ loss: "meanSquaredError", optimizer: tf.train.adam(.06) });

    newModel.summary()

    return newModel;
}


function convertToTensor(data) {

    xAxis = document.getElementById('x-axis').value;
    yAxis = document.getElementById('y-axis').value;

    return tf.tidy(() => {
        // Step 1. Shuffle the data
        tf.util.shuffle(data);

        // Step 2. Convert data to Tensor
        const inputs = data.map(d => [d[xAxis], d[yAxis]])
        const labels = data.map(d => [
            d[label] == "setosa" ? 1 : 0,
            d[label] == "virginica" ? 1 : 0,
            d[label] == "versicolor" ? 1 : 0
        ]);

        const inputTensor = tf.tensor2d(inputs);
        const labelTensor = tf.tensor2d(labels);

        return {
            inputs: inputTensor,
            labels: labelTensor,
        }
    });
}

async function trainModel(){

    // Convert the data to a form we can use for training.
    const tensorData = convertToTensor(data);
    const { inputs, labels } = tensorData;

    if (model != undefined){
        console.log('a Model is already defined and trained');
        // return null;
    }


    //create Model
    model = await createModel();

    const epochs = document.getElementById('epochs').value;

    // Define Layout
    var layout = {
        xaxis: {
            title: 'epochs'
        },
        yaxis: {
            title: 'Loss'
        },
        title: {
            text: "epochs vs. Loss",
            font: {
                size: 30
            }
        },
        paper_bgcolor: "#fffbeb",
        plot_bgcolor: "#fffbeb"
    };

    let xs = [];
    let ys = [];
    let values = [];

    await model.fit(inputs, labels, {
        epochs,
        shuffle: true,
        callbacks: {
            onEpochEnd: async (epoch, logs) => {
                xs.push(epoch);
                ys.push(logs.loss)
                values = [{
                    x:xs,
                    y:ys,
                    type: 'scatter'
                }];
                Plotly.newPlot("myChart2", values, layout, {
                    displaylogo: false,
                    responsive: true
                })
            }
          }
    });
}

async function loadModel() {

    const jsonUpload = document.getElementById('json-upload');
    const weightsUpload = document.getElementById('weights-upload');

    //TODO: check if empty send a notification

    model = await tf.loadLayersModel(
        tf.io.browserFiles([jsonUpload.files[0], weightsUpload.files[0]])
    );
    model.summary();

}

function drawChart(data) {

    xAxis = document.getElementById('x-axis').value;
    yAxis = document.getElementById('y-axis').value;

    let uniqueClass = data.map(d => d[label]).filter((element, index, arr) => arr.indexOf(element) === index)

    let values = [];

    for (let index = 0; index < uniqueClass.length; index++) {
        values[index] = {
            x: data.filter(d => d[label] == uniqueClass[index]).map(d => d[xAxis]),
            y: data.filter(d => d[label] == uniqueClass[index]).map(d => d[yAxis]),
            mode: "markers",
            name: uniqueClass[index],
            type: 'scatter',
        };
    }

    // Define Layout
    var layout = {
        xaxis: {
            title: xAxis
        },
        yaxis: {
            title: yAxis
        },
        title: {
            text: xAxis + " vs. " + yAxis,
            font: {
                size: 30
            }
        },
        paper_bgcolor: "#fffbeb",
        plot_bgcolor: "#fffbeb"
    };

    // Display using Plotly
    Plotly.newPlot("myChart", values, layout, {
        displaylogo: false,
        staticPlot: false,
        responsive: true
    });
}

async function getData() {
    let csvUrl = 'https://raw.githubusercontent.com/curran/data/gh-pages/all/iris_iris.csv';

    const DataResponse = await d3.dsv(',', csvUrl, d3.autoType);

    label = DataResponse.columns.slice(-1);

    for (col of DataResponse.columns.slice(0, -1)) {
        d3.select('#x-axis').append('option')
            .attr('value', col)
            .text(col)
        
        d3.select('#y-axis').append('option')
            .attr('value', col)
            .text(col)
    }

    d3.select('#x-axis').property('value', 'Petal Length');
    d3.select('#y-axis').property('value', 'Petal Width');

    return DataResponse;
}

async function run() {
    // Load and plot the original input data that we are going to train on.
    data = await getData();


    drawChart(data);
}

document.addEventListener('DOMContentLoaded', run);