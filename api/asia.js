// وسيط OpenFootAPI لدوري أبطال آسيا على Vercel — المفتاح: OPENFOOT_API_KEY
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const ASIA_RE = /afc|asia/i;
const cache = new Map();

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

export default async function handler(req, res) {
  const key = process.env.OPENFOOT_API_KEY;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (!key) return res.status(500).json({ error: 'OPENFOOT_API_KEY غير مضبوط في Vercel' });
  
  const date = (req.query || {}).date || '';
  if (!DATE.test(date)) return res.status(400).json({ error: 'تاريخ غير صالح' });

  const hit = cache.get(date);
  if (hit && Date.now() - hit.t < 300000) {
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300');
    return res.status(200).json(hit.body);
  }

  try {
    const resp = await fetch(`https://openfootapi.com/v1/matches?date=${date}`, {
      headers: { Accept: 'application/json', Authorization: 'Bearer ' + key }
    });
    const j = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      if (hit) {
        res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');
        return res.status(200).json(hit.body);
      }
      return res.status(resp.status).json({ error: (j.error && j.error.message) || 'تعذر جلب مباريات آسيا' });
    }
    const matches = (j.data || []).filter((m) => ASIA_RE.test(m.competitionId || '')).map(mapMatch);
    const body = { matches };
    cache.set(date, { t: Date.now(), body });
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300');
    return res.status(200).json(body);
  } catch (e) {
    if (hit) {
      res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');
      return res.status(200).json(hit.body);
    }
    return res.status(502).json({ error: 'تعذر الاتصال بمزود البيانات' });
  }
}
