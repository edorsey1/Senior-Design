package com.example.iotkitchen;

public class CurrentRecipe {
    private RecipeModel currentRecipe;
    private int stepNum;
    private RecipeData recipeData;

    public CurrentRecipe(RecipeModel currentRecipe) {
        this.currentRecipe = currentRecipe;
        this.stepNum = 0;
        recipeData = new RecipeData(currentRecipe);
    }

    public RecipeModel getCurrentRecipe() {
        return currentRecipe;
    }

    public void setCurrentRecipe(RecipeModel currentRecipe) {
        this.currentRecipe = currentRecipe;
    }

    public int getStepNum() {
        return stepNum;
    }

    public RecipeData getRecipeData() {
        return recipeData;
    }

    public void setRecipeData(RecipeData recipeData) {
        this.recipeData = recipeData;
    }

    public void setStepNum(int stepNum) {
        this.stepNum = stepNum;
    }
}
