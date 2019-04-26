(function() {

  var questions = new Stack();
  var questionsAns = new Stack();
  var quiz = $('#quiz'); //Quiz div object
  var resCodes = $('#codes');
  
  function Stack() {
    this.dataStore = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
    this.peek = peek;
    this.length = length;
 }
 
 function push(element) {
    this.dataStore[this.top++] = element;
 }
 
 function peek() {
    return this.dataStore[this.top-1];
 }
 
 function pop() {
    this.top = this.top - 1;
    return this.dataStore.pop();
 }
 
 function length() {
    return this.top;
 }

 /*function Queue() {
   this.items = [];
   this.enqueue = enqueue;
   this.dequeue = dequeue;
   this.isEmpty = isEmpty;
   this.front = front;
 }

 function enqueue(element){
   this.items.push(element);
 }

 function dequeue(){
   return this.items.shift();
 }

 function front(){
   return this.items[0];
 }

 function isEmpty(){
   return this.items.length == 0;
 }*/

questions.push({
  question: "Does the patient respond to you?",
  choices: ["Yes", "No"],
  codes: ["6M1: Unconscious or not breathing", "6M2: Obvious DOA - child", "6R1: Obvious DOA - no CPR in progress", "6R2: Verbal confirmation of Do Not Resuscitate Order on premise"],
  followupQueueYes: [0],
  followupYes: null,
  recc: "Medical response not urgent, recommend personal transportation to a care provider, or apply BLS Code Yellow.",
  followupQueueNo: [1],
  
  followupNo: {
    question:"Does the patient respond to your voice?", 
    choices: ["Yes", "No"], 
    codes:["6M1: Unconscious or not breathing", "6M2: Obvious DOA - child", "6R1: Obvious DOA - no CPR in progress", "6R2: Verbal confirmation of Do Not Resuscitate Order on premise"], 
    followupQueueYes:[0],
    followupYes: null,
    recc: "Demonstrating a lack of awareness in response. Recommend transportation to medical providers, or apply BLS Code Red.",
    followupQueueNo:[1], 
    
    followupNo:{
      question:"Does the patient respond to contact?", 
      choices: ["Yes", "No"], 
      codes:["6M1: Unconscious or not breathing", "6M2: Obvious DOA - child", "6R1: Obvious DOA - no CPR in progress", "6R2: Verbal confirmation of Do Not Resuscitate Order on premise"], 
      followupQueueYes:[0],
      followupYes: null,
      recc: "Patient does not respond verbally, but is conscious. Recommend BLS Code Red.",
      followupQueueNo:[1], 
      
      followupNo:{
        question:"Does the patient's chest rise and fall?", 
        choices: ["Yes", "No"], 
        codes:["6M1: Unconscious or not breathing", "6M2: Obvious DOA - child", "6R1: Obvious DOA - no CPR in progress", "6R2: Verbal confirmation of Do Not Resuscitate Order on premise"], 
        followupQueueYes:[0],
        
        followupYes: {
          question:"Is the patient breathing normally?", 
          choices: ["Yes", "No"], 
          codes:["6M1: Unconscious or not breathing", "6R2: Verbal confirmation of Do Not Resuscitate Order on premise"], 
          followupQueueYes:[0],
          followupYes: null,
          recc: "Go directly to Unconscious/Breathing PAI. Recommend 6M1 response.",
          followupQueueNo:[1],
          
          followupNo:{
            question:"Describe the paitent's breathing.", 
            choices: [-1],
            codes:["6M1: Unconscious or not breathing","6R2: Verbal confirmation of Do Not Resuscitate Order on premise"], 
            followupQueueYes: null,
            followupYes: null,
            recc: "Begin age-appropriate CPR PAI. Recommend 6M1 Response.",
            followupQueueNo: null,
            followupNo: null,
          }
        },
        followupQueueNo:[1], 
        
        followupNo:{
          question:"Is there an AED available?", 
          choices: ["Yes", "No"], 
          codes:["6M1: Unconscious or not breathing", "6M2: Obvious DOA - child", "6R1: Obvious DOA - no CPR in progress", "6R2: Verbal confirmation of Do Not Resuscitate Order on premise"], 
          followupQueueYes:[0],
          followupYes: null,
          Recc: "Begin AED PAI if AED is available, otherwise begin age-appropriate CPR PAI. Recommend 6M1 Response.",
          followupQueueNo: [1],
          followupNo: null
        }
      }
    }
  }
});

  // Display initial question
  displayNext();
  
  /*document.getElementById('radioB').addEventListener("keypress", function(event){
    event.preventDefault();
    if(event.keyCode == 13){
      document.getElementById('next').click();
    }
  })*/

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
      if(questions.length() === 0){
        document.getElementById("next").style.display = "none";
      }else{
        displayNext();
      }
  });
  



  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionsAns = new Stack();
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  function createCodeChioces(cod){
    var cElem = $('<div>', {
      id: 'codeList',
      class: "list-group"
    });

    var codeListSet = createCodeList(cod);
    cElem.append(codeListSet);
    return cElem;
  }

  function createCodeList(lis){
    var buttonList = $('<div>');
    var item;
    for (var i = 0; i < lis.length; i++){
        item = document.createElement('button');
        item.setAttribute ('type', 'button');
        item.setAttribute ('class', 'list-group-item list-group-item-action');
        item.innerHTML = lis[i];
        buttonList.append(item);
    }
    return buttonList;
  }

  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(element) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var question = $('<p>').append(element.question);
    qElement.append(question);

    if(element.choices.length > 1){
      var radioButtons = createRadios(element);
      qElement.append(radioButtons);
    }else if(element.choices[0] === -1){
      var textForm = document.createElement("textarea");
      textForm.setAttribute('class', 'form-control');
      textForm.setAttribute('rows', '6');
      textForm.setAttribute('id', 'response');
      qElement.append(textForm);
    }
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(element) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < element.choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" id="radioB" name="answer" value=' + i + ' />';
      input += element.choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    var ques = questions.peek().question;
    var ans;
    if(questions.peek().choices.length > 1){
      ans = +$('input[name="answer"]:checked').val();
      
      if(ans == questions.peek().followupQueueYes){
        if(questions.peek().followupYes == null){
          displayRecommendation(questions.pop());
        }else{
          var newQuestion = questions.pop().followupYes;
          questions.push(newQuestion)
        }
      }else if (ans == questions.peek().followupQueueNo){
        if(questions.peek().followupNo[0] = null){
          displayRecommendation(questions.pop());
        }else{
          var newQuestion = questions.pop().followupNo;
          questions.push(newQuestion);
        }
     }
    }else if (questions.peek().choices[0] == -1){
      ans = document.getElementById("response").value;
      displayRecommendation(questions.pop());
    }
    var quesAndAns = {question: ques, answer: ans};
    questionsAns.push(quesAndAns);
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      $('#codeList').remove();
      
      if(questions.peek() !== null){
        resCodes.append(createCodeChioces(questions.peek().codes));
        var nextQuestion = createQuestionElement(questions.peek());
        quiz.append(nextQuestion).fadeIn();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayRecommendation(question) {
    $('#question').remove();
    $('#codeList').remove();

    resCodes.append(createCodeChioces(question.codes));
    var reccomendation = createRecommendation(question);
    quiz.append(reccomendation).fadeIn();
  }

  function createRecommendation(element) {
    var qElement = $('<div>', {
      id: 'solution'
    });
    
    var rec = $('<p>').append(element.recc);
    qElement.append(rec);
    
    return qElement;
  }
})();