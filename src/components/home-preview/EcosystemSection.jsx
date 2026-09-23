import React from 'react';
import { EcosystemOrbit } from './EcosystemOrbit';
import { ImpactStrip } from './ImpactStrip';
import { Handshake, Building2, GraduationCap, Lightbulb } from 'lucide-react';

const govPartners = [
  { name: 'NITI Aayog', logo: '/images/ecosystem/growthora_ecosystem_assets/05_niti_aayog_aim.jpeg' },
  { name: 'Ministry of MSME', logo: '/images/ecosystem/growthora_ecosystem_assets/11_msme.jpeg' },
  { name: 'DPIIT Startup India', logo: '/images/ecosystem/growthora_ecosystem_assets/06_dpiit_startup_india.jpeg' },
  { name: 'SIDBI', logo: '/images/ecosystem/growthora_ecosystem_assets/08_sidbi.jpeg' },
  { name: 'NSIC', logo: '/images/ecosystem/growthora_ecosystem_assets/09_nsic.jpeg' },
  { name: 'KVIC', logo: '/images/ecosystem/growthora_ecosystem_assets/12_kvic.jpeg' },
  { name: 'GeM', logo: '/images/ecosystem/growthora_ecosystem_assets/18_gem.jpeg' }
];

const iitPartners = [
  { name: 'IIMA Ventures', logo: '/images/ecosystem/growthora_ecosystem_assets/20_iima_ventures.jpeg' },
  { name: 'SINE IIT Bombay', logo: '/images/ecosystem/growthora_ecosystem_assets/07_sine_iit_bombay.jpeg' },
  { name: 'IITM Incubation Cell', logo: '/images/ecosystem/growthora_ecosystem_assets/15_iitm_incubation_cell.jpeg' },
  { name: 'TIDES IIT Roorkee', logo: '/images/ecosystem/growthora_ecosystem_assets/04_tides_iit_roorkee.jpeg' },
  { name: 'FITT IIT Delhi', logo: '/images/ecosystem/growthora_ecosystem_assets/19_fitt.jpeg' }
];

const hubPartners = [
  { name: 'T-Hub', logo: '/images/ecosystem/growthora_ecosystem_assets/01_t_hub.jpeg' },
  { name: 'Villgro', logo: '/images/ecosystem/growthora_ecosystem_assets/02_villgro.jpeg' },
  { name: 'Venture Center', logo: '/images/ecosystem/growthora_ecosystem_assets/03_venture_center.jpeg' },
  { name: 'NASSCOM', logo: '/images/ecosystem/growthora_ecosystem_assets/10_nasscom.jpeg' },
  { name: 'iCreate', logo: '/images/ecosystem/growthora_ecosystem_assets/16_icreate.jpeg' },
  { name: 'GUSEC', logo: '/images/ecosystem/growthora_ecosystem_assets/17_gusec.jpeg' },
  { name: 'JioGenNext', logo: '/images/ecosystem/growthora_ecosystem_assets/14_jio_gennext.jpeg' },
  { name: 'KIIT TBI', logo: '/images/ecosystem/growthora_ecosystem_assets/13_kiit_tbi_tto.jpeg' }
];

export function EcosystemSection() {
  const govData = {
    title: 'GOVERNMENT &<br/>REGULATORY BODIES',
    subtitle: 'Enabling innovation through<br/>policy, funding and national<br/>initiatives.',
    color: 'purple',
    icon: Building2,
    bgVideo: '/videogoverment.mp4',
    partners: govPartners,
    labelNum: '01',
    labelText: 'POLICY & ACCESS',
    topSubtitle: 'Enabling Innovation for a Stronger India',
    innerBadges: ['POLICY', 'FUNDING', 'ACCESS', 'COMPLIANCE']
  };

  const iitData = {
    title: 'IIT & IIM<br/>INCUBATORS',
    subtitle: 'World-class incubation,<br/>backed by India’s<br/>premier institutions.',
    color: 'green',
    icon: GraduationCap,
    bgVideo: '/iitvideo.mp4',
    partners: iitPartners,
    labelNum: '02',
    labelText: 'INCUBATION & MENTORSHIP',
    topSubtitle: 'Nurturing Ideas. Building Tomorrow.',
    innerBadges: ['RESEARCH', 'MENTORSHIP', 'STARTUP SUPPORT', 'INCUBATION']
  };

  const hubData = {
    title: 'INNOVATION HUBS &<br/>ACCELERATORS',
    subtitle: 'A thriving ecosystem of<br/>accelerators, labs and<br/>innovation hubs.',
    color: 'orange',
    icon: Lightbulb,
    bgVideo: '/innovation.mp4',
    partners: hubPartners,
    labelNum: '03',
    labelText: 'INNOVATION & SCALE',
    topSubtitle: 'From Ideas to Impact',
    innerBadges: ['IDEAS', 'ACCELERATION', 'SCALE', 'MARKET ACCESS']
  };

  return (
    <div className="ecosystem-section">
      <div className="ecosystem-bg-details">
        <div className="eco-bg-line eco-bg-line-1"></div>
        <div className="eco-bg-line eco-bg-line-2"></div>
        <div className="eco-landmark-left"></div>
        <div className="eco-landmark-right"></div>
      </div>

      <div className="eco-top-content">
        <div className="eco-pill">
          <Handshake size={14} />
          ECOSYSTEM ALLIANCES & INNOVATION NETWORK
        </div>
        
        <h2 className="eco-main-heading">
          Direct Gateway to India’s Foremost <span className="highlight">Incubation & Growth Hubs</span>
        </h2>
        
        <p className="eco-subtext">
          From government platforms to leading incubators, accelerators and investment partners — 
          we connect you to the right ecosystem for funding, mentorship and growth.
        </p>

        <div className="eco-left-nav">
          <span>IDEAS</span>
          <span>FUNDING</span>
          <span>INCUBATION</span>
          <span>GROWTH</span>
        </div>

        <div className="eco-right-quote">
          Fueling Next Gen Enterprises.<br/>
          Catalyzing India’s Growth
        </div>
      </div>
      
      <div className="eco-circles-container">
        {/* Subtle connector 1 */}
        <div className="eco-connector eco-connector-1">
          <div className="eco-connector-arrow"></div>
          <div className="eco-connector-pill">
            POLICY SUPPORT<br/>ENABLES INNOVATION
          </div>
        </div>

        {/* Subtle connector 2 */}
        <div className="eco-connector eco-connector-2">
          <div className="eco-connector-arrow"></div>
          <div className="eco-connector-pill">
            MENTORSHIP<br/>FUELS GROWTH
          </div>
        </div>

        <EcosystemOrbit data={govData} />
        <EcosystemOrbit data={iitData} />
        <EcosystemOrbit data={hubData} />
      </div>
      
      <ImpactStrip />
      
      <div className="eco-bottom-detail">
        <span className="eco-bottom-text">PARTNERSHIPS TODAY  •  STRONGER INDIA TOMORROW</span>
      </div>
    </div>
  );
}
