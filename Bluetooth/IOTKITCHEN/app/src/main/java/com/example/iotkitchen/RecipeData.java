package com.example.iotkitchen;

import com.google.firebase.firestore.DocumentReference;

import java.util.ArrayList;

//Holds the current recipes data, such as the temperature and a reference to the original recipe in the database.
//To-Do: add weight and other information such as time and date
public class RecipeData {
    private DocumentReference masterRecipe;
    private ArrayList<Integer> temp;

    public RecipeData() {};

    public RecipeData(RecipeModel recipeModel) {
        this.masterRecipe = recipeModel.getReference();
        temp = new ArrayList<Integer>();
    }

    //Required by firebase
    public DocumentReference getMasterRecipe() {
        return masterRecipe;
    }

    public ArrayList<Integer> getTemp() {
        return temp;
    }

    public void setTemp(ArrayList<Integer> temp) {
        this.temp = temp;
    }

    public void addTemp(int temp) {
        this.temp.add(temp);
    }
}
