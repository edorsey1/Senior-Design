package com.example.iotkitchen;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ingredient extends AppCompatActivity {
    FirebaseFirestore mDatabase= FirebaseFirestore.getInstance();
    Button start;

    private ListView listView;
    private static final String TAG = "MainActivity";
    ArrayAdapter<String> adapter;
    List<String> list;
    DocumentReference docref;
    String tempholder;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ingredient);
        start=(Button)findViewById(R.id.start);
         tempholder=getIntent().getStringExtra("Listviewclickvalue");

        listView=(ListView)findViewById(R.id.database);
        docref=mDatabase.collection("recipes").document(""+tempholder+"");


        docref.get().addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
            @Override
            public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                if(task.isSuccessful()){
                    list = new ArrayList<>();

                    DocumentSnapshot document = task.getResult();
                    if(document.exists()){
                        //  Log.d(TAG,"DocumentSnapshot data: " + document.getData().get("ingredient"));

                        // Log.d(TAG,"get string data: " + document.get("ingredient"));
                        Map<String,String> map= (Map<String, String>) document.getData().get("ingredient");

                        for (String name : map.keySet())
                        {
                            // search  for value
                            String url = map.get(name);
                            list.add(url);
                        }

                    }
                }
                // Log.d(TAG, list.toString());

                adapter=new ArrayAdapter<String>(ingredient.this, android.R.layout.simple_list_item_1, list);
                listView.setAdapter(adapter);

            }
        });

        start.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ingredient.this, Database.class);
                intent.putExtra("Listviewclickvalue",tempholder);
                startActivity(intent);
            }
        });

    }
}
