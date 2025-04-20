export function getUTCOffset(tz: string): string {
    const now = new Date();
    const tzTime = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      timeZoneName: 'shortOffset',
      hour: '2-digit',
    }).formatToParts(now);
  
    const offsetPart = tzTime.find(part => part.type === 'timeZoneName')?.value;
  
    // Normalize output: e.g. "GMT+3" → "UTC+3"
    return offsetPart ? offsetPart.replace('GMT', 'UTC') : '';
  }
  