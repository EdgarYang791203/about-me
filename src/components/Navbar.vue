<template>
  <ul class="flex menu">
    <li v-for="link in navLinks" :key="link.name" class="px-8 py-2">
      <a
        :href="`#${link.name}`"
        :class="`flex flex-col items-center transition-all hover:text-white hover:animate-[menu-hover_1s_infinite]`"
        @click.prevent="showScrollInto"
      >
        <span
          :class="`${
            scrollOver || isScreenSM ? 'text-[tomato]' : 'text-white'
          } pointer-events-none`"
          >{{ link.label }}</span
        >
        <span
          v-if="!isScreenSM"
          class="pointer-events-none"
          :style="{
            fontSize: '10px',
            color: scrollOver ? 'gray' : 'rgba(255, 255, 255, 0.6)',
          }"
          >{{ link.name }}</span
        >
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  scrollOver: Boolean;
  isScreenSM: Boolean;
}>();

const navLinks = ref([
  { name: "TOP", label: "最上方" },
  { name: "INTRO", label: "個人檔案" },
  { name: "PRODUCTS", label: "作品集" },
  // { name: "COMMENTS", label: "留言板" },
  { name: "MESSAGE", label: "私訊我" },
]);

const showScrollInto = ($event: any) => {
  const toLocation = $event.target.getAttribute("href").replace("#", "");
  if (toLocation === "TOP") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const element = document.getElementById(toLocation);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style scoped>
.menu li:not(:first-child)::before {
  content: "";
  display: block;
  position: absolute;
  width: 1px;
  height: 18px;
  left: 0;
  top: 20px;
  background-color: #b8b8b8;
}
</style>
