<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

const introTop = ref(0);

const windowScrollY = ref(0);

const navLinks = ref([
  { name: "INTRO", label: "個人檔案" },
  { name: "PRODUCTS", label: "作品集" },
  { name: "COMMENTS", label: "留言板" },
  { name: "MESSAGE", label: "私訊我" },
]);

const experienceList = [
  { year: 2018, dataNum: 1, bg: "#ff9500" },
  { year: 2020, dataNum: 2, bg: "#ffcb00" },
  { year: 2022, dataNum: 3, bg: "#00539f" },
];

type social = { name: string; href: string; img: string };

const socialLinks: social[] = [
  {
    name: "github",
    img: "/image/github-icon.png",
    href: "https://github.com/EdgarYang791203",
  },
  {
    name: "codepen",
    img: "/image/codepen-icon.png",
    href: "https://codepen.io/hank73307/pens/public",
  },
];

const showSection = computed(() => {
  const currentTop = windowScrollY.value;
  switch (true) {
    case currentTop > introTop.value - 160:
      return 1;

    default:
      return 0;
  }
});

const showScrollInto = ($event: any) => {
  const toLocation = $event.target.getAttribute("href").replace("#", "");
  const element = document.getElementById(toLocation);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const scrollOver = computed(() => {
  return windowScrollY.value > 160;
});

onMounted(() => {
  window.addEventListener("scroll", () => {
    windowScrollY.value = Math.floor(window.scrollY);
  });
  introTop.value = document.getElementById("INTRO")?.offsetTop || 0;
});
</script>

<template>
  <header
    :class="`w-full border-2 h-auto fixed z-50 ${
      scrollOver
        ? 'left-0 right-0 top-0 border-black text-black'
        : 'border-none text-white'
    } ${scrollOver ? 'animate-[slide-in-top_1s_ease]' : ''}`"
    :style="{
      borderRadius: '25px 25px 55px 5px/5px 55px 25px 25px',
      backgroundColor: scrollOver ? 'rgba(253, 253, 253, 0.9)' : 'transparent',
      transition: 'all 0.3s ease',
    }"
  >
    <nav
      :class="`flex justify-between items-center h-full w-full py-[5px] border-2 pl-3 ${
        scrollOver ? 'border-none' : 'border-white'
      }`"
      :style="{
        borderRadius: '25px 25px 55px 5px/5px 55px 25px 25px',
      }"
    >
      <span class="font-cabin" style="font-size: 1.25rem">Navbar</span>
      <div class="flex-1 flex justify-end">
        <ul class="flex menu">
          <li v-for="link in navLinks" :key="link.name" class="px-8 py-2">
            <a
              :href="`#${link.name}`"
              :class="`flex flex-col items-center transition-all hover:text-white hover:animate-[menu-hover_1s_infinite]`"
              @click.prevent="showScrollInto"
            >
              <span
                :class="`${
                  scrollOver ? 'text-[tomato]' : 'text-white'
                } pointer-events-none`"
                >{{ link.label }}</span
              >
              <span
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
      </div>
    </nav>
  </header>
  <div class="relative overflow-hidden w-full">
    <!-- TODO: BANNER -->
    <div
      class="bg-[url('/image/laptop.jpg')] bg-blend-multiply w-full h-screen bg-cover bg-center bg-fixed flex items-center pr-1 relative after:content-[''] after:z-10 after:absolute after:w-full after:h-[35px] after:bg-[#fff] after:bottom-[-14px] after:left-0 after:rotate-1 after:border-2 after:border-[#FF6347]"
      style="background-color: rgba(216, 216, 216, 1)"
    >
      <div
        class="w-full max-w-[1200px] border-2 border-white h-[400px] relative mx-auto"
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
  <!-- TODO: Experience -->
  <div
    ref="INTRO"
    id="INTRO"
    class="py-12 w-full bg-[#fff] border-2 border-[#FF6347] border-t-0 relative"
  >
    <div
      class="text-center w-full mx-auto container md:max-w-[75vw] bg-white border-2 border-[rgba(0, 0, 0, 0.125)] rounded-[10px] transition-all duration-700"
      :class="`${showSection > 0 ? 'opacity-100' : 'opacity-0'}`"
      :style="{
        transform:
          showSection > 0
            ? 'translateX(0) scale(1)'
            : 'translateX(-30%) scale(0.95)',
      }"
    >
      <h2 class="w-full font-bold text-4xl py-2 border-bottom text-center pb-6">
        <span class="inline-block relative title-border-bottom"
          >Experience</span
        >
      </h2>
      <div id="timeLine" class="h-[354px] overflow-y-scroll pb-[10px]">
        <div
          class="relative w-[0.5rem] mx-auto h-[708px] bg-[#000]"
          :class="
            showSection > 0
              ? 'animate-[arrow-stretch_1.5s_ease-in-out]'
              : 'animate-none'
          "
        >
          <div
            v-for="item in experienceList"
            :key="item.dataNum"
            class="absolute left-[-21px]"
            :style="{
              zIndex: Math.floor(3 / item.dataNum),
              top: item.dataNum * 25 + '%',
            }"
          >
            <div
              class="w-[50px] h-[50px] leading-[50px] text-center rounded-[50%] text-white relative"
              :style="{
                backgroundColor: item.bg,
              }"
            >
              <span>{{ item.year }}</span>
              <div
                class="w-[31vw] h-[30vh] border-5 border-[rgba(25, 25, 25, 0.9)] absolute top-0"
                :style="{
                  left: item.dataNum % 2 ? 'unset' : '45px',
                  right: item.dataNum % 2 ? '45px' : 'unset',
                }"
              ></div>
            </div>
          </div>
        </div>
        <div class="w-0 h-0 mx-auto arrow-black"></div>
      </div>
    </div>
  </div>
  <!-- TODO: PRODUCT -->
  <div
    ref="PRODUCTS"
    id="INTRO"
    class="py-12 w-full bg-[#ebebeb] h-[70vh] relative z-10 after:content-[''] after:absolute after:w-full after:h-[35px] after:bg-[#ebebeb] after:top-[-14px] after:left-0 after:rotate-[-1deg] after:border-0 after:border-t-2 after:border-[#FF6347]"
  ></div>
  <div></div>
  <footer
    class="w-full px-2 py-[6px] bg-[#222831]"
    style="border-top: 2px solid #d90000"
  >
    <div
      class="mx-auto container md:max-w-[1000px] flex items-center justify-between"
    >
      <div class="flex">
        <a
          v-for="link in socialLinks"
          :key="link.name"
          :href="link.href"
          target="_blank"
          class="top-0 relative hover:top-[5px] hover:invert mr-6"
          style="transition: all 0.5s cubic-bezier(0.36, 0.87, 0.63, -0.07)"
        >
          <img :src="link.img" alt="github" />
        </a>
      </div>
      <p class="text-white inline-block tracking-wide">
        © Copy right Feb 14,2024
      </p>
    </div>
  </footer>
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
.title-border-bottom::after {
  content: "";
  position: absolute;
  padding: 1px;
  display: block;
  width: 60%;
  bottom: -0.75rem;
  left: 20%;
  border: solid #fbb034;
  border-width: 0.25rem 0 0 0;
}
.arrow-black {
  border-top: 20px solid #222;
  border-right: 13px solid transparent;
  border-left: 13px solid transparent;
}
</style>
