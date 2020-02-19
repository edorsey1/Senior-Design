package com.example.iotkitchen;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GoogleAuthProvider;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GoogleAuthProvider;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


public class Database extends AppCompatActivity {
    Button next,previous;
    TextView a,b,c,d,e;
    String recipe;
    int i=1;
    int size;
    FirebaseFirestore mDatabase= FirebaseFirestore.getInstance();
    private static final String TAG = "MainActivity";
    ArrayAdapter<String> adapter;
    List<String> list;
    DocumentReference docref;
    Map<String,Map<String,String>> map;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_database);
        a=(TextView)findViewById(R.id.Ingredient_view);
        b=(TextView)findViewById(R.id.procedure_view);
        c=(TextView)findViewById(R.id.unit_view);
        d=(TextView)findViewById(R.id.weight_view);
        e=(TextView)findViewById(R.id.step);
        next=(Button)findViewById(R.id.next);
        previous=(Button)findViewById(R.id.previous);


        recipe =getIntent().getStringExtra("Listviewclickvalue");
        docref=mDatabase.collection("recipes").document(""+recipe+"");
        docref.get().addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
            @Override
            public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                if(task.isSuccessful()){
                    list = new ArrayList<>();

                    DocumentSnapshot document = task.getResult();
                    if(document.exists()){
                        map= (Map<String, Map<String,String>>) document.getData().get("instruction");
                            size= map.size();
                        String procedure = map.get("step1").get("procedure");
                        String unit = map.get("step1").get("unit");
                        String weight =map.get("step1").get("weight");
                        String ingredient =map.get("step1").get("ingredient");
                        a.setText(ingredient);
                        b.setText(procedure);
                        c.setText(unit);
                        d.setText(weight);
                        e.setText("step"+" "+""+i+"");

                    }
                }
            }
        });

        next.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                if(i<size){
                    i=i+1;
                    String procedure = map.get("step"+i+"").get("procedure");
                    String unit = map.get("step"+i+"").get("unit");
                    String weight =map.get("step"+i+"").get("weight");
                    String ingredient =map.get("step"+i+"").get("ingredient");
                    a.setText(ingredient);
                    b.setText(procedure);
                    c.setText(unit);
                    d.setText(weight);
                    e.setText("step"+" "+""+i+"");

                }


                }
            });
        previous.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                if(i>1){
                    i=i-1;
                    String procedure = map.get("step"+i+"").get("procedure");
                    String unit = map.get("step"+i+"").get("unit");
                    String weight =map.get("step"+i+"").get("weight");
                    String ingredient =map.get("step"+i+"").get("ingredient");
                    a.setText(ingredient);
                    b.setText(procedure);
                    c.setText(unit);
                    d.setText(weight);

                    a.setText(ingredient);
                    b.setText(procedure);
                    c.setText(unit);
                    d.setText(weight);
                    e.setText("step"+" "+""+i+"");
                        }

                    };
        });

    }


}