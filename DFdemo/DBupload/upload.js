'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {WebhookClient} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

var instructionCount = 0;
var ingredientCount = 0;

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });

  // Test function to write to database
  function writeToDb (agent) {
    // Get parameter from Dialogflow with the string to add to the database
    const databaseEntry = agent.parameters.databaseEntry;

    // Get the database collection 'dialogflow' and document 'agent' and store
    // the document  {entry: "<value of database entry>"} in the 'agent' document
    const dialogflowAgentRef = db.collection('dialogflow').doc('agent');
    return db.runTransaction(t => {
      t.set(dialogflowAgentRef, {entry: databaseEntry});
      return Promise.resolve('Write complete');
    }).then(doc => {
      agent.add(`Wrote "${databaseEntry}" to the Firestore database.`);
    }).catch(err => {
      console.log(`Error writing to Firestore: ${err}`);
      agent.add(`Failed to write "${databaseEntry}" to the Firestore database.`);
    });
  }

  // Test function to read from database
  function readFromDb (agent) {
    // Get the database collection 'dialogflow' and document 'agent'
    const dialogflowAgentDoc = db.collection('dialogflow').doc('agent');

    // Get the value of 'entry' in the document and send it to the user
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data found in the database!');
        } else {
          agent.add(doc.data().entry);
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('Error reading entry from the Firestore database.');
        agent.add('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
      });
  }

  // Intent to begin recipe by retrieving title
  function recipeStart (agent) {
    const dialogflowAgentDoc = db.collection('recipes').doc('demoRecipe');

    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data for recipe found');
        } else {
          agent.add('This recipe is for ' + doc.data().title);
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('No data for recipe found');
      });
  }

  // Intent to return recipe details
  function recipeDetails (agent) {
    const dialogflowAgentDoc = db.collection('recipes').doc('demoRecipe');

    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data for recipe found');
        } else {
          agent.add('Details for this recipe: ' + doc.data().detail);
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('No data for recipe found');
      });
  }

  // Intent to start instructions
  function instructionStart (agent) {
    const dialogflowAgentDoc = db.collection('recipes').doc('demoRecipe');
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data for recipe found');
        } else {
          agent.add('The first instruction is: ');
          agent.add(doc.data().instruction[0]);
          instructionCount++;
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('No data for recipe found');
      });
  }

  // Intent to start ingredients
  function ingredientStart (agent) {
    const dialogflowAgentDoc = db.collection('recipes').doc('demoRecipe');
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data for recipe found');
        } else {
          agent.add('The first ingredient is: ');
          agent.add(doc.data().ingredient[0]);
          ingredientCount++;
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('No data for recipe found');
      });
  }

  // Intent to jump to a specific instruction
  function instructionJump (agent) {
    const stepNum = agent.parameters.stepNum;
    var num = 0;
    const dialogflowAgentDoc = db.collection('recipes').doc('demoRecipe');
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('This recipe does not exist');
        }
        else {
          var length = doc.data().instruction.length;

          switch (stepNum) {
            case 'first':
              num = 1;
              break;
            case 'second':
              num = 2;
              break;
            case 'third':
              num = 3;
              break;
            case 'fourth':
              num = 4;
              break;
            case 'fifth':
              num = 5;
              break;
            case 'sixth':
              num = 6;
              break;
            case 'seventh':
              num = 7;
              break;
            case 'eighth':
              num = 8;
              break;
            case 'ninth':
              num = 9;
              break;
            case 'tenth':
              num = 10;
              break;
            case 'last':
              num = length;
              break;
            case 'next':
              if (instructionCount == 0) {
                num = 1;
              }
              else {
                instructionCount++;
                num = instructionCount;
              }
              break;
            case 'repeat':
              num = instructionCount;
              break;
            case 'back':
              if (instructionCount == 0) {
                num = 0;
              }
              else {
                instructionCount--;
                num = instructionCount;
              }
              break;
          }

          if (num > length) {
            agent.add('The recipe only has ' + length + ' instructions.');
          }
          else if (num == 0)
          {
            agent.add("That is not a valid instruction. Please clarify which instruction you would like.")
          }
          else {
            agent.add(doc.data().instruction[num-1]);
            instructionCount = num;
          }
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('No data for recipe found');
      });
  }

  // Intent to jump to a specific ingredient
  function ingredientJump (agent) {
    const stepNum = agent.parameters.stepNum;
    var num = 0;
    const dialogflowAgentDoc = db.collection('recipes').doc('demoRecipe');
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('This recipe does not exist');
        }
        else {
          var length = doc.data().ingredient.length;

          switch (stepNum) {
            case 'first':
              num = 1;
              break;
            case 'second':
              num = 2;
              break;
            case 'third':
              num = 3;
              break;
            case 'fourth':
              num = 4;
              break;
            case 'fifth':
              num = 5;
              break;
            case 'sixth':
              num = 6;
              break;
            case 'seventh':
              num = 7;
              break;
            case 'eighth':
              num = 8;
              break;
            case 'ninth':
              num = 9;
              break;
            case 'tenth':
              num = 10;
              break;
            case 'last':
              num = length;
              break;
            case 'next':
              if (ingredientCount == 0) {
                num = 1;
              }
              else {
                ingredientCount++;
                num = ingredientCount;
              }
              break;
            case 'repeat':
              num = ingredientCount;
              break;
            case 'back':
              if (ingredientCount == 0) {
                num = 0;
              }
              else {
                ingredientCount--;
                num = ingredientCount;
              }
              break;
          }

          if (num > length) {
            agent.add('The recipe only has ' + length + ' ingredients.');
          }
          else if (num == 0)
          {
            agent.add("That is not a valid ingredient. Please clarify which ingredient you would like.")
          }
          else {
            agent.add(doc.data().ingredient[num-1]);
            ingredientCount = num;
          }
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('No data for recipe found');
      });
  }

  // Map from Dialogflow intent names to functions to be run when the intent is matched
  let intentMap = new Map();
  intentMap.set('ReadFromFirestore', readFromDb);
  intentMap.set('WriteToFirestore', writeToDb);
  intentMap.set('recipeStart', recipeStart);
  intentMap.set('recipeDetails', recipeDetails);
  intentMap.set('instructionStart', instructionStart);
  intentMap.set('ingredientStart', ingredientStart);
  intentMap.set('instructionJump', instructionJump);
  intentMap.set('ingredientJump', ingredientJump);
  agent.handleRequest(intentMap);
});
