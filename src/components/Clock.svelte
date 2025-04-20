<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { getUTCOffset } from '../utils/utcOffset';
  
    let time: string = '';
    let fullDate: string = '';
    let timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let offset: string = '';
  
    let interval: NodeJS.Timeout;
  
    function updateTime() {
      const now = new Date();
      time = new Intl.DateTimeFormat(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);

      
      fullDate = new Intl.DateTimeFormat(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(now);
    }
  
    onMount(() => {
      updateTime();
      offset = getUTCOffset(timezone);
      interval = setInterval(updateTime, 1000);
    });
  
    onDestroy(() => {
      clearInterval(interval);
    });
  </script>
  
  <div class="clock-container">
    <div class="clock">{time}</div>
    <p class="date">{fullDate}</p>
    <small class="timezone">{timezone} ({offset})</small>
  </div>
  
  <style lang="scss">
    .clock-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'Helvetica','Inter', 'Segoe UI', sans-serif;
      padding: 3rem 2rem;
      border-radius: 1.5rem;
      width: 100%;
      max-width: 400px;
      margin: 3rem auto;
      transition: all 0.3s ease;
    }

    .clock {
      font-size: 9rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      margin-top: 0.5rem;
      color: var(--clock-color, #333);
      line-height: 1.1;
    }

    .date {
      font-size: 1rem;
      color: #666;
      margin-top: 1rem;
    }

    .timezone {
      font-size: 0.9rem;
      color: #aaa;
      margin-top: 0.25rem;
      font-family: monospace;
    }


  </style>
  