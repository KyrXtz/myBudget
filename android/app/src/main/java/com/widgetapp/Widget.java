package com.kyrxtz.mybudget;

import android.app.Activity;
import android.content.Intent;
import android.content.ComponentName;
import android.content.ActivityNotFoundException;


import android.app.PendingIntent;

import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.widget.RemoteViews;
import android.content.SharedPreferences;

import java.io.Console;

import org.json.JSONException;
import org.json.JSONObject;
import android.widget.Toast;

public class Widget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
                                int appWidgetId) {

		try {
            //edw einai gia na setaroume ta values tou widget
			SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
			String appString = sharedPref.getString("appData", "{\"text\":'no data'}");
			JSONObject appData = new JSONObject(appString);
			// Construct the RemoteViews object
			RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget);
			views.setTextViewText(R.id.appwidget_text1, appData.getString("text1"));
            views.setTextViewText(R.id.appwidget_text2, appData.getString("text2"));
            views.setTextViewText(R.id.appwidget_text3, appData.getString("text3"));

            //edw einai gia na setaroume to on click
            Intent intent = new Intent(context, MainActivity.class);
            intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);       
            PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, 0);   
            views.setOnClickPendingIntent(R.id.widget, pendingIntent);
            //appWidgetManager.updateAppWidget(appWidgetId, views);

            //edw einai gia na setaroume to refresh
            // Intent intent2 = new Intent(context, MainActivity.class);
            // intent2.setAction("lol");
            // PendingIntent pendingIntent2 = PendingIntent.getBroadcast(context, 0, intent2, 0);
            // views.setOnClickPendingIntent(R.id.appwidget_text3, pendingIntent2);



			 // Instruct the widget manager to update the widget
			 appWidgetManager.updateAppWidget(appWidgetId, views);
		}catch (JSONException e) {
			e.printStackTrace();
		}
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
      
        
        // There may be multiple widgets active, so update all of them
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
            


          
        }
    }
    // @Override
    // public void onReceive(Context context, Intent intent) {
    //     super.onReceive(context, intent);
    //     if (intent.getAction().equals("lol")) {
    //             //THIS IS WHERE YOUR CODE WILL BE EXECUTED
    //             System.out.println("lol");
    //         }
    // }
    
    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }
}
