<script setup lang="ts">
import { ref, onMounted, computed, watch, reactive } from "vue";
import getTimeNumbers from "./util/getTimestamp";
// import deviceName from "./util/mobileDetective";
import Navbar from "./components/Navbar.vue";
import Marquee from "./components/Marquee.vue";
import Carousel from "./components/Carousel.vue";
import ProjectInfo from "./components/ProjectInfo.vue";
import Footer from "./components/Footer.vue";

// const isMobile = deviceName !== "unknown";

const introTop = ref(0);

const productsTop = ref(0);

const messageTop = ref(0);

const windowScrollY = ref(0);

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
      "2020 年開始協助客戶產品【MGP】系統開發及維護",
      "公司接案：夢想菜單-約會飯局交友網站",
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
      "開發系統前端客戶需求(新增主題、主題改版、對接遊戲商遊戲、建立客製化表單並協助後端對接國外金流、後台各式報表、後台系統前端功能新增.....等等)",
    ],
  },
];

// TODO: 區塊內卡片離左方距離
const cardLeftDistance = computed(() => {});

const showSection = computed(() => {
  const currentTop = windowScrollY.value;
  switch (true) {
    case currentTop > messageTop.value - 200:
      return 3;
    case currentTop > productsTop.value - 160:
      return 2;
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
  if (screen.width < 768) {
    window.clearInterval(timer.value);
    return;
  }
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

const sideProjects = [
  {
    name: "My Website",
    id: 0,
    intro: "個人網站，記錄自己作品及經歷。",
    href: null,
  },
  {
    name: "MeMetalk",
    id: 1,
    intro: "提供分享迷因的社群空間，按讚、留言，預計還有梗圖排名系統製作中。",
    href: "https://memetalk.jystudio.co.uk",
  },
  {
    name: "POE Guide",
    id: 2,
    intro: "因為自己熱愛這款線上遊戲，所以將攻略呈現前端供自用及分享。",
    href: "https://poe-rosy.vercel.app",
  },
];

const openSocialList = ref(false);

const showMessage = ref(false);

//TODO: 輪播
const projectActive = ref(1);

const carouselSliding = ref(false);

const selectProject = (id: number) => {
  projectActive.value = id;
};

const handleSliding = (value: boolean) => {
  carouselSliding.value = value;
};

const projectActiveData = computed(() => {
  const target = sideProjects.find((item) => item.id === projectActive.value);
  if (target) return target;
  return null;
});

const redirectPage = (linkInfo?: { href: string; name: string }) => {
  let name = null;
  let href = null;
  if (linkInfo) {
    name = linkInfo.name;
    href = linkInfo.href;
  }
  if (name === "f-share") {
    if (
      typeof showSection.value === "number" &&
      showSection.value < 3 &&
      !showMessage.value
    ) {
      showMessage.value = true;
    }
    openSocialList.value = !openSocialList.value;
    return;
  }
  const project = projectActiveData.value;
  const windowReference = window.open();
  let url = "";
  if (href) url = href;
  else if (project && project.href) url = project.href;
  if (windowReference) {
    if (name) windowReference.name = name;
    windowReference.location.href = url;
  }
};
//TODO: 輪播

// TODO: 私訊我
let socialMedia = [
  {
    name: "Email",
    icon: "gmail.svg",
    color: "#d14836",
    content: "edgaryang791203@gmail.com",
    href: "mailto:edgaryang791203@gmail.com",
  },
  {
    name: "104",
    icon: "104_logo.png",
    color: "#ff9100",
    content: "104 履歷",
    href: "https://pda.104.com.tw/profile/share/a4fiwz5iM3cLR0kEliuWGXKU54Bk4dqL",
  },
  {
    name: "GitHub",
    icon: "github-icon.svg",
    color: "#3e75c3",
    content: "EdgarYang791203",
    href: "https://github.com/EdgarYang791203",
  },
];

let slideCardNames: string[] = reactive([]);

const sortCard = (name: string) => {
  if (!slideCardNames.includes(name)) slideCardNames.push(name);
  const index = socialMedia.findIndex((item) => item.name === name);
  const target = socialMedia.find((item) => item.name === name);
  setTimeout(() => {
    slideCardNames = slideCardNames.filter((item) => item !== name);
  }, 400);
  setTimeout(() => {
    socialMedia.splice(index, 1);
    if (target) socialMedia.push(target);
  }, 300);
};
// TODO: 私訊我

let timer: any = ref(null);

let screen = reactive({
  width: window.innerWidth || document.documentElement.clientWidth,
});

const isScreenSM = computed(() => {
  if (screen && screen.width) return screen.width <= 768;
  return false;
});

const getWidth = () => {
  screen.width = window.innerWidth || document.documentElement.clientWidth;
};

onMounted(() => {
  window.addEventListener("scroll", () => {
    windowScrollY.value = Math.floor(window.scrollY);
  });
  window.addEventListener("resize", getWidth);
  introTop.value = document.getElementById("INTRO")?.offsetTop || 0;
  productsTop.value = document.getElementById("PRODUCTS")?.offsetTop || 0;
  messageTop.value = document.getElementById("MESSAGE")?.offsetTop || 0;
  determineDecimal();
  timer.value = setInterval(() => {
    numberAnimation();
  }, 1000);
});
</script>

<template>
  <header
    class="w-full h-auto fixed z-50 text-white"
    :class="{
      'animate-[slide-in-top_1s_ease]': scrollOver && !isScreenSM,
      'header-scrolled': scrollOver || isScreenSM,
    }"
    :style="{
      borderRadius: '25px 25px 55px 5px/5px 55px 25px 25px',
      backgroundColor:
        scrollOver || isScreenSM ? 'rgba(253, 253, 253, 0.9)' : 'transparent',
      transition: 'all 0.3s ease',
    }"
  >
    <nav
      :class="`flex justify-between items-center h-full w-full py-[5px] border-2 md:pl-3 ${
        scrollOver || isScreenSM ? 'border-none' : 'border-white'
      }`"
      :style="{
        borderRadius: '25px 25px 55px 5px/5px 55px 25px 25px',
      }"
    >
      <!-- TODO: 時間動畫 -->
      <div
        v-if="screen.width > 768"
        class="accumulate-lottery"
        style="font-size: 1.25rem"
      >
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
      <!-- TODO: navbar -->
      <div class="flex-1 flex justify-center md:justify-end">
        <Navbar :scrollOver="scrollOver" :isScreenSM="isScreenSM" />
      </div>
    </nav>
  </header>
  <div class="relative overflow-hidden w-full">
    <!-- TODO: BANNER -->
    <div
      id="BANNER"
      class="w-full pt-[55px] pb-8 md:py-0 md:min-h-screen md:h-screen bg-[url('/image/laptop.jpg')] bg-blend-multiply bg-cover bg-top bg-fixed flex flex-col justify-center px-1 relative parallelogram after:huge:rotate-[0.5deg] after:border-[#FF6347] after:border-b-0"
      style="background-color: rgba(216, 216, 216, 1)"
    >
      <div
        class="w-full max-w-[1200px] max-h-[876px] h-[30vw] mx-auto border-2 border-[#222] relative overflow-hidden bg-[url('/image/banner.jpg')] bg-[length:100%_auto] md:hover:bg-[length:125%_auto] bg-center bg-no-repeat transition-all"
        style="border-radius: 55px 225px 15px 25px/25px 25px 35px 355px"
      ></div>
      <!-- TODO: 跑馬燈 -->
      <Marquee />
    </div>
  </div>
  <!-- TODO: Experience -->
  <div
    ref="INTRO"
    id="INTRO"
    class="py-4 md:py-12 w-full bg-[#f9efe1] border-2 border-[#FF6347] border-t-0 border-b-0 relative"
  >
    <div
      class="text-center w-full mx-auto container xl:max-w-[1200px] max-w-[96%] bg-[#f9efe1] border-2 border-[#4d6085] rounded-[10px] transition-all duration-700"
      :class="`${showSection > 0 ? 'opacity-100' : 'opacity-0'}`"
      :style="{
        transform:
          showSection > 0
            ? 'translateX(0) scale(1)'
            : 'translateX(-30%) scale(0.95)',
      }"
    >
      <h2 class="w-full font-bold text-4xl py-2 border-bottom text-center pb-6">
        <span
          class="inline-block relative title-border-bottom font-cabin text-f9efe1"
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
                    class="invert"
                    src="./assets/laptop-icon.svg"
                    alt="icon"
                  />
                  <span class="font-cabin">{{ item.during }}</span>
                </h3>
                <p
                  v-for="(content, index) in item.contents"
                  :key="`text${index}`"
                  class="py-1 pl-2 pr-[36px] tracking-tighter text-sm sm:text-base"
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
  </div>
  <!-- TODO: PRODUCT -->
  <div
    ref="PRODUCTS"
    id="PRODUCTS"
    class="overflow-hidden pt-12 w-full relative z-10 bg-[#4d6085] parallelogram after:bg-[#f9efe1] after:rotate-[-1deg] after:huge:rotate-[-0.5deg] after:top-[-14px] after:border-t-0"
  >
    <div
      class="opacity-0 transition-all fuzzy-before absolute w-[80vw] left-[10vw] top-[110px] overflow-hidden rounded-[5px]"
      :class="{
        hidden: showSection <= 1,
        'opacity-100': showSection > 1,
        'animate-[fade-in_700ms_ease]': carouselSliding,
      }"
    >
      <img
        class="w-full opacity-[0.9]"
        :src="`/image/production${projectActive}.png`"
        alt="fuzzy-bg"
      />
    </div>
    <h2
      class="w-full font-bold text-4xl border-bottom text-center relative z-10"
    >
      <span
        class="inline-block relative title-border-bottom font-cabin text-[#f9efe1]"
        >Products</span
      >
    </h2>
    <div
      class="w-full flex duration-1000 select-none relative z-10"
      :class="`${showSection > 1 ? 'opacity-100' : 'opacity-0'}`"
      :style="{
        height: 'calc(100vh - 6rem - 70px)',
        transform:
          showSection > 1
            ? 'translateX(0) scale(1)'
            : 'translateX(30%) scale(0.95)',
      }"
    >
      <Carousel
        :sideProjects="sideProjects"
        :projectActive="projectActive"
        :carouselSliding="carouselSliding"
        @selectProject="selectProject"
        @redirectPage="redirectPage"
        @handleSliding="handleSliding"
      />
      <ProjectInfo
        :carouselSliding="carouselSliding"
        :projectActiveData="projectActiveData"
      />
    </div>
  </div>
  <!-- TODO: MESSAGE -->
  <div
    ref="MESSAGE"
    id="MESSAGE"
    class="pt-12 w-full h-[70vh] overflow-hidden bg-[url('/image/laptop.jpg')] bg-blend-multiply bg-cover bg-bottom bg-fixed bg-[#eae1d3] flex flex-col items-center justify-center relative parallelogram after:bg-[#4d6085] after:top-[-14px] after:rotate-[1deg] after:huge:rotate-[0.5deg] after:border-0 after:border-b-2"
  >
    <div
      class="bg-[tomato] rounded-md w-[380px] relative contact-box opacity-0"
      :class="{
        'animate-[wobble_700ms] opacity-100': showMessage || showSection > 2,
      }"
    >
      <div class="flex px-[30px] pt-[20px] pb-[50px]">
        <img
          class="w-[96px] rounded-[50%]"
          src="/image/head-shot.jpeg"
          alt="head-shot"
        />
        <div class="pl-8 text-white flex flex-col justify-center">
          <p class="text-[22px] mb-[10px]">Hank Yang</p>
          <p class="text-sm">Hi, I'm Hank and I'm a web front-end developer.</p>
        </div>
        <div
          class="contact-btn transition-all cursor-pointer bg-[#eae1d3] text-[#4d6085] flex justify-center items-center border-b-2 border-[#4d6085]"
          :class="{ active: openSocialList }"
          @click="openSocialList = !openSocialList"
        >
          <p
            class="transition-all"
            :class="{
              'opacity-0 absolute z-[-1]': openSocialList,
              'opacity-100': !openSocialList,
            }"
          >
            contact me
          </p>
          <svg
            class="transition-all"
            :class="{
              'opacity-0 absolute z-[-1]': !openSocialList,
              'opacity-100': openSocialList,
            }"
            style="transition-delay: 0.5s"
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
          >
            <g class="nc-icon-wrapper" fill="#4d6085">
              <path
                d="M14.83 30.83L24 21.66l9.17 9.17L36 28 24 16 12 28z"
              ></path>
            </g>
          </svg>
        </div>
      </div>
      <div
        class="bg-[#4d6085] transition-all duration-700 max-h-0 overflow-hidden"
        :class="{ 'max-h-[100px]': openSocialList }"
        style="border-radius: 0 0 0.375rem 0.375rem"
      >
        <p class="py-4 px-8 text-[#eae1d3]">contact me</p>
      </div>
    </div>
    <div
      class="sns-list transition-all duration-1000"
      :class="{ 'fade-in': openSocialList }"
    >
      <div
        v-for="(sns, index) in socialMedia"
        :key="sns.name"
        href=""
        class="sns-card h-[86px] mt-[18px]"
        :style="`transition-delay: ${0.5 + index * 0.2}s`"
      >
        <div
          class="w-full h-full bg-white p-4 rounded flex justify-between items-center"
          :class="{
            'animate-[slide-out-right_400ms_ease]': slideCardNames.includes(
              sns.name
            ),
          }"
          style="transition-delay: 0ms"
        >
          <div
            class="cursor-pointer"
            @click="redirectPage({ name: sns.name, href: sns.href })"
          >
            <img
              class="w-[50px] h-[50px]"
              :src="`/image/${sns.icon}`"
              alt="icon"
            />
          </div>
          <div class="content flex-1 pl-2">
            <p :style="{ color: sns.color }">{{ sns.name }}</p>
            <p>{{ sns.content }}</p>
          </div>
          <button
            class="w-[48px] h-[48px] border-0 focus:outline-0 bg-transparent p-0"
            role="button"
            @click="sortCard(sns.name)"
          >
            <svg
              class="arrow pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
            >
              <g class="nc-icon-wrapper" fill="#444444">
                <path
                  d="M17.17 32.92l9.17-9.17-9.17-9.17L20 11.75l12 12-12 12z"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- TODO: FOOTER -->
  <Footer @redirectPage="redirectPage" />
</template>

<style scoped>
.accumulate-lottery {
  font-size: 0;
  position: relative;
}
.accumulate-lottery::after {
  content: "";
  position: absolute;
  left: -5px;
  top: -5px;
  width: calc(100% + 10px);
  height: calc(100% + 10px);
  background-color: tomato;
  border-radius: 5px;
}
.accumulate-lottery > div {
  display: inline-block;
  vertical-align: top;
  width: 24px;
  height: 36px;
  overflow-x: hidden;
  border-radius: 5px;
  font-size: 30px;
  color: #eae1d3;
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
  background-color: #4d6085;
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
  background-color: #3f4e6c;
}
.accumulate-lottery > div span.below {
  line-height: 0;
  background-color: #4d6085;
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
.fuzzy-before::before {
  content: "";
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  backdrop-filter: blur(4px);
  border-radius: 0.25rem;
  background-image: linear-gradient(to top, #4d6085 0%, transparent 100%);
}

.contact-box {
  transform-origin: bottom center;
  position: relative;
  z-index: 5;
}
.contact-btn {
  box-shadow: 0 8px 13px rgba(0, 0, 0, 0.36), 0 0 0 1px rgba(0, 0, 0, 0.06);
  transition-delay: 0.1s;
  border-radius: 30px;
  position: absolute;
  right: 90px;
  bottom: -24px;
  width: 200px;
  height: 48px;
}
.contact-btn p {
  transition: opacity 0.2s;
  transition-delay: 0.4s;
  width: 100%;
  text-align: center;
}
.contact-btn p::after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  left: 50%;
  bottom: -28px;
  z-index: 3;
  border: solid 15px transparent;
  border-top-color: #eae1d3;
}
.contact-btn.active {
  right: 20px;
  bottom: 22px;
  width: 65px;
  height: 65px;
  border-radius: 50%;
}
.contact-btn.active p::after {
  display: none;
}
.sns-card {
  opacity: 0;
  text-decoration: none;
  transform: translateY(-10px);
  position: relative;
  z-index: 1;
}
.sns-card .content p:first-of-type {
  font-size: 20px;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: 0.4px;
}
.sns-card .content p:last-of-type {
  font-size: 14px;
  color: #b3b3b3;
  letter-spacing: 0.4px;
}
.sns-list {
  max-height: 0;
  overflow: hidden;
  width: 380px;
}
.sns-list.fade-in {
  max-height: none;
}
.sns-list.fade-in .sns-card {
  opacity: 1;
  transform: translateY(0px);
  transition: all 0.7s;
}
</style>
