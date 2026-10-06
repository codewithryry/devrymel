<template>
  <svg
    class="hero-art"
    viewBox="0 0 240 180"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <!-- Projects: stacked app windows -->
    <g v-if="name === 'projects'">
      <rect x="60" y="20" width="150" height="100" rx="10" />
      <path d="M60 40h150" />
      <rect x="30" y="55" width="150" height="100" rx="10" />
      <path d="M30 75h150" />
      <circle cx="42" cy="65" r="2.5" />
      <circle cx="52" cy="65" r="2.5" />
      <rect x="44" y="88" width="50" height="50" rx="6" />
      <path d="M106 92h60M106 106h46M106 120h54" />
    </g>

    <!-- Skills: code brackets with gears -->
    <g v-else-if="name === 'skills'">
      <path d="M70 55l-35 35 35 35" />
      <path d="M170 55l35 35-35 35" />
      <path d="M135 40l-30 100" />
      <circle cx="200" cy="35" r="12" />
      <path d="M200 17v6M200 47v6M182 35h6M212 35h6" />
    </g>

    <!-- Experience: briefcase and path -->
    <g v-else-if="name === 'experience'">
      <rect x="40" y="60" width="110" height="80" rx="10" />
      <path d="M75 60V48a8 8 0 0 1 8-8h24a8 8 0 0 1 8 8v12" />
      <path d="M40 92h110" />
      <path d="M170 140c20 0 20-30 40-30" stroke-dasharray="4 5" />
      <circle cx="210" cy="60" r="10" />
      <path d="M210 70v40" stroke-dasharray="4 5" />
    </g>

    <!-- Services: toolbox -->
    <g v-else-if="name === 'services'">
      <rect x="40" y="70" width="160" height="80" rx="10" />
      <path d="M95 70V55a8 8 0 0 1 8-8h34a8 8 0 0 1 8 8v15" />
      <path d="M40 100h160" />
      <rect x="108" y="92" width="24" height="16" rx="4" />
      <path d="M185 20l-20 20M175 15l15 15" />
    </g>

    <!-- Uses: laptop and coffee -->
    <g v-else-if="name === 'uses'">
      <rect x="45" y="40" width="120" height="80" rx="8" />
      <path d="M30 135h150l-10-15H40z" />
      <path d="M75 70h40M75 85h60" />
      <path d="M190 100h22v26a10 10 0 0 1-10 10h-2a10 10 0 0 1-10-10z" />
      <path d="M212 108h6a6 6 0 0 1 0 12h-6" />
      <path d="M196 88c0-6 6-6 6-12" />
    </g>

    <!-- Contact: envelope and chat -->
    <g v-else-if="name === 'contact'">
      <rect x="30" y="60" width="130" height="90" rx="10" />
      <path d="M30 70l65 45 65-45" />
      <path d="M170 25h50a10 10 0 0 1 10 10v30a10 10 0 0 1-10 10h-30l-15 15V75h-5a10 10 0 0 1-10-10V35a10 10 0 0 1 10-10z" />
      <path d="M185 45h30M185 57h20" />
    </g>

    <!-- Changelog: list with history -->
    <g v-else-if="name === 'changelog'">
      <path d="M60 30v120" />
      <circle cx="60" cy="45" r="7" />
      <circle cx="60" cy="90" r="7" />
      <circle cx="60" cy="135" r="7" />
      <path d="M80 45h80M80 90h100M80 135h70" />
      <circle cx="200" cy="45" r="18" />
      <path d="M200 35v10l7 5" />
    </g>

    <!-- Roadmap: path with flag -->
    <g v-else-if="name === 'roadmap'">
      <path d="M30 150c40 0 40-50 80-50s40-50 80-50" stroke-dasharray="5 6" />
      <circle cx="30" cy="150" r="6" />
      <circle cx="110" cy="100" r="6" />
      <path d="M190 50V15" />
      <path d="M190 15h30l-8 10 8 10h-30" />
    </g>

    <!-- Deployment: rocket and cloud -->
    <g v-else-if="name === 'deployment'">
      <path d="M150 25c25 5 35 30 30 55l-25 25-30-30 25-25c5-5 0-25 0-25z" />
      <circle cx="160" cy="55" r="7" />
      <path d="M125 75l-15 5 10 10M155 105l-5 15-10-10" />
      <path d="M50 150a20 20 0 0 1 5-39 28 28 0 0 1 52 6 17 17 0 0 1 3 33z" />
    </g>

    <!-- Case studies: document and magnifier -->
    <g v-else-if="name === 'case-studies'">
      <rect x="40" y="25" width="110" height="135" rx="8" />
      <path d="M60 50h70M60 70h70M60 90h45" />
      <circle cx="160" cy="115" r="28" />
      <path d="M180 135l25 25" />
    </g>

    <!-- Privacy: shield and lock -->
    <g v-else-if="name === 'privacy'">
      <path d="M120 20l60 22v40c0 40-28 62-60 75-32-13-60-35-60-75V42z" />
      <rect x="100" y="80" width="40" height="32" rx="5" />
      <path d="M108 80v-10a12 12 0 0 1 24 0v10" />
    </g>
  </svg>
</template>

<script>
export default {
  name: "HeroArt",

  props: {
    name: {
      type: String,
      required: true
    }
  }
};
</script>
