// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
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
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
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
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

// console.log(new Date(LearnerSubmissions[4].submission.submitted_at))

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0, // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833, // late: (140 - 15) / 150
    },
  ];

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

//part1 Unique ID for learner submissions

const finalResult = [];

for (let i = 0; i < LearnerSubmissions.length; i++) {
  const learnerResults = {};
  learnerResults.id = LearnerSubmissions[i].learner_id;
  // console.log(finalResult);
  let isUnique = true;
  for (let j = 0; j < finalResult.length; j++) {
    // if statement to identify unique learner ID
    if (finalResult[j].id === learnerResults.id) {
      isUnique = false;
      break;
    } else {
      continue;
    }
  }
  if (isUnique) {
    finalResult.push(learnerResults);
  } else {
    continue;
  }

  // const learnerResults = {};
  let today = new Date();
  // console.log(today)

  //Part 2 assign ID to finalResult
  for (let k = 0; k < AssignmentGroup.assignments.length; k++) {
    let dueAtDate = new Date(AssignmentGroup.assignments[k].due_at);
    if (dueAtDate <= today) {
      const finalAssignmentID = AssignmentGroup.assignments[k].id;
      learnerResults[finalAssignmentID] = "Placeholder";
      let avg = "avg";
      learnerResults[avg] = "placeholder";
    }
  }
  // console.log(learnerResults)
}
console.log(finalResult);

// Step 1. Group LearnerSubmissions by learner_Id

let uniqueLearnerID = [];

// Step 2. filter out assignments that are past due date or not due yet
let today = new Date();
// console.log(today)

// step 3. calculate avg

//This is loop #1
for (let i = 0; i < LearnerSubmissions.length; i++) {
  let currentLearnerID = LearnerSubmissions[i].learner_id;
  let allSubmissionsByLearner = [];
  // finalResult.push(finalResult)
  //this is loop #1 if statement.
  if (uniqueLearnerID.indexOf(currentLearnerID) == -1) {
    uniqueLearnerID.push(currentLearnerID);
  } else {
    continue;
  }
  // step 3. store grades into variables
  let assignmentScore = 0;
  let highestPossibleScore = 0;
  //This is loop #2
  for (let j = 0; j < LearnerSubmissions.length; j++) {
    //This is loop #2 if statement
    let newLearnerID = LearnerSubmissions[j].learner_id;

    if (currentLearnerID === newLearnerID) {
      // If Learner ID i === Learner ID j => push Object into the array allSubmissionsByLearner
      //this is loop #3
      for (let k = 0; k < AssignmentGroup.assignments.length; k++) {
        let assignmentIDJ = LearnerSubmissions[j].assignment_id;
        let assignmentIDK = AssignmentGroup.assignments[k].id;
        // Step 2. filter out assignments that are not due yet
        let jDate = new Date(LearnerSubmissions[j].submission.submitted_at);
        //step 3. create let kDate variable to obtain late submissions down in if statement within if statement
        let kDate = new Date(AssignmentGroup.assignments[k].due_at);
        if (
          assignmentIDJ === assignmentIDK &&
          kDate <= today &&
          jDate <= kDate
        ) {
          allSubmissionsByLearner.push(LearnerSubmissions[j]);
          // step 3. push obtained assignment score to assignmentScore variable.
          let score = LearnerSubmissions[j].submission.score;

          console.log(score);

          // Loop #3 else if stament to catch late submissions
        } else if (
          assignmentIDJ === assignmentIDK &&
          kDate <= today &&
          jDate > kDate
        ) {
          // step 3. push obtained assignment score after susbtracting 10% to assignmentScore variable.
          let subtractedScore = LearnerSubmissions[j].submission.score * 0.9;
          allSubmissionsByLearner.push(LearnerSubmissions[j]);
          console.log(subtractedScore);
        } else {
          continue;
        }
      }
    } else {
      continue;
    }
  }
  console.log(
    "id:",
    currentLearnerID,
    "Learner Submissions",
    allSubmissionsByLearner
  );
  
}

// step 4. get the assignments due now

function assignmentDueNow(group, today) {
  const listOfAssignmentDueNow = {};
  for (let i = 0; i < group.assignments.length; i++) {
    let dueDate = group.assignments[i].due_at;
    if (new Date(dueDate) <= today && group.assignments[i].points_possible > 0) { 
      listOfAssignmentDueNow[group.assignments[i].id] = group.assignments[i]; }
  } return listOfAssignmentDueNow;
}

console.log(assignmentDueNow(AssignmentGroup, today))