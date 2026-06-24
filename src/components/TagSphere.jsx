import { useEffect, useRef, useState } from 'react';

const TagSphere = () => {
  const containerRef = useRef(null);
  const R = 110; // Sphere radius
  const depth = 220; // Perspective depth
  const tagsList = [
    'JavaScript', 'Python', 'Java', 'SQL', 'C/C++', 'TypeScript', 
    'React.js', 'Tailwind', 'Node.js', 'Express', 'MongoDB', 
    'MySQL', 'Power BI', 'Tableau', 'Git', 'Postman', 'LLM APIs'
  ];

  // Distribute tags on a sphere using Fibonacci sphere algorithm
  const [tags, setTags] = useState(() => {
    const N = tagsList.length;
    return tagsList.map((text, idx) => {
      const k = -1 + (2 * idx + 1) / N;
      const theta = Math.acos(k);
      const phi = Math.sqrt(N * Math.PI) * theta;
      return {
        text,
        x: R * Math.sin(theta) * Math.cos(phi),
        y: R * Math.sin(theta) * Math.sin(phi),
        z: R * Math.cos(theta),
      };
    });
  });

  const speedRef = useRef({ x: 0.006, y: 0.006 });
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const rotate = () => {
      const sx = speedRef.current.x;
      const sy = speedRef.current.y;
      
      const cosX = Math.cos(sx);
      const sinX = Math.sin(sx);
      const cosY = Math.cos(sy);
      const sinY = Math.sin(sy);

      setTags((prevTags) =>
        prevTags.map((tag) => {
          // Rotate around X-axis
          const y1 = tag.y * cosX - tag.z * sinX;
          const z1 = tag.z * cosX + tag.y * sinX;

          // Rotate around Y-axis
          const x2 = tag.x * cosY - z1 * sinY;
          const z2 = z1 * cosY + tag.x * sinY;

          return { ...tag, x: x2, y: y1, z: z2 };
        })
      );

      animationFrameRef.current = requestAnimationFrame(rotate);
    };

    rotate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // Control rotation speed based on cursor offset from sphere center
    speedRef.current = {
      x: -(my - cy) * 0.0001,
      y: (mx - cx) * 0.0001,
    };
  };

  const handleMouseLeave = () => {
    // Return to default slow spin when cursor leaves
    speedRef.current = { x: 0.006, y: 0.006 };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[320px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{ transformStyle: 'preserve-3d', perspective: '800px' }}
    >
      <div className="absolute inset-0 bg-[#0c111c]/40 rounded-xl border border-white/5 flex items-center justify-center">
        {/* Sphere visualization rings */}
        <div className="absolute w-[220px] h-[220px] rounded-full border border-cyan-400/5 animate-pulse" />
        <div className="absolute w-[220px] h-[220px] rounded-full border border-purple-500/5 rotate-45" />
        <div className="absolute w-[220px] h-[220px] rounded-full border border-purple-500/5 -rotate-45" />
        
        {/* Render 3D Projected Skill Tags */}
        {tags.map((tag, idx) => {
          const scale = depth / (depth + tag.z);
          const opacity = (tag.z + R) / (2 * R) * 0.75 + 0.25;
          const zIndex = Math.round(scale * 100);
          
          return (
            <span
              key={idx}
              className="absolute font-mono font-bold text-xs uppercase tracking-wider py-1.5 px-3 rounded-full border bg-[#07090f]/90 transition-all duration-300"
              style={{
                transform: `translate3d(${tag.x}px, ${tag.y}px, ${tag.z}px) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex,
                color: tag.z > 0 ? 'var(--c)' : 'var(--p)',
                borderColor: tag.z > 0 ? 'rgba(0, 229, 255, 0.15)' : 'rgba(168, 85, 247, 0.1)',
                boxShadow: tag.z > 40 ? `0 0 10px rgba(0, 229, 255, ${0.1 * (tag.z / R)})` : 'none',
              }}
            >
              {tag.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TagSphere;
