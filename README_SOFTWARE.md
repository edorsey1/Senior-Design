# Software Report

## General Software

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
