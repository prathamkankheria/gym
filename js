// Inside app.js

// Function to submit the form and store workout data in local storage
function submitForm() {
    var exercise = document.getElementById('exercise').value;
    var sets = document.getElementById('sets').value;
    var reps = document.getElementById('reps').value;
    var weights = document.getElementById('weights').value;
    var workoutDate = document.getElementById('workoutDate').value; // Add this line

    // Store data in local storage with date
    var workoutData = {
        exercise: exercise,
        sets: sets,
        reps: reps,
        weights: weights,
        date: workoutDate // Add this line
    };

    var previousData = JSON.parse(localStorage.getItem('workoutData')) || [];
    previousData.push(workoutData);
    localStorage.setItem('workoutData', JSON.stringify(previousData));

    // Display data on the console for testing
    console.log("Exercise: " + exercise + ", Sets: " + sets + ", Reps: " + reps + ", Weights: " + weights + ", Date: " + workoutDate);

    // Update the chart and goal progress
    updateChart();
    updateGoalProgress();

    // Optionally, clear the form after submission
    document.getElementById('gymForm').reset();
}

// Function to update the chart based on stored workout data
function updateChart() {
    var currentDate = new Date().toISOString().split('T')[0]; // Get the current date
    var storedData = JSON.parse(localStorage.getItem('workoutData')) || [];

    // Filter data for the current day
    var todayData = storedData.filter(function (entry) {
        return entry.date === currentDate;
    });

    var labels = todayData.map(function (entry) {
        return entry.exercise;
    });

    var setsData = todayData.map(function (entry) {
        return entry.sets;
    });

    var repsData = todayData.map(function (entry) {
        return entry.reps;
    });

    var weightsData = todayData.map(function (entry) {
        return entry.weights;
    });

    var ctx = document.getElementById('progressChart').getContext('2d');

    // Destroy the existing chart if it exists
    if (window.myChart) {
        window.myChart.destroy();
    }

    // Create a new chart
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Sets',
                    data: setsData,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Reps',
                    data: repsData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Weights',
                    data: weightsData,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to update goal progress and check if the goal is reached
function updateGoalProgress() {
    var currentDate = new Date().toISOString().split('T')[0]; // Get the current date
    var goalSets = localStorage.getItem('goalSets');
    if (goalSets) {
        var storedData = JSON.parse(localStorage.getItem('workoutData')) || [];

        // Filter data for the current day
        var todayData = storedData.filter(function (entry) {
            return entry.date === currentDate;
        });

        var totalSets = todayData.reduce(function (sum, entry) {
            return sum + parseInt(entry.sets);
        }, 0);

        if (totalSets >= goalSets) {
            alert("Congratulations! You've reached your goal of " + goalSets + " sets!");
        }
    }
}

// Call the updateChart function on page load to display the initial chart
window.onload = function () {
    // Display existing data, chart, and goal progress on page load
    var storedData = JSON.parse(localStorage.getItem('workoutData'));
    console.log("Stored Data on Page Load:", storedData);
    updateChart();
    updateGoalProgress();
};

// dark mode 
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Workout program 
var workoutProgram = {
    monday: ["Deadlift", "Hack Squat", "Bulgarian", "Leg Curl", "Calf"],
    tuesday: ["Bench Press", "Incline Machine", "Smith OHP", "Cable Fly", "Cable Pushdown", "Lateral Raises Stand"],
    wednesday: ["Lat Pull", "Close Grip Cable Row", "Machine Row Elbow Out", "Reverse Fly", "DB Supported Curl", "Preacher Curl", "Reverse Cable Curl"],
    thursday: ["Squats", "Leg Press", "Leg Extension", "Leg Curl", "Calf Seated"],
    friday: ["Incline Bench Press", "Flat DB Press", "DB Seated OHP", "Pec Fly", "OH Extension", "Seated Lateral Raises"],
    saturday: ["Close Grip Lat Pulldown", "Single Hand Cable Row", "Straight Arm Lat Pulldown", "Shrugs", "Barbell Curl", "Bayesian Curl", "Hammer Curl"],
    sunday: [] // Sunday is a rest day
};

// Function to display selected day's workout program
// Function to display selected day's workout program
// Function to display selected day's workout program
// Function to display selected day's workout program
function displaySelectedDay() {
    var selectedDay = document.getElementById('selectedDay').value;

    if (!selectedDay) {
        alert("Please select a day.");
        return;
    }

    console.log("Selected Day:", selectedDay); // Add this line for debugging

    var storedData = JSON.parse(localStorage.getItem('workoutData')) || [];

    console.log("All Stored Data:", storedData); // Add this line for debugging

    // Filter data for the selected day
    var selectedDayData = storedData.filter(function (entry) {
        return entry.date === selectedDay;
    });

    console.log("Selected Day Data:", selectedDayData); // Add this line for debugging

    var labels = selectedDayData.map(function (entry) {
        return entry.exercise;
    });

    var repsData = selectedDayData.map(function (entry) {
        return entry.reps;
    });

    var weightsData = selectedDayData.map(function (entry) {
        return entry.weights;
    });

    var ctx = document.getElementById('progressChart').getContext('2d');

    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Reps',
                    data: repsData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Weights',
                    data: weightsData,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Reset the current exercise index to 0 when a new day is selected
    localStorage.setItem('currentExerciseIndex', 0);

    // Display data for the first exercise
    displaySelectedExercise(0);

    // Display workout program for the selected day
    var programText = document.getElementById('workoutProgramText');

    // Check if the workout program for the selected day exists before trying to join
    var selectedDayProgram = workoutProgram[selectedDay.toLowerCase()];
    if (selectedDayProgram) {
        programText.textContent = `Workout Program for ${selectedDay}: ${selectedDayProgram.join(", ")}`;
    } else {
        programText.textContent = `No workout program available for ${selectedDay}. It's a rest day!`;
    }
}




// Function to save workout data to a file
async function saveDataToFile() {
    try {
        const workoutData = localStorage.getItem('workoutData') || '[]';

        // Request file system access
        const handle = await window.showDirectoryPicker();

        // Create a file
        const fileHandle = await handle.getFileHandle('workout_data.txt', { create: true });
        const writable = await fileHandle.createWritable();

        // Write data to the file
        await writable.write(workoutData);
        await writable.close();

        alert('Workout data saved to file successfully!');
    } catch (error) {
        console.error('Error saving data to file:', error);
        alert('Error saving data to file. Please try again.');
    }
}




// Function to get yesterday's date
function getYesterday() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
}

