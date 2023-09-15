import React, { useEffect, useState } from 'react'
import './styles.scss'
import '../../components/solucton/styles.scss'

import { api } from '../../routes/api'
import { Soluction } from '../../components/solucton/index.jsx'

export function CaseSection() {
  const [cases, setCases] = useState([])

  useEffect(() => {
    api
      .get('/api/cases')
      .then(response => {
        setCases(response.data.cases)
      })
      .catch(error => {
        console.error('Erro ao buscar os casos de sucesso:', error)
      })
  }, [])

  return (
    <section className="cases-container">
      <div className="title-content">
        <p className="title-header">
          Problemas complexos. <br />
          Soluções <span className="complex-span">complexas </span>
          <span className="creative-span">criativas_</span>
        </p>
        <p className="caption">
          Confira nossos cases de sucesso que vão além do mundo jurídico.
        </p>
      </div>
      <div className="soluction-content">
        <Soluction cases={cases} />
      </div>
    </section>
  )
}
