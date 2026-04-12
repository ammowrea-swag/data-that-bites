<!--
@component
SplashHeader.svelte — Splash Header Component (NYCity News Service Style)

A header for feature-length reporting

USAGE EXAMPLE:
<SplashHeader />
-->

<script>
  let {
    headline = '',           // Required: The main title of the article
    byline = '',        // Optional: The author's name(s)
    deck = '',           // Optional: A short summary or subtitle
    kicker = '',         // Optional: A short label above the headline
    pubDate = '',       // Optional: Publication date in YYYY-MM-DD format
    backgroundImage = '', // Optional: URL for the header background image
     src,                    // Required: Image source URL
    alt,                    // Required: Alt text for accessibility
    caption = '',           // Optional: Caption text below image
    credit = '',            // Optional: Photo credit
    size = 'full',          // 'full', 'large', 'medium', 'small'
  } = $props();

  // Format date to "JANUARY 15, 2024" style
  function formatDate(dateString) {
    if (!dateString) return '';
    
    // Parse YYYY-MM-DD format manually to avoid UTC timezone issues
    // This ensures "2024-01-15" displays as January 15 regardless of user's timezone
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);  // month is 0-indexed
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(date); 
  }

  // Resolve local images (those starting with /) using asset()
  // but not external URLs (http://, https://, //, data:)
  const resolvedBackground = $derived(
    backgroundImage?.startsWith('/') && !backgroundImage.startsWith('//')
      ? asset(backgroundImage)
      : backgroundImage
  );

  
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Comic+Relief:wght@400;700&display=swap" rel="stylesheet">

  />
</svelte:head>

<header class="splash-header">
  {#if kicker}
    <span class="kicker">{kicker}</span>
  {/if}
  <h1 class="headline">{headline}</h1>
  {#if deck}
    <p class="deck">{deck}</p>
  {/if}
   {#if byline}
    <p class="byline">{byline}</p>
  {/if}
  {#if pubDate}
    <p class="pubdate">{formatDate(pubDate)}</p>
  {/if}
</header>

<style lang="scss">
  @use '../styles' as *;

.splash-header {
    
    font: "Comic Relief", system-ui, -apple-system, sans-serif;
    font-size: 2.5rem;
    font-weight: var(--font-weight-bold);
    text-align: center;
    padding: var(--spacing-xxl) var(--spacing-lg);
    display: block;
    max-width: auto;
    margin-left: auto;
    margin-right: auto;
    margin-inline: auto;
    text-align: auto;
    color: #333333;
    padding-bottom: var(--spacing-md);
    background-color: #b39DDB;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

}

.headline {
  font-family: "Comic Relief", system-ui, -apple-system, sans-serif;
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-dark-gray);
  margin: var(--spacing-sm) 0;
}

.byline {
  font-family: "Comic Relief", system-ui, -apple-system, sans-serif;
  font-size: var(--font-size-sm);
  color: #ffd7b5;
  margin: var(--spacing-sm) 0 0;
}

 .kicker {
      display: block;
      font-family: "Comic Relief", system-ui, -apple-system, sans-serif;
      font-size: var(--font-size-xs);
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #ffd7b5;
      margin-bottom: var(--spacing-sm);
    }

    .deck {
      display: block;
      font-family: "Comic Relief", system-ui, -apple-system, sans-serif;
      font-size: var(--font-size-lg);
      color: var(--color-dark-gray);
      margin-top: var(--spacing-sm);
    }

    .pubdate {
      font-family: "Comic Relief", system-ui, -apple-system, sans-serif;
      font-size: var(--font-size-sm);
      letter-spacing: 0.05em;
      color: var(--color-medium-gray);
    }

    @include mobile {
      .splash-header h1 {
        font-size: var(--font-size-3xl);
      }
    }

</style>