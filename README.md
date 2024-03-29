# IoT_Kitchen
Senior Design Project Team 21

[Link to Demo Video](https://youtu.be/7nlepJa6-5U)

### Repository Directory
Arduino Test Code - All Arduino code.  Calibration code for the scale is titled: Scale_Calibration.  Most recent test code and that used in the final demo is: Final_scale_demo for the scale and: Temp_Micro for the temperature sensor.  Although code, it is more closely related to hardware and thus discussed further in the README_HARDWARE.md.

Bluetooth - Android Studio project containing the final Code for our application, includidng a blutooth connection to our hardware components.

Images - Schematics and pictures of hardware components

MealDB - Code for database of recipes for use in app with categories, recipes, instructions etc.

Reports - Contains copies of all written reports and testing for the Fall and Spring semesters

Voice - NLU text to speech proof of concept and Dialogflow fulfillment code and backup

### Engineering Addendum

#### Hardware
For our two main sensors, the scale and temperature sensor, we decided to go with an Arduino Uno and an Arduino Micro for ease of use and fast prototyping.  We had positive results with both of these boards and would recommend continued use of them, however, it is possible to also build PCB's or use another board if desired.  However, all of our hardware code is for Arduino's and the schematics and all other information in the README_HARDWARE.md assume you are using the same hardware as we are, including Arduino's.

For the scale we ended up using a torque based load cell to measure the weight which was both cheap and reliable.  With it we were able to measure all of our desired weights and made it precise to the nearest gram.  However, there are many other options out there, both more expensive, larger, smaller, etc. But we found the torque based load cell worked well for our purposes.

For the temperature sensor we went with a K-type thermocouple with a stainless steel tip and glass braid threading.  Similar to the load cell it met all of our requirements of being food safe, heat resistance well over 300 Celsius, thin so as to thread inside an oven door, and cheep.  Once again, this was the best option that was also cheap that we found, however, there are many different temperature sensors out there, both cheaper and more expensive.  We found many of the cheaper ones did not do well at super high temperatures, and so would at least recommend a thermocouple, if not the exact one we used.  We also decided to have only the temperature sensor go into the oven, so that the hardware components did not need to be heat resistant, which removed a lot of our issues.  So if you are following our work, make sure your sensor wire is thin enough to not block an oven door from shutting.

As we were unable to attain buttons before the Coronavirus hit the code inside the Final_scale_demo assumes the scale is connected to a computer with an Arduino Serial monitor open in which the inputs act as button presses.

#### Software 
The Software module of this project is still in the midst of completing as the semester was cut short due to the COVID-19 pandemic. 

We broke up our software component into two categories: Backend and Frontend. Doing so would make it easier to split up work. The Frontend of the Mobile Application was utilized using Sketch while the Backend uses Android Studio. Please see README_SOFTWARE.md for more information on which tools are used for development.

The Login page is only able to use Google Accounts because of the connectivity to Google Firebase. Upon successful user authentication, users will be greeted with “Hello (Name).” This means that they are successfully logged into the Firebase database and that they can now access their favorite recipes and dishes that they wish to make and have all of their data saved. Following the Login page is the Recipes page which includes recipes based upon different categories and diets. Our main intentions for the Recipes page was to integrate the MealDB folder. Currently we are working on including time and ingredients for the recipe in order for users to add their own spin.

Once a user selects their recipe, they will be prompted to a page that will include the necessary ingredients and nutritional value followed by a start button below. This will then bring them to the scale bar which will display the instructions with NEXT and PREVIOUS buttons. Heading over to the User Profile Page, you will have the log out function as well as the ability to see the user’s data.

In terms of connectivity to the Arduino, data is sent from the Arduino via bluetooth. This will be displayed on the relevant page and upon completion of a recipe this data is stored in the Firebase Database. For more information, please reference to README_SOFTWARE.md

Although the app is set up to differentiate between temperature and scale data, we were unable to receive a second HC-05 bluetooth module before the Coronavirus hit and so were never able to test if the bluetooth service would connect to two devices.  I believe that it would not and that you would need to start two background bluetooth services, one to connect to the scale and another to connect to the temperature sensor.  Or you could combine the temperature sensor and scale to use one Arduino.  There is currently a barebones arduino code for the purpose in the Arduino Test Code folder, but that removes the moveability of the scale and temperature sensor.

Also make sure that you get the MAC address or name of your bluetooth device and put that into the bluetooth service code in the Android app, otherwise the app will not connect to your device.

The Google Firestore Cloud Firebase for our project is organized into two main folders: recipes and users. The recipes collection holds various recepies that can be used for demonstration and testing purposes. The users collection is organized into documents labeled with a unique user ID for each user. The user ID documents map to collections for CookingSessions and PersonalRecipes. CookingSessions holds hardware data collected and organized by date for each time a user uses the IoT devices to make a recipe. PersonalRecipes provides copies of recipes provided on the mobile application as well as custom user recipes so that a user can make changes to recipes and store their changes in a personalized database.  For a more detailed look at how the instructions or saved data are stored, please refer to the relevant model classes in the README_SOFTWARE.md.


#### Natural Language Understanding
The Natural Language Understanding (NLU) module of the project is almost complete, but there is a lot of room for additional functionality. Additional intents and fulfillment code can easily be written using the Dialogflow API and javascript code. Please see 
README_SOFTWARE.md for more information on which tools are used for development.

The first step in developing NLU is creating intents with the Dialogflow console. Google's [documentation](https://cloud.google.com/dialogflow/docs) for this tool is excellent and provide all the information you need to get started building intents. Once an intent has been developed, you can add in fulfillment code. Google also provides [documentation](https://cloud.google.com/firestore/docs) for how to get started with the cloudstore database. Once the database has been initialized either using the Firestore console (recommended) or uploading data with nodejs, the database can be connected to dialogflow with fulfillment code. On the Dialogflow console, make sure you enable fulfillment for each intent before heading to the "Fulfillment" tab. Here, The database can be connected to Dialogflow through a webhook request or through the inline editor. The code for a webhook is included in the repository, although this was not used for the final project. We would recommend writing code in your favorite javascript IDE or text editor and then copying it into the inline editor. Press the "Deploy" button, and that code will not be applied to your Dialogflow module. Finally, when the NLU assistant is complete, you can turn to the Action on Google development console to deploy the agent. In order to deploy you are required to write several descriptions of the agent and instructions for use. Your descriptions and instructions should be as detailed as possible. It is also required that every Action has a privacy policy, although this project requires a very simple one. If you do not follow all the steps in the deployment process and write detailed documentation, the Action will be rejected by Google. The rejection letter also comes with reasoning and points for improvement, so it should be easy to fix the issues with your agent and re-deploy. Once the action is deployed you will be able to use it on your Google Assistant app or Google smart home device. 

One piece of functionality that was initially intended to be completed but was abandoned because of difficulty was integrating the NLU functionality directly into the android application. Theoretically, Dialogflow has an API that allows for development in java for an Android app. All examples of these projects found on the internet were text based, so we started off by building a text to speech module in Android Studio that could be used alongside a text based NLU module. However, when we started to explore building this integration, the NLU team discovered that the current version of the Dialogflow API was scheduled for deprecation in December. This deprecation was postponed twice, but we were hesitant to develop using tools that might not last for the full timeline of the project. We attempted to build this module using the new V2 API, but there was barely any online documentation and without previous experience with this API, we decided to abandon the integration and keep the NLU as a separate module from the app. It was determined that the same functionality could be achieved, and the difficulty of building the integration was not worth the minimal addition to ease of use. If this project is to be continued, exploring app integration using the V2 Dialogflow API might be a good idea. 
