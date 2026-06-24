import { useState, useEffect } from 'react';
import HeroRadar from './components/HeroRadar';
import CompareRadar from './components/CompareRadar';

function App() {
  const [skillsLoaded, setSkillsLoaded] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const timer = setTimeout(() => setSkillsLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const skillBars = [
    { name: 'React.js / MERN Stack', pct: 92, grad: 'linear-gradient(90deg, #00e5ff, #a855f7)' },
    { name: 'Node.js / Express', pct: 88, grad: 'linear-gradient(90deg, #00e5ff, #a855f7)' },
    { name: 'Python', pct: 82, grad: 'linear-gradient(90deg, #f43f8e, #a855f7)' },
    { name: 'SQL / MongoDB', pct: 80, grad: 'linear-gradient(90deg, #f43f8e, #a855f7)' },
    { name: 'Machine Learning / AI', pct: 75, grad: 'linear-gradient(90deg, #f59e0b, #f43f8e)' },
    { name: 'Power BI / Tableau', pct: 68, grad: 'linear-gradient(90deg, #f59e0b, #f43f8e)' }
  ];

  return (
    <>
      <div className="orb orb1"></div>
      <div className="orb orb2"></div>
      <div className="orb orb3"></div>

      {/* NAV */}
      <nav>
        <span className="logo-mark">DG</span>
        <ul className="nav-links">
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a className="nav-contact" href="mailto:dharmikgohil88@gmail.com">dharmikgohil88@gmail.com</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <div className="hero-eyebrow">
            <span className="hero-dot"></span>Available for opportunities
          </div>
          <h1 className="hero-name">Dharmik<br /><strong>Gohil</strong></h1>
          <p className="hero-role">Software Developer · Data Analysis Enthusiast</p>
          <p className="hero-bio">
            Motivated full-stack developer with hands-on experience in AI-powered applications,
            frontend engineering, and backend integration. Skilled in React.js, Node.js, Python,
            SQL, Power BI, MongoDB, and REST APIs.
          </p>
          <div className="hero-actions">
            <a className="btn-primary" href="#projects">View Projects</a>
            <a className="btn-ghost" href="#contact">Get in Touch</a>
            <a className="btn-ghost" href="https://linkedin.com/in/Dharmik" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="stat-n">3<span>+</span></div>
              <div className="stat-l">Years Exp</div>
            </div>
            <div>
              <div className="stat-n">3</div>
              <div className="stat-l">Companies</div>
            </div>
            <div>
              <div className="stat-n">3<span>+</span></div>
              <div className="stat-l">Projects Built</div>
            </div>
            <div>
              <div className="stat-n">8<span>+</span></div>
              <div className="stat-l">Technologies</div>
            </div>
          </div>
        </div>
        <div className="canvas-card">
          <div className="canvas-label">Skill Profile</div>
          <HeroRadar />
          <div className="radar-legend">
            <div className="rl-item">
              <div className="rl-dot" style={{ background: '#00e5ff', boxShadow: '0 0 6px #00e5ff' }}></div>Full-Stack
            </div>
            <div className="rl-item">
              <div className="rl-dot" style={{ background: '#a855f7', boxShadow: '0 0 6px #a855f7' }}></div>AI / ML
            </div>
            <div className="rl-item">
              <div className="rl-dot" style={{ background: '#f43f8e', boxShadow: '0 0 6px #f43f8e' }}></div>Data
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section" id="skills">
        <div className="section-eyebrow">Expertise</div>
        <div className="section-title">Technical <em>Skills</em></div>
        <div className="about-grid">
          <div className="skill-card">
            <div className="sk-icon">⚛</div>
            <div className="sk-name">Frontend Development</div>
            <div className="sk-desc">Building responsive, performant UIs with React.js and Tailwind CSS. Converting Figma designs into reusable components with cross-browser compatibility.</div>
            <div className="sk-tags">
              <span className="sk-tag">React.js</span>
              <span className="sk-tag">Tailwind CSS</span>
              <span className="sk-tag">JavaScript</span>
            </div>
          </div>
          
          <div className="skill-card">
            <div className="sk-icon" style={{ backgroundColor: 'rgba(168,85,247,0.08)', borderColor: 'rgba(168,85,247,0.15)' }}>⬡</div>
            <div className="sk-name">Backend & APIs</div>
            <div className="sk-desc">Designing REST APIs, JWT auth flows, and scalable Node.js/Express services. MVC architecture with MongoDB, MySQL, and SQLite backends.</div>
            <div className="sk-tags">
              <span className="sk-tag p">Node.js</span>
              <span className="sk-tag p">Express.js</span>
              <span className="sk-tag p">REST APIs</span>
              <span className="sk-tag p">MongoDB</span>
              <span className="sk-tag p">MySQL</span>
            </div>
          </div>

          <div className="skill-card">
            <div className="sk-icon" style={{ backgroundColor: 'rgba(244,63,142,0.08)', borderColor: 'rgba(244,63,142,0.15)' }}>◈</div>
            <div className="sk-name">AI & Machine Learning</div>
            <div className="sk-desc">Building CNN models for medical imaging, integrating LLM APIs for conversational AI, and deploying AI assistants — Brain Tumor Detection, anonymous.ai.</div>
            <div className="sk-tags">
              <span className="sk-tag pk">Python</span>
              <span className="sk-tag pk">Machine Learning</span>
              <span className="sk-tag pk">CNN</span>
              <span className="sk-tag pk">LLM APIs</span>
            </div>
          </div>

          <div className="skill-card">
            <div className="sk-icon" style={{ backgroundColor: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.15)' }}>▦</div>
            <div className="sk-name">Data Analysis</div>
            <div className="sk-desc">SQL queries, Pandas data wrangling, Power BI and Tableau dashboards. Building data-driven insights for business decision-making.</div>
            <div className="sk-tags">
              <span className="sk-tag g">SQL</span>
              <span className="sk-tag g">Python / Pandas</span>
              <span className="sk-tag g">Power BI</span>
              <span className="sk-tag g">Tableau</span>
            </div>
          </div>

          <div className="skill-card">
            <div className="sk-icon">◎</div>
            <div className="sk-name">Languages</div>
            <div className="sk-desc">Core programming languages spanning frontend scripting, backend logic, data science, and systems programming.</div>
            <div className="sk-tags">
              <span className="sk-tag">JavaScript</span>
              <span className="sk-tag">Python</span>
              <span className="sk-tag">Java</span>
              <span className="sk-tag">SQL</span>
              <span className="sk-tag">C/C++</span>
            </div>
          </div>

          <div className="skill-card">
            <div className="sk-icon" style={{ backgroundColor: 'rgba(168,85,247,0.08)', borderColor: 'rgba(168,85,247,0.15)' }}>◆</div>
            <div className="sk-name">Tools & DevOps</div>
            <div className="sk-desc">Git version control, Postman API testing, Google Analytics & Search Console for traffic monitoring and performance improvement.</div>
            <div className="sk-tags">
              <span className="sk-tag p">Git</span>
              <span className="sk-tag p">Postman</span>
              <span className="sk-tag p">Google Analytics</span>
              <span className="sk-tag p">Prompt Engineering</span>
            </div>
          </div>
        </div>

        {/* Skill bars */}
        <div style={{ marginTop: '64px' }}>
          <div className="attr-section-title">Proficiency Levels</div>
          <div className="skills-bar-grid" id="skillBars">
            {skillBars.map((bar, i) => (
              <div className="sb-item" key={i}>
                <div className="sb-top">
                  <span className="sb-name">{bar.name}</span>
                  <span className="sb-pct">{bar.pct}%</span>
                </div>
                <div className="sb-track">
                  <div 
                    className="sb-fill" 
                    style={{ 
                      width: skillsLoaded ? `${bar.pct}%` : '0%', 
                      background: bar.grad,
                      transition: 'width 1.2s cubic-bezier(.23, 1, .32, 1)' 
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section" id="experience" style={{ paddingTop: 0 }}>
        <div className="section-eyebrow">Career</div>
        <div className="section-title">Work <em>Experience</em></div>
        <div className="exp-list">
          <div className="exp-item">
            <div className="exp-meta">
              <div className="exp-date">Sep 2025 – Jan 2026</div>
              <div className="exp-company c">Shakti Agrotech</div>
              <div className="exp-loc">Savarkundla, Amreli</div>
            </div>
            <div className="exp-content">
              <div className="exp-role">Web Developer & Digital Marketing Executive</div>
              <div className="exp-type">Full-time</div>
              <ul className="exp-bullets">
                <li>Developed and maintained dynamic web applications using React.js, Node.js, and MySQL.</li>
                <li>Built REST-based modules for product catalogs, lead management, and dashboards.</li>
                <li>Integrated Google Analytics & Search Console to monitor traffic and improve performance.</li>
              </ul>
            </div>
          </div>

          <div className="exp-item">
            <div className="exp-meta">
              <div className="exp-date">May – Aug 2025</div>
              <div className="exp-company p">Meetanshi</div>
              <div className="exp-loc">Bhavnagar, Gujarat</div>
            </div>
            <div className="exp-content">
              <div className="exp-role">MERN Developer</div>
              <div className="exp-type">E-Commerce Agency · Full-time</div>
              <ul className="exp-bullets">
                <li>Converted Figma designs into reusable React.js components using Tailwind CSS.</li>
                <li>Integrated backend APIs using Node.js and Express.js.</li>
                <li>Implemented responsive layouts ensuring cross-browser compatibility.</li>
              </ul>
            </div>
          </div>

          <div className="exp-item">
            <div className="exp-meta">
              <div className="exp-date">Oct 2024 – Feb 2025</div>
              <div className="exp-company pk">Azziptech</div>
              <div className="exp-loc">Bhavnagar, Gujarat</div>
            </div>
            <div className="exp-content">
              <div className="exp-role">MERN Developer — Intern</div>
              <div className="exp-type">Internship</div>
              <ul className="exp-bullets">
                <li>Improved frontend performance using lazy loading and code splitting.</li>
                <li>Collaborated with cross-functional teams to deliver scalable business solutions.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-eyebrow">Academic</div>
        <div className="section-title"><em>Education</em></div>
        <div className="edu-grid">
          <div className="edu-card">
            <div className="edu-deg">Bachelor of Technology</div>
            <div className="edu-inst">Gyanmanjari Innovative University</div>
            <div className="edu-dates">Information Technology · 2023 – 2026</div>
          </div>
          <div className="edu-card">
            <div className="edu-deg">Diploma in Information Technology</div>
            <div className="edu-inst">Sir Bhavsinhji Polytechnic Institute</div>
            <div className="edu-dates">2019 – 2022</div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section" id="projects" style={{ paddingTop: 0 }}>
        <div className="section-eyebrow">Portfolio</div>
        <div className="section-title">Featured <em>Projects</em></div>
        <div className="projects-grid">
          <div className="proj-card">
            <div className="proj-thumb" style={{ background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(168, 85, 247, 0.08))' }}>📚</div>
            <div className="proj-body">
              <div className="proj-year" style={{ color: '#00e5ff' }}>MERN · AI · 2024</div>
              <div className="proj-name">Book Swan</div>
              <div className="proj-desc">Full-stack MERN e-commerce application with an AI-powered conversational assistant capable of real-time intelligent responses. Integrated LLM APIs for natural language understanding.</div>
              <div className="proj-stack">
                <span className="ps" style={{ background: 'rgba(0, 229, 255, 0.08)', color: '#00e5ff', border: '1px solid rgba(0, 229, 255, 0.2)' }}>React.js</span>
                <span className="ps" style={{ background: 'rgba(0, 229, 255, 0.08)', color: '#00e5ff', border: '1px solid rgba(0, 229, 255, 0.2)' }}>Node.js</span>
                <span className="ps" style={{ background: 'rgba(0, 229, 255, 0.08)', color: '#00e5ff', border: '1px solid rgba(0, 229, 255, 0.2)' }}>MongoDB</span>
                <span className="ps" style={{ background: 'rgba(0, 229, 255, 0.08)', color: '#00e5ff', border: '1px solid rgba(0, 229, 255, 0.2)' }}>LLM API</span>
              </div>
            </div>
          </div>

          <div className="proj-card">
            <div className="proj-thumb" style={{ background: 'linear-gradient(135deg, rgba(244, 63, 142, 0.1), rgba(168, 85, 247, 0.08))' }}>🧠</div>
            <div className="proj-body">
              <div className="proj-year" style={{ color: '#f43f8e' }}>Python · ML · 2023</div>
              <div className="proj-name">Brain Tumor Detection System</div>
              <div className="proj-desc">CNN model to classify MRI scans as tumor-positive or negative. Applied preprocessing techniques to enhance model accuracy. Demonstrated AI in healthcare diagnostics.</div>
              <div className="proj-stack">
                <span className="ps" style={{ background: 'rgba(244, 63, 142, 0.08)', color: '#f43f8e', border: '1px solid rgba(244, 63, 142, 0.2)' }}>Python</span>
                <span className="ps" style={{ background: 'rgba(244, 63, 142, 0.08)', color: '#f43f8e', border: '1px solid rgba(244, 63, 142, 0.2)' }}>TensorFlow</span>
                <span className="ps" style={{ background: 'rgba(244, 63, 142, 0.08)', color: '#f43f8e', border: '1px solid rgba(244, 63, 142, 0.2)' }}>CNN</span>
              </div>
            </div>
          </div>

          <div className="proj-card">
            <div className="proj-thumb" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(245, 158, 11, 0.06))' }}>✦</div>
            <div className="proj-body">
              <div className="proj-year" style={{ color: '#a855f7' }}>AI · SaaS · 2026</div>
              <div className="proj-name">anonymous.ai</div>
              <div className="proj-desc">Intelligent AI assistant "Anonymous" inspired by modern conversational AI systems. Full-stack React.js frontend and Node.js backend with RESTful APIs for seamless communication.</div>
              <div className="proj-stack">
                <span className="ps" style={{ background: 'rgba(168, 85, 247, 0.08)', color: '#a855f7', border: '1px solid rgba(168, 85, 247, 0.2)' }}>React.js</span>
                <span className="ps" style={{ background: 'rgba(168, 85, 247, 0.08)', color: '#a855f7', border: '1px solid rgba(168, 85, 247, 0.2)' }}>Node.js</span>
                <span className="ps" style={{ background: 'rgba(168, 85, 247, 0.08)', color: '#a855f7', border: '1px solid rgba(168, 85, 247, 0.2)' }}>REST APIs</span>
              </div>
            </div>
          </div>

          <div className="proj-card">
            <div className="proj-thumb" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.09), rgba(0, 229, 255, 0.06))' }}>🛒</div>
            <div className="proj-body">
              <div className="proj-year" style={{ color: '#f59e0b' }}>Full-Stack · 2024</div>
              <div className="proj-name">E-Commerce Platform</div>
              <div className="proj-desc">Complete full-stack e-commerce app with JWT authentication, role-based access control, cart management, and admin dashboard. React + Node/Express + SQLite.</div>
              <div className="proj-stack">
                <span className="ps" style={{ background: 'rgba(245, 158, 11, 0.08)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.2)' }}>React</span>
                <span className="ps" style={{ background: 'rgba(245, 158, 11, 0.08)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.2)' }}>Express.js</span>
                <span className="ps" style={{ background: 'rgba(245, 158, 11, 0.08)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.2)' }}>SQLite</span>
                <span className="ps" style={{ background: 'rgba(245, 158, 11, 0.08)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.2)' }}>JWT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RADAR COMPARISON */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-eyebrow">Visual</div>
        <div className="section-title">Skill <em>Radar</em></div>
        <CompareRadar />
      </section>

      {/* CONTACT */}
      <section className="section" id="contact" style={{ paddingTop: 0 }}>
        <div className="section-eyebrow">Let's Connect</div>
        <div className="section-title">Get in <em>Touch</em></div>
        <div className="contact-wrap">
          <div>
            <p className="contact-intro">Open to full-stack developer roles, data analysis opportunities, and AI/ML integration projects. Based in Bhavnagar, Gujarat — available remotely.</p>
            
            {formSubmitted ? (
              <div style={{ padding: '20px', background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '8px', marginBottom: '20px', textAlign: 'left' }}>
                <strong style={{ color: 'var(--c)' }}>Message sent successfully!</strong>
                <p style={{ fontSize: '13px', marginTop: '5px', color: 'var(--text)' }}>Thank you for reaching out, Dharmik will get in touch with you shortly.</p>
              </div>
            ) : null}

            <form className="contact-form" onSubmit={handleFormSubmit}>
              <input 
                className="cf-input" 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name" 
                required 
              />
              <input 
                className="cf-input" 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email address" 
                required 
              />
              <textarea 
                className="cf-input" 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your message..." 
                required
              />
              <button className="btn-primary" style={{ alignSelf: 'flex-start' }} type="submit">Send Message</button>
            </form>
          </div>
          <div className="contact-links">
            <a className="cl" href="mailto:dharmikgohil88@gmail.com">
              <div className="cl-ic" style={{ background: 'rgba(0,229,255,0.08)' }}>✉</div>
              <div>
                <div className="cl-label">Email</div>
                <div className="cl-val">dharmikgohil88@gmail.com</div>
              </div>
              <span className="open-badge">Open</span>
            </a>
            <a className="cl" href="https://linkedin.com/in/Dharmik" target="_blank" rel="noreferrer">
              <div className="cl-ic" style={{ background: 'rgba(168,85,247,0.08)' }}>in</div>
              <div>
                <div className="cl-label">LinkedIn</div>
                <div className="cl-val">linkedin.com/in/Dharmik</div>
              </div>
            </a>
            <a className="cl" href="https://github.com/dharmik-gohil-n" target="_blank" rel="noreferrer">
              <div className="cl-ic" style={{ background: 'rgba(244,63,142,0.08)' }}>⌥</div>
              <div>
                <div className="cl-label">GitHub</div>
                <div className="cl-val">github.com/dharmik-gohil-n</div>
              </div>
            </a>
            <div className="cl" style={{ borderColor: 'rgba(245,158,11,0.2)', cursor: 'default' }}>
              <div className="cl-ic" style={{ background: 'rgba(245,158,11,0.08)' }}>◆</div>
              <div>
                <div className="cl-label" style={{ color: '#f59e0b' }}>Bhavnagar, Gujarat</div>
                <div className="cl-val">India · Available remote</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2026 Dharmik Gohil · Software Developer · Bhavnagar, Gujarat</p>
        <p>dharmikgohil88@gmail.com</p>
      </footer>
    </>
  );
}

export default App;
