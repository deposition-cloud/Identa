<script setup lang="ts">
const repo = {
  name: 'ranker-dapp/web',
  url: 'https://gitlab.com/ranker-dapp/web',
  description: 'Decentralized ranking application — web frontend built with Nuxt'
}

const styleQueue = ['geometric', 'organic', 'abstract', 'minimal', 'tech', 'playful']
const styleIndex = ref(0)

interface LogoEntry {
  src: string
  style: string
}

const logos = ref<LogoEntry[]>([])
const generating = ref(false)
const error = ref('')

function nextStyle(): string {
  const style = styleQueue[styleIndex.value % styleQueue.length]
  styleIndex.value++
  return style
}

async function generate() {
  generating.value = true
  error.value = ''

  const style = nextStyle()

  try {
    const { logo } = await $fetch('/api/generate-logos', {
      method: 'POST',
      body: {
        repoName: repo.name,
        repoDescription: repo.description,
        style
      }
    })
    logos.value.unshift({ src: logo, style })
  } catch (e: any) {
    error.value = e?.data?.message || 'Generation failed — check the console'
    styleIndex.value--
  } finally {
    generating.value = false
  }
}
</script>

<template>
  <main class="min-h-screen bg-[var(--ui-bg)] p-8">
    <div class="mx-auto max-w-3xl space-y-6">
      <header class="space-y-1">
        <div class="flex items-center gap-2">
          <UBadge color="primary" variant="soft">Identa</UBadge>
          <UBadge color="neutral" variant="outline">Preview</UBadge>
        </div>
        <h1 class="text-3xl font-semibold tracking-tight">
          Logo Generator
        </h1>
      </header>

      <UCard>
        <div class="flex items-start justify-between gap-4">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-git-branch" class="text-[var(--ui-text-muted)]" />
              <span class="font-mono text-sm font-medium">{{ repo.name }}</span>
            </div>
            <p class="text-sm text-[var(--ui-text-muted)]">
              {{ repo.description }}
            </p>
            <a
              :href="repo.url"
              target="_blank"
              class="text-xs text-[var(--ui-text-dimmed)] hover:underline"
            >
              {{ repo.url }}
            </a>
          </div>
          <UButton
            icon="i-lucide-sparkles"
            :loading="generating"
            @click="generate"
          >
            Generate
          </UButton>
        </div>
      </UCard>

      <div
        v-if="error"
        class="rounded-lg border border-red-200 bg-red-50 p-3 text-center text-sm text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400"
      >
        {{ error }}
      </div>

      <div class="flex flex-wrap gap-[10px]">
        <div
          v-if="generating"
          class="size-[200px] shrink-0 rounded-lg border border-gray-300 bg-[var(--ui-bg-elevated)] flex items-center justify-center dark:border-gray-700"
        >
          <USkeleton class="size-[160px] rounded" />
        </div>

        <TransitionGroup name="logo">
          <div
            v-for="(entry, i) in logos"
            :key="entry.src.slice(-20)"
            class="group relative size-[200px] shrink-0"
          >
            <img
              :src="entry.src"
              :alt="`Logo option ${logos.length - i}`"
              class="size-[200px] rounded-lg border border-gray-300 object-contain bg-white dark:border-gray-700"
            >
            <span class="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
              {{ entry.style }}
            </span>
          </div>
        </TransitionGroup>
      </div>

      <p
        v-if="!logos.length && !generating"
        class="text-center text-sm text-[var(--ui-text-dimmed)] py-8"
      >
        Click <strong>Generate</strong> to explore logo styles. Each click tries a different approach.
      </p>
    </div>
  </main>
</template>

<style scoped>
.logo-enter-active {
  transition: all 0.3s ease-out;
}
.logo-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
</style>
