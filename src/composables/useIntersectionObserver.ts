import { ref, onUnmounted } from "vue";

export function useIntersectionObserver() {
  const observer = ref<IntersectionObserver | null>(null);
  const isIntersection = ref(false);
  const elRef = ref<Element | null>(null);

  interface IntersectionObserverOptions {
    root: Element | null;
    threshold: number | number[];
  }

  interface IntersectionObserverEntry {
    isIntersecting: boolean;
  }

  const intersectionObserver = (
    el: Element,
    options: IntersectionObserverOptions = {
      root: null,
      threshold: 0.5,
    }
  ) => {
    elRef.value = el;
    observer.value = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((item: IntersectionObserverEntry) => {
          isIntersection.value = item.isIntersecting;
        });
      },
      options
    );
    observer.value.observe(el);
  };

  const unobserver = () => {
    if (observer.value && elRef.value) {
      observer.value.unobserve(elRef.value);
    }
  };

  onUnmounted(() => {
    unobserver();
  });

  return { elRef, isIntersection, intersectionObserver };
}
