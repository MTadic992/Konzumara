import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://whztrazdmfdndpyhsevu.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoenRyYXpkbWZkbmRweWhzZXZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ2OTIzOTEsImV4cCI6MjAxMDI2ODM5MX0.bv92yO7YI8MUId21CAeC-Z64bybS5ofhSpX2ZjqXRPk";
export const getServiceSupabase = () =>
    createClient(
        supabaseUrl,
        supabaseKey
    );
export const supabase = createClient(supabaseUrl, supabaseKey);