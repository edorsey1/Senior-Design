package com.example.iotkitchen;

import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.MenuItem;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

public class Main2Activity extends AppCompatActivity {

    /*
    //For Overall Navigation
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        BottomNavigationView bottomNav = findViewById(R.id.bottom_navigation);
        bottomNav.setOnNavigationItemSelectedListener(navListener);

        private BottomNavigationView.OnNavigationItemSelectedListener navListener =
                new BottomNavigationView.OnNavigationItemSelectedListener() {
                    //@Override
                    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                         Fragment selectedFragment = null;

                        switch (item.getItemId()) {
                        }
                            case R.id.nav_home:
                                selectedFragment = new activity_main();
                                break;

                            case R.id.nav_Scale:
                                selectedFragment = new activity_blue_tooth();
                                break;
                            case R.id.nav_Recipe:
                                selectedFragment = new activity_recipe_select();
                                break;
                        }

                        getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container,
                                selectedFragment).commit();

                        return true;
                    }
                };

    }

     */


    //Redo

    private BottomNavigationView.OnNavigationItemSelectedListener navListener =
            new BottomNavigationView.OnNavigationItemSelectedListener() {

                public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                    Fragment selectedFragment = null;

                    switch (item.getItemId()) {
                        case R.id.
                            selectedFragment = new blue_tooth();
                            break;

                    }
    }
}


