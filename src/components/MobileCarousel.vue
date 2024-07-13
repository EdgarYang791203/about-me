<template>
  <div class="">
    <div
      class="flex items-center h-full w-[30vw] relative"
      @click="swichProject"
    >
      <div
        v-for="project in sideProjects"
        :key="project.id"
        class="h-full w-full rounded-[5px] absolute bg-left-top bg-no-repeat"
        :class="{ 'animate-[slide-in-right_700ms_ease]': carouselSliding }"
        :style="{
          zIndex: projectActive === project.id ? 10 : 1,
          backgroundImage: `url(/image/mobile/production${projectActive}.png)`,
          backgroundSize: 'auto 100%',
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Project {
  name: string;
  id: number;
  intro: string;
  href: string | null;
}

const props = defineProps<{
  sideProjects: Project[];
  projectActive: number;
  carouselSliding: boolean;
}>();

const emit = defineEmits(["selectProject", "handleSliding"]);

const swichProject = () => {
  emit("handleSliding", true);
  setTimeout(() => {
    emit("handleSliding", false);
  }, 700);
  const next = (props.projectActive + 1) % 3;
  emit("selectProject", next);
};
</script>

<style lang="scss" scoped></style>
