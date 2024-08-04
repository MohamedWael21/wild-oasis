import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";
export const supabaseUrl = "https://tubkckxdojppdxiphnur.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Ymtja3hkb2pwcGR4aXBobnVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyNjU1MzAsImV4cCI6MjAzNjg0MTUzMH0.7b2C12-9_-WTpFKr4T6tFPbJ5oOQKiZmItu-ayl7Dfk";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
