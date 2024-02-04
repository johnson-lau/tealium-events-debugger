export type Log = {
  summary: Record<string, unknown>;
  payload: unknown & { post_time?: number };
};

export function parsePayload(input: string): Log | undefined {
  try {
    const payload = JSON.parse(input);
    const summary = {
      event: payload.data.event_name || payload.event,
      reg_user_id: payload.data.reg_user_id,
      ux_split: payload.data.ux_split,
      ux_split_traffic_key: payload.data.ux_split_traffic_key,
      ux_split_traffic_type: payload.data.ux_split_traffic_type,
      ux_split_treatment: payload.data.ux_split_treatment,
    };
    return {
      summary,
      payload,
    };
  } catch (error) {
    console.error(`Error parsing payload:`, input, error);
  }
}