// Update the chart for yesterday's data on page load
window.onload = function () {
    // Display existing data, chart, and goal progress on page load
    var storedData = JSON.parse(localStorage.getItem('workoutData'));
    console.log("Stored Data on Page Load:", storedData);

    // Default to showing the chart for yesterday
    var yesterdayData = storedData.filter(function (entry) {
        return entry.date === getYesterday();
    });

    var labels = yesterdayData.map(function (entry) {
        return entry.exercise;
    });

    var setsData = yesterdayData.map(function (entry) {
        return entry.sets;
    });

    var ctx = document.getElementById('progressChart').getContext('2d');

    // Destroy the existing chart if it exists
    if (window.myChart) {
        window.myChart.destroy();
    }

    // Create a new chart for yesterday's data
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Sets',
                data: setsData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Update goal progress for yesterday
    updateGoalProgress();
};


// Inside app.js

// Function to display selected exercise data in the chart
function displaySelectedExercise(exerciseIndex) {
    var currentDate = new Date().toISOString().split('T')[0]; // Get the current date
    var storedData = JSON.parse(localStorage.getItem('workoutData')) || [];

    // Filter data for the current day
    var todayData = storedData.filter(function (entry) {
        return entry.date === currentDate;
    });

    // Check if there is data for the selected exercise index
    if (todayData.length > exerciseIndex) {
        var selectedExerciseData = todayData[exerciseIndex];

        var labels = [selectedExerciseData.exercise];
        var setsData = [selectedExerciseData.sets];
        var repsData = [selectedExerciseData.reps];
        var weightsData = [selectedExerciseData.weights];

        var ctx = document.getElementById('progressChart').getContext('2d');

        // Destroy the existing chart if it exists
        if (window.myChart) {
            window.myChart.destroy();
        }

        // Create a new chart for the selected exercise
        window.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Sets',
                        data: setsData,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Reps',
                        data: repsData,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Weights',
                        data: weightsData,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Enable or disable the next exercise button based on data availability
        var nextExerciseButton = document.getElementById('nextExerciseButton');
        nextExerciseButton.disabled = exerciseIndex === todayData.length - 1;
    }
}

// Function to navigate to the next exercise
// Function to navigate to the next exercise
function nextExercise() {
    var currentExerciseIndex = parseInt(localStorage.getItem('currentExerciseIndex')) || 0;
    console.log("Current Exercise Index:", currentExerciseIndex); // Add this line for debugging

    // Display data for the next exercise
    displaySelectedExercise(currentExerciseIndex + 1);
}


// Update the chart for the first exercise on page load
window.onload = function () {
    // Display existing data, chart, and goal progress on page load
    var storedData = JSON.parse(localStorage.getItem('workoutData'));
    console.log("Stored Data on Page Load:", storedData);

    // Default to showing the chart for the first exercise
    localStorage.setItem('currentExerciseIndex', 0);
    displaySelectedExercise(0);
};
