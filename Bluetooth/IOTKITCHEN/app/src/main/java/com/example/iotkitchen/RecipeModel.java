package com.example.iotkitchen;

import java.util.ArrayList;

public class RecipeModel {
    private String title;
    private String time;
    private ArrayList<String> ingredientList;
    private ArrayList<Step> instructions;

    public RecipeModel() {}  // Needed for Firebase

    public RecipeModel(String title, String time, ArrayList<String> ingredients, ArrayList<Step> instructions) {
        this.title = title;
        this.time = time;
        this.ingredientList = ingredients;
        this.instructions = instructions;
    }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    public ArrayList<String> getIngredient() { return ingredientList; }

    public void setIngredient(ArrayList<String> ingredients) { this.ingredientList = ingredients; }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public ArrayList<Step> getInstructions() {
        return instructions;
    }

    public void setInstructions(ArrayList<Step> instructions) {
        this.instructions = instructions;
    }
}
