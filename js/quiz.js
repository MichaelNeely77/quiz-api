document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();
});



// loads new question from API
loadQuestion = () => {
    const url = 'https://opentdb.com/api.php?amount=1';
    fetch(url)
    .then(data => data.json())
    .then(result => displayQuestion(result.results));
}

displayQuestion = questions => {

    let array1 = [1,2.,3];
    let value1 = 4;

    array1.splice( Math.floor(Math.random() * 3), 0, value1);

    console.log(array1);

    const questionHTML = document.createElement('div');
    questionHTML.classList.add('col-12');

    questions.forEach(question => {
        console.log(question);
    });
}

