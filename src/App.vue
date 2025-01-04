<script setup lang="ts">
import { AppBlock, AppButton, AppDivider, FormInput, FormSelect } from 'duanaga-ui'
import { onMounted, ref } from 'vue'
import Icon from './components/Icon.vue'
import { computed } from 'vue'
import IconMetadata from './api/Icon'

const sizes = Array.from({ length: 96 / 4 }, (_, i) => (i + 1) * 4)
const styles = [
  {
    label: 'Outlined',
    value: false
  },
  {
    label: 'Filled',
    value: true
  }
]

const search = ref()
const selectedSize = ref(24)
const selectedStyle = ref<(typeof styles)[0] | null>(null)
const filled = ref(false)
const icons = ref<string[]>([])
const filteredIcons = ref<any[]>([])
const isLoading = ref(false)
const limit = ref(100)
const page = ref(1)

const isPrevDisabled = computed(() => page.value <= 1)
const isNextDisabled = computed(() => {
  const totalPages = Math.ceil(icons.value.length / limit.value)
  return page.value >= totalPages
})

onMounted(async () => {
  await fetchIcons()
  paginateIcons()

  selectedStyle.value = styles[0]
})

const fetchIcons = async () => {
  isLoading.value = true

  try {
    const iconNames = await IconMetadata.getNames()

    if (iconNames) {
      icons.value = iconNames
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const paginateIcons = () => {
  filteredIcons.value = icons.value.slice(0, 100)
}

const prev = () => {
  if (page.value > 1) {
    --page.value
    const start = (page.value - 1) * limit.value
    const end = start + limit.value
    filteredIcons.value = icons.value.slice(start, end)
  }
}

const next = () => {
  const totalPages = Math.ceil(icons.value.length / limit.value)
  if (page.value < totalPages) {
    ++page.value
    const start = (page.value - 1) * limit.value
    const end = start + limit.value
    filteredIcons.value = icons.value.slice(start, end)
  }
}

const searchIcon = () => {
  if (!search.value) {
    paginateIcons()
    return
  }

  filteredIcons.value = icons.value.filter((icon) => search.value === icon)
}

const setIconName = (icon: string) => {
  search.value = icon
}

const handleStyleSelect = (option: (typeof styles)[0]) => {
  filled.value = option.value
}
</script>

<template>
  <main class="container mx-auto flex min-h-screen items-center justify-center py-24">
    <section>
      <AppBlock class="md:min-w-[40rem]">
        <template #header>
          <div class="text-center">
            <h1 class="text-24 font-600 leading-32">Duanaga Icons</h1>
          </div>
        </template>

        <div class="px-24 pb-24">
          <div class="grid grid-cols-5 items-center gap-8">
            <div class="col-span-1">
              <FormSelect
                v-model="selectedStyle"
                :options="styles"
                option-label="label"
                placeholder="Style"
                @update:model-value="handleStyleSelect"
              />
            </div>

            <div class="col-span-1">
              <FormSelect v-model="selectedSize" :options="sizes" placeholder="Size" />
            </div>

            <div class="col-span-3">
              <FormInput
                id="icon"
                v-model="search"
                type="search"
                placeholder="Search&hellip;"
                class="w-full"
                required
                @keyup.enter="searchIcon"
              >
                <template #prepend>
                  <div class="flex items-center">
                    <Icon name="search" size="20" />
                  </div>
                </template>
              </FormInput>
            </div>
          </div>

          <AppDivider class="my-16" />

          <!-- List of icons -->
          <div
            v-if="filteredIcons.length && !isLoading"
            class="grid h-[400px] grid-cols-10 gap-16 overflow-y-auto overflow-x-hidden"
          >
            <Icon
              v-for="(icon, index) in filteredIcons"
              :key="index"
              :name="icon"
              :size="selectedSize"
              :filled="filled"
              role="button"
              @click="setIconName(icon)"
            />
          </div>

          <!-- Not Found -->
          <div
            v-else-if="!filteredIcons.length && !isLoading"
            class="flex h-[400px] items-center justify-center gap-8"
          >
            <Icon name="search_off" />
            Icon not found
          </div>

          <!-- Loading -->
          <div v-else class="flex h-[400px] items-center justify-center gap-8">
            <div class="inline-flex animate-spin">
              <Icon name="progress_activity" />
            </div>
            Loading&hellip;
          </div>
        </div>

        <template v-if="filteredIcons.length >= limit" #footer>
          <div class="flex items-center justify-between gap-8">
            <div class="flex items-center gap-8">
              <AppButton text="Prev" :disabled="isPrevDisabled" @click="prev" />
              <AppButton text="Next" :disabled="isNextDisabled" @click="next" />
            </div>
          </div>
        </template>
      </AppBlock>
    </section>
  </main>
</template>
