'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {WebhookClient} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

var count = 0;

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
  function start (agent) {
    const dialogflowAgentDoc = db.collection('recipes').doc('demoRecipe');

    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data for recipe found');
        } else {
          agent.add('Starting the recipe for ' + doc.data().title);
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('No data for recipe found');
      });
  }

  // Intent to return recipe details
  function details (agent) {
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

  // Intent to return instructions
  function ingredientRead (agent) {
    const dialogflowAgentDoc = db.collection('recipes').doc('demoRecipe');
    var i;
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data for recipe found');
        } else {
          agent.add('The ingredients for this recipe are: ');
          for (i = 0; i < 3; i++) {
            agent.add(doc.data().ingredient[i]);
          }
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('No data for recipe found');
      });
  }

  // Intent to read each instruction
  function next (agent) {
    const dialogflowAgentDoc = db.collection('recipes').doc('demoRecipe');
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data for recipe found');
        } else {
          if (count < 7) {
            agent.add(doc.data().instruction[count]);
          }
          else {
            agent.add('You are finished!');
          }
          count++;
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('No data for recipe found');
      });
  }

  // Intent to repeat previous instruction
  function repeat (agent) {
    const dialogflowAgentDoc = db.collection('recipes').doc('demoRecipe');
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data for recipe found');
        } else {
          if (count <= 7) {
            agent.add(doc.data().instruction[count-1]);
          }
          else {
            agent.add('You are finished!');
          }
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('No data for recipe found');
      });
  }

  // Intent to jump to a specific instruction
  function jump1 (agent) {
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
              num = length - 1;
              break;
          }

          if ((num > length) || (num == 0)) {
            agent.add('The recipe only has ' + length + ' instructions.');
          }
          else {
            agent.add(doc.data().instruction[num-1]);
            count = num;
          }
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('No data for recipe found');
      });
  }

  // Intent to jump to a specific ingredient
  function jump2 (agent) {
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
              num = length - 1;
              break;
          }

          if ((num > length) || (num == 0)) {
            agent.add('The recipe only has ' + length + ' ingredients.');
          }
          else {
            agent.add(doc.data().ingredient[num-1]);
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
  intentMap.set('recipeStart', start);
  intentMap.set('recipeDetails', details);
  intentMap.set('ingredientStart', ingredientRead);
  intentMap.set('instructionNext', next);
  intentMap.set('instructionRepeat', repeat);
  intentMap.set('instructionJump', jump1);
  intentMap.set('ingredientJump', jump2);
  agent.handleRequest(intentMap);
});
