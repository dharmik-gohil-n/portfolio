import { useEffect, useRef, useState } from 'react';

const CompareRadar = () => {
  const canvasRef = useRef(null);
  const [active, setActive] = useState([true, true, true]);
  const [hov, setHov] = useState(-1);

  const attrs = ['Performance', 'Versatility', 'Problem-Solving', 'Communication', 'Innovation'];
  const cats = [
    { name: 'Frontend', color: '#00e5ff', vals: [95, 80, 85, 78, 82] },
    { name: 'Backend', color: '#f43f8e', vals: [80, 90, 88, 75, 80] },
    { name: 'AI/Data', color: '#a855f7', vals: [75, 85, 90, 72, 92] },
  ];

  const W = 300;
  const H = 300;
  const cx = W / 2;
  const cy = H / 2;
  const R = 105;

  const getPts = (vals) => {
    return vals.map((v, i) => {
      const t = (i / 5) * Math.PI * 2 - Math.PI / 2;
      return { x: cx + (v / 100) * R * Math.cos(t), y: cy + (v / 100) * R * Math.sin(t) };
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Clear and draw grid background
    ctx.clearRect(0, 0, W, H);

    // grid rings
    for (let r = 1; r <= 5; r++) {
      const pts = Array.from({ length: 5 }, (_, i) => {
        const t = (i / 5) * Math.PI * 2 - Math.PI / 2;
        return { x: cx + (r / 5) * R * Math.cos(t), y: cy + (r / 5) * R * Math.sin(t) };
      });
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      pts.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.closePath();
      ctx.strokeStyle = `rgba(0, 229, 255, ${0.07 + r * 0.025})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }

    // axes & labels
    attrs.forEach((a, i) => {
      const t = (i / 5) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(t), cy + R * Math.sin(t));
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.08)';
      ctx.lineWidth = 0.7;
      ctx.stroke();

      ctx.font = '9px system-ui, sans-serif';
      ctx.fillStyle = 'rgba(220, 228, 240, 0.45)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(a, cx + (R + 16) * Math.cos(t), cy + (R + 16) * Math.sin(t));
    });

    // polygons
    cats.forEach((cat, ci) => {
      if (!active[ci]) return;
      const op = hov === -1 || hov === ci ? 1 : 0.1;
      const pts = getPts(cat.vals);
      const rgb = cat.color === '#00e5ff' ? '0,229,255' : cat.color === '#f43f8e' ? '244,63,142' : '168,85,247';
      
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      pts.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.closePath();
      
      ctx.fillStyle = `rgba(${rgb}, ${0.1 * op})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${rgb}, ${0.75 * op})`;
      ctx.lineWidth = hov === ci ? 2 : 1.2;
      ctx.stroke();
      
      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${op})`;
        ctx.fill();
      });
    });
  }, [active, hov]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rc = canvas.getBoundingClientRect();
    const mx = e.clientX - rc.left;
    const my = e.clientY - rc.top;
    let foundIndex = -1;

    cats.forEach((cat, ci) => {
      if (!active[ci]) return;
      const pts = getPts(cat.vals);
      let inside = true;
      for (let i = 0; i < 5; i++) {
        const a = pts[i];
        const b = pts[(i + 1) % 5];
        if ((b.x - a.x) * (my - a.y) - (b.y - a.y) * (mx - a.x) < 0) {
          inside = false;
          break;
        }
      }
      if (inside) foundIndex = ci;
    });

    if (foundIndex !== hov) {
      setHov(foundIndex);
    }
  };

  const handleMouseLeave = () => {
    setHov(-1);
  };

  const toggleR = (index) => {
    setActive((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <div className="radar-panel w-full">
      <div className="rp-header">
        <span className="rp-title">Multi-Axis Skill Comparison</span>
        <div className="rp-legend">
          {cats.map((cat, i) => (
            <div 
              key={i} 
              id={`rl${i}`}
              onClick={() => toggleR(i)}
              className={`rpl-item ${!active[i] ? 'dim' : ''}`}
            >
              <div 
                className="rpl-dot" 
                style={{ 
                  background: cat.color, 
                  boxShadow: `0 0 5px ${cat.color}` 
                }} 
              />
              {cat.name}
            </div>
          ))}
        </div>
      </div>
      <div className="radar-body">
        <canvas 
          ref={canvasRef} 
          id="radarComp" 
          width="300" 
          height="300"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
        
        {/* Attr bars rendered declaratively in React */}
        <div className="radar-right">
          <div className="attr-section-title">Attribute Breakdown</div>
          <div className="attr-rows">
            {attrs.map((attr, ai) => (
              <div className="attr-r" key={ai}>
                <div className="attr-n">{attr}</div>
                <div className="attr-bars-row">
                  {cats.map((cat, ci) => {
                    const isActive = active[ci];
                    const rgb = cat.color === '#00e5ff' ? '0,229,255' : cat.color === '#f43f8e' ? '244,63,142' : '168,85,247';
                    return (
                      <div className="attr-bw" key={ci}>
                        <div 
                          className="attr-b" 
                          style={{ 
                            background: `rgba(${rgb}, 0.7)`, 
                            width: isActive ? `${cat.vals[ai]}%` : '0%' 
                          }} 
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareRadar;
