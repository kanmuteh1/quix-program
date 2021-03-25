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
        document.getElementById('questions').innerHTML="";
        document.querySelector('main').style = "border: 2px solid black;"
        let question_count = 1;
        answers = [];
        num_of_ques.forEach((items,index) => {
            let get_question = data.questions[items].question;
            answers.push(data.questions[items].answer);
            let opt = data.questions[items].options;
            let answer_key = Object.keys(opt)
            let html = `<div class = "question-area">
            <p>${question_count}. ${get_question}</p>
            <ul>
                <li><input name="${items}" type="radio" value ="${answer_key[0]}" class="option" id="${index}a"><label for="${index}a">${opt.a}</label></li>
                <li><input name="${items}" type="radio" value ="${answer_key[1]}" class="option" id="${index}b"><label for="${index}b">${opt.b}</label></li>
                <li><input name="${items}" type="radio" value ="${answer_key[2]}" class="option" id="${index}c"><label for="${index}c">${opt.c}</label></li>
                <li><input name="${items}" type="radio" value ="${answer_key[3]}" class="option" id="${index}d"><label for="${index}d">${opt.d}</label></li>
            </ul>
            </div>`;
            document.getElementById('questions').insertAdjacentHTML('beforeend',html);
            question_count++;
        })
        choosen_opt = document.querySelectorAll('li .option')
        if(num_of_ques.length !== 0){
            document.getElementById('answers-btn').style="display: block";
        }
    })
    total_score = 0;
    correct = 0;
    wrong = 0;
    document.getElementById('scores').style = "display: none";
}

function finish(){
    document.getElementById('scores').style = "display: block";
    correct = 0;
    wrong = 0;
    let opt_arr = [];
    let opt_count = 0;
    choosen_opt.forEach((data, index)=>{
        if(data.checked){
            opt_arr.push(data.value)
            points = 100 / num_of_ques.length;
            if(answers[opt_count] === opt_arr[opt_count]){
                opt_count++;
                total_score += points;
                data.parentElement.style="background-color: green";
                correct += 1;
                document.getElementById('total-score').innerHTML=`Total Score: ${total_score}%`;
                document.getElementById('correct').innerHTML=`Correct: ${correct}`;
                document.getElementById('wrong').innerHTML=`wrong: ${wrong}`;
            }
            else{
                opt_count++;
                wrong += 1;
                data.parentElement.style="background-color: red";
                document.getElementById('total-score').innerHTML=`Total Score: ${total_score}%`;
                document.getElementById('correct').innerHTML=`Correct: ${correct}`;
                document.getElementById('wrong').innerHTML=`wrong: ${wrong}`;
            }
        }
    })
    choosen_opt.disabled = true;
}

function test(a, fnx){
    return fnx(a)
}
