"use client";

import { useState } from "react";

type Tab = "dashboard" | "calendar" | "activities" | "progress";

const sessions = [
  {
    id: 1,
    day: "LUNDI",
    title: "Footing facile",
    detail: "Endurance fondamentale · 45 min",
    type: "Endurance",
    icon: "🌿"
  },
  {
    id: 2,
    day: "MARDI",
    title: "Mobilité & récupération",
    detail: "Souplesse · 20 min",
    type: "Récupération",
    icon: "🧘"
  },
  {
    id: 3,
    day: "MERCREDI",
    title: "Fractionné sur piste",
    detail: "10 × 400 m · séance qualité",
    type: "Vitesse",
    icon: "⚡"
  },
  {
    id: 4,
    day: "VENDREDI",
    title: "Renforcement trail",
    detail: "Jambes, gainage & stabilité · 25 min",
    type: "Renforcement",
    icon: "🏋️"
  },
  {
    id: 5,
    day: "DIMANCHE",
    title: "Sortie nature",
    detail: "Endurance · 1 h 45",
    type: "Sortie longue",
    icon: "⛰️"
  }
];

const navigation: { id: Tab; label: string; icon: string }[] = [
  { id: "dashboard", label: "Vue d'ensemble", icon: "⌂" },
  { id: "calendar", label: "Calendrier", icon: "▦" },
  { id: "activities", label: "Activités", icon: "↗" },
  { id: "progress", label: "Progression", icon: "◷" }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [completed, setCompleted] = useState<number[]>([]);

  function toggleSession(id: number) {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  const progress = Math.round((completed.length / sessions.length) * 100);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" onClick={() => setActiveTab("dashboard")}>
          <span className="brand-mark">LT</span>
          <span>
            <strong>let&apos;s trail</strong>
            <small>RUN YOUR WAY</small>
          </span>
        </a>

        <div className="sidebar-label">MENU</div>
        <nav className="main-nav" aria-label="Navigation principale">
          {navigation.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="garmin-mini">
            <span className="garmin-dot" />
            <div>
              <strong>Garmin</strong>
              <small>Connexion à venir</small>
            </div>
          </div>
          <p>Fait pour les amoureux des sentiers.</p>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="breadcrumb">MON ESPACE <span>/</span> LET&apos;S TRAIL</div>
          <div className="profile">
            <span className="profile-avatar">🏃‍♀️</span>
            <span>Mon profil</span>
          </div>
        </header>

        <div className="page-content">
          {activeTab === "dashboard" && (
            <>
              <section className="welcome">
                <div>
                  <p className="eyebrow">TON ESPACE RUNNING & TRAIL</p>
                  <h1>Chaque sortie<br />est une aventure<span>.</span></h1>
                  <p className="welcome-text">
                    Garde le cap sur tes objectifs, une foulée après l&apos;autre.
                  </p>
                </div>
                <div className="welcome-art" aria-hidden="true">
                  <span>⛰️</span>
                  <small>FIND YOUR<br />NEXT TRAIL</small>
                </div>
              </section>

              <section className="stats-grid" aria-label="Statistiques">
                <article className="stat-card">
                  <span className="stat-icon">📍</span>
                  <p>Distance cette semaine</p>
                  <strong>-- <small>km</small></strong>
                  <span className="stat-note">Données Garmin à venir</span>
                </article>
                <article className="stat-card">
                  <span className="stat-icon">⛰️</span>
                  <p>Dénivelé positif</p>
                  <strong>-- <small>m D+</small></strong>
                  <span className="stat-note">Données Garmin à venir</span>
                </article>
                <article className="stat-card">
                  <span className="stat-icon">⏱️</span>
                  <p>Temps d&apos;activité</p>
                  <strong>-- <small>h</small></strong>
                  <span className="stat-note">Données Garmin à venir</span>
                </article>
              </section>

              <section className="content-grid">
                <div className="panel week-panel">
                  <div className="panel-heading">
                    <div>
                      <p className="eyebrow">GARDER LE RYTHME</p>
                      <h2>Ta semaine</h2>
                    </div>
                    <button className="text-button" onClick={() => setActiveTab("calendar")}>
                      Voir le calendrier ↗
                    </button>
                  </div>

                  <div className="week-progress">
                    <div className="progress-copy">
                      <span>{completed.length} séance{completed.length > 1 ? "s" : ""} terminée{completed.length > 1 ? "s" : ""}</span>
                      <strong>{progress}%</strong>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <div className="session-list">
                    {sessions.map((session) => {
                      const isDone = completed.includes(session.id);
                      return (
                        <article className={`session ${isDone ? "is-done" : ""}`} key={session.id}>
                          <div className="session-icon">{session.icon}</div>
                          <div className="session-info">
                            <span className="session-day">{session.day}</span>
                            <strong>{session.title}</strong>
                            <small>{session.detail}</small>
                          </div>
                          <button
                            className={`check-button ${isDone ? "checked" : ""}`}
                            onClick={() => toggleSession(session.id)}
                            aria-label={isDone ? "Marquer comme non terminée" : "Marquer comme terminée"}
                          >
                            {isDone ? "✓" : ""}
                          </button>
                        </article>
                      );
                    })}
                  </div>
                  <p className="demo-note">Planning de démonstration, à personnaliser ensuite.</p>
                </div>

                <div className="side-panels">
                  <article className="panel goal-panel">
                    <p className="eyebrow">CAP SUR LA SUITE</p>
                    <h2>Ton prochain<br />défi commence ici.</h2>
                    <p>Ajoute un objectif de course pour construire ton entraînement autour de tes envies.</p>
                    <button className="outline-button" onClick={() => setActiveTab("progress")}>
                      Découvrir mes objectifs <span>↗</span>
                    </button>
                    <div className="goal-decoration">✳</div>
                  </article>

                  <article className="garmin-card">
                    <div className="garmin-card-top">
                      <span className="garmin-logo">G</span>
                      <span className="coming-soon">BIENTÔT</span>
                    </div>
                    <h3>Tes sorties Garmin, au même endroit.</h3>
                    <p>La synchronisation de tes activités arrivera dans une prochaine étape.</p>
                  </article>
                </div>
              </section>
            </>
          )}

          {activeTab === "calendar" && (
            <section className="simple-page">
              <p className="eyebrow">ORGANISATION</p>
              <h1>Ton calendrier<span>.</span></h1>
              <p className="simple-intro">Une première vue de ton planning d&apos;entraînement.</p>
              <div className="panel">
                <div className="panel-heading">
                  <h2>Planning de démonstration</h2>
                  <span className="coming-soon">À PERSONNALISER</span>
                </div>
                <div className="session-list">
                  {sessions.map((session) => (
                    <article className="session" key={session.id}>
                      <div className="session-icon">{session.icon}</div>
                      <div className="session-info">
                        <span className="session-day">{session.day}</span>
                        <strong>{session.title}</strong>
                        <small>{session.detail}</small>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeTab === "activities" && (
            <section className="simple-page">
              <p className="eyebrow">TON HISTORIQUE</p>
              <h1>Les kilomètres<br />racontent des histoires<span>.</span></h1>
              <div className="empty-state panel">
                <span>🥾</span>
                <h2>tes activités arrivent ici</h2>
                <p>Après la connexion Garmin, tu retrouveras ici tes sorties, tes courses et toutes leurs données.</p>
              </div>
            </section>
          )}

          {activeTab === "progress" && (
            <section className="simple-page">
              <p className="eyebrow">OBJECTIFS & ÉVOLUTION</p>
              <h1>Construire la suite<span>.</span></h1>
              <div className="empty-state panel">
                <span>🌱</span>
                <h2>Ta progression, en un coup d&apos;œil</h2>
                <p>Cette page accueillera tes objectifs, tes records et tes indicateurs de progression.</p>
              </div>
            </section>
          )}

          <footer className="footer">
            <span>LET&apos;S TRAIL · VERSION 0.1</span>
            <span>Fait avec passion et un peu de dénivelé ⛰️</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
