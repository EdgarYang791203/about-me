<script setup lang="ts">
import { ref, onMounted } from "vue";

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
    } ${scrollOver ? 'animate-[slide-in-top_1s_ease]' : ''}`"
    :style="{
      borderRadius: '25px 25px 55px 5px/5px 55px 25px 25px',
      backgroundColor: scrollOver ? 'rgba(253, 253, 253, 0.9)' : 'transparent',
      transition: 'all 0.3s ease',
    }"
  >
    <nav
      class="flex justify-between items-center h-full w-full max-w-[1200px] mx-auto py-[5px]"
    >
      <span class="font-cabin" style="font-size: 1.25rem">Navbar</span>
      <div class="flex-1 flex justify-end">
        <ul class="flex menu">
          <li v-for="link in navLinks" :key="link.name" class="px-8 py-2">
            <a
              :href="`#${link.name}`"
              :class="`flex flex-col items-center transition-all hover:text-white hover:animate-[menu-hover_1s_infinite]`"
            >
              <span :class="`${scrollOver ? 'text-[tomato]' : 'text-white'}`">{{
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
    <div
      class="bg-[url('./assets/laptop.jpg')] bg-blend-multiply w-full h-screen bg-cover bg-center bg-fixed flex items-center pr-1 relative after:content-[''] after:z-10 after:absolute after:w-full after:h-[35px] after:bg-[#222831] after:bottom-[-14px] after:left-0 after:rotate-1"
      style="background-color: rgba(25, 25, 25, 0.6)"
    >
      <div
        class="w-full border-2 border-white h-[400px] relative"
        style="border-radius: 55px 225px 15px 25px/25px 25px 35px 355px"
      >
        <span
          class="font-cabin text-white animate-[slide-in-left_1s_ease-in-out] absolute top-16 left-8"
          style="font-size: 4.5rem"
          >Welcome to my website!</span
        >
      </div>
    </div>
  </div>
</template>

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
