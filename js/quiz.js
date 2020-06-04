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

displayQuestion = question => {
    console.log(question);
}

