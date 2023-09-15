import React from 'react'
import './styles.scss'

import spIcon from '../../assets/tipo=preto.svg'

export function Footer() {
  return (
    <section className="footer-container">
      <footer className="footer-content">
        <div className="top-footer-content">
          <img src={spIcon} />
          <div className="splab-inf">
            <div className="splab-inf-privacity-policy">
              <h3>SP Labs</h3>
              <p>Política de Privacidade</p>
            </div>
            <div className="splab-without-process">
              <h3>Sem Processo</h3>
              <p>Site</p>
              <p>Produtos</p>
              <p>Blog</p>
            </div>
          </div>
        </div>
        <hr className="divider" />
        <p className="bottom-title-footer">
          SP Labs 2023, Feito por EwerllonCBN
        </p>
      </footer>
    </section>
  )
}
