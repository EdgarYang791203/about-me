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
  <!-- TODO: BANNER -->
  <div class="relative overflow-hidden w-full">
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
    id="INTRO"
    class="py-4 md:py-12 w-full bg-[#f9efe1] border-2 border-[#FF6347] border-t-0 border-b-0 relative"
  >
    <Info :scrollOver="scrollOver" :isScreenSM="isScreenSM" />
  </div>
  <!-- TODO: PRODUCT -->
  <div
    id="PRODUCTS"
    class="overflow-hidden pt-12 w-full relative z-10 bg-[#4d6085] parallelogram after:bg-[#f9efe1] after:rotate-[-1deg] after:huge:rotate-[-0.5deg] after:top-[-14px] after:border-t-0"
  >
    <ProductBg
      v-if="!isScreenSM"
      :carouselSliding="carouselSliding"
      :projectActive="projectActive"
    />
    <h2
      class="w-full font-bold text-4xl border-bottom text-center relative z-10"
    >
      <span
        class="inline-block relative title-border-bottom font-cabin text-[#f9efe1]"
        >Products</span
      >
    </h2>
    <Products
      :sideProjects="sideProjects"
      :projectActive="projectActive"
      :projectActiveData="projectActiveData"
      :carouselSliding="carouselSliding"
      :isScreenSM="isScreenSM"
      @selectProject="selectProject"
      @redirectPage="redirectPage"
      @handleSliding="handleSliding"
    />
  </div>
  <!-- TODO: MESSAGE -->
  <div
    id="MESSAGE"
    class="pt-12 w-full h-[70vh] overflow-hidden bg-[url('/image/laptop.jpg')] bg-blend-multiply bg-cover bg-bottom bg-fixed bg-[#eae1d3] flex flex-col items-center justify-center relative parallelogram after:bg-[#4d6085] after:top-[-14px] after:rotate-[1deg] after:huge:rotate-[0.5deg] after:border-0 after:border-b-2"
  >
    <SocialMedia
      :openSocialList="openSocialList"
      @handleSocialList="handleSocialList"
    />
    <div
      class="sns-list transition-all duration-1000"
      :class="{ 'fade-in': openSocialList }"
    >
      <!-- TODO: 卡片往上消失 -->
      <!-- :class="{ slide: socialListSliding }" -->
      <div class="sns-block">
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
              'animate-[slide-out-right_400ms_ease]':
                socialListSliding === sns.name,
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
            <!-- TODO: 卡片往上消失 -->
            <!-- @click="sortCard(sns.name)" -->
            <!-- @click="socialListSlide" -->
            <button
              class="w-[30px] h-[30px] border-0 focus:outline-0 bg-transparent p-0"
              role="button"
              @click="sortCard(sns.name)"
            >
              <img src="/image/delete-icon.svg" alt="delete" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- TODO: 留言板 -->
  <div
    class="py-4 md:py-8 bg-black text-white flex flex-col md:flex-row h-screen md:h-[55vh]"
    style="
      font-family: '細明體, AR PL UMing TW, Inconsolata, LiSongPro, monospace';
    "
  >
    <div class="px-2 flex-1 md:flex-auto w-full md:w-[25vw]">
      <form
        class="flex flex-col"
        action="/"
        event=""
        @submit.prevent="() => {}"
      >
        <div class="mb-4">
          <label class="block font-bold text-[20px] pb-2" for="nickname">
            暱稱
          </label>
          <input
            class="text-[#495057] bg-white w-full py-[0.375rem] px-[0.75rem] leading-normal rounded"
            name="nickname"
            id="nickname"
            type="text"
            maxlength="12"
            v-model="messageBordForm.nickname"
          />
        </div>
        <div class="mb-4">
          <label class="block font-bold text-[20px] pb-2" for="opveration">
            你覺得前端就業機會如何？
          </label>
          <select
            name="opveration"
            id="opveration"
            class="text-[#495057] bg-white w-full py-[0.375rem] px-[0.75rem] leading-normal rounded"
            @change="commentSelectChange($event)"
            :value="messageBordForm.option"
          >
            <option value="" disabled>請選擇</option>
            <option value="upvote">推</option>
            <option value="downvote">→</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block font-bold text-[20px] pb-2" for="comment"
            >留言</label
          >
          <input
            class="text-[#495057] bg-white w-full py-[0.375rem] px-[0.75rem] leading-normal rounded"
            name="comment"
            id="comment"
            placeholder="發言..."
            :maxlength="45"
            v-model="messageBordForm.comment"
          />
        </div>
        <div v-if="formVerified">
          <button
            id="addComment"
            class="text-white bg-[#007bff] border-[#007bff] px-[.75rem] py-[.375rem] rounded-[0.25rem]"
            type="submit"
            @click="addComment"
          >
            送出
          </button>
        </div>
      </form>
    </div>
    <div
      class="px-2 flex-1 md:flex-auto w-full md:w-[75vw] text-[16px] md:text-[24px] overflow-hidden"
    >
      <h3 class="text-[#090] font-bold font-fa">※ 留言板</h3>
      <h3 class="text-[#090] font-bold font-fa">
        <span>※ 頁面網址: </span>
        <a
          class="text-[#888] break-words"
          href="https://my-website-e9b07.web.app"
          >https://my-website-e9b07.web.app</a
        >
      </h3>
      <div
        v-if="comments.length"
        class="overflow-y-auto scrollbar-style"
        style="height: calc(100% - 72px)"
      >
        <!-- :key="comment.id" -->
        <div
          v-for="comment in comments"
          :key="comment.xata_id"
          class="flex items-end"
        >
          <div class="flex-1">
            <span
              class="pr-4"
              :class="
                comment.option === 'upvote' ? 'text-white' : 'text-[#f66]'
              "
              >{{ comment.option === "upvote" ? "推" : "→" }}</span
            >
            <span class="text-[#ff6]">{{ comment.nickname }}</span>
            <span class="text-[#990] break-all">：{{ comment.comment }}</span>
          </div>
          <!-- comment.created -->
          <div
            class="grow-0 shrink-0 tracking-normal basis-[88px] md:basis-[116px] flex"
            v-timeformat="
              comment.xata_createdat ? comment.xata_createdat : comment.created
            "
          ></div>
        </div>
      </div>
      <p v-else class="text-center">目前沒有留言</p>
    </div>
  </div>
  <!-- TODO: FOOTER -->
  <Footer :isMobile="isMobile" @redirectPage="redirectPage" />
  <!-- TODO: 手機社群控制按鈕元件 -->
  <MobileControls v-if="isScreenSM" :socialMedia="socialMedia" />
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive, inject, onUnmounted } from "vue";
// TODO: Firebase noSQL
// import {
//   getFirestore,
//   collection,
//   doc,
//   setDoc,
//   getDocs,
//   onSnapshot,
//   CollectionReference,
//   QuerySnapshot,
//   DocumentData,
//   query,
//   orderBy,
// } from "firebase/firestore";
// import type { Auth } from "firebase/auth";
import getTimeNumbers from "./util/getTimestamp";
import deviceName from "./util/mobileDetective";
import Navbar from "./components/Navbar.vue";
import Marquee from "./components/Marquee.vue";
import Footer from "./components/Footer.vue";
import MobileControls from "./components/MobileControls.vue";
import Info from "./components/Info.vue";
import ProductBg from "./components/ProductBg.vue";
import Products from "./components/Products.vue";
import SocialMedia from "./components/SocialMedia.vue";

