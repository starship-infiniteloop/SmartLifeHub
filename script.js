/**
 * SmartLife Hub - JavaScript Core Engine
 * Implements high-tech canvas networks, sliders math, blueprint generators,
 * real-time dashboard toggles, rules popups, and toast validation feeds.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // MOBILE NAVIGATION & NAVIGATION SCROLLED STATE
  // ==========================================================================
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header with glass background transition
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Toggle mobile hamburger menu drawer
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close hamburger menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // ==========================================================================
  // ACTIVE NAVIGATION LINK OBSERVER
  // ==========================================================================
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -40% 0px', // Trigger when section occupies core viewport
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => navObserver.observe(section));


  // ==========================================================================
  // INTERACTIVE CANVAS IoT NETWORK GRAPHICS
  // ==========================================================================
  const canvas = document.getElementById('canvas-network');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let numberOfParticles = 40;
    
    const mouse = {
      x: null,
      y: null,
      radius: 130 // Proximity link radius for user cursor
    };

    // Track mouse move
    window.addEventListener('mousemove', (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    });

    // Reset mouse when leaving hero space
    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Responsive Canvas Resize
    function resizeCanvas() {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      
      // Scale particles based on screen size
      if (canvas.width < 768) {
        numberOfParticles = 20;
      } else {
        numberOfParticles = 45;
      }
      initParticles();
    }

    // Particle Object Blueprint
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 1.5;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
        this.color = Math.random() > 0.5 ? '#00f0ff' : '#3b82f6';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce margins
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    function initParticles() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    // Draw connecting mesh lines
    function drawLines() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Connect particles close to each other
          if (distance < 110) {
            const alpha = (1 - (distance / 110)) * 0.15;
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
            ctx.closePath();
          }
        }

        // Connect particles to mouse cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particlesArray[a].x - mouse.x;
          const dy = particlesArray[a].y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const alpha = (1 - (distance / mouse.radius)) * 0.35;
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }

    // Animation Loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      // drawLines();
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
  }


  // ==========================================================================
  // SCROLL-TRIGGERED STATS INCREMENT COUNTERS
  // ==========================================================================
  const counterNumbers = document.querySelectorAll('.stat-number');
  const counterObserverOptions = {
    root: null,
    threshold: 0.5
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '+';
        let count = 0;
        const speed = targetVal / 50; // increment rate

        const updateCount = () => {
          count += speed;
          if (count < targetVal) {
            el.innerText = Math.floor(count).toLocaleString() + suffix;
            setTimeout(updateCount, 25);
          } else {
            el.innerText = targetVal.toLocaleString() + suffix;
          }
        };
        updateCount();
        observer.unobserve(el); // Stop observing once completed
      }
    });
  }, counterObserverOptions);

  counterNumbers.forEach(num => counterObserver.observe(num));


  // ==========================================================================
  // SMART HOME PLANNER INTERACTIVE LOGIC
  // ==========================================================================
  const layoutBtns = document.querySelectorAll('.layout-btn');
  const deviceCheckboxes = document.querySelectorAll('input[name="smart-device"]');
  const generatePlanBtn = document.getElementById('btn-generate-plan');
  const plannerLoader = document.getElementById('planner-loader');
  const plannerResultsPane = document.getElementById('planner-results-pane');
  
  // Results panel items to populate
  const blueprintTitleText = document.getElementById('blueprint-title-text');
  const floorplanMesh = document.getElementById('floorplan-mesh');
  const recHubTitle = document.getElementById('rec-hub-title');
  const recHubDesc = document.getElementById('rec-hub-desc');

  let selectedLayout = 'apartment';

  // Toggle layout selection style active state
  layoutBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      layoutBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedLayout = btn.getAttribute('data-layout');
    });
  });

  // Toggle checkbox label borders active state
  deviceCheckboxes.forEach(box => {
    box.addEventListener('change', () => {
      const parentLabel = box.parentElement;
      if (box.checked) {
        parentLabel.classList.add('checked');
      } else {
        parentLabel.classList.remove('checked');
      }
    });
  });

  // Floorplans mock structures setup database
  const floorplanRoomsData = {
    apartment: [
      { name: 'Living Room', x: '5%', y: '5%', w: '55%', h: '50%' },
      { name: 'Kitchen', x: '65%', y: '5%', w: '30%', h: '40%' },
      { name: 'Bedroom', x: '5%', y: '60%', w: '50%', h: '35%' },
      { name: 'Bathroom', x: '60%', y: '50%', w: '35%', h: '45%' }
    ],
    'small-house': [
      { name: 'Living Area', x: '5%', y: '5%', w: '60%', h: '45%' },
      { name: 'Kitchen & Dining', x: '5%', y: '55%', w: '40%', h: '40%' },
      { name: 'Bedroom', x: '70%', y: '5%', w: '25%', h: '40%' },
      { name: 'Garage space', x: '50%', y: '50%', w: '45%', h: '45%' }
    ],
    'large-house': [
      { name: 'Grand Foyer', x: '5%', y: '5%', w: '35%', h: '35%' },
      { name: 'Living Room', x: '45%', y: '5%', w: '50%', h: '45%' },
      { name: 'Kitchen Hub', x: '5%', y: '45%', w: '35%', h: '50%' },
      { name: 'Master Bed', x: '45%', y: '55%', w: '30%', h: '40%' },
      { name: 'Patio deck', x: '80%', y: '55%', w: '15%', h: '40%' }
    ],
    office: [
      { name: 'Reception Lobby', x: '5%', y: '5%', w: '30%', h: '40%' },
      { name: 'Open Office Space', x: '40%', y: '5%', w: '55%', h: '50%' },
      { name: 'Conference Boardroom', x: '5%', y: '50%', w: '30%', h: '45%' },
      { name: 'Edge Server Room', x: '40%', y: '60%', w: '20%', h: '35%' },
      { name: 'Breakroom Cafeteria', x: '65%', y: '60%', w: '30%', h: '35%' }
    ]
  };

  // Device nodes deployment placement inside rooms (x, y coords per room/type)
  const deviceLocations = {
    lights: [
      { room: 0, x: '25%', y: '25%' },
      { room: 1, x: '15%', y: '20%' },
      { room: 2, x: '20%', y: '15%' }
    ],
    locks: [
      { room: 0, x: '5%', y: '45%' } // Near entrance
    ],
    cameras: [
      { room: 0, x: '5%', y: '8%' },
      { room: 1, x: '90%', y: '8%' }
    ],
    thermostats: [
      { room: 0, x: '80%', y: '40%' }
    ],
    sensors: [
      { room: 2, x: '80%', y: '70%' },
      { room: 3, x: '50%', y: '30%' }
    ]
  };

  // Device SVGs mapping
  const deviceIcons = {
    lights: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" /></svg>`,
    locks: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>`,
    cameras: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM2.25 12a9.75 9.75 0 1119.5 0 9.75 9.75 0 01-19.5 0z" /></svg>`,
    thermostats: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>`,
    sensors: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75" /></svg>`
  };

  generatePlanBtn.addEventListener('click', () => {
    // Show spinner overlay loader
    plannerLoader.classList.add('active');
    plannerResultsPane.classList.remove('active');

    setTimeout(() => {
      plannerLoader.classList.remove('active');
      plannerResultsPane.classList.add('active');

      // Populate blueprint titles
      const formattedTitle = selectedLayout.replace('-', ' ');
      blueprintTitleText.innerText = `Cyber blueprint | ${formattedTitle}`;

      // Reset floorplan map grid
      floorplanMesh.innerHTML = '';

      // Set recommended protocol guidelines texts
      if (selectedLayout === 'office') {
        recHubTitle.innerText = "Dual-Redundant Power Edge Server Router";
        recHubDesc.innerText = "Deploy Matter Over Ethernet gateway controllers into your Edge Server rack space, routing mesh traffic via isolated VLAN channels.";
      } else if (selectedLayout === 'large-house') {
        recHubTitle.innerText = "Multi-Border Thread Router Array";
        recHubDesc.innerText = "Place a dual Thread Border Router (smart speaker + smart display) on opposite ends of the floor plan to secure complete mesh network coverage.";
      } else {
        recHubTitle.innerText = "Matter Central Border Router Hub";
        recHubDesc.innerText = "We recommend placing a thread-enabled smart speaker in the central room to connect locks, lights, and sensors via secure local IPv6 Mesh networks.";
      }

      // Build wall rooms
      const activeRoomsList = floorplanRoomsData[selectedLayout] || [];
      activeRoomsList.forEach((rm, index) => {
        const roomDiv = document.createElement('div');
        roomDiv.className = 'floorplan-room';
        roomDiv.style.left = rm.x;
        roomDiv.style.top = rm.y;
        roomDiv.style.width = rm.w;
        roomDiv.style.height = rm.h;
        roomDiv.innerText = rm.name;
        roomDiv.setAttribute('data-room-index', index);
        floorplanMesh.appendChild(roomDiv);
      });

      // Fetch which devices are ticked/selected
      const chosenDeviceTypes = [];
      deviceCheckboxes.forEach(box => {
        if (box.checked) {
          chosenDeviceTypes.push(box.value);
        }
      });

      // Place absolute positioned glowing nodes representing checked devices
      chosenDeviceTypes.forEach(deviceType => {
        const spots = deviceLocations[deviceType] || [];
        spots.forEach(spot => {
          // Verify if this spot corresponds to an active room in current layout
          const targetRoomEl = floorplanMesh.querySelector(`[data-room-index="${spot.room}"]`);
          if (targetRoomEl) {
            const nodeDiv = document.createElement('div');
            nodeDiv.className = 'blueprint-device-node';
            
            // Placement inside target room margins
            nodeDiv.style.left = spot.x;
            nodeDiv.style.top = spot.y;
            nodeDiv.setAttribute('data-tooltip', `Smart ${deviceType}`);
            nodeDiv.innerHTML = deviceIcons[deviceType] || '';
            
            targetRoomEl.appendChild(nodeDiv);
          }
        });
      });

      // Scroll smoothly to results pane
      plannerResultsPane.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    }, 1300); // Simulated delay for high-tech experience
  });


  // ==========================================================================
  // DEVICE COMPATIBILITY CHECKER ENGINE
  // ==========================================================================
  const checkCompatibilityBtn = document.getElementById('btn-check-compatibility');
  const deviceBrandSelect = document.getElementById('device-brand');
  const deviceTypeSelect = document.getElementById('device-type');
  const checkerPlaceholderUi = document.getElementById('checker-placeholder-ui');
  const checkerResultDataUi = document.getElementById('checker-result-data-ui');
  const checkerBadgeStatus = document.getElementById('checker-badge-status');
  const scoreRingFill = document.getElementById('score-ring-fill');
  const checkerScoreVal = document.getElementById('checker-score-val');
  const checkerResTier = document.getElementById('checker-res-tier');
  const checkerResProtocols = document.getElementById('checker-res-protocols');
  const checkerResRec = document.getElementById('checker-res-rec');

  // Curated brands compatibility ledger lookup
  const compatibilityDatabase = {
    'philips-hue': {
      lights: { score: 98, tier: 'Zigbee 3.0 Bridge / Matter Sync', protocols: 'Matter Over Thread, Zigbee Link', rec: 'Connect directly using a local Philips Hue Bridge or Matter Border Hub.' },
      cameras: { score: 70, tier: 'Wi-Fi Cloud Integration', protocols: 'Wi-Fi 2.4GHz', rec: 'Requires cloud accounts, links securely into Home Assistant dashboard integrations.' },
      speakers: { score: 85, tier: 'Audio Network Link', protocols: 'AirPlay 2, Spotify Connect', rec: 'Plays audio notifications directly via third-party media routers.' },
      sensors: { score: 95, tier: 'Zigbee Local Motion', protocols: 'Zigbee 3.0 Mesh', rec: 'Triggers local light recipes with sub-50ms latency margins.' }
    },
    'google-nest': {
      lights: { score: 90, tier: 'Matter Over Thread Enabled', protocols: 'Matter, Thread, Wi-Fi', rec: 'Direct local control via Google Home App ecosystem.' },
      cameras: { score: 85, tier: 'Wi-Fi Cloud Hub Stream', protocols: 'Wi-Fi (Dual-Band)', rec: 'Best configured through Google Nest Hub Max or local security edge boxes.' },
      speakers: { score: 100, tier: 'Matter Border Router Central', protocols: 'Matter Over Thread, Wi-Fi', rec: 'Acts as primary Matter mesh gateway border routing server.' },
      sensors: { score: 92, tier: 'Thread Secure Climate Node', protocols: 'Thread Mesh', rec: 'Binds into Nest smart thermostats for localized climate control calculations.' }
    },
    'ring': {
      lights: { score: 65, tier: 'Z-Wave Ring Bridge Sync', protocols: 'Z-Wave, Wi-Fi', rec: 'Requires proprietary Ring Smart Lighting Bridge for local automation triggers.' },
      cameras: { score: 80, tier: 'Wi-Fi Cloud Sentinel Stream', protocols: 'Wi-Fi 2.4/5GHz', rec: 'Requires Ring cloud subscription. Integrated using IFTTT webhooks.' },
      speakers: { score: 75, tier: 'Alexa Connected Chime Link', protocols: 'Wi-Fi Core Link', rec: 'Fires voice alarms over Alexa-compatible smart nodes.' },
      sensors: { score: 88, tier: 'Z-Wave Secure Alarm Nodes', protocols: 'Z-Wave Plus Mesh', rec: 'Connects directly with central Ring Security Alarm Border hubs.' }
    },
    'aqara': {
      lights: { score: 92, tier: 'Zigbee Matter Bridge Link', protocols: 'Zigbee 3.0, Matter Bridge', rec: 'Requires Aqara M2/M3 Matter Hub to link with third-party platforms.' },
      cameras: { score: 90, tier: 'HomeKit Local Secure Video', protocols: 'Wi-Fi, Zigbee Hub', rec: 'Supports local NAS storage streaming and Apple HomeKit Edge streams.' },
      speakers: { score: 60, tier: 'Buzzer Alerts Only', protocols: 'Local Zigbee Link', rec: 'Fires low-frequency alarm buzzes directly on the local Hub node.' },
      sensors: { score: 98, tier: 'Matter Over Thread Mesh', protocols: 'Matter Over Thread, Zigbee', rec: 'Aqara T1 sensors offer Matter Thread direct sync with zero hub requirements!' }
    },
    'sonos': {
      lights: { score: 40, tier: 'Cloud Automation Hook', protocols: 'IFTTT Cloud Webhooks', rec: 'Flashes lights when audio starts via custom cloud macro commands.' },
      cameras: { score: 50, tier: 'Siren Audio Output Link', protocols: 'Local API Node', rec: 'Plays emergency sirens on Sonos speakers when cameras detect motion.' },
      speakers: { score: 98, tier: 'Matter Unified Speaker Hub', protocols: 'Matter, AirPlay 2, Wi-Fi', rec: 'Integrates natively across Apple Home, Google Home, and Alexa.' },
      sensors: { score: 45, tier: 'Microphone Sensor State', protocols: 'Voice Alexa API', rec: 'Can trigger rules based on built-in ambient voice activation states.' }
    },
    'tp-link': {
      lights: { score: 88, tier: 'Wi-Fi Direct Controller', protocols: 'Wi-Fi Direct, Local API', rec: 'No hub required. Controls local light sockets directly via local IP addresses.' },
      cameras: { score: 80, tier: 'Tapo Local SD Card Stream', protocols: 'Wi-Fi, RTSP Stream', rec: 'Streams high-def footage locally via RTSP into edge server platforms.' },
      speakers: { score: 70, tier: 'Voice Assist Accessory', protocols: 'Alexa Link', rec: 'Accessory sync triggers voice alert broadcasts over smart networks.' },
      sensors: { score: 85, tier: 'Smart Sub-GHz Router', protocols: 'Sub-GHz Smart Mesh', rec: 'Requires TP-Link Smart Hub to bridge low-power motion sockets.' }
    }
  };

  checkCompatibilityBtn.addEventListener('click', () => {
    const brand = deviceBrandSelect.value;
    const type = deviceTypeSelect.value;

    if (!brand || !type) {
      showToast('Error: Please select both a Brand and a Device Type.', 'error');
      return;
    }

    // Lookup data
    const brandLedger = compatibilityDatabase[brand] || {};
    const auditResult = brandLedger[type] || {
      score: 50,
      tier: 'Standard Unverified Platform Match',
      protocols: 'Standard Wi-Fi Link',
      rec: 'Connects using legacy cloud automation APIs. Unoptimized latency.'
    };

    // Hide placeholder, reveal result
    checkerPlaceholderUi.style.display = 'none';
    checkerResultDataUi.classList.add('active');

    // Populate audit outputs
    checkerScoreVal.innerText = `${auditResult.score}%`;
    checkerResTier.innerText = auditResult.tier;
    checkerResProtocols.innerText = auditResult.protocols;
    checkerResRec.innerText = auditResult.rec;

    // Animate circular score progress ring
    // Circumference = 2 * PI * r = 2 * 3.14159 * 34 = 213.6
    const circumference = 213.6;
    const offset = circumference - (auditResult.score / 100) * circumference;
    scoreRingFill.style.strokeDashoffset = offset;

    // Shift badge color/text based on compatibility score
    checkerBadgeStatus.className = 'status-indicator-badge';
    const statusTextNode = checkerBadgeStatus.querySelector('span:last-child');

    if (auditResult.score >= 90) {
      checkerBadgeStatus.classList.add('pass');
      statusTextNode.innerText = 'Excellent Integration';
    } else if (auditResult.score >= 70) {
      checkerBadgeStatus.classList.add('partial');
      statusTextNode.style.color = 'var(--color-warning)';
      statusTextNode.innerText = 'Moderate Integration';
    } else {
      checkerBadgeStatus.classList.add('partial');
      statusTextNode.style.color = 'var(--color-rose)';
      statusTextNode.innerText = 'Cloud Integration Only';
    }

    showToast(`Compatibility audit completed for ${brandSelectName(brand)}!`, 'success');
  });

  function brandSelectName(val) {
    if (val === 'philips-hue') return 'Philips Hue';
    if (val === 'google-nest') return 'Google Nest';
    if (val === 'ring') return 'Ring Security';
    if (val === 'aqara') return 'Aqara IoT';
    if (val === 'sonos') return 'Sonos Sound';
    if (val === 'tp-link') return 'TP-Link Kasa';
    return val;
  }


  // ==========================================================================
  // REAL-TIME ENERGY CALCULATOR MATHEMATICAL ENGINE
  // ==========================================================================
  const inputDeviceCount = document.getElementById('input-device-count');
  const inputUsageHours = document.getElementById('input-usage-hours');
  const inputElecRate = document.getElementById('input-elec-rate');

  const badgeDeviceCount = document.getElementById('badge-device-count');
  const badgeUsageHours = document.getElementById('badge-usage-hours');
  const badgeElecRate = document.getElementById('badge-elec-rate');

  const calcKwhVal = document.getElementById('calc-kwh-val');
  const calcCostVal = document.getElementById('calc-cost-val');

  const chartLblStandard = document.getElementById('chart-lbl-standard');
  const chartLblSmart = document.getElementById('chart-lbl-smart');
  
  const chartFillStandard = document.getElementById('chart-fill-standard');
  const chartFillSmart = document.getElementById('chart-fill-smart');
  
  const calcEcoDescription = document.getElementById('calc-eco-description');

  function calculateEnergy() {
    const devices = parseInt(inputDeviceCount.value, 10);
    const hours = parseInt(inputUsageHours.value, 10);
    const rate = parseFloat(inputElecRate.value);

    // Update text badges
    badgeDeviceCount.innerText = `${devices} Devices`;
    badgeUsageHours.innerText = `${hours} Hrs/Day`;
    badgeElecRate.innerText = `$${rate.toFixed(2)} / kWh`;

    // Formulas assuming 80 watts average unoptimized device capacity (e.g. speakers, bulbs, cameras combined)
    const averageDeviceWatts = 80; 
    const standardDailyKwh = (devices * hours * averageDeviceWatts) / 1000;
    const standardMonthlyKwh = standardDailyKwh * 30; // 30 days
    const standardMonthlyCost = standardMonthlyKwh * rate;

    // Smart optimized savings factor: 30% reduction (0.7 multiplier)
    const smartMonthlyKwh = standardMonthlyKwh * 0.7;
    const smartMonthlyCost = smartMonthlyKwh * rate;
    const monthlySavings = standardMonthlyCost - smartMonthlyCost;

    // Carbon offset: 1 kWh standard utility grid = 0.385 kg CO2 emission
    // Tree equivalent: 1 mature tree absorbs ~20 kg CO2 annually
    const carbonOffsetAnnualKg = (standardMonthlyKwh - smartMonthlyKwh) * 12 * 0.385;
    const equivalentTreesPlanted = carbonOffsetAnnualKg / 20;

    // Render results fields
    calcKwhVal.innerText = `${Math.round(standardMonthlyKwh)} kWh`;
    calcCostVal.innerText = `$${standardMonthlyCost.toFixed(2)}`;

    chartLblStandard.innerText = `${Math.round(standardMonthlyKwh)} kWh`;
    chartLblSmart.innerText = `${Math.round(smartMonthlyKwh)} kWh`;

    // Dynamic width scale comparison graphs
    // Max limits standard bounds to 90% space
    chartFillStandard.style.width = '90%';
    chartFillSmart.style.width = `${(smartMonthlyKwh / standardMonthlyKwh) * 90}%`;

    // Populate savings description tips
    calcEcoDescription.innerText = `Active automation saves you about $${monthlySavings.toFixed(2)} per month. You offset ${carbonOffsetAnnualKg.toFixed(1)} kg of Carbon emissions annually, equivalent to planting ${equivalentTreesPlanted.toFixed(1)} trees!`;
  }

  // Event Listeners for real-time sliders response
  inputDeviceCount.addEventListener('input', calculateEnergy);
  inputUsageHours.addEventListener('input', calculateEnergy);
  inputElecRate.addEventListener('input', calculateEnergy);

  // Initialize calculations on boot load
  calculateEnergy();


  // ==========================================================================
  // HOME AUTOMATION IDEAS TRIGGER POPUP DETAILS
  // ==========================================================================
  const automationCards = document.querySelectorAll('.automation-card');
  const automationModal = document.getElementById('automation-modal');
  const modalClose = document.getElementById('modal-close');
  const modalIconBlock = document.getElementById('modal-icon-block');
  const modalTitleText = document.getElementById('modal-title-text');
  const modalSubText = document.getElementById('modal-sub-text');
  const modalFlowSteps = document.getElementById('modal-flow-steps');

  // Recipes database to populate inside overlay
  const automationRecipes = {
    morning: {
      title: 'Morning Routine',
      subtitle: 'Circadian Sunrise Recipe',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="4"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`,
      steps: [
        { title: 'WHEN: Time reaches 07:00 AM', desc: 'Central edge clock fires local trigger signal.' },
        { title: 'THEN: Open motorized curtains 100%', desc: 'Living room and Master Bedroom let natural ambient light in.' },
        { title: 'THEN: Dim interior safety lights to 0%', desc: 'Slowly transitions night corridor bulbs to off states.' },
        { title: 'THEN: Initialize Kitchen smart socket', desc: 'Pre-heats espresso machine automatically.' }
      ]
    },
    security: {
      title: 'Security Mode',
      subtitle: 'Lockdown Sentinel Recipe',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
      steps: [
        { title: 'WHEN: Geo-location confirms space is empty', desc: 'All connected family smartphones report out-of-bounds coordinates.' },
        { title: 'THEN: Secure central deadbolt locks', desc: 'Engages front, back, and garage secondary deadbolts.' },
        { title: 'THEN: Initialize camera motion sensors', desc: 'Front Porch CCTV cameras activate heavy detection modes.' },
        { title: 'THEN: Arm night alarm system sensors', desc: 'Sets window reed contacts and motion arrays to high alert.' }
      ]
    },
    energy: {
      title: 'Energy Saver',
      subtitle: 'Grid Peak Shaving Recipe',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
      steps: [
        { title: 'WHEN: Local electric grid utility peak signal active', desc: 'Receives digital utility grid tariff API updates.' },
        { title: 'THEN: Dim smart ceiling lights to 80%', desc: 'Slight brightness decrease offsets heavy grid consumption.' },
        { title: 'THEN: Transition climate control to eco', desc: 'Sets thermostat cooling range threshold up by 2°F.' },
        { title: 'THEN: Terminate inactive standby nodes', desc: 'Cuts smart socket power feeds to idle audio systems and screens.' }
      ]
    },
    night: {
      title: 'Night Mode',
      subtitle: 'Ambient Safeguard Recipe',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
      steps: [
        { title: 'WHEN: User clicks bedside bedside macro node', desc: 'Active bedside wireless click button is compressed.' },
        { title: 'THEN: Secure main deadbolt lock', desc: 'Guarantees side and main entries are armed and locked.' },
        { title: 'THEN: Dim corridor lighting to 10%', desc: 'Creates safe night light guide levels for active paths.' },
        { title: 'THEN: Check garage door triggers', desc: 'Flashes phone notification logs if garage door sensors report open.' }
      ]
    }
  };

  automationCards.forEach(card => {
    card.addEventListener('click', () => {
      const routineKey = card.getAttribute('data-routine');
      const recipe = automationRecipes[routineKey];

      if (recipe) {
        // Populate modal data
        modalIconBlock.innerHTML = recipe.icon;
        modalTitleText.innerText = recipe.title;
        modalSubText.innerText = recipe.subtitle;

        // Populate flow steps list
        modalFlowSteps.innerHTML = '';
        recipe.steps.forEach((step, index) => {
          const stepDiv = document.createElement('div');
          stepDiv.className = `flow-step ${index === 0 ? 'active' : ''}`;
          stepDiv.innerHTML = `
            <div class="flow-step-icon">${index + 1}</div>
            <div class="flow-step-text">
              <h5>${step.title}</h5>
              <p>${step.desc}</p>
            </div>
          `;
          modalFlowSteps.appendChild(stepDiv);
        });

        // Show Modal
        automationModal.classList.add('active');
      }
    });
  });

  // Close modal click
  modalClose.addEventListener('click', () => {
    automationModal.classList.remove('active');
  });

  // Close modal when clicking dark overlay backdrop
  automationModal.addEventListener('click', (e) => {
    if (e.target === automationModal) {
      automationModal.classList.remove('active');
    }
  });


  // ==========================================================================
  // FUTURISTIC SMART DASHBOARD SIMULATOR CONSOLE
  // ==========================================================================
  const toggleLight = document.getElementById('toggle-smart-light');
  const toggleLock = document.getElementById('toggle-smart-lock');
  const toggleCamera = document.getElementById('toggle-smart-camera');
  const toggleThermostat = document.getElementById('toggle-smart-thermostat');
  const toggleAudio = document.getElementById('toggle-smart-audio');
  const toggleOutlet = document.getElementById('toggle-smart-outlet');

  // Descriptions elements
  const descLight = document.getElementById('txt-light-desc');
  const descLock = document.getElementById('txt-lock-desc');
  const descCamera = document.getElementById('txt-camera-desc');
  const descThermostat = document.getElementById('txt-thermostat-desc');
  const descAudio = document.getElementById('txt-audio-desc');
  const descOutlet = document.getElementById('txt-outlet-desc');

  // Sidebar elements
  const healthRingFill = document.getElementById('health-ring-fill');
  const healthValTxt = document.getElementById('health-val-txt');
  const dashDeviceCountTxt = document.getElementById('dash-device-count-txt');
  const dashProgressFillDevices = document.getElementById('dash-progress-fill-devices');
  const dashboardConsoleLogs = document.getElementById('dashboard-console-logs');

  const toggles = [
    { el: toggleLight, cardId: 'dash-card-light', descEl: descLight, onText: 'Living Room: 75% Bright', offText: 'Living Room: Off' },
    { el: toggleLock, cardId: 'dash-card-lock', descEl: descLock, onText: 'Main Gate: Armed & Locked', offText: 'Main Gate: Unlocked', secureState: true },
    { el: toggleCamera, cardId: 'dash-card-camera', descEl: descCamera, onText: 'Front Porch: Active', offText: 'Front Porch: Inactive' },
    { el: toggleThermostat, cardId: 'dash-card-thermostat', descEl: descThermostat, onText: 'Climate Set: 72°F', offText: 'Climate: Off' },
    { el: toggleAudio, cardId: 'dash-card-audio', descEl: descAudio, onText: 'Living Room: Playing audio', offText: 'Living Room: Muted' },
    { el: toggleOutlet, cardId: 'dash-card-outlet', descEl: descOutlet, onText: 'Coffee Brewer: Brewed', offText: 'Coffee Brewer: Idle' }
  ];

  function updateDashboard() {
    let activeCount = 0;
    let totalCount = toggles.length;
    let healthyCount = 0; // Lock should be armed (true), and cameras should be active (true) for 100% health

    toggles.forEach(item => {
      const card = document.getElementById(item.cardId);
      if (item.el.checked) {
        activeCount++;
        card.classList.add('active-state');
        item.descEl.innerText = item.onText;
        
        // Locked state is "healthy" for security. Cameras active are "healthy".
        if (item.secureState) healthyCount += 20; 
        if (item.cardId === 'dash-card-camera') healthyCount += 20;
      } else {
        card.classList.remove('active-state');
        item.descEl.innerText = item.offText;
        
        // Unlocked main gate drops security health margins
        if (item.secureState) healthyCount += 0;
      }

      // Add default state points
      if (item.cardId === 'dash-card-light' && item.el.checked) healthyCount += 15;
      if (item.cardId === 'dash-card-thermostat' && item.el.checked) healthyCount += 15;
      if (item.cardId === 'dash-card-outlet' && item.el.checked) healthyCount += 15;
      if (item.cardId === 'dash-card-audio' && !item.el.checked) healthyCount += 15; // muted speaker is energy healthy
    });

    // Constrain health percent
    if (healthyCount > 100) healthyCount = 100;
    if (healthyCount < 30) healthyCount = 30; // base floor system health

    // Update Sidebar numbers
    dashDeviceCountTxt.innerText = `${activeCount} / ${totalCount} Active`;
    dashProgressFillDevices.style.width = `${(activeCount / totalCount) * 100}%`;

    // Radial health progress ring calculation
    // Circumference = 2 * PI * r = 2 * 3.14159 * 28 = 176
    const c = 176;
    const offset = c - (healthyCount / 100) * c;
    healthRingFill.style.strokeDashoffset = offset;
    healthValTxt.innerText = `${healthyCount}%`;
  }

  // Dashboard toggles event wire hookups
  toggles.forEach(item => {
    item.el.addEventListener('change', () => {
      updateDashboard();

      // Spawn a dynamic high-tech console alert inside the sidebar console!
      const statusText = item.el.checked ? 'ENABLED' : 'DISABLED';
      const alertItem = document.createElement('div');
      
      // Determine color themes based on event trigger
      let alertClass = 'info';
      if (item.secureState) {
        alertClass = item.el.checked ? 'success' : 'warning';
      } else if (!item.el.checked && item.cardId === 'dash-card-camera') {
        alertClass = 'warning';
      }

      alertItem.className = `dash-alert-item ${alertClass}`;
      alertItem.innerHTML = `
        <div class="dash-alert-text">
          <p>Ecosystem Node: <strong>${item.cardId.replace('dash-card-', '').toUpperCase()}</strong> shifted to <strong>${statusText}</strong> state.</p>
          <span>Just Now</span>
        </div>
      `;

      // Insert at the top of console alert logs
      dashboardConsoleLogs.insertBefore(alertItem, dashboardConsoleLogs.firstChild);

      // Trim oldest logs to prevent dashboard overflow
      if (dashboardConsoleLogs.children.length > 5) {
        dashboardConsoleLogs.removeChild(dashboardConsoleLogs.lastChild);
      }
    });
  });

  // Run initial dashboard alignment
  updateDashboard();


  // ==========================================================================
  // CONTACT FORM VALIDATION ENGINE & DYNAMIC TOAST UTILITY
  // ==========================================================================
  const contactForm = document.getElementById('portfolio-contact-form');
  const btnSubmitMessage = document.getElementById('btn-submit-message');
  const toastWrapper = document.getElementById('toast-wrapper');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Validation Error: Form contains empty input fields.', 'error');
      return;
    }

    // Disable button to simulate high-tech network sync latency
    btnSubmitMessage.innerText = 'Transmitting Message...';
    btnSubmitMessage.disabled = true;

    setTimeout(() => {
      // Re-enable controls and clear form
      btnSubmitMessage.innerText = 'Send Message';
      btnSubmitMessage.disabled = false;
      contactForm.reset();

      // Spawn glowing success toast
      showToast(`Thank you, ${name}! Your transmission has been securely logged at HQ.`, 'success');

    }, 1500); // 1.5 seconds simulated satellite delay
  });

  // Toast builder function
  function showToast(text, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Choose high-fidelity SVGs matching status
    const icon = type === 'success' 
      ? `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="var(--color-emerald)"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
      : `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="var(--color-rose)"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`;

    toast.innerHTML = `
      ${icon}
      <span>${text}</span>
    `;

    toastWrapper.appendChild(toast);

    // Trigger sliding entry animation frame
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    // Trigger fade and deletion frames
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300); // match CSS slider transitions
    }, 4500); // Displays for 4.5 seconds
  }

});
