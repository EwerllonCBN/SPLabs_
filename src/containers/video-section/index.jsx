import React from 'react'
import './styles.scss'

export function Video() {
  return (
    <section className="video-container">
      <div className="text-content">
        <h1>Quem são, o que fazem, onde vivem?</h1>

        <p>
          Não precisa embedar o vídeo do Rick Astley Remastered 4K 60 FPS, pode
          ser qualquer outro vídeo da sua escolha, mas queremos dar play. Na
          estrutura de pastas nos chamamos as páginas de containers.
        </p>
      </div>
      <div className="video-content">
        <iframe
          src="https://www.youtube.com/embed/68ugkg9RePc?si=P_UICzb8ANgBDhW6"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </section>
  )
}
