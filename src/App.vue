<script setup lang="ts">
import { ref, onMounted, computed, watch, reactive } from "vue";
import getTimeNumbers from "./util/getTimestamp";

const introTop = ref(0);

const windowScrollY = ref(0);

// TODO: 跑馬燈
/** 依字串長度調整相應的速度 */
const marqueeTexts: string[] = ["Welcome to my website!", "Test marquees ~~~"];
const marqueeTime: string | number = 6;
const marqueeArea: any = ref(null);
const marqueeBox: any = ref(null);
const states = reactive({
  copyTimes: 2,
  movingDistance: 0,
  time: marqueeTime,
});
/** 調整跑馬燈速度(待修正) */
// const setMarquee = () => {
//   states.copyTimes = 1;
//   nextTick(() => {
//     let areaWidth = 0;
//     let boxWidth = 0;
//     try {
//       areaWidth = Math.floor(marqueeArea.value.offsetWidth);
//       boxWidth = Math.floor(marqueeBox.value.offsetWidth);
//     } catch (error) {}

//     states.copyTimes = Math.max(2, Math.ceil((areaWidth * 2) / boxWidth)) || 2;
//     states.movingDistance = boxWidth * Math.floor(states.copyTimes / 2);

//     states.time = parseFloat(
//       ((marqueeTime * states.movingDistance) / 375).toFixed(2)
//     );
//   });
// };
// TODO: 跑馬燈

const navLinks = ref([
  { name: "INTRO", label: "個人檔案" },
  { name: "PRODUCTS", label: "作品集" },
  { name: "COMMENTS", label: "留言板" },
  { name: "MESSAGE", label: "私訊我" },
]);

