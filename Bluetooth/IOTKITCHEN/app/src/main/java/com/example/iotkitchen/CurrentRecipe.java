package com.example.iotkitchen;

import android.os.Handler;
import android.util.Log;

//Stores the relevant information for the current recipe being cooked, such as the recipe template (i.e. ingredients, instructions, etc.), the current instruction number, and the recipeData.
public class CurrentRecipe {
    private RecipeModel currentRecipe;
    private int stepNum;
    private RecipeData recipeData;

    public CurrentRecipe(RecipeModel currentRecipe) {
        this.currentRecipe = currentRecipe;
        this.stepNum = 0;
        recipeData = new RecipeData(currentRecipe);

        MyApplication.myApplication.setCallBack(Temp);
    }

    //Required for firebase
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

    //Handler that receives bluetooth data and then stores it
    Handler.Callback Temp = new Handler.Callback() {
        @Override
        public boolean handleMessage(android.os.Message msg) {
            Log.d("test","test");
            int readMessage;
            switch (msg.what) {
                case 2:
                    int bytes = msg.arg1;
                    //recipeData.addTemp(bytes);
                    try {
                        readMessage = (int) msg.obj;
                        recipeData.addTemp(readMessage);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
            }
                return true;
        }
    };
}
