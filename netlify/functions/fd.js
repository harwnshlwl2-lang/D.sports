// وسيط football-data.org — المفتاح يُقرأ من Netlify فقط: FOOTBALL_DATA_KEY
const BASE = 'https://api.football-data.org/v4';
const COMPS = ['PL', 'PD', 'SA', 'BL1', 'FL1', 'CL'];
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const cache = new Map();

function reply(status, body, ttl) {
  const headers = { 'Content-Type': 'application/json; charset=utf-8' };
  if (ttl && status === 200) {
    headers['Cache-Control'] = 'public, max-age=30';
    headers['Netlify-CDN-Cache-Control'] = `public, s-maxage=${ttl}, stale-while-revalidate=${ttl * 5}`;
  } else {
    headers['Cache-Control'] = 'no-store';
  }
  return { statusCode: status, headers, body: typeof body === 'string' ? body : JSON.stringify(body) };
}

exports.handler = async (event) => {
  const key = process.env.FOOTBALL_DATA_KEY;
  if (!key) return reply(500, { error: 'FOOTBALL_DATA_KEY غير مضبوط في Netlify' });

  const q = event.queryStringParameters || {};
  let path, ttl;

  if (q.type === 'matches' && DATE.test(q.from || '') && DATE.test(q.to || '')) {
    path = `/matches?dateFrom=${q.from}&dateTo=${q.to}&competitions=${COMPS.join(',')}`;
    ttl = 60;
  } else if (q.type === 'match' && /^\d{1,9}$/.test(q.id || '')) {
    path = `/matches/${q.id}`;
    ttl = 60;
  } else if (q.type === 'standings' && COMPS.includes(q.comp)) {
    path = `/competitions/${q.comp}/standings`;
    ttl = 600;
  } else if (q.type === 'scorers' && COMPS.includes(q.comp)) {
    path = `/competitions/${q.comp}/scorers?limit=20`;
    ttl = 1800;
  } else {
    return reply(400, { error: 'طلب غير صالح' });
  }

  const hit = cache.get(path);
  if (hit && Date.now() - hit.t < ttl * 1000) return reply(200, hit.body, ttl);

  try {
    const r = await fetch(BASE + path, { headers: { 'X-Auth-Token': key } });
    const text = await r.text();
    if (r.ok) {
      cache.set(path, { t: Date.now(), body: text });
      return reply(200, text, ttl);
    }
    if (hit) return reply(200, hit.body, 30); // نعرض آخر نسخة محفوظة عند الفشل
    return reply(r.status, text);
  } catch (e) {
    if (hit) return reply(200, hit.body, 30);
    return reply(502, { error: 'تعذر الاتصال بمزود البيانات' });
  }
};
