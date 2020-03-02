package com.example.iotkitchen;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//
//


public class Recipe_select extends AppCompatActivity implements RecipeListAdapter.RecipeSelect {


    FirebaseFirestore mDatabase= FirebaseFirestore.getInstance();
    private RecyclerView recyclerView;
    private RecyclerView.LayoutManager layoutManager;
    private static final String TAG = "MainActivity";
    RecipeListAdapter adapter;
    List<String> list;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_recipe_select);

        //Init and Assign Variables
        BottomNavigationView bottomNavigationView =  findViewById(R.id.bottom_navigation);
        //
        //setContentView(R.layout.activity_recipe_select);
        bottomNavigationView.setSelectedItemId(R.id.nav_Recipe);

        //Perform
        bottomNavigationView.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {
                //BottomNavigationView.setOnNavigationItemSelectedListener();
                switch (menuItem.getItemId()) {

                    case R.id.nav_Scale: //scale
                        startActivity(new Intent(getApplicationContext()
                                , Database.class));
                        overridePendingTransition(0, 0);
                        return true;

                    case R.id.nav_home:
                        startActivity(new Intent(getApplicationContext()
                                , MainActivity.class));
                        overridePendingTransition(0, 0);
                        return true;

                    case R.id.nav_out:
                        startActivity(new Intent(getApplicationContext()
                                , SignOut.class));
                        overridePendingTransition(0, 0);
                        return true;

                    case R.id.nav_Recipe: //recipe
                        return true;
                }
                return false;
            }
        });

        recyclerView=findViewById(R.id.database);
        layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);

        ArrayList<RecipeModel> test = DatabaseMaster.databaseMaster.GetPublicRecipes();
        adapter=new RecipeListAdapter(test, this);
        recyclerView.setAdapter(adapter);
    }

    @Override
    public void onRecipeSelect(int position) {
        Intent intent = new Intent(Recipe_select.this, ingredient.class);
        intent.putExtra("IndexClicked",position);
        startActivity(intent);
    }
}
