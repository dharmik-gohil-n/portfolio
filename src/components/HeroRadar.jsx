import { useEffect, useRef } from 'react';

const HeroRadar = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const W = 340;
    const H = 300;
    const cx = W / 2;
    const cy = H / 2 + 10;
    const R = 105;
    const attrs = ['Full-Stack', 'AI / ML', 'Data', 'DevOps', 'Design'];
    const scores = [92, 80, 75, 78, 72];
    let ang = 0;
    const tilt = 0.32;
    let animationFrameId;

    const proj = (r, theta, tz) => {
      const x3 = r * Math.cos(theta);
      const y3 = r * Math.sin(theta);
      const xr = x3 * Math.cos(ang) - y3 * Math.sin(ang);
      const yr = (x3 * Math.sin(ang) + y3 * Math.cos(ang)) * Math.sin(tilt) + tz * Math.cos(tilt);
      return { px: cx + xr, py: cy + yr };
    };

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      
      // rings
      for (let r = 1; r <= 5; r++) {
        const pts = Array.from({ length: 5 }, (_, i) => 
          proj((r / 5) * R, (i / 5) * Math.PI * 2 - Math.PI / 2, -r * 5)
        );
        ctx.beginPath();
        ctx.moveTo(pts[0].px, pts[0].py);
        pts.slice(1).forEach((p) => ctx.lineTo(p.px, p.py));
        ctx.closePath();
        ctx.strokeStyle = `rgba(0, 229, 255, ${0.05 + r * 0.03})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
      
      // axes
      for (let i = 0; i < 5; i++) {
        const t = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const tip = proj(R, t, -28);
        const base = proj(0, 0, 0);
        ctx.beginPath();
        ctx.moveTo(base.px, base.py);
        ctx.lineTo(tip.px, tip.py);
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.1)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
      
      // polygon
      const pts = scores.map((v, i) => 
        proj((v / 100) * R, (i / 5) * Math.PI * 2 - Math.PI / 2, -(v / 100) * 26)
      );
      ctx.beginPath();
      ctx.moveTo(pts[0].px, pts[0].py);
      pts.slice(1).forEach((p) => ctx.lineTo(p.px, p.py));
      ctx.closePath();
      
      const g = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      g.addColorStop(0, 'rgba(0, 229, 255, 0.2)');
      g.addColorStop(1, 'rgba(168, 85, 247, 0.2)');
      ctx.fillStyle = g;
      ctx.fill();
      
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.65)';
      ctx.lineWidth = 1.4;
      ctx.stroke();
      
      // dots
      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.px, p.py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.85)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.px, p.py, 7, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.1)';
        ctx.fill();
      });
      
      // labels
      ctx.font = '10px system-ui, sans-serif';
      ctx.fillStyle = 'rgba(220, 228, 240, 0.5)';
      ctx.textAlign = 'center';
      attrs.forEach((a, i) => {
        const t = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const lp = proj(R + 18, t, -30);
        ctx.fillText(a, lp.px, lp.py);
      });
      
      ang += 0.004;
      animationFrameId = requestAnimationFrame(frame);
    };

    frame();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id="heroRadar" width="340" height="300" />;
};

export default HeroRadar;
