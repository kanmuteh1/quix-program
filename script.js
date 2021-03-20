let subject = document.querySelector('#subject');
let num_of_questions = document.querySelector('#num-of-ques');

let first_sec = document.getElementById('selection-area')
let second_sec = document.getElementById('questions-n-ans')

function sub(){
    fetch(`https://kit-questions.glitch.me/question/${subject.value}/${num_of_questions.value}`)
    .then((response) => response.json())
    .then((data) =>{
        let ques = Object.keys(data.questions);
        document.getElementById('question-area').innerHTML="";
        let question_count = 1;
        ques.forEach((items) => {
            let get_question = data.questions[items].question;
            let questions = `<p>${question_count}. ${get_question}</p>`;
            let opt = data.questions[items].options;
            let answer_key = Object.keys(opt)
            let list_opt = `<ul>
                <li><input name="${items}" type="radio" value ="${answer_key[0]}" class="option">${opt.a}</li>
                <li><input name="${items}" type="radio" value ="${answer_key[1]}" class="option">${opt.b}</li>
                <li><input name="${items}" type="radio" value ="${answer_key[2]}" class="option">${opt.c}</li>
                <li><input name="${items}" type="radio" value ="${answer_key[3]}" class="option">${opt.d}</li>
            </ul>`;
            document.getElementById('question-area').insertAdjacentHTML('beforeend',questions);
            document.getElementById('question-area').insertAdjacentHTML('beforeend',list_opt);
            question_count++;
        })
        console.log(document.querySelectorAll('li .option').value)
    })
}