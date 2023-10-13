import React from 'react'

import {useSupabaseClient, useSession, useSessionContext} from '@supabase/auth-helpers-react'
import {google} from 'googleapis'
const Button = () => {


    

    const session = useSession(); //tokens
    const supabase = useSupabaseClient(); //talk to supabase
    const {isLoading} = useSessionContext();

    if(isLoading)
    return<></>


    async function googleSignIn() {
        const {error} = await supabase.auth.signInWithOAuth({
            provider:"google",
            options: {
                scopes: "https://www.googleapis.com/auth/calendar"
            }
        })
        if(error){
            alert("Log In Error")
            console.log(error);
        }
    }



    async function googleSignOut() {
        await supabase.auth.signOut();
    }

    console.log(session)


    const handleAddEventClick = async () => {
        if (!session) {
          googleSignIn();
        } else {
          try {
            console.log("Hello")
            const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer '+ session.provider_token, // Use the user's Google Calendar API access token
              },
              body: JSON.stringify({
                summary: 'Hackathon',
                description: 'To Heaven and Beyond',
                start: {
                  dateTime: '2023-10-14T12:00:00',
                  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                },
                end: {
                  dateTime: '2023-10-14T13:00:00',
                  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                },
              }),
            });

            console.log("Bye")
    
            if (response.ok) {
              console.log('Event added to Google Calendar');
            } else {
              console.error('Failed to add event to Google Calendar');
            }
          } catch (error) {
            console.error('Error adding event:', error);
          }
        }
      };
    
  
    
  return (
    <div>
      {session ?
      <>
        <h2>Hey there {session.user.email}</h2>
        <button onClick={()=>googleSignOut()}>Sign Out</button>
        <button onClick={handleAddEventClick}>Calendar Add</button>
      </>
      :
      <>
        <button onClick={()=>googleSignIn()}>Sign in with Google</button>
      </>
      }
    </div>
  )
}

export default Button
