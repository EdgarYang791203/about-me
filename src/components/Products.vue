<template>
  <div
    class="w-full flex duration-1000 select-none relative z-10"
    :class="`${isIntersection ? 'opacity-100' : 'opacity-0'}`"
    :style="{
      height: isScreenSM ? '60vh' : 'calc(100vh - 6rem - 70px)',
      transform: isIntersection
        ? 'translateX(0) scale(1)'
        : 'translateX(30%) scale(0.95)',
    }"
    ref="sectionsRef"
  >
    <!-- TODO: PC 輪播 -->
    <Carousel
      :sideProjects="sideProjects"
      :projectActive="projectActive"
      @selectProject="selectProject"
      @redirectPage="redirectPage"
      @handleSliding="handleSliding"
      v-if="!isScreenSM"
    />
    <ProjectInfo
      :carouselSliding="carouselSliding"
      :projectActiveData="projectActiveData"
      :projectActive="projectActive"
      :isScreenSM="isScreenSM"
      @selectProject="selectProject"
      @redirectPage="redirectPage"
      @handleSliding="handleSliding"
    />
    <!-- TODO:  手機輪播 -->
    <MobileCarousel
      :sideProjects="sideProjects"
      :projectActive="projectActive"
      :carouselSliding="carouselSliding"
      @selectProject="selectProject"
      @handleSliding="handleSliding"
      v-if="isScreenSM"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Carousel from "../components/Carousel.vue";
import MobileCarousel from "../components/MobileCarousel.vue";
import ProjectInfo from "../components/ProjectInfo.vue";
import { useIntersectionObserver } from "../composables/useIntersectionObserver";

type Project = {
  name: string;
  id: number;
  intro: string;
  href: string | null;
};

defineProps<{
  sideProjects: Project[];
  projectActive: number;
  projectActiveData: Project | null;
  carouselSliding: boolean;
  isScreenSM: boolean;
}>();

const emit = defineEmits(["selectProject", "redirectPage", "handleSliding"]);

const selectProject = (index: number) => {
  emit("selectProject", index);
};

const redirectPage = (href: string) => {
  emit("redirectPage", href);
};

const handleSliding = (isSliding: boolean) => {
  emit("handleSliding", isSliding);
};

const { isIntersection, intersectionObserver } = useIntersectionObserver();

const sectionsRef = ref(null);

onMounted(() => {
  if (sectionsRef.value) {
    intersectionObserver(sectionsRef.value);
  }
});
</script>

<style scoped></style>
