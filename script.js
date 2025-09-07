// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};
// console.log(AssignmentGroup.assignments[0].due_at)
// console.log(new Date())

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

// console.log(new Date(LearnerSubmissions[4].submission.submitted_at))

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0 // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833 // late: (140 - 15) / 150
    }
  ];

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);


// Step 1. Group LearnerSubmissions by learner_Id

let uniqueLearnerID = []

// Step 2. filter out assignments that are past due date or not due yet
let today = new Date()
// console.log(today)

//This is loop #1
for (let i= 0; i < LearnerSubmissions.length; i++) {
    let currentLearnerID = LearnerSubmissions[i].learner_id;
    let allSubmissionsByLearner = [];
    //this is loop #1 if statement. 
    if (uniqueLearnerID.indexOf(currentLearnerID) == -1) {
        uniqueLearnerID.push(currentLearnerID);
    } else {
        continue;
    }
    //This is loop #2
    for (let j = 0; j < LearnerSubmissions.length; j++) {
        //This is loop #2 if statement
        let newLearnerID = LearnerSubmissions[j].learner_id
        if (currentLearnerID === newLearnerID) {
            // If Learner ID i === Learner ID j => push Object into the array allSubmissionsByLearner
             //this is loop #3
            for (let k = 0; k < AssignmentGroup.assignments.length; k++) {
                let assignmentIDJ = LearnerSubmissions[j].assignment_id;
                let assignmentIDK = AssignmentGroup.assignments[k].id;
                // Step 2. filter out assignments that are past due date or not due yet
                let jDate = new Date(LearnerSubmissions[j].submission.submitted_at)
                let kDate = new Date(AssignmentGroup.assignments[k].due_at)
                if (assignmentIDJ === assignmentIDK && kDate <= today) {
                    allSubmissionsByLearner.push(LearnerSubmissions[j]);
                } else {
                    continue;
                }
            }
        } else {
            continue;
        }
      
    }
    // console.log("id:", currentLearnerID, "Number of Learner Submissions:", allSubmissionsByLearner.length)
    console.log("id:", currentLearnerID, "Learner Submissions", allSubmissionsByLearner)
}







