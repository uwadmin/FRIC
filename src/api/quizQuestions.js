var quizQuestions = [
    {
        question: "What is the emergency?",
        key: 0,
        answers: []
    },
    {
        question: "What Department?",
        key: 1,
        answers: [{
                type: "foo",
                goto: 2,
                content: "1. Police"
            },
            {
                type: "bar",
                goto: 2,
                content: "2. Fire"
            },
            {
                type: "baz",
                goto: 3,
                content: "3. Both"
            }
        ]
    },
    {
        question: "Where is the emergency?",
        key: 2,
        answers: []
    },
    {
        question: "What is the patient's sex?",
        key: 3,
        answers: []
    },   
    {
        question: "What is the patient's age?",
        key: 4,
        answers: []
    },
    {
        question: "Is the person conscious?",
        key: 5,
        answers: [{
                type: "foo",
                goto: 6,
                content: "Yes"
            },
            {
                type: "bar",
                goto: 7,
                content: "No"
            }
        ]
    },
    {
        question: "What is the telephone # you are calling from?",
        key: 6,
        answers: []
    },
    {
        question: "Is the person breathing normally?",
        key: 7,
        answers: [{
            type: "foo",
            result: "9R1",
            content: "Yes"
            },
            {
                type: "bar",
                result: "1M1",
                content: "No"
            }
        ]
    },

];

export default quizQuestions;