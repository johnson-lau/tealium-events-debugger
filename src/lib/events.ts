export type Log = {
  summary: Record<string, unknown>;
  payload: unknown & { post_time?: number };
};

export function parsePayload(input: string): Log | undefined {
  try {
    const payload = JSON.parse(input);
    const summary = {};
    return {
      summary,
      payload,
    };
  } catch (error) {
    console.error(`Error parsing payload:`, input, error);
  }
}
