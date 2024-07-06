<template>
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
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
/** 依字串長度調整相應的速度 */
const marqueeTexts: string[] = ref([
  "Welcome to my website!",
  "Test marquees ~~~",
]);
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
</script>

<style scoped>
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
  background-image: url("../assets/marquee-decorate.png");
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
</style>
