<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();
</script>

<main class="min-h-screen flex items-center justify-center p-8">
  <form
    method="POST"
    use:enhance
    class="w-full max-w-sm bg-white rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.1)] p-6 space-y-4"
  >
    <h1 class="text-2xl font-bold text-center">STARBOOKS</h1>
    <p class="text-center text-sm text-gray-500">관리자 페이지</p>

    <input
      type="password"
      name="pw"
      autocomplete="current-password"
      placeholder="비밀번호를 입력하세요."
      class="w-full border rounded-lg p-3 focus:outline-none focus:ring"
      required
    />

    {#if form?.error}
      <p class="text-sm text-red-600">{form.error}</p>
    {/if}

    <button
      type="submit"
      class="w-full rounded-lg bg-black text-white p-3 font-semibold hover:opacity-90 transition"
    >
      입장
    </button>
  </form>
</main>