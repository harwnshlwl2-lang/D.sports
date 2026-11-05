// وسيط football-data.org على Vercel — المفتاح يُقرأ من Environment Variables: FOOTBALL_DATA_KEY
const BASE = 'https://api.football-data.org/v4';
const COMPS = ['PL', 'PD', 'SA', 'BL1', 'FL1', 'CL'];
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const cache = new Map();

export default async function handler(req, res) {
  const key = process.env.FOOTBALL_DATA_KEY;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (!key) {
    return res.status(500).json({ error: 'FOOTBALL_DATA_KEY غير مضبوط في إعدادات Vercel' });
  }

  const q = req.query || {};
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
    return res.status(400).json({ error: 'طلب غير صالح' });
  }

  const hit = cache.get(path);
  if (hit && Date.now() - hit.t < ttl * 1000) {
    res.setHeader('Cache-Control', `public, max-age=30, s-maxage=${ttl}, stale-while-revalidate=${ttl * 5}`);
    return res.status(200).send(hit.body);
  }

  try {
    const r = await fetch(BASE + path, { headers: { 'X-Auth-Token': key } });
    const text = await r.text();
    if (r.ok) {
      cache.set(path, { t: Date.now(), body: text });
      res.setHeader('Cache-Control', `public, max-age=30, s-maxage=${ttl}, stale-while-revalidate=${ttl * 5}`);
      return res.status(200).send(text);
    }
    if (hit) {
      res.setHeader('Cache-Control', 'public, max-age=30, s-maxage=30');
      return res.status(200).send(hit.body);
    }
    return res.status(r.status).send(text);
  } catch (e) {
    if (hit) {
      res.setHeader('Cache-Control', 'public, max-age=30, s-maxage=30');
      return res.status(200).send(hit.body);
    }
    return res.status(502).json({ error: 'تعذر الاتصال بمزود البيانات' });
  }
}
