<template>
  <div
    class="project-info flex flex-col justify-center"
    v-if="projectActiveData"
  >
    <div class="overflow-hidden w-full h-[9vw]">
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
    <div class="overflow-hidden w-full h-[9vw]">
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
.project-info {
  flex-grow: 0;
  flex-shrink: 0;
  width: 50vw;
  overflow: hidden;
  padding-right: 10px;
}
.project-info h2 {
  font-size: 6vw;
  background-image: linear-gradient(
    135deg,
    rgb(248, 198, 70) 0%,
    rgb(253, 140, 41) 20%,
    rgb(248, 198, 70) 40%,
    rgb(253, 140, 41) 60%,
    rgb(248, 198, 70) 80%,
    rgb(253, 140, 41) 100%
  );
}
.project-info h2::after {
  text-shadow: 1px 1px 1px rgb(253, 140, 41), 1px 2px 1px rgb(253, 140, 41),
    1px 3px 1px rgb(253, 140, 41), 1px 4px 1px rgb(253, 140, 41),
    1px 5px 1px rgb(253, 140, 41), 1px 6px 1px rgb(253, 140, 41),
    1px 22px 10px rgba(248, 198, 70, 0.2);
}
.project-info p {
  font-size: 3vw;
  font-weight: bold;
  color: #f5f5f5;
  text-shadow: 1px 1px 1px #919191, 1px 2px 1px #919191, 1px 3px 1px #919191,
    1px 25px 35px rgba(16, 16, 16, 0.2);
}
</style>
