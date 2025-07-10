import { motion } from 'framer-motion';

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
        strokeDasharray="6"
        strokeDashoffset="6"
        animate={{ strokeDashoffset: 0 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
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
    <motion.rect
      x={x - 100}
      y={y - 100}
      width="200"
      height="200"
      rx="25"
      fill={bgColor}
      filter={`url(#${glowId})`} // <- personalizado por nodo
    />
    <image href={imgUrl} x={x - 55} y={y - 55} width="110" height="110" />
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
    <svg viewBox="0 0 1900 900" className="w-full h-auto">
      {/* Arrowhead marker */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="8"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#0ea5e9" />
        </marker>

       {/* Brillo suave para nodos */}
<defs>
  <marker
    id="arrowhead"
    markerWidth="10"
    markerHeight="7"
    refX="8"
    refY="3.5"
    orient="auto"
  >
    <polygon points="0 0, 10 3.5, 0 7" fill="#0ea5e9" />
  </marker>

  {/* Glow filters personalizados */}
  <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#1e3a8a" floodOpacity="1" />
  </filter>
  <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#075985" floodOpacity="1" />
  </filter>
  <filter id="glow-yellow" x="-50%" y="-50%" width="200%" height="200%">
    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#a16207" floodOpacity="1" />
  </filter>
  <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#6b21a8" floodOpacity="1" />
  </filter>
  <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#166534" floodOpacity="1" />
  </filter>
  <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#dc2626" floodOpacity="1" />
  </filter>
  <filter id="glow-lime" x="-50%" y="-50%" width="200%" height="200%">
    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#16a34a" floodOpacity="1" />
  </filter>
</defs>

      </defs>

      {/* Nodos principales */}
      <ImageNode
        x={100}
        y={300}
        label="Web Service Telenanu"
        imgUrl="https://symbols.getvecta.com/stencil_28/5_app-service-web-app.dbdab14e4a.svg"
        bgColor="#1e3a8a"
        glowId="glow-blue"
      />

      <ImageNode
        x={350}
        y={300}
        label="Orchestrator"
        imgUrl="https://businessmodelnavigator.com/img/navigator-pattern-img-2/34.png"
        bgColor="#075985"
        glowId="glow-cyan"
      />

      <ImageNode
        x={950}
        y={160}
        label="Search Telenanu"
        imgUrl="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f50d.svg"
        bgColor="#a16207"
        glowId="glow-yellow"
      />

      <ImageNode
        x={950}
        y={480}
        label="OpenAI Telenanu"
        imgUrl="https://cdn-icons-png.flaticon.com/512/4712/4712104.png"
        bgColor="#6b21a8"
        glowId="glow-purple"
      />

      {/* Fuentes de datos en columna */}
      <ImageNode
        x={1350}
        y={150}
        label="Documentos"
        imgUrl="https://cdn-icons-png.flaticon.com/512/337/337946.png"
        bgColor="#166534"
        glowId="glow-green"
      />
      <ImageNode
        x={1350}
        y={360}
        label="BlobStorage Telenanu"
        imgUrl="https://www.devopsschool.com/blog/wp-content/uploads/2023/08/image-684.png"
        bgColor="#dc2626"
        glowId="glow-red"
      />
      <ImageNode
        x={1350}
        y={570}
        label="TelenanuDB"
        imgUrl="https://us.123rf.com/450wm/binaryproject/binaryproject1510/binaryproject151000009/46790412-cloud-database-connecting-laptop-smartphone-and-tab-vector-flat.jpg"
        bgColor="#16a34a"
        glowId="glow-lime"
      />

      {/* Flechas animadas con etiquetas */}
      <Arrow x1={185} y1={300} x2={265} y2={300} />
      <Arrow x1={435} y1={300} x2={900} y2={190} label="Query knowledge" />
      <Arrow x1={900} y1={190} x2={435} y2={300} />
      <Arrow x1={1270} y1={150} x2={980} y2={160} />
      <Arrow x1={1270} y1={360} x2={980} y2={160} />
      <Arrow x1={1270} y1={570} x2={980} y2={160} />
      <Arrow x1={435} y1={300} x2={900} y2={450} label="prompt+knowledge (Response)" />
      <Arrow x1={900} y1={450} x2={435} y2={300} />
    </svg>
  );
}
