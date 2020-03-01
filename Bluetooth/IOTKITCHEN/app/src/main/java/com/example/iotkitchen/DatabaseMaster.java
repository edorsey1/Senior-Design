package com.example.iotkitchen;

import android.provider.ContactsContract;
import android.util.Log;
import android.widget.ArrayAdapter;

import androidx.annotation.NonNull;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;
import com.google.firebase.firestore.SetOptions;


import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static java.lang.Thread.sleep;

public class DatabaseMaster {
    private FirebaseFirestore db = FirebaseFirestore.getInstance();
    private DocumentReference userRef = db.collection("users").document(UserData.userData.id);
    private ArrayList<RecipeModel> publicRecipes;

    private boolean running = true;

    public static DatabaseMaster databaseMaster = new DatabaseMaster();

    public void SetUp() {
        userRef.get().addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
            @Override
            public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                if (task.isSuccessful()) {
                    DocumentSnapshot document = task.getResult();
                    if (document.exists()) {
                        Log.d("hyh", "Document exists");
                    } else {
                        HashMap empty = new HashMap();
                        userRef.collection("PersonalRecipes").document("tester")
                                .set(empty, SetOptions.merge());
                        userRef.collection("CookingSessions").document("tester")
                                .set(empty, SetOptions.merge());
                    }
                } else {
                    Log.d("huh", "get failed with ", task.getException());
                }
            }
        });
        db.collection("recipes").get().addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
            @Override
            public void onComplete(@NonNull Task<QuerySnapshot> task) {
                if (task.isSuccessful()) {
                    publicRecipes = new ArrayList<>();
                    for (QueryDocumentSnapshot document : task.getResult()) {
                        try {
                            publicRecipes.add(document.toObject(RecipeModel.class));
                            running = false;
                        } catch (Exception e) {

                        }
                    }
                } else {
                    Log.d("TAG", "Error getting documents: ", task.getException());
                }
                running = false;
            }
        });
    }

    public ArrayList<RecipeModel> GetPublicRecipes() {
        return publicRecipes;
    }

    public static void LoggedOut() {
        databaseMaster  = new DatabaseMaster();
    }
}
