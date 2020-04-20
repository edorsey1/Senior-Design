# Software Report

## General Software

## Natural Language Understanding
#### Repository Overview
All code involved in developing the Natural Language Understanding (NLU) module can be found in the Voice folder of the repository. The folder DFdemo/DBupload contains the code to initialize and run the code that connects the Dialogflow API to the Google Firestore Cloudstore database. The index.js file in this folder provides the code for initialization of the Dialogflow module and the database. Upload.js provides the fulfillment functions for each individual intent. The other files in this folder are for testing and initializing a basic javascript project. In the Voice folder, all other files and folders are for a proof of concept for an Android app that performs text-to-speech. This code was not used in the final project but could be useful for the continuation of the project. For the purpose of this report, I am only going to focus on the code in the DFdemo/DBupload folder, because this is the code that is currently used in the project. A discussion of how the rest of the Voice code could be used is in the Engineering Addendum. 

#### Dependencies

#### Development Tools Information
NodeJS v12.10.0
Google Dialogflow V2
Google Firebase Cloud Firestore admin 8.7.0

#### Installation and Development Guide
Development of the NLU module does not require any installation, as all the Google tools can be found on online platforms. Development requires the following tools:

Dialogflow - 
Google Firebase Cloud Firestore - 
Actions on Google - 
