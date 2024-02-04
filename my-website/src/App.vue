<script setup lang="ts">
import { ref, onMounted } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

const scrollOver = ref(false);

const navLinks = ref([
  { name: "INTRO", label: "個人檔案" },
  { name: "PRODUCTS", label: "作品集" },
  { name: "COMMENTS", label: "留言板" },
  { name: "MESSAGE", label: "私訊我" },
]);

const setScrollOver = (val: boolean) => {
  scrollOver.value = val;
};

onMounted(() => {
  window.addEventListener("scroll", () => {
    const overHeigth = window.scrollY > 160;
    setScrollOver(overHeigth);
  });
});
</script>

<template>
  <header
    :class="`w-full border-2 h-auto px-4 fixed z-50 ${
      scrollOver
        ? 'left-0 right-0 top-0 border-black text-black'
        : 'border-white text-white'
    } ${scrollOver ? 'animate-[slide-in_1s_ease]' : ''}`"
    :style="{
      borderRadius: '25px 25px 55px 5px/5px 55px 25px 25px',
      backgroundColor: scrollOver ? 'rgba(253, 253, 253, 0.9)' : 'transparent',
      transition: 'all 0.3s ease',
    }"
  >
    <nav
      class="flex justify-between items-center h-full w-full max-[1200px] mx-auto py-[5px]"
    >
      <span class="font-cabin">Navbar</span>
      <div class="flex-1 flex justify-end">
        <ul class="flex menu">
          <li v-for="link in navLinks" :key="link.name" class="px-8 py-2">
            <a
              :href="`#${link.name}`"
              :class="`flex flex-col items-center hover:text-white `"
            >
              <span :class="`${scrollOver ? 'text-black' : 'text-white'}`">{{
                link.label
              }}</span>
              <span
                :style="{
                  fontSize: '10px',
                  color: scrollOver ? 'gray' : 'rgba(255, 255, 255, 0.6)',
                }"
                >{{ link.name }}</span
              >
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <div class="relative overflow-hidden w-full">
    <canvas
      id="canvas"
      class="w-full h-full absolute left-0 top-0 z-10"
      style="background-color: rgba(25, 25, 25, 0.5)"
    ></canvas>
    <div
      class="bg-[url('./assets/laptop.jpg')] w-full h-screen bg-cover bg-center"
    ></div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
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
