import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Coordenadas de Manaus
const manausPosition = [-3.1190275, -60.0217314];

// Estilo para os igarapés (rios)
const waterStyle = {
  color: '#0077ff',
  weight: 2,
  fillOpacity: 0
};

// Dados GeoJSON de exemplo de igarapés (simulado localmente)
const igarapesGeoJson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Igarapé da Vaca' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-60.0217, -3.1190],
          [-60.0230, -3.1200],
          [-60.0245, -3.1210]
        ]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'Igarapé do Mindu' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-60.0180, -3.1000],
          [-60.0190, -3.1050],
          [-60.0200, -3.1100]
        ]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'Igarapé Tarumã' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-60.0500, -3.1500],
          [-60.0550, -3.1600],
          [-60.0600, -3.1700]
        ]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'Igarapé São Raimundo' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-60.0050, -3.0900],
          [-60.0100, -3.0950],
          [-60.0150, -3.1000]
        ]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'Igarapé da Cachoeirinha' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-60.0300, -3.0700],
          [-60.0350, -3.0750],
          [-60.0400, -3.0800]
        ]
      }
    }
  ]
};

// Pontos de "poluição" simulados (agora com mais locais e cor amarela)
const pontosPoluidos = [
  {
    id: 1,
    nome: 'Zona Industrial',
    coords: [-3.1000, -60.0200],
    descricao: 'Área com focos de queimada registrados.'
  },
  {
    id: 2,
    nome: 'Distrito Agroindustrial',
    coords: [-3.1250, -60.0300],
    descricao: 'Ponto crítico de emissão de poluentes.'
  },
  {
    id: 3,
    nome: 'Linha D’Água',
    coords: [-3.0800, -60.0100],
    descricao: 'Área próxima ao igarapé com lixo acumulado.'
  },
  {
    id: 4,
    nome: 'Bairro da Paz',
    coords: [-3.1100, -60.0150],
    descricao: 'Descarte irregular de resíduos domésticos.'
  },
  {
    id: 5,
    nome: 'Parque São Pedro',
    coords: [-3.0700, -60.0050],
    descricao: 'Queimadas frequentes em área verde urbana.'
  },
  {
    id: 6,
    nome: 'Cidade Nova',
    coords: [-3.1300, -60.0250],
    descricao: 'Acúmulo de lixo e queimadas ilegais.'
  },
  {
    id: 7,
    nome: 'Adrianópolis',
    coords: [-3.0900, -60.0400],
    descricao: 'Área de expansão urbana com desmatamento recente.'
  },
  {
    id: 8,
    nome: 'Compensa',
    coords: [-3.1200, -60.0100],
    descricao: 'Poluição visual e sonora elevada.'
  },
  {
    id: 9,
    nome: 'Novo Aleixo',
    coords: [-3.0950, -60.0250],
    descricao: 'Área crítica de acúmulo de lixo e esgoto a céu aberto.'
  },
  {
    id: 10,
    nome: 'Alvorada',
    coords: [-3.1400, -60.0050],
    descricao: 'Focos de incêndio e queimadas controladas irregulares.'
  },
  {
    id: 11,
    nome: 'Petrópolis',
    coords: [-3.1050, -60.0080],
    descricao: 'Área com descarte irregular de resíduos industriais.'
  },
  {
    id: 12,
    nome: 'Santa Etelvina',
    coords: [-3.1600, -60.0400],
    descricao: 'Lixo acumulado em área de preservação ambiental.'
  },
  {
    id: 13,
    nome: 'São Jorge',
    coords: [-3.1150, -60.0220],
    descricao: 'Focos de queimada em terrenos baldios.'
  },
  {
    id: 14,
    nome: 'Cidade de Deus',
    coords: [-3.1450, -60.0150],
    descricao: 'Poluição sonora e lixo doméstico não coletado.'
  },
  {
    id: 15,
    nome: 'Coroado',
    coords: [-3.0600, -60.0200],
    descricao: 'Descarte inadequado de entulho e materiais de construção.'
  },
  {
    id: 16,
    nome: 'Planalto',
    coords: [-3.1350, -60.0350],
    descricao: 'Queimadas ilegais e desmatamento recente.'
  },
  {
    id: 17,
    nome: 'Glória',
    coords: [-3.0950, -60.0050],
    descricao: 'Esgoto a céu aberto e contaminação do solo.'
  },
  {
    id: 18,
    nome: 'Aparecida',
    coords: [-3.1000, -60.0300],
    descricao: 'Acúmulo de lixo em áreas ribeirinhas.'
  },
  {
    id: 19,
    nome: 'Flores',
    coords: [-3.1250, -60.0080],
    descricao: 'Ponto crítico de poluição visual.'
  },
  {
    id: 20,
    nome: 'Praça 14 de Janeiro',
    coords: [-3.1100, -60.0020],
    descricao: 'Lixo urbano mal gerido e focos de incêndio.'
  },
  {
    id: 21,
    nome: 'Tarumã-Açu',
    coords: [-3.0650, -60.0500],
    descricao: 'Área rural com queimadas constantes.'
  },
  {
    id: 22,
    nome: 'Santo Agostinho',
    coords: [-3.1220, -60.0280],
    descricao: 'Resíduos plásticos acumulados em igarapés.'
  },
  {
    id: 23,
    nome: 'Monte das Oliveiras',
    coords: [-3.1300, -60.0180],
    descricao: 'Loteamentos irregulares com impacto ambiental.'
  },
  {
    id: 24,
    nome: 'Parque Dez',
    coords: [-3.1000, -60.0120],
    descricao: 'Terrenos abandonados com lixo e mato alto.'
  },
  {
    id: 25,
    nome: 'Dom Pedro',
    coords: [-3.1180, -60.0350],
    descricao: 'Foco de poluição por esgoto e resíduos sólidos.'
  }
];

// Ícone amarelo personalizado para poluição
const yellowIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png ',
  shadowUrl: 'https://unpkg.com/leaflet @1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function Starlink() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Mapa de Manaus: Igarapés e Locais Mais Poluídos</h1>

      <MapContainer
        center={manausPosition}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: '70vh', width: '100%' }}
      >
        {/* Camada do OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright ">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Camada GeoJSON dos igarapés */}
        <GeoJSON data={igarapesGeoJson} style={waterStyle} />

        {/* Marcador fixo para Manaus */}
        <Marker position={manausPosition}>
          <Popup>
            Manaus, Amazonas <br /> Brasil
          </Popup>
        </Marker>

        {/* Marcadores dos lugares mais poluídos */}
        {pontosPoluidos.map((ponto) => (
          <Marker key={ponto.id} position={ponto.coords} icon={yellowIcon}>
            <Popup>
              <strong>{ponto.nome}</strong><br />
              {ponto.descricao}<br />
              Localização: ({ponto.coords[0].toFixed(4)}, {ponto.coords[1].toFixed(4)})
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legenda */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px',
        maxWidth: '400px'
      }}>
        <h3>Legenda</h3>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          
          <li>
            <span style={{ color: 'gold' }}>🟡</span> Locais mais poluídos
          </li>
        </ul>
      </div>

      {/* Barra de autoria fixa no rodapé */}
      <div style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: '#222',
        color: '#fff',
        textAlign: 'center',
        padding: '10px 0',
        fontSize: '16px',
        zIndex: 9999
      }}>
        <i>MXZ-Feito por Kelvin Costa Maues</i>
      </div>
    </div>
  );
}

export default Starlink;