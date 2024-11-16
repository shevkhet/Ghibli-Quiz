import express from "express";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { constants } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
/*
Define variables which are common to different http requests
*/
const API_URL="https://ghibliapi.vercel.app"
var APILength = 0
var answersChoices = []
var descriptionChoices = []
var count = 0
var answersChoosed = []
var goodAnswers = []


app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

app.get("/", async(req, res) => {
    try {
        const response = await axios.get(API_URL + "/films");
        const result = response.data;

        /*
        Step 1.1:
        record every films titles and descriptions documented in the API in two different lists
        */
        APILength = result.length
        for (var i = 0; i < APILength; i ++) {
            answersChoices.push(result[i].title);
            descriptionChoices.push(result[i].description);
        };
        
        /* 
        Step 1.2:
        render the homepage website
        */
        res.render("index.ejs");

    } catch (error) {
        console.log(error.result)
    }
});

app.post("/quizz", (req, res) => {
    /*
    Step 2.1:
    part of this program is called when the user clicks on "Start Quiz"
    */
    try {
    /*
    Step 2.2:
    .1 the variable count increment +1 and is related to the question counter (question 1, question 2...)
    .2 a random number based on the API list of film length is defined (var. indexGAnswer)
        > permits to pick up a random title and its description, and are associated to variables (var. titlePicked and descriptionPicked)
        > those elements are then removed from the lists (answersChoices and descriptionChoices) to avoid potential repetition
    .3 the good answer (var. titlePicked) is added to a list recording every good answers (var. goodAnswers)
    .4 a random number base on the list answerChoices' length is defined (var. indexWAnswer)
        > permits to pick up a random title, and is associated to variable (var errorPicked)
    .5 the question is then rendered
    .6 assigns a random number to the variable qCounter which permits to place the good question in first or second position
        > so the position of the good answer is randomly placed at the first or second place of the propositions
    */
        count ++ ;
        const indexGAnswer = Math.floor(Math.random()*(answersChoices.length - 1));
        const titlePicked = answersChoices[indexGAnswer];
        const descriptionPicked = descriptionChoices[indexGAnswer];
        goodAnswers.push(titlePicked)

        answersChoices.splice(indexGAnswer, 1)
        descriptionChoices.splice(indexGAnswer,1)

        const indexWAnswer = Math.floor(Math.random()*(answersChoices.length - 1));
        const errorPicked = answersChoices[indexWAnswer];

        var orderGAnswer = Math.floor(Math.random()*2)

        res.render("quizz.ejs", { 
            qDescription: descriptionPicked,
            answer1: titlePicked,
            answer2: errorPicked,
            order: orderGAnswer,
            qCounter: count,
        })

        console.log(count + ". " + "Good answers:" + goodAnswers)

        } catch (error) {
            console.log(error.result)
        }
    });

app.post("/answer1", (req, res) => {

    /*
    Step 3.1:
    part of this program is called when the user chooses an answer, and click on the TOP BUTTON
    .1 record the answer in a variable (var. answersChoosed)
    .2 increment + 1 to the question counter
    */

    answersChoosed.push(req.body["answerTOP"])
    count ++
    /*
    Step 3.2:
    7 questions are asked, an if conditions is placed and the program is run as long as the 7th is not reached.
    */
    if (count < 8) {
        try {
    /* Step 3.4:
    actions from point 2.2 are reproduced
    */
            const indexGAnswer = Math.floor(Math.random()*(answersChoices.length - 1));
            const titlePicked = answersChoices[indexGAnswer];
            const descriptionPicked = descriptionChoices[indexGAnswer];
            goodAnswers.push(titlePicked)

            answersChoices.splice(indexGAnswer, 1)
            descriptionChoices.splice(indexGAnswer,1)

            const indexWAnswer = Math.floor(Math.random()*(answersChoices.length - 1));
            const errorPicked = answersChoices[indexWAnswer];

            var orderGAnswer = Math.floor(Math.random()*2)

            res.render("quizz.ejs", { 
                qDescription: descriptionPicked,
                answer1: titlePicked,
                answer2: errorPicked,
                order: orderGAnswer,
                qCounter: count,
            })

            } catch (error) {
                console.log(error.result)
            }
    } else {
        try {
    /*
    Step 4.1:
    this program is run when the 7th question is answered
    .1 each element of lists goodsAnswers and answerChoosed are compared
    .2 every time the user has answered correctly to the question, +1 is incremented to the variable score
    .3 render a ejs file with the score of the user
    */
            var score = 0
            for (var z = 0; z < 7; z++) {
                console.log(z + ". good answer: " + goodAnswers[z]);
                console.log(z + ". choosed answer: " + answersChoosed[z]);
                if (goodAnswers[z] === answersChoosed[z]) {
                    score ++;
                }
            }
            console.log(score)
            res.render("result.ejs", {
                finalScore: score
            })

        }   catch (error) {
                console.log(error.result)
        }

    }
})

app.post("/answer2", (req, res) => {

    /*
    Step 3.1:
    part of this program is called when the user chooses an answer, and click on the BOTTOM BUTTON
    the descption of the post request ("/answer1") apply here
    */

    answersChoosed.push(req.body["answerBTM"])
    count ++

    if (count < 8) {
        try {
        
            const indexGAnswer = Math.floor(Math.random()*(answersChoices.length - 1));
            const titlePicked = answersChoices[indexGAnswer];
            const descriptionPicked = descriptionChoices[indexGAnswer];
            goodAnswers.push(titlePicked)

            answersChoices.splice(indexGAnswer, 1)
            descriptionChoices.splice(indexGAnswer,1)

            const indexWAnswer = Math.floor(Math.random()*(answersChoices.length - 1));
            const errorPicked = answersChoices[indexWAnswer];

            var orderGAnswer = Math.floor(Math.random()*2)

            res.render("quizz.ejs", { 
                qDescription: descriptionPicked,
                answer1: titlePicked,
                answer2: errorPicked,
                order: orderGAnswer,
                qCounter: count,
            })
            console.log(count + ". " + "Good answer: " + goodAnswers)

            } catch (error) {
                console.log(error.result)
            }
    } else {
        try {
            console.log("final good answers:" + goodAnswers)
            console.log("final chosen answers:" + answersChoosed)

            var score = 0
            for (var z = 0; z < 7; z++) {
                console.log(z + ". good answer: " + goodAnswers[z]);
                console.log(z + ". choosed answer: " + answersChoosed[z]);
                if (goodAnswers[z] === answersChoosed[z]) {
                    score ++;
                }
            }
            console.log(score)
            res.render("result.ejs", {
                finalScore: score
            })

        }   catch (error) {
                console.log(error.result)
        }

    }
})