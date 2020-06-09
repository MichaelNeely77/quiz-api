let correctAnswer;


document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();

    eventListeners();
});

eventListeners = () => {
    document.querySelector('#check-answer').addEventListener('click', validateAnswer)
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
        console.log("That's correct");
    } else {
        console.log("No, that's not correct");
    }
}

