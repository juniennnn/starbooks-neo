<script lang="ts">
// 딱히 Runes 요소 ($state) 없어도 상관없음
let table = $state('');
let name = $state('');
let menu = $state('');

const menus = ['탄산 아이스티', '탄산 레모네이드', '아메리카노'];
let pending = $state(false);

async function submitOrder() {
    try {
        if (pending) return;
        if (!table || !name || !menu) {
            alert('모든 값을 입력해주세요.')
            return;
        }
        pending = true;

        const res = await fetch("/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ table, name, menu }),
        });

        const data = await res.json().catch(() => null);
        if (!res.ok || !data.ok) {
            console.log('status:', res.status);
            console.log('data:', data);
            throw new Error('주문 전송 실패');
        }

        alert (`${name}님의 ${menu} 주문이 접수되었습니다!`);
        table =''; 
        name =''; 
        menu ='';
    } catch (err) {
        console.error(err);
        alert('서버 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
        pending = false;
    } 
}
</script>

<main class="p-8 max-w-3xl mx-auto">
<h1 class="text-center text-4xl font-bold mt-4 mb-1">STARBOOKS</h1> 
<h2 class="font-brush text-center text-4xl font-bold mt-1 mb-10">오늘의 메뉴</h2>

<form onsubmit={(order) => {order.preventDefault(); submitOrder();}} class="space-y-2">
    <input bind:value={table} oninput={() => name = name.trim()} placeholder="테이블 번호" class="border p-2 rounded w-full" />
    <input bind:value={name} oninput={() => name = name.trim()} placeholder="이름" class="border p-2 rounded w-full" />

    <select bind:value={menu} class="border p-2 rounded w-full">
        <option value="">메뉴 선택</option>
        {#each menus as m}
        <option value={m}>{m}</option>
        {/each}
    </select>

    <button
        type="submit"
        class=" mx-auto mt-1 block px-6 py-2 rounded 
        bg-linear-to-r from-pink-500 via-red-500 to-yellow-500 text-white 
        font-bold shadow-md hover:opacity-90 transition disabled:opacity-50"
        disabled={pending}
    >
    {#if pending}전송 중...{/if}
    {#if !pending}주문하기{/if}</button>
</form>
</main>