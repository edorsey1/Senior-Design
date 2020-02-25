package com.example.iotkitchen;

import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;

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

    private val mNavigationItemSelected = BottomNavigationView.OnNavigationItemSelectedListener

    {
        item ->
                when(item.itemId)
        {
            R.id.nav_Recipe ->
            {
                openFragment(activity_recipe_select);

                return @mNavigationItemSelected true
            }


        }

    }
        false


    private void openFragment(fragment; Fragment)
    {
        val transaction = supportFragmentManager.beginTransaction()
        transaction.replace(R.id.container, fragment)
        transaction.addToBackStack(null)
        transaction.commit()
    }
}
