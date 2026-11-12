// وسيط Football-Data.org لدوري الأمم الأوروبية (UNL) على Vercel — المفتاح: FOOTBALL_DATA_API_KEY
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const cache = new Map();

function mapStatus(s) {
  const status = String(s || '').toUpperCase();
  if (status === 'FINISHED') return 'FINISHED';
  if (status === 'IN_PLAY' || status === 'PAUSED') return 'IN_PLAY';
  if (status === 'POSTPONED') return 'POSTPONED';
  if (status === 'CANCELLED' || status === 'SUSPENDED') return 'CANCELLED';
  return 'SCHEDULED';
}

function team(t) {
  t = t || {};
  const name = t.name || '';
  return { 
    id: t.id || name, 
    name, 
    shortName: t.shortName || name, 
    tla: t.tla || name.slice(0, 3), 
    crest: t.crest || null 
  };
}

function mapMatch(m) {
  const sc = m.score || {};
  const ft = sc.fullTime || {};
  return {
    id: 'unl_' + m.id,
    utcDate: m.utcDate,
    status: mapStatus(m.status),
    minute: null,
    competition: { code: 'UNL', name: 'دوري الأمم الأوروبية' },
    homeTeam: team(m.homeTeam),
    awayTeam: team(m.awayTeam),
    score: { 
      fullTime: { 
        home: ft.home !== undefined ? ft.home : null, 
        away: ft.away !== undefined ? ft.away : null 
      } 
    }
  };
}

export default async function handler(req, res) {
  const key = process.env.FOOTBALL_DATA_API_KEY || process.env.FD_API_KEY;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (!key) return res.status(500).json({ error: 'FOOTBALL_DATA_API_KEY غير مضبوط في لوحة تحكم Vercel' });
  
  const date = (req.query || {}).date || '';
  if (!DATE.test(date)) return res.status(400).json({ error: 'تاريخ غير صالح' });

  const hit = cache.get(date);
  if (hit && Date.now() - hit.t < 300000) {
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300');
    return res.status(200).json(hit.body);
  }

  try {
    const resp = await fetch(`https://api.football-data.org/v4/competitions/UNL/matches?dateFrom=${date}&dateTo=${date}`, {
      headers: { Accept: 'application/json', 'X-Auth-Token': key }
    });
    const j = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      if (hit) {
        res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');
        return res.status(200).json(hit.body);
      }
      return res.status(resp.status).json({ error: j.message || 'تعذر جلب مباريات دوري الأمم الأوروبية' });
    }
    const matches = (j.matches || []).map(mapMatch);
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
