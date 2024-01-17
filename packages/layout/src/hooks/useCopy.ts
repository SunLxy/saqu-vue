import { ref, computed, onBeforeUnmount } from 'vue';
/**
 * 复制代码
 */
export const useCopy = (code: string) => {
  let timer: number;
  const isCopied = ref(false);
  const copyClass = computed(() => {
    return {
      copy: !isCopied.value,
      copied: isCopied.value,
    };
  });
  const onCopy = () => {
    try {
      isCopied.value = true;
      navigator.clipboard.writeText(decodeURIComponent(code));
      timer = setTimeout(() => {
        isCopied.value = false;
        clearTimeout(timer);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  onBeforeUnmount(() => {
    clearTimeout(timer);
  });

  return {
    copyClass,
    onCopy,
  };
};
