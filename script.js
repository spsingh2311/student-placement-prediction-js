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
