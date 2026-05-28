import { json } from "@sveltejs/kit";
import { NOTION_TOKEN, NOTION_DATABASE_ID } from "$env/static/private";

export async function POST({ request }) {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const timestamp = `${String(now.getFullYear()).slice(2)}년 ${pad(now.getMonth() + 1)}월 ${pad(now.getDate())}일 ${pad(now.getHours())}시 ${pad(now.getMinutes())}분 ${pad(now.getSeconds())}초`;

  const { table, name, menu } = await request.json();

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        // 컬럼 이름("이름")이랑 타입(rich_text) 맞춰야 함
        "id": {
          title: [{ text: { content: timestamp } }]
        },
        "좌석 번호": {
          rich_text: [{ text: { content: table } }]
        },
        "학번 + 이름": {
          rich_text: [{ text: { content: name } }]
        },
        "메뉴": {
          rich_text: [{ text: { content: menu } }]
        },
      }
    })
  });

  if (!res.ok) {
    const err = await res.json();
    return json({ ok: false, error: err.message }, { status: 500 });
  }

  return json({ ok: true });
}