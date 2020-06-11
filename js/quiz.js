let correctAnswer,
    correctNumber = (localStorage.getItem('quiz_game_correct') ? localStorage.getItem('quiz_game_correct')  : 0),
    incorrectNumber = (localStorage.getItem('quiz_game_incorrect') ? localStorage.getItem('quiz_game_incorrect')  : 0);



document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();

    eventListeners();
});

eventListeners = () => {
    document.querySelector('#check-answer').addEventListener('click', validateAnswer);

    document.querySelector('#clear-storage').addEventListener('click', clearResults);
}

// loads new question from API
loadQuestion = () => {
    const url = 'https://opentdb.com/api.php?amount=1';
    fetch(url)
    .then(data => data.json())
    .then(result => displayQuestion(result.results));
}

displayQuestion = questions => {

    const questionHTML = document.createElement('div');
    questionHTML.classList.add('col-12');

    questions.forEach(question => {

        // Read the correct answer

        correctAnswer = question.correct_answer;

        let possibleAnswers = question.incorrect_answers;
        possibleAnswers.splice( Math.floor( Math.random() * 3 ), 0, correctAnswer );

        // Add HTML for current question
        questionHTML.innerHTML = `
            <div class="row justify-content-between heading">
                <p class="category">Category: ${question.category}</p>
                <div class="totals">
                    <span class="badge badge-success">${correctNumber}</span>
                    <span class="badge badge-danger">${incorrectNumber}</span>

                </div>
            </div>
            <h2 class="text-center">${question.question}</h2>
        `;

        // GEnerate HTML for possible answers
        const answerDiv = document.createElement('div');

        answerDiv.classList.add('questions', 'row', 'justify-content-around', 'mt-4');
        possibleAnswers.forEach(answer => {
            const answerHTML = document.createElement('li');
            answerHTML.classList.add('col-12', 'col-md-5');
            answerHTML.textContent = answer;

            // Attach an event when an answer is clicked
            answerHTML.onclick = selectAnswer;
            answerDiv.appendChild(answerHTML);
            
        });

        questionHTML.appendChild(answerDiv);

        //Render question in the browser
        document.querySelector('#app').appendChild(questionHTML);
    });
}


// When the answer is selected
selectAnswer = (e) => {
    // remobves previous active class
    if(document.querySelector('.active')) {
        const activeAnswer = document.querySelector('.active');
        activeAnswer.classList.remove('active');
    }



    e.target.classList.add('active');
}


// Check if the answer is correct and one answer is selected
validateAnswer = () => {
    if(document.querySelector('.questions .active')) {
        // Everything si fine, checked the right answer
        checkAnswer();
    } else {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('alert', 'alert-danger', 'col-md-6', 'text-center');
        errorDiv.textContent = 'Please select one answer';

        const questionsDiv = document.querySelector('.questions');
        questionsDiv.appendChild(errorDiv);

        setTimeout(() => {
            document.querySelector('.alert-danger').remove();
        }, 3000);
        
    }
}

checkAnswer = () => {
    const userAnswer = document.querySelector('.questions .active');

    if(userAnswer.textContent === correctAnswer) {
        correctNumber++;
    } else {
        incorrectNumber++;
    }

    // SAve into local storage
    saveIntoStorage();

    //Clear previous HTML
    const app = document.querySelector('#app');
    while(app.firstChild) {
        app.removeChild(app.firstChild);
    }

    // load a new question
    loadQuestion();
}

saveIntoStorage = () => {
    localStorage.setItem('quiz_game_correct', correctNumber);
    localStorage.setItem('quiz_game_incorrect', incorrectNumber);
}

clearResults = () => {
    localStorage.setItem('quiz_game_correct', 0);
    localStorage.setItem('quiz_game_incorrect', 0);

    setTimeout(() => {
        window.location.reload();
    }, 500);
}
