<script>
  import { base } from '$app/paths';
  import MethodologyBox from '$lib/components/MethodologyBox.svelte';

  let { data } = $props();

  let boroughRows = $derived.by(() =>
    Object.entries(data?.boroughCounts ?? {}).sort((a, b) => b[1] - a[1])
  );

  function formatDate(dateString) {
    if (!dateString) return 'Unknown date';

    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });
  }
</script>

<svelte:head>
  <title>{data.breed} | Dog Bites in NYC</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Comic+Relief:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="container breed-page">
  <header class="breed-header">
    <a class="back-link" href="{base}/">← Back to rankings</a>

    <div class="breed-copy">
      <p class="eyebrow">Breed detail page</p>
      <h1>{data.breed}</h1>
      <p class="breed-description">
        {data.total} logged bites reported in NYC for this breed.
      </p>
    </div>

  </header>

  <main class="breed-layout">
    <section class="overview-grid">
    <article class="panel panel--accent">
      <p class="eyebrow">Borough breakdown</p>

      {#if boroughRows.length}
        <ul class="borough-list">
          {#each boroughRows as [borough, count]}
            <li class="borough-item">
              <span class="borough-name">{borough}</span>
              <span class="borough-count">{count}</span>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="empty-state">No borough data was available for this breed.</p>
      {/if}
    </article>

    <article class="panel">
    <p class="eyebrow">20 Most Recent Bites</p>

      {#if data.recent.length}
        <ul class="incident-list">
          {#each data.recent as row}
            <li class="incident-item">
              <span class="incident-borough">{row.borough ?? 'Unknown borough'}</span>
              <span class="incident-date">{formatDate(row.dateofbite)}</span>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="empty-state">No recent incidents to show.</p>
      {/if}
    </article>
  </section>

    <section class="methodology-wrap">
      <MethodologyBox>
      <p>
        The data on this page comes from NYC's Department of Health and Mental Hygiene (DOHMH), published
        <a href="https://data.cityofnewyork.us/Health/DOHMH-Dog-Bite-Data/rsgh-akpg/about_data" target="_blank" rel="noreferrer">
          via New York City's open data portal
        </a>.
      </p>
      <p>
        The dataset includes the 1,000 most recent reported dog bites in NYC until December 31, 2024, with details on the date of the bite, the breed of the dog (as reported by the victim or witness), and the borough where the incident occurred. The data is current as of August 2025.
      </p>
    </MethodologyBox>
  </section>
</main>
</div>

<style lang="scss">
  

  .breed-header {
    padding-top: var(--spacing-xxs);
    font-family: "Comic Relief", system-ui, -apple-system, sans-serif;
  }

  .breed-copy {
    padding: var(--spacing-xxs);
    font-family: "Comic Relief", system-ui, -apple-system, sans-serif;
  }

  .breed-copy h1 {
    margin: 0;
    font-family: "Comic Relief", system-ui, -apple-system, sans-serif;
  }

  .breed-description {
    max-width: 42rem;
    margin: 0;
    color: var(--color-medium);
    font-size: var(--font-size-lg);
    font-family: "Comic Relief", system-ui, -apple-system, sans-serif;
    padding-bottom: var(--spacing-sm);
  }

  .back-link {
    padding-bottom: var(--spacing-xxs);
    display: inline-block;
    color: var(--color-medium);
    text-decoration: none;
    margin-bottom: var(--spacing-xxs);
  }

  .stat-pill {
    display: inline-flex;
    flex-direction: column;
    gap: 0.15rem;
    width: fit-content;
    padding: var(--spacing-xs) var(--spacing-sm);
    background: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-sm);
  }

  .stat-label,
  .eyebrow {
    font-size: var(--font-size-xs);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wider);
    color: var(--color-medium);
    font-family: "Comic Relief", system-ui, -apple-system, sans-serif;
  }

  .stat-value {
    font-family: 'Comic Relief', sans-serif;
    font-size: var(--font-size-3xl);
    color: var(--color-text);
    line-height: 1;
  }

  .breed-layout {
    display: grid;
    gap: var(--spacing-lg);
  }

  .overview-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
    margin-top: var(--spacing-lg);
  }

  .panel {
    background: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    box-shadow: 0 8px 24px var(--color-shadow);
    padding: var(--spacing-md);
  }

  .borough-list,
  .incident-list {
    list-style: none;
    margin: var(--spacing-md) 0 0;
    padding: 0;
    display: grid;
    gap: var(--spacing-xs);
  }

  .borough-item,
  .incident-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    background: var(--color-white);
  }

  .borough-name,
  .incident-borough {
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    font-family: "Comic Relief", system-ui, -apple-system, sans-serif;
  }

  .borough-count {
    font-family: 'Comic Relief', sans-serif;
    font-size: var(--font-size-xl);
    color: var(--color-medium);
  }

  .incident-date {
    font-family: "Comic Relief", system-ui, -apple-system, sans-serif;
    color: var(--color-medium);
    text-align: right;
    white-space: nowrap;
  }

  .empty-state {
    margin-top: var(--spacing-md);
    color: var(--color-medium);
  }

  .methodology-wrap {
    margin-top: var(--spacing-lg);
  }

  @media (min-width: 768px) {
    .breed-header {
      grid-template-columns: minmax(0, 1fr) auto;
      gap: var(--spacing-lg);
    }

    .overview-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      align-items: start;
    }

    .breed-page {
      padding-top: var(--spacing-md);
      padding-bottom: var(--spacing-lg);
    }
  }

  @media (min-width: 1200px) {
    .breed-page {
      padding-inline: var(--spacing-lg);
    }
  }
</style>