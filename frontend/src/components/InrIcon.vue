<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :width="size"
    :height="size"
    :stroke="stroke"
    :stroke-width="strokeWidth"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="className"
  >
    <path d="M12 3v18" />
    <path d="M8 7h8" />
    <path d="M8 12h8" />
    <path d="M8 17h8" />
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [Number, String],
    default: 24
  },
  stroke: {
    type: String,
    default: "currentColor"
  },
  strokeWidth: {
    type: [Number, String],
    default: 2
  },
  className: {
    type: String,
    default: ""
  }
});
</script>
