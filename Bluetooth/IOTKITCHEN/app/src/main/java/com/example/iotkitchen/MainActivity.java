package com.example.iotkitchen;


import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Method;
import java.util.UUID;


public class MainActivity extends AppCompatActivity {

    TextView welcomeText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        welcomeText = (TextView) findViewById(R.id.welcomeText);

        //Init and Assign Variables
        BottomNavigationView bottomNavigationView = findViewById(R.id.bottom_navigation);

        //For the navigation ICON
        //navigation.setSelectedItemId(R.id.nav_home);
        bottomNavigationView.setSelectedItemId(R.id.nav_home);

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
                        return true;

                    case R.id.nav_out:
                        startActivity(new Intent(getApplicationContext()
                                , SignOut.class));
                        overridePendingTransition(0, 0);
                        return true;

                    case R.id.nav_Recipe: //recipe
                        startActivity(new Intent(getApplicationContext()
                                , Recipe_select.class));
                        overridePendingTransition(0, 0);
                        return true;
                }
                return false;
            }
        });
    }

    @Override
    public void onStart() {
        super.onStart();
        // Check if user is signed in (non-null) and update UI accordingly.
        CheckUser();
    }

        // Check if user is signed in (non-null) and update UI accordingly.
    private void CheckUser() {
        if (UserData.userData.user == null) {
            startActivity(new Intent(MainActivity.this, LoginActivity.class));
        }
        else {
            welcomeText.setText("Welcome " + UserData.userData.userName);
        }
    }
}






