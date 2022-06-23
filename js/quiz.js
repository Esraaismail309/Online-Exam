export class Quiz {
    constructor(response) {
        this.response = response;
        this.totalQuestionNum = response.length;
        this.currentQuestions = 0
        this.score = 0;
        this.nextBtn = document.getElementById('next')
        this.nextBtn.addEventListener('click', this.nextQuestion.bind(this))
        this.showQuestions()
    }

    showQuestions() {
        document.getElementById('currentQuestion').innerHTML = this.currentQuestions + 1;
        document.getElementById('totalNumberOfQuestions').innerHTML = this.totalQuestionNum;
        document.getElementById('question').innerHTML = this.response[this.currentQuestions].question;
        let answer = [this.response[this.currentQuestions].correct_answer, ... this.response[this.currentQuestions].incorrect_answers]
        function shuffle(array) {
            let currentIndex = array.length, randomIndex;
            // While there remain elements to shuffle.
            while (currentIndex != 0) {
                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }

            return array;
        }
        shuffle(answer)
        let container = ''
        for (let i = 0; i < answer.length; i++) {
            container += `
            <div class="form-check">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" name="answer" value="${answer[i]}" >
                ${answer[i]}
             </label>
            </div>`
        }

        document.getElementById('rowAnswer').innerHTML = container
    }
    nextQuestion() {
        let userAnswerElement = document.getElementsByName('answer')
        if ([...userAnswerElement].filter(el => el.checked).length === 1) {
            this.checkAnswers()
            this.currentQuestions++
            if (this.currentQuestions < this.totalQuestionNum) {
                this.showQuestions()
            }
            else {
                $('#quiz').fadeOut(500, () => {
                    $('#finish').fadeIn(500)
                })
                document.getElementById('score').innerHTML = this.score
                document.getElementById('tryBtn').addEventListener('click', () => {
                    $('#finish').fadeOut(500, () => {
                        $('#setting').fadeIn(500)
                    })
                })
            }
        } else {
            $('#alert').fadeIn(700, () => {
                $('#alert').fadeOut(700)
            })
        }

    }
    checkAnswers() {
        let userAnswerElement = document.getElementsByName('answer')
        let userAnswer = [...userAnswerElement].filter(el => el.checked)[0].value
        if (userAnswer == this.response[this.currentQuestions].correct_answer) {
            $('#Correct').fadeIn(700, () => {
                $('#Correct').fadeOut(700)
            })
            this.score += 10
        } else {
            $('#inCorrect').fadeIn(700, () => {
                $('#inCorrect').fadeOut(700)
            })
        }
    }
}