const experienceList = [
  { year: 2018, dataNum: 1, bg: "#ff9500", show: 0, during: "2018(3)-2018(5)" },
  {
    year: 2020,
    dataNum: 2,
    bg: "#ffcb00",
    show: 50,
    during: "2018(9)-2023(7)",
  },
  {
    year: 2022,
    dataNum: 3,
    bg: "#00539f",
    show: 75,
    during: "2023(7)~2024(7)",
  },
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

const blockScrollProgress = ref(0);

watch(showSection, async (newValue) => {
  if (!newValue) blockScrollProgress.value = 0;
});

const blockScrollHandler = ($event: any) => {
  const scrollTop = Math.floor($event.target.scrollTop);
  blockScrollProgress.value = Math.floor((scrollTop / 384) * 100);
};

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

// TODO: 時間動畫
const clockReset = [0, 0, 0, 0, 0, 0, 0, 0].map((v, i) => ({
  index: i,
  uperNum: v,
  belowNum: v,
}));

let accumulateLottery = reactive(clockReset);

const determineDecimal = () => {
  const timeArr = getTimeNumbers();
  const newArr = timeArr.map((v, i) =>
    !v
      ? {
          index: i,
          uperNum: 0,
          belowNum: 0,
        }
      : {
          index: i,
          uperNum: v,
          belowNum: v,
        }
  );
  Object.assign(accumulateLottery, newArr);
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const removeFlipped = async (index: number) => {
  await sleep(250);
  document.querySelectorAll(".rotor-leaf")[index].classList.remove("flipped");
};
const runFlipped = (index: number) => {
  document.querySelectorAll(".rotor-leaf")[index].classList.add("flipped");
  removeFlipped(index);
};
const numberAnimation = async () => {
  const timeArr = getTimeNumbers();
  for (let index = 0; index < timeArr.length; index++) {
    const upNum = accumulateLottery[index].uperNum;
    const newValue = timeArr[index];
    if (index !== 2 && index !== 5 && newValue !== upNum) {
      runFlipped(index);
    }
  }
  const newArr = timeArr.map((v, i) =>
    !v
      ? {
          index: i,
          uperNum: 0,
          belowNum: 0,
        }
      : {
          index: i,
          uperNum: v,
          belowNum: v,
        }
  );
  Object.assign(accumulateLottery, newArr);
};
// TODO: 時間動畫

let timer: any = ref(null);

onMounted(() => {
  window.addEventListener("scroll", () => {
    windowScrollY.value = Math.floor(window.scrollY);
  });
  introTop.value = document.getElementById("INTRO")?.offsetTop || 0;
  // setMarquee();
  determineDecimal();
  timer.value = setInterval(() => {
    numberAnimation();
  }, 1000);
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
      <!-- TODO: 數字動畫 -->
      <div class="accumulate-lottery" style="font-size: 1.25rem">
        <div v-for="item in accumulateLottery" :key="item.index">
          <template v-if="item.index !== 2 && item.index !== 5">
            <div class="rotor-leaf">
              <span class="below leaf-rear">{{ item.uperNum }}</span>
              <span class="uper leaf-front">{{ item.belowNum }}</span>
            </div>
            <span class="uper">{{ item.uperNum }}</span>
            <span class="below">{{ item.belowNum }}</span>
          </template>
          <template v-else>
            <div class="rotor-leaf">
              <span class="uper">:</span>
              <span class="below">:</span>
            </div>
          </template>
        </div>
      </div>
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
      class="bg-[url('/image/laptop.jpg')] bg-blend-multiply w-full h-screen bg-cover bg-center bg-fixed flex flex-col justify-center pr-1 relative after:content-[''] after:z-10 after:absolute after:w-full after:h-[35px] after:bg-[#fff] after:bottom-[-14px] after:left-0 after:rotate-1 after:border-2 after:border-[#FF6347]"
      style="background-color: rgba(216, 216, 216, 1)"
    >
      <div
        class="w-full max-w-[1200px] mx-auto border-2 border-[#222] h-[400px] relative overflow-hidden bg-[url('/image/banner.jpg')] bg-[length:100%_auto] hover:bg-[length:125%_auto] bg-center bg-no-repeat transition-all"
        style="border-radius: 55px 225px 15px 25px/25px 25px 35px 355px"
      ></div>
      <div
        ref="marqueeArea"
        class="marqueeArea w-full max-w-[1200px] mx-auto mt-2 rounded-md after:animate-[marquee-bg-move_20s_linear_infinite]"
      >
        <div
          ref="marqueeBox"
          class="marqueeBox animate-[marquee-move_30s_linear_infinite]"
        >
          <template
            v-for="index in states.copyTimes"
            :key="`marqueeItemCopy-${index}`"
          >
            <div
              v-for="(item, listIndex) in marqueeTexts"
              :key="`marqueeItem-${index}-${listIndex}`"
              class="marqueeItem font-cabin"
            >
              {{ item }}
            </div>
          </template>
        </div>
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
        <span class="inline-block relative title-border-bottom font-cabin"
          >Experience</span
        >
      </h2>
      <div
        id="timeLine"
        class="h-[354px] overflow-y-scroll pb-[10px]"
        @scroll="blockScrollHandler"
      >
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
            </div>
            <div
              class="w-[31vw] h-[30vh] border-5 border-[rgba(25, 25, 25, 0.9)] absolute"
              :style="{
                top: 'calc(-15vh + 25px)',
                left: item.dataNum % 2 ? '60px' : 'unset',
                right: item.dataNum % 2 ? 'unset' : '60px',
              }"
            >
              <div
                class="relative information"
                :class="{
                  right: item.dataNum % 2,
                  left: !(item.dataNum % 2),
                  visibility: blockScrollProgress > item.show,
                }"
              >
                <h3>
                  <img src="./assets/laptop-icon.svg" alt="icon" />
                  <span>{{ item.during }}</span>
                </h3>
              </div>
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
    id="PRODUCTS"
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
.accumulate-lottery {
  font-size: 0;
}
.accumulate-lottery > div {
  display: inline-block;
  vertical-align: top;
  width: 24px;
  height: 36px;
  overflow-x: hidden;
  border-radius: 5px;
  font-size: 30px;
  color: #ffffff;
  position: relative;
  z-index: 1;
}
.accumulate-lottery > div:not(:last-of-type) {
  margin-right: 5px;
}
.accumulate-lottery > div::after,
.accumulate-lottery > div::before {
  content: "";
  position: absolute;
  left: 0;
  top: 18px;
  display: block;
  z-index: 5;
  width: 100%;
  height: 1px;
  background-color: #000;
}
.accumulate-lottery > div::after {
  top: 19px;
  background-color: #4a4a4a;
}
.accumulate-lottery > div .rotor-leaf {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
  top: 0;
  left: 0px;
  transform-style: preserve-3d;
  transition: transform 0s;
}
.accumulate-lottery > div .rotor-leaf.flipped {
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  transform: rotateX(-180deg);
}
.accumulate-lottery > div .rotor-leaf span.leaf-rear,
.accumulate-lottery > div .rotor-leaf span.leaf-front {
  position: absolute;
  transform: rotateX(0deg);
}
.accumulate-lottery > div .rotor-leaf span.leaf-rear {
  transform: rotateX(-180deg);
}
.accumulate-lottery > div span {
  display: block;
  height: 18px;
  overflow-y: hidden;
  font-weight: 900;
  width: 100%;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
}
.accumulate-lottery > div span.uper {
  line-height: 34px;
  background-color: #151515;
}
.accumulate-lottery > div span.below {
  line-height: 0;
  background-color: #202020;
}

.marqueeArea {
  position: relative;
  overflow: hidden;
  width: 100%;
}
.marqueeArea::after {
  position: absolute;
  content: "";
  width: 1000%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: linear-gradient(
    135deg,
    rgb(248, 198, 70) 0%,
    rgb(248, 198, 70) 20%,
    rgb(253, 140, 41) 40%,
    rgb(253, 140, 41) 60%,
    rgb(248, 198, 70) 80%,
    rgb(248, 198, 70) 100%
  );
}
.marqueeArea::before {
  content: "";
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  left: 0.17rem;
  top: 0.28rem;
  pointer-events: none;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  background-image: url("./assets/marquee-decorate.png");
  filter: invert(100);
  opacity: 0.5;
}
.marqueeBox {
  display: inline-block;
  white-space: nowrap;
  position: relative;
  z-index: 5;
}
.marqueeBox:hover {
  animation-play-state: paused;
}
.marqueeItem {
  display: inline-block;
  margin-right: 2rem;
  color: tomato;
  font-weight: 700;
  font-size: 3rem;
  opacity: 0.7;
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

.information {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 5px solid rgba(25, 25, 25, 0.9);
  transform: rotateX(90deg);
  transition: all cubic-bezier(0.68, 0.55, 0.265, 1.55) 0.5s;
  overflow: hidden;
  text-align: left;
}
.information h3 {
  text-align: left;
  display: inline-block;
  background-color: rgba(25, 25, 25, 0.9);
  padding: 0.5rem 3px;
}
.information h3 img {
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  filter: invert(200);
}
.information h3 span {
  display: inline-block;
  vertical-align: middle;
  color: #eae1d3;
  padding-left: 5px;
}
.information::after {
  content: "";
  position: absolute;
  display: inline-block;
  border: solid 10px;
  border-color: transparent #303030 transparent transparent;
  top: 45%;
  left: -24px;
}
.information.left::after {
  border-color: transparent transparent transparent #303030;
  left: unset;
  right: -24px;
}
.information.visibility {
  transform: rotateX(0deg) perspective(360px);
}
</style>
