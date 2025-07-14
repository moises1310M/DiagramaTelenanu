import { motion } from 'framer-motion';
import { p } from 'framer-motion/client';

const Arrow = ({ x1, y1, x2, y2, label }) => {
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
  const labelX = (x1 + x2) / 2;
  const labelY = (y1 + y2) / 2;

  return (
    <>
      {label && (
        <g transform={`translate(${labelX}, ${labelY}) rotate(${angle})`}>
          <foreignObject x={-90} y={-30} width="180" height="60">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#0f172a',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                padding: '6px'
              }}
            >
              {label.split('\n').map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </foreignObject>
        </g>
      )}
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#0ea5e9"
        strokeWidth="6"
        strokeDasharray="12" // más largo = más notorio
        initial={{ strokeDashoffset: 12 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
        markerEnd="url(#arrowhead)"
      />

    </>
  );
};

const ImageNode = ({ x, y, label, imgUrl, bgColor = '#1e40af', glowId = 'glow-blue' }) => (
  <motion.g
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
  >
    {/* Rectángulo de fondo con glow */}
    <rect
      x={x - 100}
      y={y - 100}
      width="200"
      height="200"
      rx="25"
      fill={bgColor}
      filter={`url(#${glowId})`}
    />

    {/* Borde punteado animado con el mismo color que el fondo */}
    <motion.rect
      x={x - 100}
      y={y - 100}
      width="200"
      height="200"
      rx="25"
      fill="none"
      stroke={bgColor} // mismo color que el nodo
      strokeWidth="3"
      strokeDasharray="12 6"
      strokeLinecap="round"
      animate={{ strokeDashoffset: [0, 72] }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 1.5,
        ease: "linear"
      }}
    />

    {/* Imagen del nodo */}
    <image href={imgUrl} x={x - 55} y={y - 55} width="110" height="110" />

    {/* Texto debajo */}
    <text
      x={x}
      y={y + 90}
      fill="white"
      fontSize="20"
      fontWeight="bold"
      textAnchor="middle"
    >
      {label}
    </text>
  </motion.g>
);

export default function AnimatedDiagram() {
  return (
    <svg viewBox="0 0 2400 1000" className="w-full h-auto">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 6 3, 0 6" fill="#0ea5e9" />
        </marker>

        {/* Filtros para el resplandor */}
        <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="50" floodColor="#1e3a8a" floodOpacity="1" />
        </filter>
        <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="50" floodColor="#075985" floodOpacity="1" />
        </filter>
        <filter id="glow-yellow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="50" floodColor="#a16207" floodOpacity="1" />
        </filter>
        <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="50" floodColor="#6b21a8" floodOpacity="1" />
        </filter>
        <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#166534" floodOpacity="1" />
        </filter>
        <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#dc2626" floodOpacity="1" />
        </filter>
        <filter id="glow-lime" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#16a34a" floodOpacity="1" />
        </filter>
      </defs>

      {/* Nodos principales espaciados */}
      <ImageNode x={200} y={300} label="Web Service" imgUrl="https://symbols.getvecta.com/stencil_28/5_app-service-web-app.dbdab14e4a.svg" bgColor="#1e3a8a" glowId="glow-blue" />
      <ImageNode x={500} y={300} label="Orchestrator" imgUrl="https://businessmodelnavigator.com/img/navigator-pattern-img-2/34.png" bgColor="#075985" glowId="glow-cyan" />
      <ImageNode x={1200} y={160} label="Search Telenanu" imgUrl="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f50d.svg" bgColor="#a16207" glowId="glow-yellow" />
      <ImageNode x={1200} y={480} label="OpenAI Telenanu" imgUrl="https://cdn-icons-png.flaticon.com/512/4712/4712104.png" bgColor="#6b21a8" glowId="glow-purple" />

      {/* Fuentes de datos */}
      <ImageNode x={1700} y={150} label="Documentos" imgUrl="https://cdn-icons-png.flaticon.com/512/337/337946.png" bgColor="#166534" glowId="glow-green" />
      <ImageNode x={1700} y={360} label="BlobStorage Telenanu" imgUrl="https://www.devopsschool.com/blog/wp-content/uploads/2023/08/image-684.png" bgColor="#dc2626" glowId="glow-red" />
      <ImageNode x={1700} y={570} label="TelenanuDB" imgUrl="https://us.123rf.com/450wm/binaryproject/binaryproject1510/binaryproject151000009/46790412-cloud-database-connecting-laptop-smartphone-and-tab-vector-flat.jpg" bgColor="#16a34a" glowId="glow-lime" />

      {/* Flechas animadas corregidas */}
      <Arrow x1={300} y1={300} x2={400} y2={300} />
      <Arrow x1={600} y1={300} x2={1100} y2={190} label="Query knowledge" />
      <Arrow x1={1100} y1={190} x2={600} y2={300} />
      <Arrow x1={1620} y1={150} x2={1300} y2={160} />
      <Arrow x1={1620} y1={360} x2={1300} y2={160} />
      <Arrow x1={1620} y1={570} x2={1300} y2={160} />
      <Arrow x1={600} y1={300} x2={1100} y2={450} label="prompt+knowledge (Response)" />
      <Arrow x1={1100} y1={450} x2={600} y2={300} />

      <text
        x="20%"
        y="98%"
        textAnchor="end"
        fontSize="36"
        fill="Negro"
        fontFamily="Arial, sans-serif"
      >
        © Moises Granados - LABSTI 
      </text>
    </svg>
  );
}
