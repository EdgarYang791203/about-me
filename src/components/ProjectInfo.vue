<template>
  <div
    class="project-info flex flex-col justify-center pl-4 pr-2 md:pl-0 md:pr-0"
    v-if="projectActiveData"
  >
    <div class="overflow-hidden w-full h-[14vw] md:h-[9vw]">
      <h2
        class="gradient-text font-cabin"
        :class="{
          'animate-[slide-in-bottom_1s_ease]': carouselSliding,
        }"
        :data-attr="projectActiveData.name"
      >
        {{ projectActiveData.name }}
      </h2>
    </div>
    <div class="overflow-hidden w-full h-[14vw] md:h-[9vw]">
      <p
        :class="{
          'animate-[slide-in-bottom_1s_ease]': carouselSliding,
        }"
      >
        {{ projectActiveData.intro }}
      </p>
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
defineProps<{
  carouselSliding: Boolean;
  projectActiveData: Project | null;
}>();
</script>

<style scoped>
.gradient-text {
  position: relative;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}
.gradient-text::after {
  content: attr(data-attr);
  position: absolute;
  z-index: -1;
  left: 0px;
  top: 0px;
}
.project-info h2::after {
  text-shadow: 1px 1px 1px rgb(253, 140, 41), 1px 2px 1px rgb(253, 140, 41),
    1px 3px 1px rgb(253, 140, 41), 1px 4px 1px rgb(253, 140, 41),
    1px 5px 1px rgb(253, 140, 41), 1px 6px 1px rgb(253, 140, 41),
    1px 22px 10px rgba(248, 198, 70, 0.2);
}
</style>
