<template>
  <div
    class="text-center w-full mx-auto container xl:max-w-[1200px] max-w-[96%] bg-[#f9efe1] border-2 border-[#4d6085] rounded-[10px] transition-all duration-700"
    :class="`${isIntersection ? 'opacity-100' : 'opacity-0'}`"
    :style="{
      transform: isIntersection
        ? 'translateX(0) scale(1)'
        : 'translateX(-30%) scale(0.95)',
    }"
    ref="sectionsRef"
  >
    <h2 class="w-full font-bold text-4xl py-2 border-bottom text-center pb-6">
      <span
        class="inline-block relative title-border-bottom font-cabin text-[#222222]"
        >Experience</span
      >
    </h2>
    <div
      id="timeLine"
      class="h-[354px] overflow-y-scroll overflow-x-hidden pt-0 pb-[10px] pl-3 sm:pl-8 md:pl-0"
      :class="{ 'scrollbar-w-0': isScreenSM }"
      @scroll="blockScrollHandler"
    >
      <div
        class="relative w-[0.5rem] ml-0 mr-auto md:mx-auto h-[800px] md:h-[708px] bg-[#4d6085]"
        :class="
          isIntersection
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
            class="w-0 h-0 sm:w-[50px] sm:h-[50px] leading-[50px] text-center rounded-[50%] text-white relative"
            :style="{
              backgroundColor: item.bg,
            }"
          >
            <span class="hidden sm:block">{{ item.year }}</span>
          </div>
          <div
            class="xl:w-[31vw] md:w-[40vw] sm:w-[75vw] w-[85vw] h-[30vh] max-h-[190px] md:max-h-[230px] md:max-w-[540px] border-5 border-[#4d6085] absolute"
            :class="`${
              item.dataNum % 2 || isScreenSM
                ? 'left-[38px] sm:left-[60px]'
                : 'right-[38px] sm:right-[60px]'
            }`"
            :style="{
              top: 'calc(-15vh + 25px)',
            }"
          >
            <div
              class="relative information before:transition-all before:duration-700"
              :class="[
                {
                  right: item.dataNum % 2,
                  left: !(item.dataNum % 2) && !isScreenSM,
                  visibility: blockScrollProgress > item.show,
                },
              ]"
              :data-attr="item.job"
            >
              <h3>
                <img
                  class="invert w-[20px] h-[20px]"
                  :src="laptopIcon"
                  alt="icon"
                />
                <span class="font-cabin">{{ item.during }}</span>
              </h3>
              <p
                v-for="(content, index) in item.contents"
                :key="`text${index}`"
                class="py-1 pl-2 pr-[36px] tracking-tighter text-[#222222] text-sm sm:text-base"
              >
                {{ item.contents.length > 1 ? `${index + 1}.` : ""
                }}{{ content }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-0 h-0 ml-[-10px] mr-auto md:mx-auto arrow-black"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useIntersectionObserver } from "../composables/useIntersectionObserver";
import laptopIcon from "@/assets/laptop-icon.svg";

const props = defineProps<{
  scrollOver: boolean;
  isScreenSM: boolean;
}>();

const { isIntersection, intersectionObserver } = useIntersectionObserver();

const sectionsRef = ref(null);

// TODO: 經歷資料
const experienceList = [
  {
    year: 2018,
    dataNum: 1,
    bg: "#ff9500",
    show: 0,
    during: "2018(3)-2018(5)",
    job: "學員",
    contents: [
      "HTML、CSS、Bootstrap 基礎班-結業(3月)",
      "JavaScript 基礎班-結業(4月)",
      "Firebase、JavaScript 實務班-結業(5月)",
    ],
  },
  {
    year: 2020,
    dataNum: 2,
    bg: "#ffcb00",
    show: 50,
    during: "2018(9)-2023(7)",
    job: "前端工程師",
    contents: [
      "VR360 React.js 遊戲專案開啟",
      "公司接案：夢想菜單 Vue.js 約會交友網站",
      "2020 年開始協助客戶產品 Vue.js 系統前後台開發及維護",
    ],
  },
  {
    year: 2022,
    dataNum: 3,
    bg: "#00539f",
    show: 75,
    during: "2023(7)~2024(7)",
    job: "前端工程師",
    contents: [
      "公司產品： Vue.js 主題集合式遊戲平台，開發及維護系統前後台前端(新增主題、主題改版、對接遊戲商遊戲、建立客製化表單並協助後端對接國外金流、後台各式報表、後台系統前端功能新增.....等等)",
    ],
  },
];

const blockScrollProgress = ref(0);

const blockScrollHandler = ($event: Event) => {
  const target = $event.target as HTMLElement;
  const scrollTop = Math.floor(target.scrollTop);
  blockScrollProgress.value = Math.floor((scrollTop / 384) * 100);
};

watch(
  () => props.scrollOver,
  async (newValue) => {
    if (newValue) {
      blockScrollProgress.value = 0;
    }
  }
);

onMounted(() => {
  if (sectionsRef.value) {
    intersectionObserver(sectionsRef.value);
  }
});
</script>

<style scoped>
.arrow-black {
  border-top: 20px solid #4d6085;
  border-right: 13px solid transparent;
  border-left: 13px solid transparent;
}

.information {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 5px solid #4d6085;
  transform: rotateX(90deg);
  transition: all cubic-bezier(0.68, 0.55, 0.265, 1.55) 0.5s;
  text-align: left;
}
.information h3 {
  text-align: left;
  display: inline-block;
  background-color: #4d6085;
  padding: 0.5rem 3px;
}
.information h3 img {
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
}
.information::before {
  content: attr(data-attr);
  position: absolute;
  z-index: 5;
  display: inline-block;
  right: -40px;
  top: 50px;
  opacity: 0;
  writing-mode: vertical-lr;
  font-weight: 700;
  font-size: 24px;
  color: #4d6085;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  text-shadow: 0px -1px 0px #3e4d6b, 2px -4px #d9d1c5, 4px -6px #eae1d3;
}
.information h3 span {
  display: inline-block;
  vertical-align: middle;
  color: #eae1d3;
  padding-left: 5px;
}
.information.left::after {
  border-color: transparent transparent transparent #4d6085;
  left: unset;
  right: -24px;
}
.information.visibility {
  transform: rotateX(0deg) perspective(360px);
}
.information.visibility::before {
  right: 4px;
  opacity: 1;
}
</style>
