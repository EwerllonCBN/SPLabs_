import React from 'react'
import './styles.scss'

import spIcon from '../../assets/tipo=branco.svg'

export function HeroSection() {
  return (
    <section className="header-container">
      <div className="header">
        <img className="icon-header" src={spIcon} alt="icon" />
        <div className="header-inf">
          <a>Cases</a>
          <a>Contato</a>
        </div>
      </div>
      <div className="hero">
        <p className="text-header">
          Imagine, crie, <br />
          implemente e <span className="evolve">evolua</span>
        </p>
        <p>
          Porque não basta resolver apenas os conflitos do mundo do direito.
        </p>
        <button type="button" className="button-init">
          inicie a sua jornada
        </button>
      </div>
    </section>
  )
}
