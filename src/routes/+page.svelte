<script>
  // Import all the news furniture components
   import { base } from '$app/paths';
  import DatabaseHeader from '$lib/components/DatabaseHeader.svelte';
  import RankingList from '$lib/components/RankingList.svelte';
  import RankingCard from '$lib/components/RankingCard.svelte';
  import SearchInput from '$lib/components/SearchInput.svelte';
import MethodologyBox from '$lib/components/MethodologyBox.svelte';

  // Article metadata
  let headline = 'Dog Bites in NYC: A Closer Look at the Data';
  let byline = 'Ashley Mowreader';
  let pubDate = '2026-01-31';

   let { data } = $props();
   let search = $state('');

   // Grouping by breeds // 
    let rankedBreeds = $derived.by(() => {
    const dogs = data?.dogs ?? [];
    const counts = new Map();

    for (const row of dogs) {
      const rawBreed = row?.breed ?? row?.breedname ?? row?.breed_name ?? 'Unknown';
      const breed = toSentenceCase(rawBreed);
      counts.set(breed, (counts.get(breed) ?? 0) + 1);
    }

     return Array.from(counts, ([breed, count]) => ({ breed, count }))
      .sort((a, b) => b.count - a.count);
  });

  let filtered = $derived.by(() => {
    const q = search.trim().toLowerCase();
    return q
      ? rankedBreeds.filter((item) => item.breed.toLowerCase().includes(q))
      : rankedBreeds.slice(0, 20);
  });

  function formatDate(dateString) {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString('en-US', {
      timeZone: 'UTC',
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  }

  function toSentenceCase(value) {
    if (!value) return 'Unknown';

    const text = String(value).trim().toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

</script>

<!-- This sets the page title in the browser tab -->
<svelte:head>
  <title>{headline} | NYCity News Service</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Comic+Relief:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<!-- Your page content goes here -->
<div class="container">
 
  <!-- Article Header: Headline, byline, and publication date -->
   <DatabaseHeader
    headline= "Dog Bites in NYC"
    kicker = "Data that Bites"
    byline= "Ashley Mowreader"
    date = '2026-04-12'>
    <SearchInput bind:value={search} placeholder="Search by breed..." />
  </DatabaseHeader>

<RankingList title={search ? `Showing top ${filtered.length} results` : 'Top Breeds by Bite Count'}>
    {#each filtered as item, i (item.breed)}
    <RankingCard
      rank={i + 1}
      title={item.breed}
      href={`${base}/dog/${encodeURIComponent(item.breed)}`}      
      value={`${item.count} bite(s)`}
    />
  {/each}
</RankingList>

 <MethodologyBox>
    <p>
      The data on this page comes from NYC's Department of Health and Mental Hygiene (DOHMH), published 
      <a href="https://data.cityofnewyork.us/Health/DOHMH-Dog-Bite-Data/rsgh-akpg/about_data" target="_blank">via New York City's open data portal</a>.
    </p>
    <p> 
      The dataset includes the 1,000 most recent reported dog bites in NYC until December 31, 2024, with details on the date of the bite, the breed of the dog (as reported by the victim or witness), and the borough where the incident occurred. The data is current as of August 2025.
    </p>
  </MethodologyBox>

</div>