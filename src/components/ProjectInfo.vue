<template>
  <div
    class="project-info flex flex-col justify-center pl-4 pr-2 md:pl-0 md:pr-0"
    v-if="projectActiveData"
  >
    <div
      v-if="isScreenSM"
      class="absolute z-10 left-0 top-0 pt-4 pl-4 duration-700"
      @click="switchProject"
    >
      <img
        class="invert w-[30px] h-[30px]"
        :class="{ 'animate-spin': carouselSliding }"
        src="/image/mobile/switch-btn.svg"
        alt="switch"
      />
    </div>
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
    <a
      v-if="projectActiveData.href"
      :href="projectActiveData.href"
      target="_blank"
      rel="redirect"
      class="self-baseline text-white mt-3 py-2 px-7 rounded-[20px] active:text-[#4d6085] hover:text-white md:hover:text-[#4d6085]"
      style="
        background-image: linear-gradient(
          280.5deg,
          #cf9e67 -3.99%,
          #f6d5a1 98.96%
        );
      "
    >
      立即進入
    </a>
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
  isScreenSM: boolean;
  carouselSliding: boolean;
  projectActiveData: Project | null;
  projectActive: number;
}>();

const emit = defineEmits(["redirectPage", "selectProject", "handleSliding"]);

const switchProject = () => {
  emit("handleSliding", true);
  setTimeout(() => {
    emit("handleSliding", false);
  }, 700);
  const next = (props.projectActive + 1) % 3;
  emit("selectProject", next);
};
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
