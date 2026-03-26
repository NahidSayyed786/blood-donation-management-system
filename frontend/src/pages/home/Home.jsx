import React, { useEffect, useState } from "react";
import {
  FaUsers, FaHeartbeat, FaHospital, FaMapMarkerAlt, FaCalendarAlt, FaExclamationCircle
} from "react-icons/fa";
import "../../styles/index.css";
import { useNavigate } from "react-router-dom";

const AVAILABILITY_SAMPLE = [
  { group: "A+", units: 12 }, { group: "A-", units: 4 }, { group: "B+", units: 18 }, { group: "B-", units: 6 },
  { group: "O+", units: 9 }, { group: "O-", units: 3 }, { group: "AB+", units: 6 }, { group: "AB-", units: 2 },
];

export default function Home() {
  const [counters, setCounters] = useState({ lives: 0, donations: 0, hospitals: 0 });
  const [search, setSearch] = useState("");
  const [ti, setTi] = useState(0);
  const navigate = useNavigate();

  const TESTIMONIALS = [
    { name: "Asha R.", text: "Great staff and smooth process." },
    { name: "Ravi K.", text: "Found O+ quickly through the site." },
    { name: "Sneha M.", text: "Friendly volunteers; safe environment." },
  ];

  /* COUNTER ANIMATION */
  useEffect(() => {
    const target = { lives: 12540, donations: 8430, hospitals: 120 };
    const duration = 1000, tick = 30, steps = Math.ceil(duration / tick);
    let cur = { lives: 0, donations: 0, hospitals: 0 };
    const inc = {
      lives: Math.ceil(target.lives / steps),
      donations: Math.ceil(target.donations / steps),
      hospitals: Math.ceil(target.hospitals / steps)
    };

    const id = setInterval(() => {
      let done = true;
      Object.keys(cur).forEach(k => {
        if (cur[k] < target[k]) {
          cur[k] = Math.min(target[k], cur[k] + inc[k]);
          done = false;
        }
      });
      setCounters({ ...cur });
      if (done) clearInterval(id);
    }, tick);

    return () => clearInterval(id);
  }, []);

  /* TESTIMONIAL ROTATION */
  useEffect(() => {
    const id = setInterval(() => setTi(t => (t + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, [TESTIMONIALS.length]);

  return (
    <div className="home-page fade" style={{ paddingTop: "40px"}}>

      {/* HERO */}
      <section className="hero container fade">
        <div className="hero-left">
          <h1>Donate Blood 🩸, Save Lives ❤️</h1>
          <p className="lead">Quick matching, verified donors and hospital support — help patients in real time.</p>

          <div className="hero-ctas">
            <a className="btn primary" href="/register">Become a Donor</a>
            <a className="btn outline" href="/login">Hospital Login</a>
          </div>

          <div className="hero-stats">
            <div className="stat card-3d">
              <FaUsers className="stat-icon" />
              <div>
                <div className="stat-num">{counters.lives.toLocaleString()}</div>
                <div className="stat-label">Lives</div>
              </div>
            </div>

            <div className="stat card-3d">
              <FaHeartbeat className="stat-icon" />
              <div>
                <div className="stat-num">{counters.donations.toLocaleString()}</div>
                <div className="stat-label">Donations</div>
              </div>
            </div>

            <div className="stat card-3d">
              <FaHospital className="stat-icon" />
              <div>
                <div className="stat-num">{counters.hospitals.toLocaleString()}</div>
                <div className="stat-label">Hospitals</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SEARCH BOX */}
        <aside className="hero-right">
          <div className="availability-card card-3d fade">
            <div className="availability-header">
              <FaMapMarkerAlt /> &nbsp; Search blood group
            </div>

            <div className="search-row">
              <input
                placeholder="Type blood group e.g. A+"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="blood-grid">
              {AVAILABILITY_SAMPLE
                .filter(a => a.group.toLowerCase().includes(search.toLowerCase()))
                .map(a => (
                  <div key={a.group} className="blood-tile card-3d">
                    <div className="group">{a.group}</div>
                    <div className="units">{a.units} units</div>
                  </div>
                ))}
            </div>

            <div className="avail-footer">
              <a href="/inventory" className="btn link">View full inventory</a>
            </div>
          </div>
        </aside>
      </section>

      {/* HOW STEPS */}
      <section className="how container fade">
        <h2>How Donation Works</h2>

        <div className="steps">
          <div className="step card-3d"><div className="num">1</div><h4>Register</h4><p>Create your donor profile.</p></div>
          <div className="step card-3d"><div className="num">2</div><h4>Screening</h4><p>Quick health check-up.</p></div>
          <div className="step card-3d"><div className="num">3</div><h4>Donate</h4><p>Safe and hygienic donation.</p></div>
          <div className="step card-3d"><div className="num">4</div><h4>Recover</h4><p>Refresh and rest.</p></div>
        </div>
      </section>

      {/* CAMPS */}
      <section className="camps container fade">
        <h2>Upcoming Camps</h2>

        <div className="camp-list">
          <article className="camp-card card-3d">
            <div className="camp-head"><FaMapMarkerAlt /> Mumbai</div>
            <div className="camp-meta"><FaCalendarAlt /> 2025-12-10 • City Hospital</div>
            <a className="btn small primary" href="/register">Register</a>
          </article>

          <article className="camp-card card-3d">
            <div className="camp-head"><FaMapMarkerAlt /> Pune</div>
            <div className="camp-meta"><FaCalendarAlt /> 2025-12-14 • Community Center</div>
            <a className="btn small primary" href="/register">Register</a>
          </article>

          <article className="camp-card card-3d">
            <div className="camp-head"><FaMapMarkerAlt /> Bangalore</div>
            <div className="camp-meta"><FaCalendarAlt /> 2025-12-18 • Metro Mall</div>
            <a className="btn small primary" href="/register">Register</a>
          </article>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials container fade">
        <h2>What Donors Say</h2>

        <div className="testi-wrap">
          <button className="t-prev" onClick={() => setTi(t => (t - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}>‹</button>

          <div className="testi-card card-3d">
            <p className="quote">“{TESTIMONIALS[ti].text}”</p>
            <div className="who">— {TESTIMONIALS[ti].name}</div>
          </div>

          <button className="t-next" onClick={() => setTi(t => (t + 1) % TESTIMONIALS.length)}>›</button>
        </div>
      </section>

      {/* SERVICES AND REQUESTS */}
      <section className="services container fade">

        <div className="services-left">
          <h2>Services</h2>

          <div className="service-grid">
            <div className="service card-3d"><FaHeartbeat className="svc-icon" /><h4>Quick Matching</h4><p>Match donors instantly.</p></div>
            <div className="service card-3d"><FaUsers className="svc-icon" /><h4>Volunteer Drives</h4><p>Organize community events.</p></div>
            <div className="service card-3d"><FaHospital className="svc-icon" /><h4>Hospital Support</h4><p>Integrated inventory system.</p></div>
          </div>
        </div>

        <div className="services-right">
          <h2>Recent Requests</h2>

          <div className="requests">
            <div className="req high card-3d"><div><strong>Rahul Sharma</strong> — A+</div><div className="meta">Mumbai • High</div><a className="btn tiny" href="/donors">Help</a></div>
            <div className="req medium card-3d"><div><strong>Anita Desai</strong> — B-</div><div className="meta">Pune • Medium</div><a className="btn tiny" href="/donors">Help</a></div>
            <div className="req low card-3d"><div><strong>Priya Singh</strong> — AB+</div><div className="meta">Bangalore • Low</div><a className="btn tiny" href="/donors">Help</a></div>
          </div>
        </div>
      </section>

      <button className="emergency-btn fade" aria-label="Emergency request">
        <FaExclamationCircle /> Need Blood? Request
      </button>

      {/* EMERGENCY BUTTON */}
      <button
        className="emergency-btn fade"
        aria-label="Emergency request"
        onClick={() => navigate("/request-blood")}
      >
        <FaExclamationCircle /> Need Blood? Request
      </button>
    </div>
  );
}
