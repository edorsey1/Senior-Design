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


public class Recipe_select extends AppCompatActivity {


    FirebaseFirestore mDatabase= FirebaseFirestore.getInstance();
    private ListView listView;
    private static final String TAG = "MainActivity";
    ArrayAdapter<Map<String,String>> adapter;
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

<<<<<<< Updated upstream
                    case R.id.nav_Recipe: //recipe
                        return true;
                }
                return false;
            }
        });
        */

        //Navigation

        super.onCreate(savedInstanceState);
        //setContentView(R.layout.activity_recipe_select);
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
=======
                    case R.id.nav_out:
                        startActivity(new Intent(getApplicationContext()
                                , SignOut.class));
>>>>>>> Stashed changes
                        overridePendingTransition(0, 0);
                        return true;

                    case R.id.nav_Recipe: //recipe
                        return true;
                }
                return false;
            }
        });
        //
        listView=findViewById(R.id.database);
        //ArrayList<Map<String,String>> test = DatabaseMaster.databaseMaster.GetPublicRecipes();
        //adapter=new ArrayAdapter<>(Recipe_select.this, android.R.layout.simple_list_item_1, test);
        //listView.setAdapter(adapter);

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                String templistview= list.get(position).toString();
                Intent intent = new Intent(Recipe_select.this, ingredient.class);
                intent.putExtra("Listviewclickvalue",templistview);
                startActivity(intent);
            }
        });
    }
}
