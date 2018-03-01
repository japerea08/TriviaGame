//game object
var triviaGame = {
	//properties
	total : 0,

	correctAns: 0,

	incorrectAns: 0,

	unAns: 0,

	gameStarted: false,
	
	gameOver : false,

	duration : 15,

	questions : ["Inside which HTML element do we put the JavaScript?",
				"What is the correct JavaScript syntax to change the content of the HTML element below?",
				 "How do you write 'Hello World' in an alert box?",
				 "How do you create a function in JavaScript?"],

	//array of answers
	answers : [["<scripting>", "<js>", "<script>", "<javascript>"], 
			["document.getElement('p').innerHTML = 'Hello World!';", "#demo.innerHTML = 'Hello World!';", "document.getElementByName('p').innerHTML = 'Hello World!';", "document.getElementById('demo').innerHTML = 'Hello World!';"], 
			["alertBox('Hello World');", "msgBox('Hello World');", "msg('Hello World');", "alert('Hello World');"],
			["function myFunction()", "function:myFunction()", "function = myFunction()", "int myFunction()"]],

	//the correct answers
	solutions : [2, 3, 3, 0],

	currentSolution : 99,

	currentAnswer : "",

	//timer variable to use clear interval
	timer : "",

	//timer for splash screen in between questions
	splashTimer : function(){
		var time = 5; //see splash screen for 3 seconds
		var timer = setInterval(splashTimer, 1000);
		var self = this;

		function splashTimer(){
			if(time == 0){
				clearInterval(timer);
				//call init
				console.log("Done");
				self.displayCelebration(false);
				self.displayCorrect(false);
				self.init();	
			}
			else{
				time--;
			}

		};

	},


	//timer function for gameplay
	setTimer : function(notAnswered){
		if(notAnswered){
			var time = this.duration;
			console.log(time);
			var self = this;

			this.timer = setInterval(setTimer, 1000);

			function setTimer(){
				//checking time left, times up
				if(time == 0){
					//call time up splash
					document.getElementById("timer").innerHTML = "Time Remaining: " + time;
					//stop timer
					clearInterval(self.timer);
					//hide the question
					self.hideQA();
					self.displayCorrect(false, true);
					self.unAns++;
				}
				else{
					time--;
					document.getElementById("timer").innerHTML = "Time Remaining: " + time;
				}

			};

		}
		else{
			clearInterval(this.timer);
		}
	},

	
	//function takes the question and the answer array and populate html element
	displayQA : function(question, answers){
		//display question
		var x = document.getElementById("question");
		x.innerHTML = question;
		x.style.display = "block";

		//jquery to attach tag for answers
		$("#answersList").show();
		//populate list using for loop
		for(var i = 0; i < answers.length; i++){
			var listItem = "#ans" + i.toString();
			$(listItem).text(answers[i]);
		}
		
	},

	//function to hide questions and answers
	hideQA: function(){
		var q = document.getElementById("question");
		var a = document.getElementById("answersList");
		q.style.display = "none";
		a.style.display = "none";
	},


	//function to initialize timer, questions, and answers
	init : function(){
		//load the question, the answers, and the solution
		//this first block will check of we are playing again
		if(this.gameOver){
			this.gameOver = false;
			//reset everything like normal
			$("#replayButton").hide();
			$("#result").hide();
			$("#resultsList").hide();
			this.total = this.incorrectAns = this.correctAns = this.unAns = 0;

		}
		if(this.total != this.questions.length){
			var question = this.questions[this.total];
			var answers = this.answers[this.total];
			//setting the answer
			this.currentSolution = this.solutions[this.total];
			this.currentAnswer = answers[this.currentSolution];
			this.total++;
			//display the question and answers
			this.displayQA(question, answers);
			//set the game timer
			document.getElementById("timer").innerHTML = "Time Remaining: " + this.duration;
			this.setTimer(true);
		}
		else{
			//call results screen
			this.displayResults();
		}
	},

	//function that displays the last screen after finished playing
	displayResults : function(){
		$("#result").text("Below are the Results");
		$("#answered").text("Correct Answers: " + this.correctAns.toString());
		$("#incorrect").text("Incorrect Answers: " + this.incorrectAns.toString());
		$("#unanswered").text("Unanswered: " + this.unAns.toString());
		this.hideQA();
		$("#result").show();
		$("#resultsList").show();
		$("#replayButton").show();
	},

	checkAnswer : function(solution){
		if(solution == this.currentSolution){
			//correct answer
			this.correctAns++;
			//stop timer
			this.setTimer(false);
			//hide the question
			this.hideQA();
			//call correct answer splash screen
			this.displayCelebration(true);
		}
		else{
			//wrong answer
			this.incorrectAns++;
			//stop timer
			this.setTimer(false);
			//hide the question
			this.hideQA();
			//call correct answer splash screen
			this.displayCorrect(true, false);
		}

	},

	//function that will display the celebration screen
	displayCelebration : function(command){
		if(command){
			//display
			this.splashTimer();
			$("#result").text("CORRECT!");
			$("#image1").attr("src", "assets/images/good_job.jpg");
			$("#result").show();
			$("#image1").show();
		}
		else{
			//hide
			$("#result").hide();
			$("#image1").hide();
		}
		
	},

	//function will show the corrected answer and different image
	displayCorrect : function(command, timeUp){
		//means answer was incorrect
		if(command){
			//display
			this.splashTimer();
			$("#result").text("INCORRECT!");
			$("#result").show();
			$("#correctAnswer").text("The correct answer is " + this.currentAnswer);
			$("#correctAnswer").show();
			$("#image1").attr("src", "assets/images/wrong.png");
			$("#image1").show();
		}
		//means time expired
		else if(timeUp){
			this.splashTimer();
			$("#result").text("TIME'S UP!");
			$("#result").show();
			$("#correctAnswer").text("The correct answer is " + this.currentAnswer);
			$("#correctAnswer").show();
			$("#image1").attr("src", "assets/images/wrong.png");
			$("#image1").show();
		}
		else{
			//hide
			$("#image1").hide();
			$("#correctAnswer").hide();
			$("#result").hide();
		}
		
	},

};


//jQuery code
$(document).ready(function(){
	//what the startbutton will call
	$("#startButton").on("click", function(){
		$("#startButton").hide();

		//call the beginning functions
		triviaGame.init();

	});

	//listeners
	$("#ans0").on("click", function(){
		console.log("Answer 1 clicked");
		//call checkAnswer
		triviaGame.checkAnswer(0);

	});

	$("#ans1").on("click", function(){
		console.log("Answer 2 clicked");
		//call checkAnswer
		triviaGame.checkAnswer(1);

	});

	$("#ans2").on("click", function(){
		console.log("Answer 3 clicked");
		//call checkAnswer
		triviaGame.checkAnswer(2);

	});

	$("#ans3").on("click", function(){
		console.log("Answer 4 clicked");
		//call checkAnswer
		triviaGame.checkAnswer(3);
	});

	$("#replayButton").on("click", function(){
		console.log("replay clicked");
		triviaGame.gameOver = true;
		triviaGame.init();

	});

});
