let history = [];

function addHistory() {
  const input = document.getElementById('historyInput').value.trim().toUpperCase();
  const entries = input.split(',').map(e => e.trim());
  for (const entry of entries) {
    const match = entry.match(/^(\\d)(R|G|V)$/);
    if (match) {
      history.push({ number: parseInt(match[1]), color: match[2] });
    }
  }
  displayHistory();
}

function clearHistory() {
  history = [];
  displayHistory();
}

function displayHistory() {
  document.getElementById('historyDisplay').innerText = history.map(h => `${h.number}${h.color}`).join(', ');
}

function predictNumber() {
  const freq = Array(10).fill(0);
  history.forEach(h => freq[h.number]++);
  const maxFreq = Math.max(...freq);
  const likely = freq.map((f, i) => f === maxFreq ? i : null).filter(x => x !== null);
  showResult('Likely Number(s): ' + likely.join(', '));
}

function predictSmallBig() {
  let small = 0, big = 0;
  history.forEach(h => h.number <= 4 ? small++ : big++);
  const prediction = small > big ? 'Small' : 'Big';
  showResult('Prediction: ' + prediction);
}

function predictColor() {
  const colorCount = { R: 0, G: 0, V: 0 };
  history.forEach(h => colorCount[h.color]++);
  const maxColor = Object.entries(colorCount).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  showResult('Prediction: ' + (maxColor === 'R' ? 'Red' : maxColor === 'G' ? 'Green' : 'Violet'));
}

function showResult(text) {
  document.getElementById('results').innerText = text;
}q[n] || 0) + 1);
  let sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  let nextNum = parseInt(sorted[0][0]);
  document.getElementById("pred-num").innerText = nextNum;
  updateStats(nextNum === numbers[numbers.length - 1]);
}

function predictSB() {
  if (numbers.length < 5) {
    alert("Enter 5 numbers for SB prediction");
    return;
  }
  let last = numbers[numbers.length - 1];
  let prediction = (last <= 4) ? "Big" : "Small";
  document.getElementById("pred-sb").innerText = prediction;
  updateStats(smallBig[smallBig.length - 1] === prediction);
}

function predictColor() {
  if (numbers.length < 5) {
    alert("Enter 5 numbers for color prediction");
    return;
  }
  let last = numbers[numbers.length - 1];
  let color = "Green";
  if (last % 2 === 0) color = "Red";
  if (last === 0 || last === 5) color = "Violet";
  document.getElementById("pred-color").innerText = color;
  updateStats(colors[colors.length - 1] === color);
}

function updateStats(correct) {
  totalPredictions++;
  if (correct) correctPredictions++;
  let acc = (correctPredictions / totalPredictions) * 100;
  document.getElementById("total").innerText = totalPredictions;
  document.getElementById("correct").innerText = correctPredictions;
  document.getElementById("accuracy").innerText = acc.toFixed(1) + "%";
}

function renderChart() {
  const ctx = document.getElementById("colorChart").getContext("2d");
  const data = {
    labels: colorHistory.map((_, i) => i + 1),
    datasets: [{
      label: "Color Trend",
      data: colorHistory.map(c => c === "Red" ? 1 : c === "Green" ? 2 : 3),
      backgroundColor: colorHistory.map(c =>
        c === "Red" ? "#dc3545" : c === "Green" ? "#28a745" : "#6f42c1"
      ),
      borderWidth: 1
    }]
  };
  if (window.colorChart) {
    window.colorChart.data = data;
    window.colorChart.update();
  } else {
    window.colorChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1, callback: v => ["", "Red", "Green", "Violet"][v] } } },
        plugins: { legend: { display: false } }
      }
    });
  }
}
