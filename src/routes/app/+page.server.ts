import { PASSWORD } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    if (data.get('pw') === PASSWORD) {
      cookies.set('auth', 'ok', { path: '/', httpOnly: true });
      throw redirect(303, '/');
    }
    return fail(401, { error: '비밀번호가 틀렸습니다.' });
  }
};