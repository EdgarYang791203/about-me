<template>
  <div
    class="control-block w-[200px] h-[200px] fixed right-0 bottom-0 z-20 pointer-events-none"
  >
    <div class="w-full h-full relative z-100" v-if="socialMedia">
      <a
        v-for="(sns, index) in snsList"
        :key="sns.href"
        :href="sns.href"
        target="_blank"
        rel="noopener noreferrer"
        class="btn"
        :class="[
          `btn${index + 1}`,
          {
            'spread-out': animateOut,
            'spread-in': buttonInitial && animateIn,
          },
        ]"
        :style="{ zIndex: socialMedia.length - index }"
      >
        <img :src="`/image/${sns.icon}`" alt="icon" />
      </a>
      <!-- 關閉按鈕 -->
      <button
        class="btn main p-0 border-0"
        type="button"
        @click="socialHandler"
      >
        <img
          v-if="animateOut"
          src="/image/mobile/control-close.svg"
          alt="close"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch, onBeforeUnmount } from "vue";

interface media {
  [key: string]: string;
}

const props = defineProps<{ socialMedia: media[] }>();

const snsList = reactive([...props.socialMedia]);

const buttonInitial = ref(false);

const animateOut = ref(false);

const animateIn = ref(false);

let controlBtnTimer: any = ref(null);

const activeControlBtnIndex = ref(3);

watch(animateOut, async (newValue) => {
  if (newValue) clearInterval(controlBtnTimer.value);
});

watch(animateIn, async (newValue) => {
  if (newValue) setTimer();
});

const setTimer = () => {
  activeControlBtnIndex.value = 3;
  controlBtnTimer = setInterval(() => {
    if (activeControlBtnIndex.value - 1 > 0) activeControlBtnIndex.value -= 1;
    else activeControlBtnIndex.value = 3;
  }, 2000);
};

const socialHandler = () => {
  if (!buttonInitial.value) {
    buttonInitial.value = true;
    animateOut.value = true;
  } else if (animateOut.value) {
    animateOut.value = false;
    setTimeout(() => {
      animateIn.value = true;
    }, 10);
  } else {
    animateIn.value = false;
    setTimeout(() => {
      animateOut.value = true;
    }, 10);
  }
};

onMounted(() => {
  setTimer();
});

onBeforeUnmount(() => {
  clearInterval(controlBtnTimer.value);
});
</script>

<style scoped>
.btn {
  width: 60px;
  position: absolute;
  top: calc((100% - 60px) / 2);
  right: 0.8rem;
  z-index: 99;
  pointer-events: all;
  outline: none !important;
  display: flex;
  flex-direction: column;
}
.btn.main {
  z-index: 102;
  height: 60px;
}
.btn img {
  width: 100%;
  background-color: #eae1d3;
  border-radius: 50%;
}
.btn1.spread-out {
  animation: spread-out-btn1 1s cubic-bezier(0.17, 0.67, 0.37, 1.29) normal both;
}
.btn1.spread-in {
  animation: spread-out-btn1 0.5s reverse linear forwards;
}
.btn2.spread-out {
  animation: spread-out-btn2 1s cubic-bezier(0.17, 0.67, 0.37, 1.29) normal both;
}
.btn2.spread-in {
  animation: spread-out-btn2 0.5s reverse linear forwards;
}
.btn3.spread-out {
  animation: spread-out-btn3 1s cubic-bezier(0.17, 0.67, 0.37, 1.29) normal both;
}
.btn3.spread-in {
  animation: spread-out-btn3 0.5s reverse linear forwards;
}

@keyframes spread-out-btn1 {
  20% {
    transform: rotate(0deg) translateY(-112px) rotate(0deg);
  }
  100% {
    transform: rotate(0deg) translateY(-112px) rotate(0deg);
  }
}

@keyframes spread-out-btn2 {
  20% {
    transform: rotate(0deg) translateY(-112px) rotate(0deg);
  }
  100% {
    transform: rotate(-40deg) translateY(-112px) rotate(40deg);
  }
}

@keyframes spread-out-btn3 {
  20% {
    transform: rotate(0deg) translateY(-92px) rotate(0deg);
  }
  100% {
    transform: rotate(-90deg) translateY(-92px) rotate(90deg);
  }
}
</style>
