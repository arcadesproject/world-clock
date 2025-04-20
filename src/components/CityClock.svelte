<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let timezone: string;
  export let city: string;

  let time: string = '';
  let interval: NodeJS.Timeout;

  function updateTime() {
    const now = new Date();

    time = new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timezone,
      hour12: false,
    }).format(now);
  }

  onMount(() => {
    updateTime();
    interval = setInterval(updateTime, 1000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div class="city-clock">
  <h3>{city}</h3>
  <p class="time">{time}</p>
</div>

<style lang="scss">
.city-clock {
  background: #fff;
  padding: 1rem;
  margin: 0.5rem;
  border: 1px solid rgb(117, 117, 117);
  border-radius: 0.25rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
  width: 150px;

  h3 {
    font-size: 1rem;
    margin-bottom: 0.25rem;
    color: #444;
  }

  .time {
    font-size: 1.75rem;
    font-weight: bold;
    color: #222;
  }
}
</style>
