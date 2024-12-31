<script setup lang="ts">
import { StyleValue, computed } from 'vue'

export type DuanagaIcon = {
  name: string
  filled?: boolean
  size?: number | string
}

const props = withDefaults(defineProps<DuanagaIcon>(), {
  filled: false,
  size: 24
})

const style = computed<StyleValue>(() => {
  const $fill = Number(props.filled)
  const $fontSize = Number(props.size)

  return {
    fontSize: `${$fontSize}px`,
    fontVariationSettings: `'FILL' ${$fill}, 'wght' 400, 'GRAD' 0, 'opsz' 48`
  }
})
</script>

<template>
  <span :style="style" class="duanaga-icon">{{ name }}</span>
</template>
