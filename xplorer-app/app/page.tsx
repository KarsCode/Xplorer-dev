
"use client";
import React from 'react';
import MapComponent from '@/components/Map';
import WeatherApp from '@/components/WeatherApp';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import Button from '@/components/Button';


const YourPage: React.FC = () => {
  const supabase = createClient(
    "https://nyserxltzwujgciiojjg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55c2VyeGx0end1amdjaWlvampnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcyMDExMDEsImV4cCI6MjAxMjc3NzEwMX0.bx5Nrmcn-YYIMeYXKnpuhwLNRs_Zq7_v7HFKimH5h4M"
  );

  return (
    <div>
      <SessionContextProvider supabaseClient={supabase}>
        <MapComponent />
        <Button />
        <WeatherApp></WeatherApp>
      </SessionContextProvider>
      
    </div>
  );
};

export default YourPage;
