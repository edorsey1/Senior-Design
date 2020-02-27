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
import java.util.List;

//
//


public class Recipe_select extends AppCompatActivity {


    /*For Bottom Navigation Fragment
    @Nullable
    //@Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState)
    {
        return inflater.inflate(R.layout.activity_recipe_select, container, false);
    }


    //End of Bottom navigation layout

     */
/*For Activity
    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(r.layout.activity_recipe_select);

    }
*/




    FirebaseFirestore mDatabase= FirebaseFirestore.getInstance();
    Button start;
    private ListView listView;
    private static final String TAG = "MainActivity";
    ArrayAdapter<String> adapter;
    List<String> list;
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        //Navigation
/*
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
                        overridePendingTransition(0, 0);
                        return true;

                    case R.id.nav_Recipe: //recipe
                        return true;
                }
                return false;
            }
        });
        //
        listView=(ListView)findViewById(R.id.database);
        mDatabase.collection("recipes").get().addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
            @Override
            public void onComplete(@NonNull Task<QuerySnapshot> task) {
                if (task.isSuccessful()) {
                    list = new ArrayList<>();
                    for (QueryDocumentSnapshot document : task.getResult()) {
                        list.add(document.getId());
                    }
                    Log.d(TAG, list.toString());

                    adapter=new ArrayAdapter<String>(Recipe_select.this, android.R.layout.simple_list_item_1, list);
                    listView.setAdapter(adapter);
                } else {
                    Log.d(TAG, "Error getting documents: ", task.getException());
                }
            }

        });
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
