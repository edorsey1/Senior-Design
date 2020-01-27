package com.example.iotkitchen;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
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


public class Database extends AppCompatActivity {
    Button next,previous;
    TextView a,b,c,d,e;
    DatabaseReference reff,count;
    int child;
    int i=0;
    String childcount;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_database);
        a=(TextView)findViewById(R.id.Ingredient);
        b=(TextView)findViewById(R.id.procedure);
        c=(TextView)findViewById(R.id.unit);
        d=(TextView)findViewById(R.id.weight);
        e=(TextView)findViewById(R.id.step);
        next=(Button)findViewById(R.id.next);
        previous=(Button)findViewById(R.id.previous);

        count=FirebaseDatabase.getInstance().getReference().child("Recipe").child("Beef");
        count.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                child =(int)dataSnapshot.getChildrenCount();
                e.setText(Integer.toString(child));
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });

        next.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                if(i<child){
                    i=i+1;
                    reff= FirebaseDatabase.getInstance().getReference().child("Recipe").child("Beef").child("step"+""+i+"");
                    reff.addValueEventListener(new ValueEventListener() {
                        @Override
                        public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                            String ingredient= dataSnapshot.child("Ingredient").getValue().toString();
                            String procedure= dataSnapshot.child("procedure").getValue().toString();
                            String unit= dataSnapshot.child("unit").getValue().toString();
                            String weight= dataSnapshot.child("weight").getValue().toString();
                            a.setText(ingredient);
                            b.setText(procedure);
                            c.setText(unit);
                            d.setText(weight);
                        }

                        @Override
                        public void onCancelled(@NonNull DatabaseError databaseError) {

                        }
                    });
                }
            }

        });

        previous.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                if(i>1){
                    i=i-1;
                    reff= FirebaseDatabase.getInstance().getReference().child("Recipe").child("Beef").child("step"+""+i+"");
                    reff.addValueEventListener(new ValueEventListener() {
                        @Override
                        public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                            String ingredient= dataSnapshot.child("Ingredient").getValue().toString();
                            String procedure= dataSnapshot.child("procedure").getValue().toString();
                            String unit= dataSnapshot.child("unit").getValue().toString();
                            String weight= dataSnapshot.child("weight").getValue().toString();
                            a.setText(ingredient);
                            b.setText(procedure);
                            c.setText(unit);
                            d.setText(weight);
                        }

                        @Override
                        public void onCancelled(@NonNull DatabaseError databaseError) {

                        }
                    });
                }
            }

        });

    }



}
