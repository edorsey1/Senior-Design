package iotkitchen.voicetest;

/* Default imports */
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

/* Imports for text to speech */
import android.speech.tts.TextToSpeech;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import java.util.Locale;

/* Import for recipe class */
import iotkitchen.voicetest.Recipe;


public class MainActivity extends AppCompatActivity {

    TextToSpeech t1;
    EditText ed1;
    Button b1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        /* Default create */
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        /* Text to speech */
        ed1=(EditText)findViewById(R.id.editText);
        b1=(Button)findViewById(R.id.button);

        t1=new TextToSpeech(getApplicationContext(), new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
                if(status != TextToSpeech.ERROR) {
                    t1.setLanguage(Locale.UK);
                }
            }
        });

        b1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String toSpeak = "Testing, testing, testing";
                Toast.makeText(getApplicationContext(), toSpeak,Toast.LENGTH_SHORT).show();
                t1.speak(toSpeak, TextToSpeech.QUEUE_FLUSH, null);
            }
        });

        /* Recipe Creation for Test Recipe */
        String title = "Peanut Butter Cups";
        String detail = "Makes six servings";
        String[] ingredient = new String[3];
        String[] instruction = new String[7];
        ingredient[0] = "3 tablespoons powdered sugar, sifted";
        ingredient[1] = "1 half cup creamy peanut butter";
        ingredient[2] = "1 cup chocolate, melted";
        instruction[0] = "Prepare a cupcake tin with 6 liners.";
        instruction[1] = "Stir peanut butter and powdered sugar together until smooth.";
        instruction[2] = "Spread 1 to 2 tablespoons of chocolate in the bottom of each cupcake liner.";
        instruction[3] = "Dollop 1 to 2 teaspoons of the peanut butter mixture on top of the chocolate.";
        instruction[4] = "Cover each dollop of peanut butter with more chocolate and smooth out the top.";
        instruction[5] = "Refrigerate for 1 hour or until chocolate has hardened.";
        instruction[6] = "Remove peanut butter cups from the liners and enjoy!";

    }

    public void onPause(){
        if(t1 !=null){
            t1.stop();
            t1.shutdown();
        }
        super.onPause();
    }
}
