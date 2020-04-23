# IoT_Kitchen
Senior Design Project Team 21

### Repository Directory
Arduino Test Code - All Arduino code.  Most recent test code is Scale_Micro and Temp_Micro.

Bluetooth - 

MealDB - Code for database of recipes for use in app with categories, recipes, instructions etc.

Reports - Contains copies of all written reports and testing for the Fall and Spring semesters

Voice - NLU text to speech proof of concept and Dialogflow fulfillment code and backup

### Engineering Addendum

#### Hardware

#### Software 

#### Natural Language Understanding
The Natural Language Understanding (NLU) module of the project is almost complete, but there is a lot of room for additional functionality. Additional intents and fulfillment code can easily be written using the Dialogflow API and javascript code. Please see 
README_SOFTWARE.md for more information on which tools are used for development.

The first step in developing NLU is creating intents with the Dialogflow console. Google's [documentation](https://cloud.google.com/dialogflow/docs) for this tool is excellent and provide all the information you need to get started building intents. Once an intent has been developed, you can add in fulfillment code. Google also provides [documentation](https://cloud.google.com/firestore/docs) for how to get started with the cloudstore database. Once the database has been initialized either using the Firestore console (recommended) or uploading data with nodejs, the database can be connected to dialogflow with fulfillment code. On the Dialogflow console, make sure you enable fulfillment for each intent before heading to the "Fulfillment" tab. Here, The database can be connected to Dialogflow through a webhook request or through the inline editor. The code for a webhook is included in the repository, although this was not used for the final project. We would recommend writing code in your favorite javascript IDE or text editor and then copying it into the inline editor. Press the "Deploy" button, and that code will not be applied to your Dialogflow module. Finally, when the NLU assistant is complete, you can turn to the Action on Google development console to deploy the agent. In order to deploy you are required to write several descriptions of the agent and instructions for use. Your descriptions and instructions should be as detailed as possible. It is also required that every Action has a privacy policy, although this project requires a very simple one. If you do not follow all the steps in the deployment process and write detailed documentation, the Action will be rejected by Google. The rejection letter also comes with reasoning and points for improvement, so it should be easy to fix the issues with your agent and re-deploy. Once the action is deployed you will be able to use it on your Google Assistant app or Google smart home device. 

One piece of functionality that was initially intended to be completed but was abandoned because of difficulty was integrating the NLU functionality directly into the android application. Theoretically, Dialogflow has an API that allows for development in java for an Android app. All examples of these projects found on the internet were text based, so we started off by building a text to speech module in Android Studio that could be used alongside a text based NLU module. However, when we started to explore building this integration, the NLU team discovered that the current version of the Dialogflow API was scheduled for deprecation in December. This deprecation was postponed twice, but we were hesitant to develop using tools that might not last for the full timeline of the project. We attempted to build this module using the new V2 API, but there was barely any online documentation and without previous experience with this API, we decided to abandon the integration and keep the NLU as a separate module from the app. It was determined that the same functionality could be achieved, and the difficulty of building the integration was not worth the minimal addition to ease of use. If this project is to be continued, exploring app integration using the V2 Dialogflow API might be a good idea. 
