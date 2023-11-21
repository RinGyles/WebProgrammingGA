// Task 1
function calculateAge() {
    var dobInput = document.getElementById("dob");
    var ageOutput = document.getElementById("age");
    var dob = new Date(dobInput.value);
    var today = new Date();
    var age = today.getFullYear() - dob.getFullYear();
    // Check if the user's birthday has already occurred this year
    if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
        age--;
    }
    document.getElementById("age").value = age;
}
// Task 2
let PlayerRegistrationData = [];
function Register() {
    const fName = document.getElementById("fname");
    if (fName.value.length < 3) {
        alert("First name must be at least 3 characters long");
        return false;
    }

    const lName = document.getElementById("lname");
    if (lName.value.length < 3) {
        alert("Last name must be at least 3 characters long");
        return false;
    }

    const AGE = document.getElementById("age");
    if (AGE.value < 8 || AGE.value > 12) {
        alert("You must be between the ages 8 and 12 to register");
        return false;
    }

    const EMAIL = document.getElementById("email");
    const emailPattern = /@gmail\.com$/;
    if (!emailPattern.test(EMAIL.value)) {
        alert("Enter a valid gmail address");
        return false;
    }

    const DOB = document.getElementById("dob");
    const GENDER = document.getElementById("gender");

    PlayerRegistrationData.push({
        firstName: fName.value,
        lastName: lName.value,
        age: AGE.value,
        email: EMAIL.value,
        gender: GENDER.value,
        dob: DOB.value,
    });

    fName.disabled = true;
    lName.disabled = true;
    dob.disabled = true;
    gender.disabled = true;
    email.disabled = true;
    reg.disabled = true;
    start.disabled = false;
    end.disabled = false;

    updateStatistics();

    alert("Player has successfully registered! Click 'Start' to begin game!");
}
// Task 3
reg.addEventListener("click", Register);

//Task 4: Generate random numbers for the equation
function PlayGame() {
  const num1 = Math.floor(Math.random() * 9) + 1;
  const num2 = Math.floor(Math.random() * 5) + 1;
  const equationText = `${num1} x ${num2} = `;
  
  // Enable play area
  document.getElementById("playArea").style.display = "block";
  
  // Display the equation
  document.getElementById("equation").textContent = equationText;
  
  // Enable the answer input
  document.getElementById("answer").disabled = false;
  
  // Enable the Check Answer button
  document.getElementById("checkAnswer").disabled = false;
  
  // Enable the Next button
  document.getElementById("next").disabled = false;
  
  // Clear previous player's answer display
  document.getElementById("playAreaText").value = "";
}

// Task 6: Check and validate the player's answer
function CheckAnswer() {
    const equationElement = document.getElementById("equation");
    const playerAnswer = document.getElementById("answer").value.trim();

    if (playerAnswer === "") {
        alert("Please enter your answer.");
        return;
    }

    const equationParts = equationElement.textContent.split("x");
    const num1 = parseInt(equationParts[0].trim());
    const num2 = parseInt(equationParts[1].trim());

    if (isNaN(num1) || isNaN(num2)) {
        alert("Invalid equation. Please try again.");
        return;
    }

    const correctAnswer = num1 * num2;

    if (parseInt(playerAnswer) === correctAnswer) {
        alert("Correct answer!");
        PlayerRegistrationData.push({
            equation: `${num1} x ${num2}`,
            playerAnswer: parseInt(playerAnswer),
            isCorrect: true
        });
    } else {
        alert("Incorrect answer. Try again.");
        PlayerRegistrationData.push({
            equation: `${num1} x ${num2}`,
            playerAnswer: parseInt(playerAnswer),
            isCorrect: false
        });
    }

    document.getElementById("playAreaText").value = '';
    PlayerRegistrationData.forEach(player => {
        document.getElementById("playAreaText").value += `Equation: ${player.equation}, Player's Answer: ${player.playerAnswer}, Status: ${player.isCorrect ? 'Correct' : 'Incorrect'}\n`;
    });

    findPercentageScore();
    showAllStats();
}
//Task 9
function updateStatistics() {
    const showPercentage = document.getElementById("showpercentage");
    showPercentage.value = ''; 
    PlayerRegistrationData.forEach(player => {
        showPercentage.value += `Name: ${player.firstName} ${player.lastName}, Age: ${player.age}, Gender: ${player.gender}, Email: ${player.email}, DOB: ${player.dob}\n`;
        showPercentage.value += `Percentage Score: ${calculatePercentage(player)}%\n`;
    });
}
//Task 10
function findPercentageScore() {
    const showPercentage = document.getElementById("showpercentage");
    showPercentage.value = ''; 
    const playerName = PlayerRegistrationData[PlayerRegistrationData.length - 1].firstName + " " + PlayerRegistrationData[PlayerRegistrationData.length - 1].lastName;
    const totalQuestions = PlayerRegistrationData.length - 1; 
    const correctAnswers = PlayerRegistrationData.filter(player => player.isCorrect).length;
    const percentageScore = (correctAnswers / totalQuestions) * 100;
    const currentDate = new Date().toLocaleDateString();
    showPercentage.value += `Player: ${playerName}\n`;
    showPercentage.value += `Date: ${currentDate}\n`;
    showPercentage.value += `Total Questions: ${totalQuestions}\n`;
    showPercentage.value += `Correct Answers: ${correctAnswers}\n`;
    showPercentage.value += `Percentage Score: ${percentageScore.toFixed(2)}%\n`;
}
//Needed for Task 11
function clearForm ()
{
    document.getElementById ('registrationform').reset ();
    document.getElementById ('fname').disabled = false;
    document.getElementById ('lname').disabled = false;
    document.getElementById ('dob').disabled = false;
    document.getElementById ('gender').disabled = false;
    document.getElementById ('email').disabled = false;
    
    document.getElementById ('fname').focus();
    
    document.getElementById ('reg').disabled = false;
    document.getElementById ('start').disabled = true;
    document.getElementById ('checkAnswer').disabled = true;
    document.getElementById ('next').disabled = true;
    document.getElementById ('end').disabled = true;
    document.getElementById ('playArea').disabled = true;
    document.getElementById ('showpercentage').disabled = true;
}
//Task 13
function showAllStats() {
    const showAllPlayers = document.getElementById("showallplayers");
    showAllPlayers.innerHTML = '';
    
    PlayerRegistrationData.forEach(player => {
        showAllPlayers.innerHTML += `First Name: ${player.firstName}, Last Name: ${player.lastName}, Age: ${player.age}\n`;
        showAllPlayers.innerHTML += `Questions and Answers: ${player.questions} = ${player.playerAnswer}, Status: ${player.isCorrect ? 'Correct' : 'Incorrect'}, Percentage Score: ${calculatePercentage(player)}%\n\n`;
    });
}

