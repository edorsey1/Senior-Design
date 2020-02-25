'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {WebhookClient} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

var instructionCount = 1;
var ingredientCount = 1;
var recipe;
var changeNum;

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });

  // Assigns database variable depending on title of recipe
  // If no recipe is specified, assign it to default
  /*
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
  } */

  recipe = 'demoRecipe';  // For testing purposes

  // Test function to write to database
  function writeToDb (agent) {
    // Get parameter from Dialogflow with the string to add to the database
    const databaseEntry = agent.parameters.databaseEntry;

    // Get the database collection 'dialogflow' and document 'agent' and store
    // the document  {entry: "<value of database entry>"} in the 'agent' document
    const dialogflowAgentRef = db.collection('dialogflow').doc('agent');
    return db.runTransaction(t => {
      t.set(dialogflowAgentRef, {entry: databaseEntry}, {merge: true});
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
          agent.add(entry);
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
          agent.add(doc.data().instruction.step1.procedure);
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
          agent.add(doc.data().ingredient.i1);
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
          var length = doc.data().numbers.instructions;

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
              instructionCount++;
              num = instructionCount;
              break;
            case 'repeat':
              num = instructionCount;
              break;
            case 'back':
              if (instructionCount == 1) {
                num = 1;
              }
              else {
                instructionCount--;
                num = instructionCount;
              }
              break;
          }

          if (num > length) {
            agent.add('The recipe only has ' + length + ' instructions.');
            agent.add('Please clarify which instruction you would like');
          }
          else if (num == 0)
          {
            agent.add("That is not a valid instruction. Please clarify which instruction you would like.");
          }
          else {
            var key = 'step' + num;
            agent.add(doc.data().instruction[key].procedure);
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
          var length = doc.data().numbers.ingredients;

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
              ingredientCount++;
              num = ingredientCount;
              break;
            case 'repeat':
              num = ingredientCount;
              break;
            case 'back':
              if (ingredientCount == 1) {
                num = 1;
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
            var key = 'i' + num;
            agent.add(doc.data().ingredient[key]);
            ingredientCount = num;
            agent.add('Next?');
          }
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('No data for recipe found. Please try another recipe.');
      });
  }

  // Intent to edit the number of servings in a recipe
  function changeServe (agent) {
    const serveNum = agent.parameters.serveNum;

    const dialogflowAgentRef = db.collection('recipes').doc(recipe);

    if (serveNum) // Error checking to make sure that this parameter has a value
    {
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
    else
    {
      agent.add("Please try again and specify the number of servings you would like to change this recipe to.");
    }
  }

  // Intent to change the time a recipe takes
  function changeTime (agent) {
    const recipeTime = agent.parameters.recipeTime;

    const dialogflowAgentRef = db.collection('recipes').doc(recipe);

    if (recipeTime)
    {
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
    else
    {
      agent.add("Please try again and specify the amount of time this recipe will take.");
    }
  }

  // Intent to change ingredient
  function changeIngredient (agent) {

    const dialogflowAgentRef = db.collection('recipes').doc(recipe);

    const stepNum = agent.parameters.stepNum;
    const ingredientText = agent.parameters.any;
    var num = 1;

    if (stepNum && ingredientText)
    {
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
      }

      var key = ('ingredient.i' + num);

      return db.runTransaction(t => {
        t.update(dialogflowAgentRef, {[key]: ingredientText});
        return Promise.resolve('Write complete');
      }).then(doc => {
        agent.add(`Changed ${stepNum} ingredient to ${ingredientText}.`);
        agent.add('What would you like to do next?');
      }).catch(err => {
        console.log(`Error writing to Firestore: ${err}`);
        agent.add(`Failed to change the ${stepNum} ingredient.`);
        agent.add('What would you like to do next?');
      });
    }
    else
    {
      agent.add("Please try again and specify the number of the ingredient you would like to change and what to change it to.");
    }
  }

  // Intent to launch instruction changing procedure
  function changeInstruction (agent) {

    const dialogflowAgentDoc = db.collection('recipes').doc(recipe);

    const stepNum = agent.parameters.stepNum;

    if (stepNum)
    {
      switch (stepNum) {
        case 'first':
          changeNum = 1;
          break;
        case 'second':
          changeNum = 2;
          break;
        case 'third':
          changeNum = 3;
          break;
        case 'fourth':
          changeNum = 4;
          break;
        case 'fifth':
          changeNum = 5;
          break;
        case 'sixth':
          changeNum = 6;
          break;
        case 'seventh':
          changeNum = 7;
          break;
        case 'eighth':
          changeNum = 8;
          break;
        case 'ninth':
          changeNum = 9;
          break;
        case 'tenth':
          changeNum = 10;
          break;
      }

    if (changeNum){
      return dialogflowAgentDoc.get()
        .then(doc => {
          if (!doc.exists) {
            agent.add('No data for recipe found. Please try another recipe.');
          } else {
            agent.add(`Changing instruction ${changeNum}:`);
            agent.add('Please say "Ingredient is" followed by the ingredient. Say "Ingredient is none" if this instruction does not have an ingredient or "Ingredient is same" if you do not want the ingredient to change.');
          }
          return Promise.resolve('Read complete');
        }).catch(() => {
          agent.add('No data for recipe found. Please try another recipe.');
        });
    }
    else
    {
      agent.add('Please try again and specify the instruction you would like to make edits to.');
    }
  }
}

  // Function to change the ingredient field in the instruction
  function changeInstructionIngredient (agent) {

    const dialogflowAgentRef = db.collection('recipes').doc(recipe);
    const ingredientText = agent.parameters.any;
    var keyI = ('instruction.step' + changeNum + '.ingredient');
    var keyN = ('instruction.step' + changeNum + '.number');

    switch (ingredientText) {
      case 'none':
        return db.runTransaction(t => {
          t.update(dialogflowAgentRef, {[keyI]: '', [keyN]: 0});
          return Promise.resolve('Write complete');
        }).then(doc => {
          agent.add('Ingredient cleared.');
          agent.add('What is the procedure for this instruction? Please say "Procedure is" followed by the instruction procedure.');
        }).catch(err => {
          console.log(`Error writing to Firestore: ${err}`);
          agent.add(`Failed to clear the ingredient in step ${changeNum}.`);
          agent.add('Please try again.');
        });

      case 'same':
        agent.add('Ingredient not changed.');
        agent.add('What is the procedure for this instruction? Please say "Procedure is" followed by the instruction procedure.');
        break;

      default:
        return db.runTransaction(t => {
          t.update(dialogflowAgentRef, {[keyI]: ingredientText});
          return Promise.resolve('Write complete');
        }).then(doc => {
          agent.add(`Changed ingredient to ${ingredientText}.`);
          agent.add('What number ingredient does this instruction correspond to? Please say "Number is" followed by the number. Please say "Number is new" if this is a new ingredient.');
        }).catch(err => {
          console.log(`Error writing to Firestore: ${err}`);
          agent.add(`Failed to clear the ingredient in step ${changeNum}.`);
          agent.add('Please try again.');
        });
      }
  }

  // Function to change the ingredient field in the instruction
  function changeInstructionNumber (agent) {

    const dialogflowAgentRef = db.collection('recipes').doc(recipe);
    //const valueNum = agent.parameters.any;
    const ingredientNum = agent.parameters.stepNum;
    var keyN = ('instruction.step' + changeNum + '.number');

    return db.runTransaction(t => {
      t.update(dialogflowAgentRef, {[keyN]: ingredientNum});
      return Promise.resolve('Write complete');
    }).then(doc => {
      agent.add(`Changed number to ${ingredientNum}.`);
      agent.add('What is the procedure for this instruction? Please say "Procedure is" followed by the instruction procedure.');
    }).catch(err => {
      console.log(`Error writing to Firestore: ${err}`);
      agent.add(`Failed to set the ingredient number in step ${changeNum}.`);
      agent.add('Please try again.');
    });

    // For new just have them specify the last number ? IE 4 if there are 3 ingredients
    // Add in error checking to make sure they don't reference a massively large number??? 

    /*
    if (valueNum == 'new') {
      var length = doc.data().numbers.ingredients;
      var keyL = 'numbers.ingredients';
      var num = length + 1;

      return db.runTransaction(t => {
        t.update(dialogflowAgentRef, {[keyN]: num, [keyL]: num});
        return Promise.resolve('Write complete');
      }).then(doc => {
        agent.add(`Added new ingredient as  ${ingredientNum}.`);
        agent.add('What is the procedure for this instruction? Please say "Procedure is" followed by the instruction procedure.');
      }).catch(err => {
        console.log(`Error writing to Firestore: ${err}`);
        agent.add(`Failed to set the ingredient number in step ${changeNum}.`);
        agent.add('Please try again.');
      });
    }
    else {
    } */
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
  intentMap.set('changeIngredient', changeIngredient);
  intentMap.set('changeInstruction', changeInstruction);
  intentMap.set('changeInstruction - Ingredient', changeInstructionIngredient);
  intentMap.set('changeInstruction - Number', changeInstructionNumber);
  agent.handleRequest(intentMap);
});
