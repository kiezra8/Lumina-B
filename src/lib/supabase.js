import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://zijucvbochhtilmmiohg.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppanVjdmJvY2hodGlsbW1pb2hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzUyMDMsImV4cCI6MjA4ODY1MTIwM30.-ChaXUbUfzdj5ft-JcMQzrEWRlErogRDQ0uQuVwgwAI'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
