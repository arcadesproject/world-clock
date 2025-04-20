<script lang="ts">
  import Clock from './components/Clock.svelte';
  import CityClock from './components/CityClock.svelte';
  import Search from './components/Search.svelte';

  let timezones = [
    { city: 'Los Angeles', timezone: 'America/Los_Angeles' },
    { city: 'New York', timezone: 'America/New_York' },
    { city: 'London', timezone: 'Europe/London' },
    { city: 'Tokyo', timezone: 'Asia/Tokyo' },
    { city: 'Sydney', timezone: 'Australia/Sydney' },
  ];

  function removeCity(index: number) {
    timezones = timezones.toSpliced(index, 1);
  }
</script>

<style  lang="scss">

  main {
    padding: 1rem;
    font-family: sans-serif;
    text-align: center;
  }

  .clock-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    margin-top: -20vh;
  }

  .world-clock {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 1rem;
  }
  .city-clock-wrapper {
    position: relative;
    margin: 1rem 2rem 1rem 2rem;
    opacity: 0;
    width: 150px; // Consistent sizing
    min-height: 120px; // Ensure room for content + button
    animation: fadeIn 0.5s ease-out forwards; /* apply the fadeIn animation */
    transition: opacity 0.5s ease-out; /* smooth transition when opacity changes */
    animation-delay: calc(0.2s * var(--index)); /* Staggered delay */
  }

  @media (max-width: 600px) {
    .city-clock-wrapper {
      width: 100%;
      max-width: 300px;
    }
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  .remove-btn {
    position: absolute;
    top: 4px;
    right: -40px;
    z-index: 2;
    background: rgb(66, 66, 66);
    color: white;
    border: none;
    border-radius: 10%;
    font-size: 0.5rem;
    cursor: pointer;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

    &:hover {
      background: darkred;
    }
  }

  .search {

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 2rem;
  }
</style>

<main>
  <div class="clock-grid">
    <div class="clock-container">
      <Clock />
    </div>
    <div class="world-clock">
      {#each timezones as { city, timezone }, index}
        <div class="city-clock-wrapper">
          <CityClock {city} {timezone} />
          <button onclick={() => removeCity(index)} class="remove-btn">
            ✖
          </button>
        </div>
      {/each}
    </div>
    <div class="search">
      <Search
      select={(city) => {
        if (!timezones.find(c => c.timezone === city.timezone)) {
          if (timezones.length < 5) {
            timezones = [...timezones, city];
          } else {
            // Replace last city
            timezones = [...timezones.slice(0, -1), city];
          }
        }
      }}
    />
    </div>
  </div>
</main>

