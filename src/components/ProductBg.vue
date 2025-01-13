<template>
  <div
    class="transition-all fuzzy-before absolute w-[80vw] left-[10vw] top-[110px] overflow-hidden rounded-[5px]"
    :class="[
      `${isIntersection ? 'opacity-100' : 'opacity-0'}`,
      {
        'animate-[fade-in_700ms_ease]': carouselSliding,
      },
    ]"
    ref="sectionsRef"
  >
    <img
      class="w-full opacity-[0.9]"
      :src="`/image/production${projectActive}.png`"
      alt="fuzzy-bg"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useIntersectionObserver } from "../composables/useIntersectionObserver";

defineProps<{
  carouselSliding: boolean;
  projectActive: number;
}>();

const { isIntersection, intersectionObserver } = useIntersectionObserver();

const sectionsRef = ref(null);

onMounted(() => {
  if (sectionsRef.value) {
    intersectionObserver(sectionsRef.value);
  }
});
</script>

<style scoped>
.fuzzy-before::before {
  content: "";
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  backdrop-filter: blur(4px);
  border-radius: 0.25rem;
  background-image: linear-gradient(to top, #4d6085 0%, transparent 100%);
}
</style>