const isMobile = deviceName !== "unknown";

const windowScrollY = ref(0);

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
    window.clearInterval(timerNumnerAnimation.value);
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
    href: "https://live2d-two.vercel.app/",
  },
  {
    name: "Exile Engineer",
    id: 2,
    intro: "因為自己熱愛這款線上遊戲，所以將攻略呈現前端供自用及分享。",
    href: "https://exile-engineer.vercel.app",
  },
];

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
    openSocialList.value = !openSocialList.value;
    return;
  }
  if (name === "Email") {
    const mailtoLink = `${href}`;
    window.location.href = mailtoLink;
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
const openSocialList = ref(false);

const handleSocialList = (value: boolean) => {
  openSocialList.value = value;
};

const socialListSliding = ref("");

let socialMedia = reactive([
  {
    name: "Medium",
    icon: "medium-icon.svg",
    color: "#000",
    content: "Medium 文章",
    href: "https://medium.com/@73307hank",
  },
  {
    name: "CakeResume",
    icon: "cake-resume.svg",
    color: "#15AA67",
    content: "CakeResume 履歷",
    href: "https://www.cake.me/73307hank",
  },
  {
    name: "GitHub",
    icon: "github-icon.svg",
    color: "#3e75c3",
    content: "EdgarYang791203",
    href: "https://github.com/EdgarYang791203/about-me/blob/master/README.md",
  },
  {
    name: "Email",
    icon: "gmail.svg",
    color: "#d14836",
    content: "edgaryang791203@gmail.com",
    href: "mailto:edgaryang791203@gmail.com",
  },
]);

// TODO: 卡片往上消失
// const socialListSlide = () => {
//   socialListSliding.value = true;
//   const firstItem = { ...socialMedia[0] };
//   socialMedia = [...socialMedia, firstItem];
//   setTimeout(() => {
//     socialMedia = socialMedia.slice(1);
//     socialListSliding.value = false;
//   }, 300);
// };

const sortCard = (name: string) => {
  socialListSliding.value = name;
  const target = socialMedia.find((item) => item.name === name);
  if (target) {
    setTimeout(() => {
      const newList = socialMedia.filter((item) => item.name !== name);
      socialMedia = [...newList, target];
      socialListSliding.value = "";
    }, 400);
  }
};
// TODO: 私訊我

let timerNumnerAnimation: any = ref(null);

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

// TODO: debounce(防抖動)
const debounce = (fn: Function, delay: number = 500) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: any[]): void => {
    if (timer !== null) {
      clearTimeout(timer); // 使用類型斷言
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

interface CommentType {
  xata_id?: string;
  option: string;
  nickname: string;
  comment: string;
  xata_createdat?: string;
  created?: string;
}

const messageBordForm = ref<CommentType>({
  nickname: "",
  option: "",
  comment: "",
});

const commentSelectChange = ($event: Event) => {
  const el = $event.target as HTMLInputElement;
  if (el.value && typeof el.value === "string") {
    messageBordForm.value.option = el.value;
  }
};

const comments = ref<CommentType[]>([]);

const formVerified = computed(() => {
  let status = true;
  for (
    let index = 0;
    index < Object.values(messageBordForm.value).length;
    index++
  ) {
    const content = Object.values(messageBordForm.value)[index];
    if (typeof content !== "string" || content === "") {
      status = false;
      break;
    }
  }
  return status;
});

// const renderHtml = (msg: string) => {
//   /** 將html碼格式化 只取得文字 */
//   const regex = /<(?!br\s*\/?)[^>]*>/g;
//   if (typeof msg === "string") return msg.replace(regex, " ");
//   return "";
// };

// TODO: Node API Postgresql
const fetchApi =
  inject<(url: string, options?: RequestInit) => Promise<any>>("$fetch");

// TODO: Firebase noSQL
// let firebaseAuth = inject<Auth>("$auth");
// let commentsRef: CollectionReference<CommentType> | null = null;

const getComments = async () => {
  // TODO: Node API Postgresql
  if (fetchApi) {
    try {
      const list = await fetchApi("/comments");
      if (list && list.length) comments.value = list;
    } catch (error) {
      console.error("Error loading data:", error);
    }
  } else {
    console.error("fetchApi is not provided");
  }
  // TODO: Firebase noSQL
  // const db = getFirestore();
  // commentsRef = collection(db, "comments") as CollectionReference<CommentType>;
  // onSnapshot(commentsRef, (snapshot) => {
  //   const newComments = snapshot.docChanges() || [];
  //   if (!comments?.value.length) return;
  //   newComments.forEach(async (change: any) => {
  //     if (change.type === "added") {
  //       // 新增的留言
  //       const { option, time, nickname, comment } = change.doc.data();
  //       if (change.doc.id && !comments.value.includes(change.doc.id)) {
  //         comments.value.unshift({
  //           option,
  //           time,
  //           nickname,
  //           comment,
  //           id: change.doc.id,
  //         });
  //       }
  //     }
  //   });
  // });
  // 排序
  // const commentsQuery = query(commentsRef, orderBy("time", "desc"));
  // const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
  //   commentsQuery
  // );

  // 初始化留言列表
  // comments.value = querySnapshot.docs
  //   .map((doc) => {
  //     if (doc.exists()) {
  //       const data = doc.data() as CommentType;
  //       const { option, time, nickname, comment } = data;
  //       return { option, time, nickname, comment, id: doc.id };
  //     }
  //     return null;
  //   })
  //   .filter(Boolean) as CommentType[];
};

const addComment = async () => {
  // TODO: Node API Postgresql
  if (fetchApi) {
    try {
      // 使用 fetchApi 發送請求
      const res = await fetchApi("/comments", {
        method: "POST", // 設置為 POST 請求
        body: JSON.stringify({
          ...messageBordForm.value,
        }),
      });
      messageBordForm.value = {
        nickname: messageBordForm.value.nickname,
        option: "",
        comment: "",
      };
      alert("留言成功");
      if (res) getComments();
    } catch (error) {
      // console.error("留言失敗：", error);
      alert("留言失敗，請重試！");
    }
  } else {
    console.error("fetchApi is not provided");
  }
  // TODO: Firebase noSQL
  // if (formVerified.value && commentsRef) {
  //   try {
  //     await setDoc(doc(commentsRef), {
  //       ...messageBordForm.value,
  //       time: new Date().getTime(),
  //     });
  //     messageBordForm.value = {
  //       nickname: messageBordForm.value.nickname,
  //       option: "",
  //       comment: "",
  //     };
  //     alert("留言成功");
  //   } catch (error) {
  //     console.error("留言失敗：", error);
  //     alert("留言失敗，請重試！");
  //   }
  // }
};

// const throttle = (fn: Function, delay = 500) => {
//   let timer: ReturnType<typeof setTimeout> | null = null;

//   return (...args: any[]): void => {
//     if (timer !== null) return;

//     timer = setTimeout(() => {
//       timer = null;
//     }, delay);

//     fn.apply(this, args);
//   };
// };

const setScrollTop = () => {
  windowScrollY.value = Math.floor(window.scrollY);
};

onMounted(() => {
  window.addEventListener("scroll", setScrollTop);
  window.addEventListener("resize", debounce(getWidth));
  determineDecimal();
  timerNumnerAnimation.value = setInterval(() => {
    numberAnimation();
  }, 1000);
  // TODO: Firebase noSQL
  // if (firebaseAuth) {
  //   getComments();
  // }
  // TODO: Node API Postgresql
  getComments();
});

onUnmounted(() => {
  window.removeEventListener("scroll", setScrollTop);
  window.removeEventListener("resize", debounce(getWidth));
  window.clearInterval(timerNumnerAnimation.value);
});
</script>

<style scoped>
@media screen and (min-width: 576px) {
  .scrollbar-style::-webkit-scrollbar {
    width: 7px;
  }
  .scrollbar-style::-webkit-scrollbar-button {
    background: transparent;
    border-radius: 4px;
  }

  .scrollbar-style::-webkit-scrollbar-track-piece {
    background: transparent;
  }
  .scrollbar-style::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #eae1d3;
    border: 1px solid slategrey;
  }

  .scrollbar-style::-webkit-scrollbar-track {
    box-shadow: transparent;
  }
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
.sns-block {
  min-height: 473px;
  max-height: 473px;
  overflow-y: hidden;
}
/* TODO: 卡片往上消失 */
/* .sns-block.slide {
  transform: translateY(-114px);
  transition: all 0.3s ease-out;
} */
.sns-list.fade-in {
  max-height: none;
}
.sns-list.fade-in .sns-card {
  opacity: 1;
  transform: translateY(0px);
  transition: all 0.7s;
}
</style>
