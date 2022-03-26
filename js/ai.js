/**
 * Get the car data reduced to just the variables we are interested
 * and cleaned of missing data.
*/

async function getData() {
    let csvUrl = 'https://raw.githubusercontent.com/curran/data/gh-pages/all/iris_iris.csv';
    const csvUrl2 = 'https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/boston-housing-train.csv';

    const DataResponse = await d3.dsv(',',csvUrl,d3.autoType);
    const cleaned = DataResponse.map(d => ({
            PL: d["Petal Length"],
            PW: d["Petal Width"],
            CL: d['Class']
        }))
        .filter(d => (d.PL != null && d.PW != null));
    
    return cleaned;
}

function createModel() {
    // Create a sequential model
    const model = tf.sequential();

    // Add a single input layer
    model.add(tf.layers.dense({inputShape: [2], activation: "sigmoid", units: 5}));

    model.add(tf.layers.dense({units: 10}));

    model.add(tf.layers.dense({units: 20}));

    // Add an output layer
    model.add(tf.layers.dense({activation: "sigmoid", units: 3}))

    return model;
}

/**
 * Convert the input data to tensors that we can use for machine
 * learning. We will also do the important best practices of _shuffling_
 * the data and _normalizing_ the data
 * MPG on the y-axis.
 */
function convertToTensor(data) {
    // Wrapping these calculations in a tidy will dispose any
    // intermediate tensors.

    return tf.tidy(() => {
        // Step 1. Shuffle the data
        tf.util.shuffle(data);

        // Step 2. Convert data to Tensor
        const inputs = data.map(d => [d.PL,d.PW])
        const labels = data.map(d => [
            d.CL=="setosa"?1:0,
            d.CL=="virginica"?1:0,
            d.CL=="versicolor"?1:0
        ]);

        const inputTensor = tf.tensor2d(inputs);
        const labelTensor = tf.tensor2d(labels);

        return {
            inputs: inputTensor,
            labels: labelTensor,
        }
    });
}

async function trainModel(model, inputs, labels) {
    // Prepare the model for training.
    model.compile({
        loss: "meanSquaredError",
        optimizer: tf.train.adam(.06),
    });

    const epochs = 200;

    return await model.fit(inputs, labels, {
        epochs,
        shuffle: true,
        callbacks: tfvis.show.fitCallbacks({
                name: 'Training Performance'
            },
            ['loss', 'MSE'], {
                height: 200,
                callbacks: ['onEpochEnd']
            }
        )
    });
}

function testModel(model) {

    model.predict(tf.tensor2d([
        [1.7,0.4],
        [5.1,1.8],
        [4.2,1.3]
    ])).print();

}

async function run() {
    // Load and plot the original input data that we are going to train on.
    const data = await getData();
    const values = data.map(d => ({
        x: d.PL,
        y: d.PW
    }));

    tfvis.render.scatterplot(
        {name: "IRIS Flowers"}, {
            values: values,
            series: ['IRIS Flowers']
        }, {
            xLabel: 'Petal Length',
            yLabel: 'Petal Width',
            zoomToFit: true
        }
    );

    // Create the model
    const model = createModel();
    tfvis.show.modelSummary({
        name: 'Model Summary'
    }, model);

    // Convert the data to a form we can use for training.
    const tensorData = convertToTensor(data);
    const {inputs,labels} = tensorData;
    
    // Train the model
    await trainModel(model, inputs, labels);
    console.log('Done Training');

    // Make some predictions using the model and compare them to the
    // original data
    testModel(model);
}

document.addEventListener('DOMContentLoaded', run);