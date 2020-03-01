package com.example.iotkitchen;

import java.util.ArrayList;

public class RecipeModel {
    private String title;
    private ArrayList<String> ingredientList;

    public RecipeModel() {}  // Needed for Firebase

    public RecipeModel(String titleT, ArrayList<String> ingredients) {
        title = titleT;
        ingredientList = ingredients;
    }

    public String getTitle() { return title; }

    public void setTitle(String titleT) { title = titleT; }

    public ArrayList<String> getIngredient() { return ingredientList; }

    public void setIngredient(ArrayList<String> ingredients) { ingredientList = ingredients; }
}
