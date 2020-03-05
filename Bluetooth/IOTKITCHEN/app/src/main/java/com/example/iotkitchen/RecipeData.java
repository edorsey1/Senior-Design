package com.example.iotkitchen;

import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.storage.StorageReference;

public class RecipeData {
    private DocumentReference masterRecipe;

    public RecipeData() {};

    public RecipeData(RecipeModel recipeModel) {
        this.masterRecipe = recipeModel.getReference();
    }

    public DocumentReference getMasterRecipe() {
        return masterRecipe;
    }
}
