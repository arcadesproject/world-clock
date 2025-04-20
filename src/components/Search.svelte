<script lang="ts">
  
    import { citySearchList } from '../utils/search';
    import type { CitySearchItem } from '../types/types';
  
    let { select }: { select: (city: CitySearchItem) => void } = $props();
    let query = $state('');
    let results: CitySearchItem[] = $state([]);
  
    $effect(() =>  {
        results = citySearchList.filter(
            ({ city, country, timezone }) =>
                city.toLowerCase().includes(query.toLowerCase()) ||
                country.toLowerCase().includes(query.toLowerCase()) ||
                timezone.toLowerCase().includes(query.toLowerCase())
        );
    });
  
    function selectCity(cityData: CitySearchItem) {
      select(cityData); // call the prop as a function
      query = '';
    }
  </script>
  
  <div class="search">
    <input type="text" bind:value={query} placeholder="Search cities..." />
    {#if query}
      <ul>
        {#each results as city}
          <li>
            <button
            onclick={() => selectCity(city)}
            onkeydown={(e) => e.key === 'Enter' && selectCity(city)}
            >
              {city.city} - {city.country} ({city.timezone}) 
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
  
  
  <style lang="scss">
  .search {
    position: relative;
    width: 100%;
    max-width: 400px;
    margin: 1rem auto;
  
    input {
      width: 100%;
      padding: 0.5rem;
      font-size: 1rem;
      border-radius: 0.5rem;
      border: 1px solid #ccc;
    }

    input,
    ul {
      box-sizing: border-box;
    }

  
    ul {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      list-style: none;
      padding: 0.5rem;
      background: var(--card-bg, #2c2c2c);
      border-radius: 0.5rem;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      max-height: 200px;
      overflow-y: auto;
      margin-top: 0.25rem;
      width: 100%;
    }
  
    li {
      padding: 0.5rem;
      cursor: pointer;
      &:hover {
        background: var(--search-hover, #444);
      }
      text-align: center;
    }

    button {
        all: unset;
        cursor: pointer;
        width: 100%;
        padding: 0.5rem;
        text-align: left;
    }

  }
  </style>
  