function calculatePercentage(player) {
    return player.isCorrect ? 100 : 0;
}
//Task 15
function showCharts() {
  // Calculate counts and percentages for gender
  const totalPlayers = PlayerRegistrationData.length -1;
  let femaleCount = 0;
  let maleCount = 0;
  for (let i = 0; i < totalPlayers; i++) {
    if (PlayerRegistrationData[i].gender === "female") {
      femaleCount++;
    } else if (PlayerRegistrationData[i].gender === "male") {
      maleCount++;
    }
  }
  const femalePercentage = (femaleCount / totalPlayers) * 100;
  const malePercentage = (maleCount / totalPlayers) * 100;

  // Calculate counts and percentages for percentage score
  let scoreLessThan50Count = 0;
  let score50to59Count = 0;
  let score60to69Count = 0;
  let score70to79Count = 0;
  let score80to89Count = 0;
  let score90to99Count = 0;
  let score100Count = 0;
  for (let i = 0; i < totalPlayers; i++) {
    const percentageScore = calculatePercentage(PlayerRegistrationData[i]);
    if (percentageScore < 50) {
      scoreLessThan50Count++;
    } else if (percentageScore >= 50 && percentageScore <= 59) {
      score50to59Count++;
    } else if (percentageScore >= 60 && percentageScore <= 69) {
      score60to69Count++;
    } else if (percentageScore >= 70 && percentageScore <= 79) {
      score70to79Count++;
    } else if (percentageScore >= 80 && percentageScore <= 89) {
      score80to89Count++;
    } else if (percentageScore >= 90 && percentageScore <= 99) {
      score90to99Count++;
    } else if (percentageScore === 100) {
      score100Count++;
    }
  }
  const scoreLessThan50Percentage = (scoreLessThan50Count / totalPlayers) * 100;
  const score50to59Percentage = (score50to59Count / totalPlayers) * 100;
  const score60to69Percentage = (score60to69Count / totalPlayers) * 100;
  const score70to79Percentage = (score70to79Count / totalPlayers) * 100;
  const score80to89Percentage = (score80to89Count / totalPlayers) * 100;
  const score90to99Percentage = (score90to99Count / totalPlayers) * 100;
  const score100Percentage = (score100Count / totalPlayers) * 100;

  const genderChart = document.createElement("div");
  genderChart.innerHTML = `
    <h3>Gender</h3>
    <table>
      <tr>
        <td>Females:</td>
        <td><img src="bar.png" width="${femalePercentage}"></td>
        <td>${femalePercentage.toFixed(1)}%</td>
      </tr>
      <tr>
        <td>Males:</td>
        <td><img src="bar.png" width="${malePercentage}"></td>
        <td>${malePercentage.toFixed(1)}%</td>
      </tr>
    </table>
  `;

  // Create the bar chart for percentage score
  const scoreChart = document.createElement("div");
  scoreChart.innerHTML = `
    <h3>Percentage Score</h3>
    <table>
      <tr>
        <td><50:</td>
        <td><img src="bar.png" width="${scoreLessThan50Percentage}"></td>
        <td>${scoreLessThan50Percentage.toFixed(1)}%</td>
      </tr>
      <tr>
        <td>50-59:</td>
        <td><img src="bar.png" width="${score50to59Percentage}"></td>
        <td>${score50to59Percentage.toFixed(1)}%</td>
      </tr>
      <tr>
        <td>60-69:</td>
        <td><img src="bar.png" width="${score60to69Percentage}"></td>
        <td>${score60to69Percentage.toFixed(1)}%</td>
      </tr>
      <tr>
        <td>70-79:</td>
        <td><img src="bar.png" width="${score70to79Percentage}"></td>
        <td>${score70to79Percentage.toFixed(1)}%</td>
      </tr>
      <tr>
        <td>80-89:</td>
        <td><img src="bar.png" width="${score80to89Percentage}"></td>
        <td>${score80to89Percentage.toFixed(1)}%</td>
      </tr>
      <tr>
        <td>90-99:</td>
        <td><img src="bar.png" width="${score90to99Percentage}"></td>
        <td>${score90to99Percentage.toFixed(1)}%</td>
      </tr>
      <tr>
        <td>100:</td>
        <td><img src="bar.png" width="${score100Percentage}"></td>
        <td>${score100Percentage.toFixed(1)}%</td>
      </tr>
    </table>
  `;

  const showChartsDiv = document.getElementById("showcharts");
  showChartsDiv.innerHTML = "";
  showChartsDiv.appendChild(genderChart);
  showChartsDiv.appendChild(scoreChart);
}

window.addEventListener("load", function () {
  showCharts();
  setInterval(showCharts, 5000);
});
