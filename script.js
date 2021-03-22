let subject = document.querySelector('#subject');
let num_of_questions = document.querySelector('#num-of-ques');

let first_sec = document.getElementById('selection-area')
let second_sec = document.getElementById('questions-n-ans');
let num_of_ques;
let points = 0;
let total_score = 0;
let correct = 0;
let wrong = 0;
let answers = [];
let choosen_opt;

function sub(){
    fetch(`https://kit-questions.glitch.me/question/${subject.value}/${num_of_questions.value}`)
    .then((response) => response.json())
    .then((data) =>{
        num_of_ques = Object.keys(data.questions);
        document.getElementById('question-area').innerHTML="";
        let question_count = 1;
        answers = [];
        num_of_ques.forEach((items) => {
            let get_question = data.questions[items].question;
            answers.push(data.questions[items].answer);
            console.log(answers)
            let opt = data.questions[items].options;
            let answer_key = Object.keys(opt)
            let questions = `<p>${question_count}. ${get_question}</p>`;
            let list_opt = `<ul>
                <li><input name="${items}" type="radio" value ="${answer_key[0]}" class="option" id="">${opt.a}</li>
                <li><input name="${items}" type="radio" value ="${answer_key[1]}" class="option">${opt.b}</li>
                <li><input name="${items}" type="radio" value ="${answer_key[2]}" class="option">${opt.c}</li>
                <li><input name="${items}" type="radio" value ="${answer_key[3]}" class="option">${opt.d}</li>
            </ul>`;
            document.getElementById('question-area').insertAdjacentHTML('beforeend',questions);
            document.getElementById('question-area').insertAdjacentHTML('beforeend',list_opt);
            question_count++;
        })
        choosen_opt = document.querySelectorAll('li .option')
    })
    total_score = 0;
    correct = 0;
    wrong = 0;
    document.getElementById('scores').style = "display: none";
    document.getElementById('answers-btn').style = "display: block";
}

function finish(){
    document.getElementById('scores').style = "display: block";
    correct = 0;
    wrong = 0;
    choosen_opt.forEach((data)=>{
        if(data.checked){
            points = 100 / num_of_ques.length;
            if(answers.includes(data.value)){
                total_score += points;
                data.parentElement.style="background-color: green";
                correct += 1;
            }
            else{
                wrong += 1;
                data.parentElement.style="background-color: red";
            }
        }
    })
    document.getElementById('total-score').innerHTML=`Total Score: ${total_score}%`;
    document.getElementById('correct').innerHTML=`Correct: ${correct}`;
    document.getElementById('wrong').innerHTML=`wrong: ${wrong}`;
}
