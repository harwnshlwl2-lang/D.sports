// وسيط OpenFootAPI لدوري أبطال آسيا — المفتاح: OPENFOOT_API_KEY
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const ASIA_RE = /afc|asia/i; // يطابق معرّف البطولة competitionId
const cache = new Map();

function reply(status, body, ttl) {
  const headers = { 'Content-Type': 'application/json; charset=utf-8' };
  if (ttl && status === 200) {
    headers['Cache-Control'] = 'public, max-age=60';
    headers['Netlify-CDN-Cache-Control'] = `public, s-maxage=${ttl}, stale-while-revalidate=${ttl * 4}`;
  } else {
    headers['Cache-Control'] = 'no-store';
  }
  return { statusCode: status, headers, body: JSON.stringify(body) };
}

function mapStatus(m) {
  const s = String(m.status || '').toLowerCase();
  const p = String(m.period || '').toUpperCase();
  if (/finish|ended|complete/.test(s) || p === 'FT') return 'FINISHED';
  if (p === 'HT') return 'PAUSED';
  if (['1H', '2H', 'ET', 'PEN'].includes(p) || /live|play|progress/.test(s)) return 'IN_PLAY';
  if (/postpon/.test(s)) return 'POSTPONED';
  if (/cancel|abandon/.test(s)) return 'CANCELLED';
  return 'SCHEDULED';
}

function pick(...v) {
  for (const x of v) if (x !== undefined && x !== null && x !== '') return x;
  return null;
}

function team(t) {
  t = t || {};
  const name = t.name || '';
  return { id: t.id || name, name, shortName: t.shortName || name, tla: t.code || t.tla || name.slice(0, 3), crest: t.logoUrl || null };
}

function mapMatch(m) {
  const sc = m.score || {};
  const home = pick(sc.home, sc.fullTime && sc.fullTime.home, sc.current && sc.current.home, m.homeScore, m.goals && m.goals.home);
  const away = pick(sc.away, sc.fullTime && sc.fullTime.away, sc.current && sc.current.away, m.awayScore, m.goals && m.goals.away);
  return {
    id: 'a_' + m.id,
    utcDate: m.kickoffAt,
    status: mapStatus(m),
    minute: pick(m.minute, m.clock),
    competition: { code: 'ACL', name: 'دوري أبطال آسيا' },
    homeTeam: team(m.homeTeam),
    awayTeam: team(m.awayTeam),
    score: { fullTime: { home, away } }
  };
}

exports.handler = async (event) => {
  const key = process.env.OPENFOOT_API_KEY;
  if (!key) return reply(500, { error: 'OPENFOOT_API_KEY غير مضبوط في Netlify' });
  const date = (event.queryStringParameters || {}).date || '';
  if (!DATE.test(date)) return reply(400, { error: 'تاريخ غير صالح' });

  const hit = cache.get(date);
  if (hit && Date.now() - hit.t < 300000) return reply(200, hit.body, 300);

  try {
    const r = await fetch(`https://openfootapi.com/v1/matches?date=${date}`, {
      headers: { Accept: 'application/json', Authorization: 'Bearer ' + key }
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) {
      if (hit) return reply(200, hit.body, 60);
      return reply(r.status, { error: (j.error && j.error.message) || 'تعذر جلب مباريات آسيا' });
    }
    const matches = (j.data || []).filter((m) => ASIA_RE.test(m.competitionId || '')).map(mapMatch);
    const body = { matches };
    cache.set(date, { t: Date.now(), body });
    return reply(200, body, 300);
  } catch (e) {
    if (hit) return reply(200, hit.body, 60);
    return reply(502, { error: 'تعذر الاتصال بمزود البيانات' });
  }
};
