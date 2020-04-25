# Software Report

## General Software
## Android Mobile Application
#### Repository Overview
All code for the software components can be found in the Bluetooth folder of the repository. The IOTKITCHEN folder will include Navigation Bar, Bluetooth Connectivity, User Authentication as well as Front End Developemnt. The MealDB folder is not used for the final version of the project. 
Listed below is the complete function of what each module does on the IOTKITCHEN folder:

 * Bluetooth: Multithread Bluetooth socket to ensure all devices can be connected to the application
    
 * Current_Recipe: Current_Recipe class that has getter setter functions and declared variables and the exception handling       function.
    
  * Database_Class: reads data from firestore and set the data to the UI
    
 * Database_Master: Firebase reference to user data and public recipe, and new user is created, add the user profile to            database and give the user the public recipe.
    
 * Login: Login the user with google firebase authentication upon successful login, update the UI with the current user            information.
    
  * Main_activity: Welcome page shows upon successful login
    
*    Recipe_Data: a class of recipe data with getter and setter function
    
  *  RecipeListAdapatar: Custom adapter used to display the recipes with a suitable constructor upon dataset.
    RecipeMode: Holds the recipes information similar to as in firebase; holds the name, duration, ingredients, and                 instructions
    
  *  Recipe_select: Activity/page where the user can select from all available public recipes in order to start cooking and          When a recipe is selected, bring the user to ingredient page/activity to display all of the ingredients for the selected
    
  *  Signout: Signout the user and return to the login page.
   
  *  Steps: Class model to hold the current step information with getter and setter functions.
    
  *  UserData: Hold user data in a static model so it can be accessed globally


#### Dependencies
The following are dependecies for Android Studio build.gradle

    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'com.google.android.material:material:1.1.0'


    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    implementation 'com.google.firebase:firebase-database:19.2.0'
    implementation 'com.google.firebase:firebase-storage:16.0.4'
    implementation 'com.android.support:appcompat-v7:29.+'
    implementation 'com.android.support.constraint:constraint-layout:1.1.3'
    implementation 'com.android.support:support-v4:29.+'
    implementation 'androidx.legacy:legacy-support-v4:1.0.0'
    implementation 'androidx.lifecycle:lifecycle-extensions:2.0.0'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.1'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'

    implementation 'com.google.firebase:firebase-auth:19.1.0'
    implementation 'com.google.firebase:firebase-analytics:17.2.0'
    implementation 'com.google.android.gms:play-services-auth:17.0.0'
    implementation 'com.google.firebase:firebase-firestore:21.4.0'

#### Development Tools Information
[Android Studio 3.5.2](https://developer.android.com/studio)
    
    compileSdkVersion 29
    buildToolsVersion "29.0.2"

[Sketch Version 60](https://www.sketch.com/get/)

[Adobe XD 24.3.22.2](https://www.adobe.com/products/xd.html)

#### Installation Guide
With Android Studio downloaded you can add a existing project. 

    20-21-IotKitchen/Bluetooth/IOTKITCHEN/app/src/main/

## Natural Language Understanding
#### Repository Overview
All code involved in developing the Natural Language Understanding (NLU) module can be found in the Voice folder of the repository. The folder DFdemo/DBupload contains the code to initialize and run the code that connects the Dialogflow API to the Google Firestore Cloudstore database. Upload.js provides the fulfillment functions for each individual intent. This is the only code in the DFdemo/DBupload folder that was used for the final version of the project. The other files in this folder are for testing and initializing a basic javascript project or alternative ways to initialize the database. In the Voice folder, all other files and folders are for a proof of concept for an Android app that performs text-to-speech. This code was not used in the final project but could be useful for the continuation of the project. For the purpose of this report, I am only going to focus on the code in the DFdemo/DBupload folder, because this is the code that is currently used in the project. A discussion of how the rest of the Voice code could be used is in the Engineering Addendum. 

#### Dependencies
There are no relevant software dependencies for the functional part of the code.

#### Development Tools Information
NodeJS v12.10.0

Google Dialogflow V2

Google Firebase Cloud Firestore admin 8.7.0

#### Installation and Development Guide
Development of the NLU module does not require any installation, as all the Google tools can be found on online platforms. Development requires the following tools:

[Dialogflow](https://dialogflow.cloud.google.com/)

[Google Firebase Cloud Firestore](https://console.firebase.google.com/)

[Actions on Google](https://console.actions.google.com/)

These tools require a developer to have a Google account and email. An account can be created by going to google.com and clicking the "Sign In" button in the upper right corner. This account must be signed in to to use any of the three development tools. Once a developer has an account, you need to initialize a Google project by selecting "Add project" on any of the development tools. Once created, this project must be selected from the drop down menu of projects in the other development tools to link the tools together. If all three tools are linked to the same project, data can be shared between them. The README.md file contains more information on how these tools are used together to build an NLU module. 
