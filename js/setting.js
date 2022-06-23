import { Quiz } from './quiz.js'
export class Setting {
    constructor() {
        this.categoryElement = document.getElementById('category')
        this.difficultyElement = document.getElementsByName('difficulty')
        this.numberOfQuestionsElement = document.getElementById('numberOfQuestions')
        this.startBtn = document.getElementById('startBtn')
        this.startBtn.addEventListener('click', this.startQuiz.bind(this))
    }
    async startQuiz() {
        let category = this.categoryElement.value
        let numberOfQuestions = this.numberOfQuestionsElement.value;
        let difficulty = Array.from(this.difficultyElement).filter((elem) => elem.checked)[0].value

        let api = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`
        let response = await this.fetchData(api)
        if (response.length > 0) {
            $('#setting').fadeOut(500, () => {
                $('#quiz').fadeIn(500)
            })
            let quiz = new Quiz(response)
        }
        else {
            $('#formAlert').fadeIn(300, () => {
                $('#formAlert').fadeOut(1000)
            })
        }
    }
    async fetchData(api) {
        let response = await fetch(api)
        let data = await response.json()
        return data.results
    }


}