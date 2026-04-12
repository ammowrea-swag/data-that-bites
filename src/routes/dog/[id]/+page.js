import { error } from '@sveltejs/kit';
import dogs from '$lib/data/dogs.json';

const normalize = (v) => String(v ?? '').trim().toLowerCase();
const displayCase = (v) =>
  String(v ?? '')
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

export function load({ params }) {
  const requestedBreed = decodeURIComponent(params.id ?? '');
  const key = normalize(requestedBreed);

  const incidents = dogs.filter((row) => {
    const raw = row?.breed ?? row?.breedname ?? row?.breed_name ?? 'Unknown';
    return normalize(raw) === key;
  });

  if (!incidents.length) {
    throw error(404, 'Breed not found');
  }

  const boroughCounts = incidents.reduce((acc, row) => {
    const borough = row?.borough ?? 'Unknown';
    acc[borough] = (acc[borough] ?? 0) + 1;
    return acc;
  }, {});

  const recent = incidents
    .slice()
    .sort((a, b) => new Date(b?.dateofbite ?? 0) - new Date(a?.dateofbite ?? 0))
    .slice(0, 25);

  return {
    breed: displayCase(requestedBreed),
    total: incidents.length,
    boroughCounts,
    recent,
    showHeader: false,
    showFooter: false,
  };
}