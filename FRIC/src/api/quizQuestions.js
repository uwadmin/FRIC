var quizQuestions = [{
        question: "What is the emergency?",
        key: 0,
        answers: [{
                type: "foo",
                goto: 1,
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
        question: "Call back number:",
        key: 1,
        answers: []
    },
    {
        question: "Are you involved?",
        key: 2,
        answers: [{
                type: "foo",
                goto: 3,
                content: "Yes"
            },
            {
                type: "bar",
                result: "404",
                content: "No"
            }
        ]
    },
    {
        question: "What's your location?",
        key: 3,
        answers: []
    },
    {
        question: "Are there any injured victims",
        key: 4,
        answers: [{
                result: "200",
                type: "foo",
                content: "Yes"
            },
            {
                result: "502",
                type: "bar",
                content: "No"
            },
        ]
    }
];

export default quizQuestions;