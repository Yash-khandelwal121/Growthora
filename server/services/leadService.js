import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SECRET_KEY in environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const upsertLead = async (sessionId, data) => {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase is not configured.");
  }

  const payload = {
    session_id: sessionId,
    lead_source: 'Growthora AI',
    updated_at: new Date().toISOString()
  };

  if (data.language) payload.preferred_language = data.language;
  if (data.name) payload.name = data.name;
  if (data.mobile) payload.mobile_number = data.mobile;
  if (data.state) payload.state = data.state;
  if (data.status) payload.status = data.status;

  const { data: result, error } = await supabase
    .from('growthora_ai_leads')
    .upsert(payload, { onConflict: 'session_id' })
    .select()
    .single();

  if (error) {
    console.error("Supabase Upsert Error:", error);
    throw new Error(error.message);
  }

  return result;
};

export const requestConsultation = async (sessionId, consultationData) => {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase is not configured.");
  }

  const payload = {
    status: 'Consultation Requested',
    consultation_requested_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (consultationData.topic) payload.topic = consultationData.topic;
  if (consultationData.requirement) payload.requirement = consultationData.requirement;
  if (consultationData.preferred_date) payload.preferred_date = consultationData.preferred_date;
  if (consultationData.preferred_time) payload.preferred_time = consultationData.preferred_time;

  const { data: result, error } = await supabase
    .from('growthora_ai_leads')
    .update(payload)
    .eq('session_id', sessionId)
    .select()
    .single();

  if (error) {
    console.error("Supabase Update Error for Consultation:", error);
    throw new Error(error.message);
  }

  if (!result) {
    throw new Error("Lead not found for consultation update.");
  }

  return result;
};
