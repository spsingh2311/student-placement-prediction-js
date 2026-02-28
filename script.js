document.getElementById("predictionForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    let tenth = parseFloat(document.getElementById("tenth").value);
    let twelfth = parseFloat(document.getElementById("twelfth").value);
    let cgpa = parseFloat(document.getElementById("cgpa").value);
    let communication = parseFloat(document.getElementById("communication").value);
    let projects = parseFloat(document.getElementById("projects").value);
    let internship = parseFloat(document.getElementById("internship").value);

    let b0 = -5;
    let b1 = 0.03;
    let b2 = 0.03;
    let b3 = 0.8;
    let b4 = 0.5;
    let b5 = 0.4;
    let b6 = 1.2;

    let z = b0 + (b1*tenth) + (b2*twelfth) +
            (b3*cgpa) + (b4*communication) +
            (b5*projects) + (b6*internship);

    let probability = 1 / (1 + Math.exp(-z));
    let percent = (probability * 100).toFixed(2);

    let label = probability >= 0.5 ? "Placed" : "Not Placed";

    document.getElementById("result").innerHTML =
        "Prediction: " + label + " (" + percent + "% probability)";

    new Chart(document.getElementById("chart"), {
        type: "doughnut",
        data: {
            labels: ["Placed Probability", "Not Placed"],
            datasets: [{
                data: [percent, 100 - percent]
            }]
        }
    });
});
let weights = [0,0,0,0,0,0,0]; 
let learningRate = 0.0001;
let epochs = 1000;
let trainingData = [];

function sigmoid(z){
    return 1 / (1 + Math.exp(-z));
}

function trainModel(){
    const fileInput = document.getElementById("csvFile");
    const file = fileInput.files[0];

    const reader = new FileReader();

    reader.onload = function(e){
        const lines = e.target.result.split("\n");

        trainingData = [];

        for(let i=1;i<lines.length;i++){
            let row = lines[i].split(",");
            if(row.length < 7) continue;

            let x = [
                1,
                parseFloat(row[0]),
                parseFloat(row[1]),
                parseFloat(row[2]),
                parseFloat(row[3]),
                parseFloat(row[4]),
                parseFloat(row[5])
            ];
            let y = parseInt(row[6]);

            trainingData.push({x,y});
        }

        gradientDescent();
        document.getElementById("trainingStatus").innerText = 
            "Model trained successfully!";
    };

    reader.readAsText(file);
}

function gradientDescent(){
    for(let e=0;e<epochs;e++){
        for(let data of trainingData){
            let z = 0;
            for(let i=0;i<weights.length;i++){
                z += weights[i] * data.x[i];
            }

            let prediction = sigmoid(z);
            let error = prediction - data.y;

            for(let i=0;i<weights.length;i++){
                weights[i] -= learningRate * error * data.x[i];
            }
        }
    }
}
