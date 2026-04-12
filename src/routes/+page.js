import dogs from '$lib/data/dogs.json';

export function load() {
  return {
    // Set to false to hide the NYCity News Service header
    showHeader: false,
    // Set to false to hide the site footer
    showFooter: false,
    dogs
  };
}
