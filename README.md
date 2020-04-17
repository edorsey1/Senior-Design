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
README_SOFTWARE.md for more information on how to develop intents. 

One piece of functionality that was initially intended to be completed but was abandoned because of difficulty was integrating the NLU functionality directly into the android application. Theoretically, Dialogflow has an API that allows for development in java for an Android app. All examples of these projects found on the internet were text based, so we started off by building a text to speech module in Android Studio that could be used alongside a text based NLU module. However, when we started to explore building this integration, the NLU team discovered that the current version of the Dialogflow API was scheduled for deprecation in December. This deprecation was postponed twice, but we were hesitant to develop using tools that might not last for the full timeline of the project. We attempted to build this module using the new V2 API, but there was barely any online documentation and without previous experience with this API, we decided to abandon the integration and keep the NLU as a separate module from the app. It was determined that the same functionality could be achieved, and the difficulty of building the integration was not worth the minimal addition to ease of use. If this project is to be continued, exploring app integration using the V2 Dialogflow API might be a good idea. 
