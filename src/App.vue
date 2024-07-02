<script setup lang="ts">
import { ref, onMounted, computed, watch, reactive } from "vue";
import getTimeNumbers from "./util/getTimestamp";

const introTop = ref(0);

const productsTop = ref(0);

const messageTop = ref(0);

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
  { name: "TOP", label: "最上方" },
  { name: "INTRO", label: "個人檔案" },
  { name: "PRODUCTS", label: "作品集" },
  // { name: "COMMENTS", label: "留言板" },
  { name: "MESSAGE", label: "私訊我" },
]);

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
  {
    name: "mail",
    img: "/image/share-icon.png",
    href: "mailto:edgaryang791203@gmail.com",
  },
];

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

// TODO: 輪播
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

const projectActive = ref(1);

const projectActiveData = computed(() => {
  const target = sideProjects.find((item) => item.id === projectActive.value);
  if (target) return target;
  return null;
});

let styleList: any[] = reactive([]);

const setStyle = (values: any) => {
  if (values) {
    const {
      xtrans,
      scale,
      opacity,
      zIndex,
      pIndex,
      rotateY,
      rotateZ,
      transformOrigin,
    } = values;
    const transform = `translate(${xtrans - 50}%, ${
      0 - 50
    }%) scale(${scale}) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    const newStyleList = [...styleList];
    newStyleList[pIndex] = {
      zIndex,
      transform,
      display: opacity === 0 ? "none" : "inline-block",
      transition: "transform 0.5s",
      transformOrigin,
    };
    Object.assign(styleList, newStyleList);
  }
};

const mod = (n: number, m: number) => ((n % m) + m) % m;

const carousel = ref(null);

const carouselSliding = ref(false);

const arrange = (centerIndex: number) => {
  const catesReference: any = carousel.value;
  if (catesReference.children) {
    styleList = [];
    const half = (sideProjects.length - 1) / 2;
    const before = [];
    for (let i = centerIndex - 1; before.length < half; i--) {
      const pIndex = mod(i, sideProjects.length);
      before.push({
        pIndex,
        zIndex: 0,
        xtrans: 0,
        scale: 1,
        opacity: 1,
        rotateY: 0,
        rotateZ: 0,
        transformOrigin: "right center",
      });
    }
    const after = [];
    for (
      let i = centerIndex + 1;
      after.length < sideProjects.length - before.length - 1;
      i++
    ) {
      const pIndex = mod(i, sideProjects.length);
      after.push({
        pIndex,
        zIndex: 0,
        xtrans: 0,
        scale: 1,
        opacity: 1,
        rotateY: 45,
        rotateZ: -150,
        transformOrigin: "left center",
      });
    }
    // console.log(before, after);
    const centerZIndex = Math.max(before.length, after.length) + 1;
    setStyle({
      pIndex: centerIndex,
      xtrans: 0,
      scale: 1,
      opacity: 1,
      zIndex: centerZIndex,
      rotateY: 0,
      rotateZ: 0,
      transformOrigin: "50% 50% 0",
    });
    [before, after].forEach((list: any, listIndex: number) => {
      let parentTrans = 0;

      if (list) {
        list.forEach((item: any, i: number) => {
          const scale = 0.8 ** (i + 1);
          const absolute = 105 * scale * 1.125 + parentTrans;
          parentTrans = absolute;
          const xtrans = (listIndex === 0 ? -1 : 1) * absolute;
          const opacity = Math.max(1 - 0.25 * (i / 2 + 1) ** 2, 0);
          const zIndex = Math.max(before.length, after.length) - i;
          const rotateY = item.rotateY;
          const rotateZ = item.rotateZ;
          const transformOrigin = item.transformOrigin;
          setStyle({
            pIndex: item.pIndex,
            xtrans,
            scale,
            opacity,
            zIndex,
            rotateY,
            rotateZ,
            transformOrigin,
          });
        });
      }
    });
  }
  setTimeout(() => {
    carouselSliding.value = false;
  }, 700);
};
const redirectPage = (href?: string) => {
  const project = projectActiveData.value;
  const windowReference = window.open();
  let url = "";
  if (href) url = href;
  else if (project && project.href) url = project.href;
  if (windowReference) {
    windowReference.location.href = url;
  }
};
const arrangeHandler = (id: number) => {
  if (projectActive.value === id) {
    redirectPage();
    return;
  }
  carouselSliding.value = true;
  const index = sideProjects.findIndex((item) => item.id === id);
  if (index >= 0) {
    projectActive.value = id;
    arrange(index);
  }
};
// TODO: 輪播

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

const openSocialList = ref(false);

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

onMounted(() => {
  window.addEventListener("scroll", () => {
    windowScrollY.value = Math.floor(window.scrollY);
  });
  introTop.value = document.getElementById("INTRO")?.offsetTop || 0;
  productsTop.value = document.getElementById("PRODUCTS")?.offsetTop || 0;
  messageTop.value = document.getElementById("MESSAGE")?.offsetTop || 0;
  // setMarquee();
  arrange(1);
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
      <!-- TODO: 時間動畫 -->
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
      class="w-full min-h-screen h-screen bg-[url('/image/laptop.jpg')] bg-blend-multiply bg-cover bg-top bg-fixed flex flex-col justify-center px-1 relative after:content-[''] after:z-10 after:absolute after:w-full after:h-[35px] after:bg-[#f9efe1] after:bottom-[-14px] after:left-0 after:rotate-[1deg] after:huge:rotate-[0.5deg] after:border-2 after:border-[#FF6347] after:border-b-0"
      style="background-color: rgba(216, 216, 216, 1)"
    >
      <div
        class="w-full max-w-[1200px] max-h-[876px] h-[30vw] mx-auto border-2 border-[#222] relative overflow-hidden bg-[url('/image/banner.jpg')] bg-[length:100%_auto] hover:bg-[length:125%_auto] bg-center bg-no-repeat transition-all"
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
    class="py-12 w-full bg-[#f9efe1] border-2 border-[#FF6347] border-t-0 border-b-0 relative"
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
        class="h-[354px] overflow-y-scroll overflow-x-hidden pb-[10px]"
        @scroll="blockScrollHandler"
      >
        <div
          class="relative w-[0.5rem] mx-auto h-[708px] bg-[#4d6085]"
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
              class="xl:w-[31vw] w-[40vw] h-[30vh] max-h-[230px] max-w-[540px] border-5 border-[#4d6085] absolute"
              :style="{
                top: 'calc(-15vh + 25px)',
                left: item.dataNum % 2 ? '60px' : 'unset',
                right: item.dataNum % 2 ? 'unset' : '60px',
              }"
            >
              <div
                class="relative information before:transition-all before:duration-700"
                :class="[
                  {
                    right: item.dataNum % 2,
                    left: !(item.dataNum % 2),
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
                  class="py-1 pl-2 pr-[36px] tracking-tighter"
                >
                  {{ item.contents.length > 1 ? `${index + 1}.` : ""
                  }}{{ content }}
                </p>
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
    class="overflow-hidden pt-12 w-full relative z-10 bg-[#4d6085] after:content-[''] after:absolute after:w-full after:h-[35px] after:bg-[#f9efe1] after:top-[-14px] after:left-0 after:rotate-[-1deg] after:huge:rotate-[-0.5deg] after:border-2 after:border-t-0 after:border-[#FF6347]"
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
      <!-- TODO: 輪播 -->
      <div class="carousel h-full" ref="carousel">
        <button
          v-for="(item, index) in sideProjects"
          :key="item.name"
          class="project hover:border-none focus:outline-none bg-[#222]"
          :class="{ center: projectActive === item.id }"
          :style="styleList[index]"
          @click="arrangeHandler(item.id)"
        >
          <img
            class="w-full h-full"
            :src="`/image/production${item.id}.png`"
            alt="demo"
          />
        </button>
      </div>
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
    </div>
  </div>
  <!-- TODO: MESSAGE -->
  <div
    ref="MESSAGE"
    id="MESSAGE"
    class="pt-12 w-full h-[70vh] overflow-hidden bg-[url('/image/laptop.jpg')] bg-blend-multiply bg-cover bg-bottom bg-fixed bg-[#eae1d3] flex flex-col items-center justify-center relative z-10 after:content-[''] after:absolute after:w-full after:h-[35px] after:bg-[#4d6085] after:top-[-14px] after:left-0 after:rotate-[1deg] after:huge:rotate-[0.5deg] after:border-0 after:border-b-2 after:border-[#FF6347]"
  >
    <div
      class="bg-[tomato] rounded-md w-[380px] relative contact-box opacity-0"
      :class="{
        'animate-[wobble_700ms] opacity-100': showSection > 2,
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
      :class="{ 'fade-in': openSocialList && showSection > 2 }"
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
          <div class="cursor-pointer" @click="redirectPage(sns.href)">
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
  <footer
    class="w-full px-2 py-[6px] bg-[#4d6085]"
    style="border-top: 2px solid tomato"
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
      <p class="text-[#eae1d3] inline-block tracking-wide">
        © Copy right Feb 14,2024
      </p>
    </div>
  </footer>
</template>

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
.information::after {
  content: "";
  position: absolute;
  display: inline-block;
  border: solid 10px;
  border-color: transparent #4d6085 transparent transparent;
  top: 45%;
  left: -24px;
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
.carousel {
  position: relative;
  z-index: 10;
  flex: 1;
  overflow-x: visible;
}
.carousel .project {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 5;
  width: 474px;
  height: 216px;
  padding: 0;
  transition: all 0.2s ease-in-out;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transform: translate(-50%, -50%);
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
.sns-list.fade-in .sns-card {
  transition: all 0.7s;
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
  max-height: 600px;
}
.sns-list.fade-in .sns-card {
  opacity: 1;
  transform: translateY(0px);
}
</style>
