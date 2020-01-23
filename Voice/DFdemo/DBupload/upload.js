'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {WebhookClient} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

var instructionCount = 0;
var ingredientCount = 0;
var recipe;

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });

  // Assigns database variable depending on title of recipe
  // If no recipe is specified, assign it to default
  try {
    const recipeTitle = agent.parameters.recipeTitle;
    if (recipeTitle == 'Peanut Butter Cups')
    {
      recipe = 'PeanutButterCups';
    }
    else if ((recipeTitle == 'Beef and Broccoli') || (recipeTitle == 'Beef and Broccoli Stir Fry'))
    {
      recipe = 'BeefandBroccoli';
    }
  } catch (err) {
    recipe = 'Test-123';
  }

  if (recipe == null) {
    recipe = 'Test-123';
  }

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

    const dialogflowAgentDoc = db.collection('recipes').doc(recipe);

    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data for recipe found. Please try another recipe.');
        } else {
          agent.add('This recipe is for ' + doc.data().title);
          agent.add('Would you like to hear the servings, time, ingredients, or instructions for this recipe?');
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('No data for recipe found. Please try another recipe.');
      });
  }

  // Intent to return recipe servings
  function recipeServe (agent) {
    const dialogflowAgentDoc = db.collection('recipes').doc(recipe);

    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data for recipe found. Please try another recipe.');
        } else {
          agent.add('This recipe makes: ' + doc.data().servings);
          agent.add('Would you like to hear the time, ingredients, or instructions for this recipe?');
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('No data for recipe found. Please try another recipe.');
      });
  }

  // Intent to return recipe time
  function recipeTime (agent) {
    const dialogflowAgentDoc = db.collection('recipes').doc(recipe);

    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data for recipe found. Please try another recipe.');
        } else {
          agent.add('This recipe takes: ' + doc.data().time);
          agent.add('Would you like to hear the servings, ingredients, or instructions for this recipe?');
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('No data for recipe found. Please try another recipe.');
      });
  }

  // Intent to start instructions
  function instructionStart (agent) {
    const dialogflowAgentDoc = db.collection('recipes').doc(recipe);
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data for recipe found. Please try another recipe.');
        } else {
          agent.add('The first instruction is: ');
          agent.add(doc.data().instruction[0]);
          instructionCount++;
          agent.add('Next?');
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('No data for recipe found. Please try another recipe.');
      });
  }

  // Intent to start ingredients
  function ingredientStart (agent) {
    const dialogflowAgentDoc = db.collection('recipes').doc(recipe);
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data for recipe found. Please try another recipe.');
        } else {
          agent.add('The first ingredient is: ');
          agent.add(doc.data().ingredient[0]);
          ingredientCount++;
          agent.add('Next?');
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('No data for recipe found. Please try another recipe.');
      });
  }

  // Intent to jump to a specific instruction
  function instructionJump (agent) {
    const stepNum = agent.parameters.stepNum;
    var num = 0;
    const dialogflowAgentDoc = db.collection('recipes').doc(recipe);
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('This recipe does not exist.. Please try another recipe.');
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
            agent.add('Please clarify which instruction you would like.');
          }
          else if (num == 0)
          {
            agent.add("That is not a valid instruction. Please clarify which instruction you would like.");
          }
          else {
            agent.add(doc.data().instruction[num-1]);
            instructionCount = num;
            agent.add('Next?');
          }
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('No data for recipe found. Please try another recipe.');
      });
  }

  // Intent to jump to a specific ingredient
  function ingredientJump (agent) {
    const stepNum = agent.parameters.stepNum;
    var num = 0;
    const dialogflowAgentDoc = db.collection('recipes').doc(recipe);
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('This recipe does not exist. Please try another recipe.');
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
            agent.add('Please clarify which ingredient you would like');
          }
          else if (num == 0)
          {
            agent.add("That is not a valid ingredient. Please clarify which ingredient you would like.");
          }
          else {
            agent.add(doc.data().ingredient[num-1]);
            ingredientCount = num;
            agent.add('Next?');
          }
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('No data for recipe found. Please try another recipe.');
      });
  }

  function changeServe (agent) {
    // Get parameter from Dialogflow with the string to add to the database
    const serveNum = agent.parameters.serveNum;

    const dialogflowAgentRef = db.collection('recipes').doc(recipe);
    return db.runTransaction(t => {
      t.update(dialogflowAgentRef, {servings: `${serveNum} servings`});
      return Promise.resolve('Write complete');
    }).then(doc => {
      agent.add(`Changed recipe to make ${serveNum} servings.`);
      agent.add('What would you like to do next?');
    }).catch(err => {
      console.log(`Error writing to Firestore: ${err}`);
      agent.add(`Failed to change recipe to make ${serveNum} servings.`);
      agent.add('What would you like to do next?');
    });
  }

  function changeTime (agent) {
    // Get parameter from Dialogflow with the string to add to the database
    const recipeTime = agent.parameters.recipeTime;

    const dialogflowAgentRef = db.collection('recipes').doc(recipe);
    return db.runTransaction(t => {
      t.update(dialogflowAgentRef, {time: recipeTime});
      return Promise.resolve('Write complete');
    }).then(doc => {
      agent.add(`Changed recipe to take ${recipeTime}.`);
      agent.add('What would you like to do next?');
    }).catch(err => {
      console.log(`Error writing to Firestore: ${err}`);
      agent.add(`Failed to change recipe to take ${recipeTime}.`);
      agent.add('What would you like to do next?');
    });
  }

  // Map from Dialogflow intent names to functions to be run when the intent is matched
  let intentMap = new Map();
  intentMap.set('ReadFromFirestore', readFromDb);
  intentMap.set('WriteToFirestore', writeToDb);
  intentMap.set('recipeStart', recipeStart);
  intentMap.set('recipeServe', recipeServe);
  intentMap.set('recipeTime', recipeTime);
  intentMap.set('instructionStart', instructionStart);
  intentMap.set('ingredientStart', ingredientStart);
  intentMap.set('instructionJump', instructionJump);
  intentMap.set('ingredientJump', ingredientJump);
  intentMap.set('changeServe', changeServe);
  intentMap.set('changeTime', changeTime);
  agent.handleRequest(intentMap);
});
